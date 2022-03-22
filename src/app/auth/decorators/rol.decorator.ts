import { SetMetadata } from '@nestjs/common';
import { RolEnum } from 'src/data/enums/rol.enum';

export const Roles = (...roles: RolEnum[]) => SetMetadata('roles', roles);
