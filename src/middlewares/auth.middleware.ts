import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { token }: any = req.headers
  
    if (!token) {
      throw new UnauthorizedException("Token kiritilmagan")
    }

    try {
      const decoded = this.jwtService.verify(token)
      req.user = decoded
      next()
    } catch (error) {
      throw new UnauthorizedException("Token xato")
    }
  }
}
