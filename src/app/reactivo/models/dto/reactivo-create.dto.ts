import {
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { ClasificacionEnum } from 'src/data/enums/clasificacion.enum';
import { EstadoFisicoEnum } from 'src/data/enums/estado-fisico.enum';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SkuCreateDTO } from 'src/app/sku/models/dto';

export class ReactivoRelationStringId {
  @IsString()
  id: string;
}

export class ReactivoRelationNumberId {
  @IsNumber()
  id: number;
}

export class ReactivoCreateDTO {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  desripcion?: string;

  @IsNumber()
  stock: number;

  @IsNumber()
  cantidad: number;

  @IsEnum(EstadoFisicoEnum)
  estadoFisico: EstadoFisicoEnum;

  @IsEnum(ClasificacionEnum)
  clasificacion: ClasificacionEnum;

  @IsString()
  fechaIngreso: string;

  @IsBoolean()
  hojaSeguridad: boolean;

  @IsNumber()
  status: number;

  @ValidateNested()
  @Type(() => ReactivoRelationStringId)
  unidadMedida: ReactivoRelationStringId;

  @ValidateNested()
  @Type(() => ReactivoRelationStringId)
  marca: ReactivoRelationStringId;

  @ValidateNested()
  @Type(() => ReactivoRelationNumberId)
  tipoEnvase: ReactivoRelationNumberId;

  @ValidateNested()
  @Type(() => ReactivoRelationStringId)
  ubicacion: ReactivoRelationStringId;

  @ValidateNested({ each: true })
  @Type(() => SkuCreateDTO)
  skus: SkuCreateDTO[];
}
