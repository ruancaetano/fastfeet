import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import Youch from 'youch';
import cors from 'cors';
import helmet from 'helmet';
import { resolve } from 'path';
import * as Sentry from '@sentry/node';
import redis from 'redis';
import RateLimit from 'express-rate-limit';
import RateLimitRedisStore from 'rate-limit-redis';

import sentryConfig from './config/sentry';
import redisConfig from './config/redis';
import routes from './routes';
import './database';

const limiter = new RateLimit({
  store: new RateLimitRedisStore({
    client: redis.createClient({
      host: redisConfig.host,
      port: redisConfig.port,
    }),
  }),
  windowMs: 1000 * 60 * 15,
  max: 100, // limit each IP to 100 requests per windowMs
});

class App {
  constructor() {
    this.server = express();
    Sentry.init(sentryConfig);
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(cors());
    this.server.use(helmet());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
    if (process.env.ENVERIOMENT !== 'development') {
      this.server.use(limiter);
    }
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  errorHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.ENVERIOMENT === 'development') {
        return res.status(500).json(await new Youch(err, req).toJSON());
      }
      return res.status(500).send('Something broke!');
    });
  }
}

export default new App().server;
