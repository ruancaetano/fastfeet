import * as Yup from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';
import paginate from '../../util/paginate';

class RecipientsController {
  async list(req, res) {
    const { page, pageSize, name } = req.query;

    const where = {};
    if (name) {
      where.name = {
        [Op.iLike]: `%${name}%`,
      };
    }

    const { count, rows } = await Recipient.findAndCountAll({
      where,
      ...paginate(page, pageSize),
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
    const { recipientId } = req.params;

    const recipient = await Recipient.findByPk(recipientId);

    if (!recipient) {
      return res.status(400).json({
        message: 'Recipient not found!',
      });
    }

    return res.status(200).json(recipient);
  }

  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      complement: Yup.string().required(),
      zipcode: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        message: 'Invalid body!',
      });
    }

    const recipientAlreadyExists = await Recipient.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (recipientAlreadyExists) {
      return res.status(400).json({
        message: 'Recipient already exists',
      });
    }

    const recipient = await Recipient.create(req.body);

    return res.status(201).json(recipient);
  }

  async update(req, res) {
    const { recipientId } = req.params;
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      complement: Yup.string().required(),
      zipcode: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        message: 'Invalid body!',
      });
    }

    const recipient = await Recipient.findByPk(recipientId);

    if (!recipient) {
      return res.status(400).json({
        message: 'Recipient not found ',
      });
    }

    if (recipient.name !== req.body.name) {
      const recipientNameAlreadyExists = await Recipient.findOne({
        where: {
          name: req.body.name,
        },
      });

      if (recipientNameAlreadyExists) {
        return res.status(400).json({
          message: 'Already exists another recipient with this name!',
        });
      }
    }

    const newRecipient = await recipient.update(req.body);

    return res.status(200).json(newRecipient);
  }

  async delete(req, res) {
    const { recipientId } = req.params;

    const recipient = await Recipient.findByPk(recipientId);

    if (!recipient) {
      return res.status(400).json({
        message: 'Recipient not found ',
      });
    }

    await recipient.destroy();

    return res.status(204).json();
  }
}

export default new RecipientsController();
