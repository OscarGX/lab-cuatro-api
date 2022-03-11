import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET } from '../../../config/config.constants';
import { AuthUsuarioPayload } from '../models/dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private _config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _config.get<string>(JWT_SECRET),
    });
  }

  async validate(payload: AuthUsuarioPayload) {
    return payload;
  }
}
