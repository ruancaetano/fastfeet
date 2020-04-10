import * as Yup from 'yup';
import { Op } from 'sequelize';
import { startOfDay, parseISO, setHours, isWithinInterval } from 'date-fns';

import Queue from '../../lib/Queue';
import NewOrderEmailJob from '../jobs/NewOrderEmailJob';
import Recipient from '../models/Recipient';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import paginate from '../../util/paginate';

class OrdersController {
  async list(req, res) {
    const { page, pageSize, product } = req.query;

    const where = {};
    if (product) {
      where.product = {
        [Op.iLike]: `%${product}%`,
      };
    }

    const { count, rows } = await Order.findAndCountAll({
      where,
      ...paginate(page, pageSize),
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
      order: [['createdAt', 'ASC']],
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

  async find(req, res) {
    const { orderId } = req.params;

    const order = await Order.findByPk(orderId, {
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

    if (!order) {
      return res.status(400).json({
        message: 'Order not found!',
      });
    }

    return res.status(200).json(order);
  }

  async create(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      canceledAt: Yup.date(),
      startDate: Yup.date(),
      endDate: Yup.date(),
      signatureId: Yup.number(),
      deliverymanId: Yup.number().required(),
      recipientId: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        message: 'Invalid body!',
      });
    }

    const deliveryman = await Deliveryman.findByPk(req.body.deliverymanId);
    if (!deliveryman) {
      return res.status(400).json({
        message: 'Deliveryman not found!',
      });
    }

    const recipient = await Recipient.findByPk(req.body.recipientId);
    if (!recipient) {
      return res.status(400).json({
        message: 'Recipient not found!',
      });
    }

    if (req.body.signatureId) {
      const signatureExists = await File.findByPk(req.body.signatureId);
      if (!signatureExists) {
        return res.status(400).json({
          message: 'Signature not found!',
        });
      }
    }

    // Allow delivery between 8h - 18h
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
    }

    const order = await Order.create(req.body);

    await Queue.addJob(NewOrderEmailJob, { deliveryman, order, recipient });

    return res.status(201).json(order);
  }

  async update(req, res) {
    const { orderId } = req.params;
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      canceledAt: Yup.date(),
      startDate: Yup.date(),
      endDate: Yup.date(),
      signatureId: Yup.number(),
      deliverymanId: Yup.number().required(),
      recipientId: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        message: 'Invalid body!',
      });
    }

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(400).json({
        message: 'Order not found ',
      });
    }

    const deliverymanExists = await Deliveryman.findByPk(
      req.body.deliverymanId
    );
    if (!deliverymanExists) {
      return res.status(400).json({
        message: 'Deliveryman not found!',
      });
    }

    const recipientExists = await Recipient.findByPk(req.body.recipientId);
    if (!recipientExists) {
      return res.status(400).json({
        message: 'Recipient not found!',
      });
    }

    if (req.body.signatureId) {
      const signatureExists = await File.findByPk(req.body.signatureId);
      if (!signatureExists) {
        return res.status(400).json({
          message: 'Signature not found!',
        });
      }
    }

    // Allow delivery between 8h - 18h
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
    }

    const updatedOrder = await order.update(req.body);

    return res.status(200).json(updatedOrder);
  }

  async delete(req, res) {
    const { orderId } = req.params;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(400).json({
        message: 'Order not found ',
      });
    }

    await order.destroy();

    return res.status(204).json();
  }
}

export default new OrdersController();
