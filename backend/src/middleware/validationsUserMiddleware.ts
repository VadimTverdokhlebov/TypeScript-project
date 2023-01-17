import { check } from 'express-validator';

export default [
  check('email', 'The name is not empty').notEmpty(),
  check('email', 'The name must be an email').isEmail(),
  check('password', 'The password must be less than 6 and more than 20 characters').isLength({ min: 6, max: 20 }),
];
