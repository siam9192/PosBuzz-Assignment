import { IsString, IsNotEmpty,isEmail } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @isEmail()
  email: string;
  password
}