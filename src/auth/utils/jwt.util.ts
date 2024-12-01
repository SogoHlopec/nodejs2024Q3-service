import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export const generateAccessToken = (payload: {
  userId: string;
  login: string;
}): string => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });
};

export const generateRefreshToken = (payload: {
  userId: string;
  login: string;
}): string => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
};

export const verifyToken = (
  token: string,
  secret: string,
): jwt.JwtPayload | string | null => {
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
};
