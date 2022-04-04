import { IsOptional, IsString } from 'class-validator';

export class SkuCreateDTO {
  @IsString()
  valor: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}
