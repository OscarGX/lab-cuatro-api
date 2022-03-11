import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthUsuarioPayload } from '../models/dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'contrasena' });
  }

  async validate(
    email: string,
    contrasena: string,
  ): Promise<AuthUsuarioPayload> {
    const user = await this.authService.validateUser(email, contrasena);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
