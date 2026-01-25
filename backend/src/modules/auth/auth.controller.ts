import {Body, Controller, HttpCode, HttpStatus, Post} from "@nestjs/common"
import { AuthService } from "./auth.service"
import { LoginDto, RegisterDto } from "./auth.dto"
import { response } from "express"
import envConfig from "src/lib/envConfig"
import { parseDurationMs } from "src/helpers/utils.helper"
import { ENVIRONMENT } from "src/utils/type"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register (@Body() dto:RegisterDto) {
  await this.authService.register(dto)
  return {
    success:true,
    message:"User registration successful",
    data:null
  }
  }
  
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login (@Body() dto:LoginDto) {
  const result = await this.authService.login(dto)

   response.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: envConfig.environment?.toLocaleLowerCase() === ENVIRONMENT.PRODUCTION,
      sameSite:
        envConfig.environment?.toLowerCase() === ENVIRONMENT.PRODUCTION ? 'none' : 'lax',
      maxAge: parseDurationMs(envConfig.jwt.access_token_expire as string) as number,
    });

  return {
    success:true,
    message:"Login successful"
  }
  }
 

}
