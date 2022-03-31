import { IsOptional, IsString } from 'class-validator';

export class MarcaCreateDTO {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}
