import { Op } from 'sequelize';
import * as Yup from 'yup';
import {
  startOfDay,
  endOfDay,
  parseISO,
  setHours,
  isWithinInterval,
} from 'date-fns';

import Recipient from '../models/Recipient';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import paginate from '../../util/paginate';

class DeliveriesController {
  async list(req, res) {
    const { page, pageSize, delivered } = req.query;
    const { deliverymanId = false } = req.params;

    const where = {
      deliverymanId,
    };

    if (delivered === 'true') {
      where.endDate = {
        [Op.ne]: null,
      };
    } else {
      where.endDate = null;
      where.canceledAt = null;
    }

    const { count, rows } = await Order.findAndCountAll({
      ...paginate(page, pageSize),
      where,
      include: [
        {
          model: Recipient,
          as: 'recipient',
        },
        {
          model: File,
          as: 'signature',
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'filename', 'path'],
            },
          ],
        },
      ],
    });

    let totalPages = parseInt(count / pageSize, 10);
    totalPages += count % pageSize === 0 ? 0 : 1;

    return res.status(200).json({
      page: parseInt(page, 10),
      pageSize: parseInt(pageSize, 10),
      totalPages,
      values: rows,
    });
  }

  async update(req, res) {
    const { deliverymanId, orderId } = req.params;
    const schema = Yup.object().shape({
      startDate: Yup.date(),
      endDate: Yup.date(),
      signatureId: Yup.number(),
    });

    const deliveryman = await Deliveryman.findByPk(deliverymanId);
    if (!deliveryman) {
      return res.status(400).json({
        message: 'Deliveryman not found!',
      });
    }

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(400).json({
        message: 'Order not found!',
      });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        message: 'Invalid body!',
      });
    }

    if (req.body.startDate) {
      const parsedStartDate = parseISO(req.body.startDate);

      // Checks if the start time is between 8 and 18
      const rangeStart = setHours(parsedStartDate, 8);
      const rangeEnd = setHours(startOfDay(parsedStartDate), 18);

      if (
        !isWithinInterval(parsedStartDate, { start: rangeStart, end: rangeEnd })
      ) {
        return res.status(400).json({
          message: 'Withdrawals can only be made between 08:00 and 18:00.',
        });
      }

      // Checks if the user has already made more than the limit of 5 deliveries per day
      const deliveriesCount = await Order.count({
        where: {
          deliverymanId,
          startDate: {
            [Op.between]: [
              startOfDay(parsedStartDate),
              endOfDay(parsedStartDate),
            ],
          },
        },
      });

      if (deliveriesCount >= 5) {
        return res.status(400).json({
          message: 'You can only start 5 deliveries a day',
        });
      }
    }

    // Verify if signature exists
    if (req.body.signatureId) {
      const signatureExists = await File.findByPk(req.body.signatureId);
      if (!signatureExists) {
        return res.status(400).json({
          message: 'Signature not found!',
        });
      }
    }

    const updatedOrder = await order.update(req.body);
    return res.status(200).json(updatedOrder);
  }
}

export default new DeliveriesController();
