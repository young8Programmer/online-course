import { Controller, Post, Body, Res, HttpStatus, Put, Delete, Param, Get, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from './dto/create-user.dto';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
  const existingUser = await this.authService.findByEmail(createUserDto.email)

  if (existingUser) {
    return res.status(HttpStatus.BAD_REQUEST).json({ message: "Siz allaqachon ro'yxatdan o'tgansiz" });
  }
  
  await this.authService.register(createUserDto);
  return res.status(HttpStatus.CREATED).json({ message: "user registratsiyadan o'tdi" })
  }


  @Post("login")
  async login(@Body() { email, password }: { email: string; password: string }, @Res() res: Response) {
    const { access_token, refresh_token } = await this.authService.login(email, password)
    res.cookie("refresh_token", refresh_token, { httpOnly: true })
    return res.status(HttpStatus.OK).json({ message: "login muvaffaqiyatli", access_token})
  }


  @Put("update-user/:id")
  async updateUser(@Param("id") id: number, @Body() updateUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.authService.updateUser(id, updateUserDto)
    return res.status(HttpStatus.OK).json(user)
  }

  @Get("users/all")
  async getUsers(@Req() req: Request, @Res() res: Response) {
    const users = await this.authService.findAll(req)
    return res.status(HttpStatus.OK).json(users)
  }

  @Delete("delete-user/:id")
  async deleteUser(@Param("id") id: number, @Res() res: Response) {
    await this.authService.deleteUser(id)
    return res.status(HttpStatus.OK).json({ message: "o'chirildi" })
  }

  @Post("logout")
  logout(@Res() res: Response) {
    res.clearCookie("refresh_token")
    return res.status(HttpStatus.OK).json({ message: "chiqish" })
  }
}
