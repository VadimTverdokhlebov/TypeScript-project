import { Router } from 'express';
import validationUserMiddleware from '../middleware/validationsUserMiddleware';
import AuthController from '../controllers/authController';
import authJwtMiddleware from '../middleware/authJwtMiddleware';

const router = Router();

router.post('/api/auth/registration', validationUserMiddleware(), AuthController.registration);
router.post('/api/auth/login', AuthController.login);
router.get('/api/auth/users', authJwtMiddleware, AuthController.checkLogin);

export default router;
