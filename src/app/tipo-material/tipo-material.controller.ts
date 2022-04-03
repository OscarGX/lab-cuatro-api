import {
  Controller,
  UseGuards,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { API_BASE_URL } from 'src/common/constants/route.constant';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TipoMaterialService } from './services/tipo-material.service';
import { Roles } from '../auth/decorators/rol.decorator';
import { RolEnum } from '../../data/enums/rol.enum';
import { RoleGuard } from '../auth/guards/role.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Tipos de Materiales')
@ApiBearerAuth()
@Controller(`${API_BASE_URL}/tipo-material`)
export class TipoMaterialController {
  constructor(private readonly _tipoMaterialService: TipoMaterialService) {}

  @Roles(RolEnum.ADMIN, RolEnum.LABORATORIO)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('')
  public async getAll() {
    const tiposMaterial = await this._tipoMaterialService.getAll();
    if (tiposMaterial) return tiposMaterial;
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
