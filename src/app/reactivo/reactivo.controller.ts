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
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { API_BASE_URL } from 'src/common/constants/route.constant';
import { ReactivoService } from './services/reactivo.service';
import { Roles } from '../auth/decorators/rol.decorator';
import { RolEnum } from '../../data/enums/rol.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import {
  ReactivoCreateDTO,
  ReactivoEditDTO,
  ReactivoReadDTO,
} from './models/dto';
import { ErrorResponseDTO } from 'src/common/models/dto';
import { Response } from 'express';

@ApiTags('Reactivos')
@ApiBearerAuth()
@Controller(`${API_BASE_URL}/reactivos`)
export class ReactivoController {
  constructor(private readonly _reactivoService: ReactivoService) {}

  @Roles(RolEnum.ADMIN, RolEnum.DOCENTE, RolEnum.LABORATORIO)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/filter')
  public async getAllPaginated(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
    @Query('query') query: string,
  ) {
    try {
      const reactivos = await this._reactivoService.getAllPaginated(
        skip,
        take,
        query,
      );
      return reactivos;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Roles(RolEnum.ADMIN, RolEnum.DOCENTE, RolEnum.LABORATORIO)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/dashboard/:stock/:cantidad')
  public async getAllByStockAndCantidad(
    @Param('stock', ParseIntPipe) stock: number,
    @Param('cantidad', ParseIntPipe) cantidad: number,
  ) {
    try {
      const reactivos = await this._reactivoService.getAllByStockAndCantidad(
        stock,
        cantidad,
      );
      return reactivos;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiResponse({ status: HttpStatus.OK, type: ReactivoReadDTO })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ErrorResponseDTO })
  @Roles(RolEnum.ADMIN, RolEnum.DOCENTE, RolEnum.LABORATORIO)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  public async getMarcaById(@Param('id') id: string, @Res() res: Response) {
    try {
      const reactivo = await this._reactivoService.getOneById(id);
      if (reactivo) {
        return res.status(HttpStatus.OK).json(reactivo);
      }
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ ok: false, message: 'No se encontró el reactivo' });
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiResponse({ status: HttpStatus.OK, type: ReactivoReadDTO })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponseDTO,
  })
  @Roles(RolEnum.ADMIN, RolEnum.LABORATORIO)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('')
  public async createOne(
    @Body() body: ReactivoCreateDTO,
    @Res() res: Response,
  ) {
    try {
      const reactivo = await this._reactivoService.createOne(body);
      if (reactivo) {
        return res.status(HttpStatus.OK).json(reactivo);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: 'No se pudo registrar el reactivo',
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
    @Body() body: ReactivoEditDTO,
    @Res() res: Response,
  ) {
    try {
      const reactivo = await this._reactivoService.getOneById(id);
      if (reactivo) {
        await this._reactivoService.editOne(id, body);
        return res.status(HttpStatus.OK).json(body);
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        message: 'No se encontró un reactivo con ese id',
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
  @Delete('/all/:id')
  public async deleteOneWithSkus(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const reactivo = await this._reactivoService.getOneById(id);
      if (reactivo) {
        const deleted = await this._reactivoService.deleteOneWithSkus(id);
        if (deleted) {
          return res.status(HttpStatus.OK).json({ id });
        }
        return res
          .json(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ ok: false, message: 'No se pudo eliminar el reactivo' });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        message: 'No se encontró un reactivo con ese Id',
      });
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
