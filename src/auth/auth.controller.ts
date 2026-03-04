import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserDocument } from '../users/schemas/user.schema';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as UserDocument;

    const token = this.authService.generateToken(user);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false, // true in production (https)
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.redirect('http://localhost:3000');
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie('access_token');

    return res.json({
      message: 'Logout successful',
    });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: Request) {
    return req.user;
  }
}
