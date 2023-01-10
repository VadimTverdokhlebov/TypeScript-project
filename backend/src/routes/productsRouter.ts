import { Router } from 'express';
import getProduct from '../controllers/productsController';

const router = Router();

router.get('/products', getProduct);

export default router;
