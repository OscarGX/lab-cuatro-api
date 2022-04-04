import { PartialType } from '@nestjs/mapped-types';
import { SkuCreateDTO } from './sku-create.dto';

export class SkuEditDTO extends PartialType(SkuCreateDTO) {}