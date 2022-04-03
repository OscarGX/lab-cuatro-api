import { PartialType } from '@nestjs/mapped-types';
import { UnidadMedidaCreateDTO } from './unidad-medida-create.dto';

export class UnidadMedidaEditDTO extends PartialType(UnidadMedidaCreateDTO) {}
