import { sign, verify } from 'jsonwebtoken';
import { UserEntity } from '../user.entity';

const secretString = 'secretString';

export type JwtPayloadType = {
  userId: number;
  email: string;
};

export const createJwtToken = async (user: UserEntity) => {
  const payload: JwtPayloadType = {
    userId: user.id,
    email: user.email,
  };

  return sign(payload, secretString, {
    algorithm: 'HS256',
    expiresIn: '7d',
    issuer: 'sm',
  });
};

export const verifyToken = async (jwtToken: string) => {
  let decoded;
  try {
    decoded = verify(jwtToken, secretString);
  } catch (error) {
    throw new Error('invalid token');
  }
  return decoded;
};
