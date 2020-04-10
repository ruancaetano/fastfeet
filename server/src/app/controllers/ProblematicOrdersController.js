import Order from '../models/Order';
import DeliveryProblems from '../models/DeliveryProblem';
import paginate from '../../util/paginate';

class ProblematicOrdersController {
  async list(req, res) {
    const { page, pageSize } = req.query;
    const { count, rows } = await DeliveryProblems.findAndCountAll({
      ...paginate(page, pageSize),
      include: [{ model: Order, as: 'order' }],
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
}

export default new ProblematicOrdersController();
