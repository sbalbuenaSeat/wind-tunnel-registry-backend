import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserDocument } from '../users/schemas/user.schema';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({
    summary: 'Login with Google',
    description: 'Redirects to Google for authentication.',
  })
  @ApiResponse({ status: 302, description: 'Redirect to Google login page.' })
  googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({
    summary: 'Google OAuth Callback',
    description:
      'Handles the redirection from Google and sets the session cookie.',
  })
  @ApiResponse({
    status: 302,
    description: 'Sets access_token cookie and redirects to frontend.',
  })
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
  @ApiOperation({ summary: 'Log out' })
  @ApiResponse({ status: 200, description: 'Cookie cleared.' })
  logout(@Res() res: Response) {
    res.clearCookie('access_token');

    return res.json({
      message: 'Logout successful',
    });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth('access_token')
  @ApiOperation({ summary: 'Get current user information' })
  @ApiResponse({ status: 200, description: 'Returns user profile.' })
  me(@Req() req: Request) {
    return req.user;
  }
}
