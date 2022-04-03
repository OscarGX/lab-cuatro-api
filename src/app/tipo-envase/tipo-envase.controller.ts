import {
  Controller,
  UseGuards,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { API_BASE_URL } from 'src/common/constants/route.constant';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TipoEnvaseService } from './services/tipo-envase.service';
import { Roles } from '../auth/decorators/rol.decorator';
import { RolEnum } from '../../data/enums/rol.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';

@ApiTags('Tipos de Envases')
@ApiBearerAuth()
@Controller(`${API_BASE_URL}/tipo-envase`)
export class TipoEnvaseController {
  constructor(private readonly _tipoEnvaseService: TipoEnvaseService) {}

  @Roles(RolEnum.ADMIN, RolEnum.LABORATORIO)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('')
  public async getAll() {
    const tiposEnvases = await this._tipoEnvaseService.getAll();
    if (tiposEnvases) return tiposEnvases;
    throw new HttpException(
      'Something went wrong',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
