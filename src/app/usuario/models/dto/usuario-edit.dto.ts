import { PartialType, OmitType } from '@nestjs/mapped-types';
import { UsuarioCreateDTO } from '../../../auth/models/dto/usuario-create.dto';

export class UsuarioEditDTO extends OmitType(PartialType(UsuarioCreateDTO), [
  'contrasena',
] as const) {}
