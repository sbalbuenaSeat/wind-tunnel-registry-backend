import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { UserDocument } from '../users/schemas/user.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    // Initiates the Google OAuth flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as UserDocument;
    const token = this.authService.generateToken(user);

    // In a real app, you would redirect to the frontend with the token
    // For now, returning it as JSON
    return res.json({
      message: 'Login successful',
      user,
      accessToken: token,
    });
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout((err: Error | null) => {
      if (err) return res.status(500).json({ message: 'Logout failed' });
      return res.json({ message: 'Logout successful' });
    });
  }
}
