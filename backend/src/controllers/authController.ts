import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { generateAccessToken } from '../helpers/jwt';
import { getUser, createNewUser } from '../db/requests/userRequests';
import ApiError from '../exception/apiError';
import ApiValidationError from '../exception/apiValidationError';

export default class AuthController {
  static async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw ApiValidationError.badValidation('Validation error', errors);
      }

      const { email, password } = req.body;
      const checkUser = await getUser(email);

      if (checkUser) {
        throw ApiError.badRequest('The user already exist!');
      }

      const hashPassword = await bcrypt.hash(password, 3);
      const dataUser = { email, password: hashPassword };

      const user = await createNewUser(dataUser);
      const token = generateAccessToken(user._id, user.email);

      return res.json({ token });
    } catch (e) {
      return next(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await getUser(email);

      if (!user) {
        throw ApiError.badRequest('The user not found!');
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw ApiError.badRequest('Insert incorrect password');
      }

      const token = generateAccessToken(user._id, user.email);
      return res.json({ token });
    } catch (e) {
      return next(e);
    }
  }
}
