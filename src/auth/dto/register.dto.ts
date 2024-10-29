import { IsString, IsEmail, MinLength } from 'class-validator';
export class RegisterDto {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(11)
  password: string
}
