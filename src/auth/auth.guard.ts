import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verifyToken } from './utils/jwt.util';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const excludedPaths = ['/auth/signup', '/auth/login', '/doc', '/'];
    if (excludedPaths.includes(request.path)) {
      return true;
    }

    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const scheme = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Authorization header is invalid');
    }

    try {
      const payload = verifyToken(token, process.env.JWT_ACCESS_SECRET);
      if (!payload) {
        throw new UnauthorizedException('Invalid or expired token');
      }
      request.user = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
