import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SkuCreateDTO {
  @IsString()
  valor: string;

  @IsString()
  @IsOptional()
  desripcion?: string;
}

export class SkuRelationId {
  @IsString()
  id: string;
}

export class FullSkuCreateDTO extends SkuCreateDTO {
  @ValidateNested()
  @Type(() => SkuRelationId)
  reactivo?: SkuRelationId;

  @ValidateNested()
  @Type(() => SkuRelationId)
  material?: SkuRelationId;
}
