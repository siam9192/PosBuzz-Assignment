import { prisma } from 'src/lib/prisma';
import { LoginDto, RegisterDto } from './auth.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import bcryptHelper from 'src/helpers/bycrypt.helper';
import jwtHelper from 'src/helpers/jwt.helper';
import envConfig from 'src/lib/envConfig';


@Injectable()
export class AuthService {
  async register(dto: RegisterDto) {
    const user = await prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user)
      throw new HttpException(
        'User already exist using email',
        HttpStatus.FORBIDDEN,
      );
    
    const password_hash = bcryptHelper.hash(dto.password);
    return await prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password_hash,
      },
    });
  }

  async login(dto: LoginDto) {
    const {email,password} = dto
    const user = await prisma.user.findUnique({
      where: {
        email
      },
    });

    if (!user)
      throw new HttpException(
        'User already exist using email',
        HttpStatus.FORBIDDEN,
      );
    

    // Compare password
    const isPasswordValid =
      user && (await bcryptHelper.compare(password, user.password_hash));

    if (!user || !isPasswordValid) {
      throw new HttpException('Invalid email or password',HttpStatus.FORBIDDEN);
    }

    const tokenPayload = { id: user.id};

    // Generate access token
    const accessToken = jwtHelper.generateToken(
      tokenPayload,
      envConfig.jwt.access_token_secret as string,
      envConfig.jwt.access_token_expire as string,
    );
    return { accessToken};
  }
}

