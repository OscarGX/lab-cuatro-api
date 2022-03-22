import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { API_BASE_URL } from 'src/common/constants/route.constant';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/rol.decorator';
import { RolEnum } from '../../data/enums/rol.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { RolService } from './services/rol.service';

@ApiTags('Roles')
@ApiBearerAuth()
@Roles(RolEnum.ADMIN)
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller(`${API_BASE_URL}/roles`)
export class RolController {
  constructor(private readonly _roleService: RolService) {}

  @Get('')
  public async getAll() {
    try {
      const roles = await this._roleService.getAll();
      return roles;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
