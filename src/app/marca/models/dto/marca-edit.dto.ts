import { PartialType } from '@nestjs/mapped-types';
import { MarcaCreateDTO } from './marca-create.dto';

export class MarcaEditDTO extends PartialType(MarcaCreateDTO) {}
