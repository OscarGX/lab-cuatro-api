import { Type } from 'class-transformer';
import { IsInt, IsString, ValidateNested } from 'class-validator';

export class RolUsuarioCreateDTO {
  @IsInt()
  id: number;
}

export class UsuarioCreateDTO {
  @IsString()
  nombre: string;

  @IsString()
  apellidoPaterno: string;

  @IsString()
  apellidoMaterno: string;

  @IsString()
  email: string;

  @IsString()
  contrasena: string;

  @IsInt()
  status: number;

  @ValidateNested()
  @Type(() => RolUsuarioCreateDTO)
  rol: RolUsuarioCreateDTO;
}
