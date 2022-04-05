import {
  Controller,
  Get,
  UseGuards,
  Query,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  Param,
  Res,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { API_BASE_URL } from 'src/common/constants/route.constant';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { MaterialService } from './services/material.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { RolEnum } from '../../data/enums/rol.enum';
import { Roles } from '../auth/decorators/rol.decorator';
import {
  MaterialCreateDTO,
  MaterialEditDTO,
  MaterialReadDTO,
} from './models/dto';
import { ErrorResponseDTO } from 'src/common/models/dto';
import { Response } from 'express';

@ApiTags('Materiales')
@ApiBearerAuth()
@Controller(`${API_BASE_URL}/materiales`)
export class MaterialController {
  constructor(private readonly _materialService: MaterialService) {}

  @Roles(RolEnum.ADMIN, RolEnum.DOCENTE, RolEnum.LABORATORIO)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/filter')
  public async getAllPaginated(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
    @Query('query') query: string,
  ) {
    try {
      const materiales = await this._materialService.getAllPaginated(
        skip,
        take,
        query,
      );
      return materiales;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Roles(RolEnum.ADMIN, RolEnum.DOCENTE, RolEnum.LABORATORIO)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/dashboard/:cantidad')
  public async getAllByCantidad(
    @Param('cantidad', ParseIntPipe) cantidad: number,
  ) {
    try {
      const materiales = await this._materialService.getAllByCantidad(cantidad);
      return materiales;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiResponse({ status: HttpStatus.OK, type: MaterialReadDTO })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ErrorResponseDTO })
  @Roles(RolEnum.ADMIN, RolEnum.DOCENTE, RolEnum.LABORATORIO)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  public async getMarcaById(@Param('id') id: string, @Res() res: Response) {
    try {
      const material = await this._materialService.getOneById(id);
      if (material) {
        return res.status(HttpStatus.OK).json(material);
      }
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ ok: false, message: 'No se encontró el material' });
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiResponse({ status: HttpStatus.OK, type: MaterialReadDTO })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponseDTO,
  })
  @Roles(RolEnum.ADMIN, RolEnum.LABORATORIO)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('')
  public async createOne(
    @Body() body: MaterialCreateDTO,
    @Res() res: Response,
  ) {
    try {
      const material = await this._materialService.createOne(body);
      if (material) {
        return res.status(HttpStatus.OK).json(material);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: 'No se pudo registrar el material',
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
    @Body() body: MaterialEditDTO,
    @Res() res: Response,
  ) {
    try {
      const material = await this._materialService.getOneById(id);
      if (material) {
        await this._materialService.editOne(id, body);
        return res.status(HttpStatus.OK).json(body);
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        message: 'No se encontró un material con ese id',
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
      const material = await this._materialService.getOneById(id);
      if (material) {
        await this._materialService.deleteOne(id);
        return res.status(HttpStatus.OK).json({ id });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        message: 'No se encontró un material con ese Id',
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
      const material = await this._materialService.getOneById(id);
      if (material) {
        const deleted = await this._materialService.deleteOneWithSkus(id);
        if (deleted) {
          return res.status(HttpStatus.OK).json({ id });
        }
        return res
          .json(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ ok: false, message: 'No se pudo eliminar el material' });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        message: 'No se encontró un material con ese Id',
      });
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
