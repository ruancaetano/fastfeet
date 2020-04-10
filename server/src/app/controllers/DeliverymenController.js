import * as Yup from 'yup';
import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import paginate from '../../util/paginate';
import File from '../models/File';

class DeliverymenController {
  async find(req, res) {
    const { deliverymanId } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliverymanId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'filename', 'path'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(400).json({
        message: 'Deliveryman not found!',
      });
    }

    return res.status(200).json(deliveryman);
  }

  async list(req, res) {
    const { page, pageSize, name } = req.query;

    const where = {};
    if (name) {
      where.name = {
        [Op.iLike]: `%${name}%`,
      };
    }

    const { count, rows } = await Deliveryman.findAndCountAll({
      where,
      ...paginate(page, pageSize),
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'filename', 'path'],
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

  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      avatarId: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        message: 'Invalid body!',
      });
    }

    const deliverymanAlreadyExists = await Deliveryman.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (deliverymanAlreadyExists) {
      return res.status(400).json({
        message: 'Deliveryman already exists',
      });
    }

    if (req.body.avatarId) {
      const fileExists = await File.findByPk(req.body.avatarId);
      if (!fileExists) {
        return res.status(400).json({
          message: 'Avatar image not found!',
        });
      }
    }

    const deliveryman = await Deliveryman.create(req.body);

    return res.status(201).json(deliveryman);
  }

  async update(req, res) {
    const { deliverymanId } = req.params;
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      avatarId: Yup.number(),
    });

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman) {
      return res.status(400).json({
        message: 'Deliveryman not found',
      });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        message: 'Invalid body!',
      });
    }

    if (deliveryman.email !== req.body.email) {
      const emailAlreadyUsed = await Deliveryman.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (emailAlreadyUsed) {
        return res.status(400).json({
          message: 'E-mail already used',
        });
      }
    }

    if (req.body.avatarId && deliveryman.avatarId !== req.body.avatarId) {
      const fileExists = await File.findByPk(req.body.avatarId);
      if (!fileExists) {
        return res.status(400).json({
          message: 'Avatar image not found!',
        });
      }
    }

    await deliveryman.update(req.body);

    const updatedDeliveryman = await Deliveryman.findByPk(deliveryman.id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'filename', 'path'],
        },
      ],
    });

    return res.status(200).json(updatedDeliveryman);
  }

  async delete(req, res) {
    const { deliverymanId } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman) {
      return res.status(400).json({
        message: 'Deliveryman not found',
      });
    }

    await deliveryman.destroy();

    return res.status(204).json();
  }
}

export default new DeliverymenController();
