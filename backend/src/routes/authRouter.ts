import { Router } from 'express';
import { check } from 'express-validator';
import AuthController from '../controllers/authController';
import authJwtMiddleware from '../middleware/authJwtMiddleware';

const router = Router();

router.post('/registration', [
  check('email', 'The name is not empty').notEmpty(),
  check('email', 'The name must be an email').isEmail(),
  check('password', 'The password must be less than 4 and more than 10 characters').isLength({ min: 4, max: 10 }),
], AuthController.registration);
router.post('/login', AuthController.login);
router.get('/users', authJwtMiddleware, AuthController.checkLogin);

export default router;
