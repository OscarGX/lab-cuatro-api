import { PartialType } from '@nestjs/mapped-types';
import { UbicacionCreateDTO } from './ubicacion-create.dto';

export class UbicacionEditDTO extends PartialType(UbicacionCreateDTO) {}
