import { IsString } from 'class-validator';

export class UnidadMedidaCreateDTO {
  @IsString()
  nombre: string;

  @IsString()
  descripcion?: string;
}
