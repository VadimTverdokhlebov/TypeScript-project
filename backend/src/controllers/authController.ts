import bcrypt from 'bcrypt';
import { generateAccessToken } from '../helpers/jwt';
import { getUser, createNewUser } from '../db/requests/userRequests';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

enum HTTStatus {
  BAD_REQUEST = 400
}

export default class AuthController {
  static async registration(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(HTTStatus.BAD_REQUEST).json({ message: 'Registration error!', errors });
      }

      const { email, password } = req.body;

      if (await getUser(email)) {
        return res.status(HTTStatus.BAD_REQUEST).json({ message: 'The user already exist' });
      }
      const hashPassword = await bcrypt.hash(password, 3);
      const dataUser = { email, password: hashPassword };

      const user = await createNewUser(dataUser);
      const token = generateAccessToken(user._id, user.email);

      return res.json({ token });
    } catch (e) {
      console.log(e);
      return res.status(HTTStatus.BAD_REQUEST).json({ message: 'Registration error!!' });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await getUser(email);

      if (!user) {
        // return next(new ResponseError())
        return res.status(HTTStatus.BAD_REQUEST).json({ message: 'The user not found' });
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(HTTStatus.BAD_REQUEST).json({ message: 'Insert incorrect password' });
      }

      const token = generateAccessToken(user._id, user.email);
      return res.json({ token });
    } catch (e) {
      console.log(e);
      return res.status(HTTStatus.BAD_REQUEST).json({ message: 'Login error' });
    }
  }

  static async checkLogin(req: any, res: any) {
    try {
      console.log(req.user);
      return res.json({ message: 'User authorizatoin' });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: 'Login error' });
    }
  }
}
