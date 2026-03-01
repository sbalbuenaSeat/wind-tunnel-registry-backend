import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(user: UserDocument): string {
    const payload = {
      email: user.email,
      sub: user._id.toString(),
    };
    return this.jwtService.sign(payload);
  }
}
