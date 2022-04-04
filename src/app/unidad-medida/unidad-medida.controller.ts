import {
  Controller,
  UseGuards,
  Get,
  Query,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  Param,
  Res,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { API_BASE_URL } from 'src/common/constants/route.constant';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { UnidadMedidaService } from './services/unidad-medida.service';
import { Roles } from '../auth/decorators/rol.decorator';
import { RolEnum } from '../../data/enums/rol.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import {
  UnidadMedidaCreateDTO,
  UnidadMedidaEditDTO,
  UnidadMedidaReadDTO,
} from './models/dto';
import { ErrorResponseDTO } from 'src/common/models/dto';
import { Response } from 'express';

@ApiTags('Unidades de Medida')
@ApiBearerAuth()
@Controller(`${API_BASE_URL}/unidad-medida`)
export class UnidadMedidaController {
  constructor(private readonly _unidadMedidaService: UnidadMedidaService) {}

  @Roles(RolEnum.ADMIN, RolEnum.DOCENTE, RolEnum.LABORATORIO)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/filter')
  public async getAllPaginated(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
    @Query('query') query: string,
  ) {
    try {
      const unidades = await this._unidadMedidaService.getAllPaginated(
        skip,
        take,
        query,
      );
      return unidades;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Roles(RolEnum.ADMIN, RolEnum.DOCENTE, RolEnum.LABORATORIO)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('')
  public async getAll() {
    try {
      const unidades = await this._unidadMedidaService.getAll();
      return unidades;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiResponse({ status: HttpStatus.OK, type: UnidadMedidaReadDTO })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ErrorResponseDTO })
  @Roles(RolEnum.ADMIN, RolEnum.DOCENTE, RolEnum.LABORATORIO)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  public async getMarcaById(@Param('id') id: string, @Res() res: Response) {
    try {
      const unidadMedida = await this._unidadMedidaService.getOneById(id);
      if (unidadMedida) {
        return res.status(HttpStatus.OK).json(unidadMedida);
      }
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ ok: false, message: 'No se encontró la unidad de medida' });
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiResponse({ status: HttpStatus.OK, type: UnidadMedidaReadDTO })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponseDTO,
  })
  @Roles(RolEnum.ADMIN, RolEnum.LABORATORIO)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('')
  public async createOne(
    @Body() body: UnidadMedidaCreateDTO,
    @Res() res: Response,
  ) {
    try {
      const unidad = await this._unidadMedidaService.createOne(body);
      if (unidad) return res.status(HttpStatus.OK).json(unidad);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: 'No se pudo registrar la unidad de medida',
      });
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ErrorResponseDTO,
  })
  @Roles(RolEnum.ADMIN, RolEnum.LABORATORIO)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put(':id')
  public async editOne(
    @Param('id') id: string,
    @Body() body: UnidadMedidaEditDTO,
    @Res() res: Response,
  ) {
    try {
      const unidad = this._unidadMedidaService.getOneById(id);
      if (unidad) {
        await this._unidadMedidaService.editOne(id, body);
        return res.status(HttpStatus.OK).json(body);
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        message: 'No se encontró una unidad de medida con ese id',
      });
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ErrorResponseDTO,
  })
  @Roles(RolEnum.ADMIN, RolEnum.LABORATORIO)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  public async deleteOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const unidad = await this._unidadMedidaService.getOneById(id);
      if (unidad) {
        await this._unidadMedidaService.deleteOne(id);
        return res.status(HttpStatus.OK).json({ id });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        message: 'No se encontró una unidad de medida con ese Id',
      });
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
