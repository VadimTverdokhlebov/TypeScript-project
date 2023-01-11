import { Router } from 'express';
import { getProduct, getResultSearch } from '../controllers/productsController';

const router = Router();

router.get('/api/products', getProduct);
router.get('/api/search/products', getResultSearch);

export default router;
