import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class RolUsuarioReadDTO {
  @Expose()
  id: number;

  @Expose()
  nombre: string;

  @Expose()
  descripcion?: string;
}

@Exclude()
export class UsuarioReadDTO {
  @Expose()
  id: string;

  @Expose()
  nombre: string;

  @Expose()
  apellidoPaterno: string;

  @Expose()
  apellidoMaterno: string;

  @Expose()
  email: string;

  @Expose()
  status: number;

  @Expose()
  @Type(() => RolUsuarioReadDTO)
  rol: RolUsuarioReadDTO;
}

export class FullUsuarioReadDTO extends UsuarioReadDTO {
  @Expose()
  contrasena: string;
}
