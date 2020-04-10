import * as Yup from 'yup';

import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';
import paginate from '../../util/paginate';

class DeliveryProblemsController {
  async list(req, res) {
    const { page, pageSize } = req.query;
    const { orderId } = req.params;

    const { count, rows } = await DeliveryProblem.findAndCountAll({
      ...paginate(page, pageSize),
      where: {
        orderId,
      },
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

  async create(req, res) {
    const { orderId } = req.params;
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        message: 'Invalid body!',
      });
    }

    const orderExists = await Order.findOne({
      where: {
        id: orderId,
      },
    });

    if (!orderExists) {
      return res.status(400).json({
        message: 'Order not found for this deliveryman!',
      });
    }

    const problem = await DeliveryProblem.create({
      ...req.body,
      orderId,
    });
    return res.status(201).json(problem);
  }
}

export default new DeliveryProblemsController();
