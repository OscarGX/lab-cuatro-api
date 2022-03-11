import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class AuthUsuarioRol {
  @Expose()
  id: number;
}

@Exclude()
export class AuthUsuarioPayload {
  @Expose()
  id: string;

  @Expose()
  nombre: string;

  @Expose()
  email: string;

  @Expose()
  refreshToken: string;

  @Expose()
  @Type(() => AuthUsuarioRol)
  rol: AuthUsuarioRol;
}
