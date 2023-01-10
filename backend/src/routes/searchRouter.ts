import { Router } from 'express';
import getResultSearch from '../controllers/searchController';

const router = Router();

router.get('/searchProduct', getResultSearch);

export default router;
