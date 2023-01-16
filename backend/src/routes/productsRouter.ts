import { Router } from 'express';
import { getProduct, getResultSearch } from '../controllers/productsController';

const router = Router();

router.get('/products', getProduct);
router.get('/search/products', getResultSearch);

export default router;
