import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import jwtHelper from '../helpers/jwt.helper';
import envConfig from '../lib/envConfig';
import { Request } from 'express';
import { prisma } from '../lib/prisma';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = request.cookies?.accessToken;

    if (!accessToken) {
      throw new UnauthorizedException('Unauthorized');
    }

    let decoded;

    try {
      decoded = jwtHelper.verifyToken(
        accessToken,
        envConfig.jwt.access_token_secret as string,
      );
    } catch (err) {
      console.log(err);

      throw new UnauthorizedException('Invalid token');
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    request.user = { id: user.id };

    return true;
  }
}
