import jwt from 'jsonwebtoken';
import config from '../config';

interface IDecodetData {
  id: string;
}

export function generateAccessToken(id: string, email: string) {
  const { secretKey } = config.user;

  const payload = {
    id,
    email,
  };

  return jwt.sign(payload, secretKey, { expiresIn: '24h' });
}

export function getUserId(token: string) {
  const decodetData = <IDecodetData>jwt.verify(token, config.user.secretKey);

  return decodetData.id;
}
