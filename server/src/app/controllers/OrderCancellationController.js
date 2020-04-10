import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';

class OrderCancellationController {
  async create(req, res) {
    const { problemId } = req.params;

    const problem = await DeliveryProblem.findByPk(problemId);

    if (!problem) {
      return res.status(400).json({
        message: 'Problem not found',
      });
    }

    const order = await Order.findByPk(problem.orderId);

    order.update({
      canceledAt: new Date(),
    });

    return res.status(200).json(order);
  }
}

export default new OrderCancellationController();
