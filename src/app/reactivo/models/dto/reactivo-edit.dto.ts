import { PartialType } from '@nestjs/mapped-types';
import { ReactivoCreateDTO } from './reactivo-create.dto';

export class ReactivoEditDTO extends PartialType(ReactivoCreateDTO) {}
