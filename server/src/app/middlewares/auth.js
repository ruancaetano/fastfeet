import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

const authMiddleware = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(401).json({
      message: 'Token not provided',
    });
  }

  const [, token] = authorizationHeader.split(' ');
  const promisifyJwtVerify = promisify(jwt.verify);

  try {
    const { id } = await promisifyJwtVerify(token, authConfig.secret);
    req.userId = id;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
};

export default authMiddleware;
