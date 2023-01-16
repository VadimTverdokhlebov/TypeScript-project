import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import ApiError from '../excaptions/apiError';

export interface ICustomRequest extends Request {
  user: string | JwtPayload;
 }
 
export default function authJwtMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {

    const authorization: string | undefined = req.headers.authorization;

    if (authorization == undefined) {
      throw ApiError.unauthorization();
    }

    const token = authorization.split(' ')[1];
    
    if (!token) {
      throw ApiError.unauthorization();
    }

    const decodetData = jwt.verify(token, config.user.secretKey);
    (req as ICustomRequest).user = decodetData;
    return next();
  } catch (e) {
    console.log(e);
    return next(e);
  }
}
