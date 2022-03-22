import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { RolEnum } from 'src/data/enums/rol.enum';
import { AuthUsuarioPayload } from '../models/dto';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private _reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this._reflector.getAllAndOverride<RolEnum[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as AuthUsuarioPayload;
    return roles.includes(user.rol.id);
  }
}
