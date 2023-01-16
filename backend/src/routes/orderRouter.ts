import { Router } from 'express';
import OrderController from '../controllers/orderController';
import authJwtMiddleware from '../middleware/authJwtMiddleware';

const router = Router();

router.post('/orders', authJwtMiddleware, OrderController.addOrder);
router.get('/orders', authJwtMiddleware, OrderController.getOrders);

export default router;
