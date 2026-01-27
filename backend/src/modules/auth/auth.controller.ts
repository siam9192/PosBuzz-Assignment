import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import envConfig from 'src/common/lib/envConfig';
import { parseDurationMs } from 'src/common/helpers/utils.helper';
import { ENVIRONMENT } from 'src/common/types';
import { AuthGuard } from 'src/common/guards/auth.guard';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto) {
    await this.authService.register(dto);
    return {
      success: true,
      message: 'User registration successful',
      data: null,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(dto);

    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure:
        envConfig.environment?.toLocaleLowerCase() === ENVIRONMENT.PRODUCTION,
      sameSite:
        envConfig.environment?.toLowerCase() === ENVIRONMENT.PRODUCTION
          ? 'none'
          : 'lax',
      maxAge: parseDurationMs(
        envConfig.jwt.access_token_expire as string,
      ) as number,
    });

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure:
        envConfig.environment?.toLocaleLowerCase() === ENVIRONMENT.PRODUCTION,
      sameSite:
        envConfig.environment?.toLowerCase() === ENVIRONMENT.PRODUCTION
          ? 'none'
          : 'lax',
      maxAge: parseDurationMs(
        envConfig.jwt.refresh_token_expire as string,
      ) as number,
    });

    return {
      success: true,
      message: 'Login successful',
    };
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getMe(@Req() req: Request) {
    const result = await this.authService.getMe(req.user);
    return {
      success: true,
      message: 'Current user retrieved successfully',
      data: result,
    };
  }
}
