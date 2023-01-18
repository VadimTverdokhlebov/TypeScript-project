import { Express } from 'express';
import productsRouter from './productsRouter';
import orderRouter from './orderRouter';
import authRouter from './authRouter';

export default function indexRouter(app: Express) {
  app.use('/api', productsRouter);
  app.use('/api', orderRouter);
  app.use('/api', authRouter);
}
