import Router from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

import authMiddleware from './app/middlewares/auth';
import upload from './config/multer';

import SessionsController from './app/controllers/SessionsController';
import RecipientsController from './app/controllers/RecipientsController';
import FilesController from './app/controllers/FilesController';
import DeliverymenController from './app/controllers/DeliverymenController';
import OrdersController from './app/controllers/OrdersController';
import DeliveriesController from './app/controllers/DeliveriesController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';
import ProblematicOrdersController from './app/controllers/ProblematicOrdersController';
import OrderCancellationController from './app/controllers/OrderCancellationController';

const routes = Router();

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore);

// Sessions management
routes.post('/sessions', bruteForce.prevent, SessionsController.create);

// Uploads management
routes.post('/files', upload.single('file'), FilesController.create);

// Recipient management
routes.get('/recipients', authMiddleware, RecipientsController.list);
routes.get(
  '/recipients/:recipientId',
  authMiddleware,
  RecipientsController.find
);
routes.post('/recipients', authMiddleware, RecipientsController.create);
routes.put(
  '/recipients/:recipientId',
  authMiddleware,
  RecipientsController.update
);
routes.delete(
  '/recipients/:recipientId',
  authMiddleware,
  RecipientsController.delete
);

// Deliverymen management
routes.get('/deliverymen', authMiddleware, DeliverymenController.list);
routes.get('/deliverymen/:deliverymanId', DeliverymenController.find);
routes.post('/deliverymen', authMiddleware, DeliverymenController.create);
routes.put(
  '/deliverymen/:deliverymanId',
  authMiddleware,
  DeliverymenController.update
);
routes.delete(
  '/deliverymen/:deliverymanId',
  authMiddleware,
  DeliverymenController.delete
);

// Orders management
routes.get('/orders', authMiddleware, OrdersController.list);
routes.get('/orders/:orderId', authMiddleware, OrdersController.find);
routes.post('/orders', authMiddleware, OrdersController.create);
routes.put('/orders/:orderId', authMiddleware, OrdersController.update);
routes.delete('/orders/:orderId', authMiddleware, OrdersController.delete);

// Problematic orders management (problematic orders are those that have a registered complaint)
routes.get(
  '/problematic-orders',
  authMiddleware,
  ProblematicOrdersController.list
);

//  Deliveries management
routes.get('/deliverymen/:deliverymanId/deliveries', DeliveriesController.list);
routes.patch(
  '/deliverymen/:deliverymanId/deliveries/:orderId',
  DeliveriesController.update
);

// Deliveries problems
routes.get('/deliveries/:orderId/problems', DeliveryProblemsController.list);
routes.post('/deliveries/:orderId/problems', DeliveryProblemsController.create);

// Cancels an order based on the reported issue
routes.post(
  '/problems/:problemId/cancel-delivery',
  OrderCancellationController.create
);
export default routes;
