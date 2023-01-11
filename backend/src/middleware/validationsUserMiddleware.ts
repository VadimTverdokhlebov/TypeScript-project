import { check } from 'express-validator';

export default function validationUserMiddleware() {

    return [ check('email', 'The name is not empty').notEmpty(),
        check('email', 'The name must be an email').isEmail(),
        check('password', 'The password must be less than 4 and more than 10 characters').isLength({ min: 4, max: 10 })]
};

