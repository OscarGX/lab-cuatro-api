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
import { UbicacionService } from './services/ubicacion.service';
import { Roles } from '../auth/decorators/rol.decorator';
import { RolEnum } from '../../data/enums/rol.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import {
  UbicacionCreateDTO,
  UbicacionEditDTO,
  UbicacionReadDTO,
} from './models/dto';
import { ErrorResponseDTO } from 'src/common/models/dto';
import { Response } from 'express';

@ApiTags('Ubicaciones')
@ApiBearerAuth()
@Controller(`${API_BASE_URL}/ubicaciones`)
export class UbicacionController {
  constructor(private readonly _ubicacionService: UbicacionService) {}

  @Roles(RolEnum.ADMIN, RolEnum.DOCENTE, RolEnum.LABORATORIO)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/filter')
  public async getAllPaginated(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
    @Query('query') query: string,
  ) {
    try {
      const ubicaciones = await this._ubicacionService.getAllPaginated(
        skip,
        take,
        query,
      );
      return ubicaciones;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiResponse({ status: HttpStatus.OK, type: UbicacionReadDTO })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ErrorResponseDTO })
  @Roles(RolEnum.ADMIN, RolEnum.LABORATORIO, RolEnum.DOCENTE)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  public async getMarcaById(@Param('id') id: string, @Res() res: Response) {
    try {
      const ubicacion = await this._ubicacionService.getOneById(id);
      if (ubicacion) {
        return res.status(HttpStatus.OK).json(ubicacion);
      }
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ ok: false, message: 'No se encontró la ubicación' });
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiResponse({ status: HttpStatus.OK, type: UbicacionReadDTO })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponseDTO,
  })
  @Roles(RolEnum.ADMIN, RolEnum.LABORATORIO)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('')
  public async createOne(
    @Body() body: UbicacionCreateDTO,
    @Res() res: Response,
  ) {
    try {
      const ubicacion = await this._ubicacionService.createOne(body);
      if (ubicacion) return res.status(HttpStatus.OK).json(ubicacion);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: 'No se pudo registrar la ubicación',
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
    @Body() body: UbicacionEditDTO,
    @Res() res: Response,
  ) {
    try {
      const ubicacion = this._ubicacionService.getOneById(id);
      if (ubicacion) {
        await this._ubicacionService.editOne(id, body);
        return res.status(HttpStatus.OK).json(body);
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        message: 'No se encontró una ubicación con ese id',
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
      const ubicacion = await this._ubicacionService.getOneById(id);
      if (ubicacion) {
        await this._ubicacionService.deleteOne(id);
        return res.status(HttpStatus.OK).json({ id });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        message: 'No se encontró una ubicación con ese Id',
      });
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
