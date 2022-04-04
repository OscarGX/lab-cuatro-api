import {
  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ClasificacionEnum } from 'src/data/enums/clasificacion.enum';
import { SkuCreateDTO } from 'src/app/sku/models/dto';

export class MaterialRelationStringId {
  @IsString()
  id: string;
}

export class MaterialRelationNumberId {
  @IsNumber()
  id: number;
}

export class MaterialCreateDTO {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  desripcion?: string;

  @IsString()
  capacidadTamanio: string;

  @IsNumber()
  cantidad: number;

  @IsEnum(ClasificacionEnum)
  clasificacion: ClasificacionEnum;

  @IsString()
  fechaIngreso: string;

  @IsNumber()
  status: number;

  @ValidateNested()
  @Type(() => MaterialRelationStringId)
  unidadMedida: MaterialRelationStringId;

  @ValidateNested()
  @Type(() => MaterialRelationStringId)
  marca: MaterialRelationStringId;

  @ValidateNested()
  @Type(() => MaterialRelationNumberId)
  tipoMaterial: MaterialRelationNumberId;

  @ValidateNested()
  @Type(() => MaterialRelationStringId)
  ubicacion: MaterialRelationStringId;

  @ValidateNested({ each: true })
  @Type(() => SkuCreateDTO)
  skus: SkuCreateDTO[];
}
