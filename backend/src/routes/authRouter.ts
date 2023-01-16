import { Router } from 'express';
import { validationUserMiddleware } from '../middleware/validationsUserMiddleware';
import AuthController from '../controllers/authController';

const router = Router();

router.post('/auth/registration', validationUserMiddleware, AuthController.registration);
router.post('/auth/login', AuthController.login);

export default router;
