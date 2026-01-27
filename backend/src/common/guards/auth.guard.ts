import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import jwtHelper from '../helpers/jwt.helper';
import envConfig from '../lib/envConfig';
import { Request } from 'express';
import { prisma } from '../lib/prisma';
import redisClient from '../lib/redis';

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

    const key = `user:${decoded.id}`;

    let user: {id:string} | null = null;

    const redisUser = await redisClient.get(key);
    if (redisUser) {
      user = JSON.parse(redisUser);
    }

    if (!user) {
      user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
        select:{
          id:true
        }
      });

      // Cache in Redis
      if (user) {
         redisClient.set(
          key,
          JSON.stringify(user),
          { EX: 60 * 10 }, // cache for 10 minutes
        );
      }
    }

    //  Not found
    if (!user) {
      throw new NotFoundException('User not found');
    }

    request.user = { id: user.id };

    return true;
  }
}

