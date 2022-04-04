import { PartialType } from '@nestjs/mapped-types';
import { MaterialCreateDTO } from './material-create.dto';

export class MaterialEditDTO extends PartialType(MaterialCreateDTO) {}
