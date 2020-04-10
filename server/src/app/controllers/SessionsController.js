import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import User from '../models/User';

class SessionsController {
  async create(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(8)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        message: 'Invalid body!',
      });
    }

    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: 'Invalid e-mail/password!',
      });
    }

    const isPasswordValid = await user.isPasswordValid(req.body.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: 'Invalid e-mail/password!',
      });
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.status(201).json({ token, user });
  }
}

export default new SessionsController();
