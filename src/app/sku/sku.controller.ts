import {
  Controller,
  HttpStatus,
  UseGuards,
  Get,
  Param,
  Res,
  HttpException,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { API_BASE_URL } from 'src/common/constants/route.constant';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { SkuService } from './services/sku.service';
import { FullSkuCreateDTO, SkuEditDTO, SkuReadDTO } from './models/dto';
import { ErrorResponseDTO } from 'src/common/models/dto';
import { Roles } from '../auth/decorators/rol.decorator';
import { RolEnum } from '../../data/enums/rol.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Response } from 'express';

@ApiTags('Skus')
@ApiBearerAuth()
@Controller(`${API_BASE_URL}/skus`)
export class SkuController {
  constructor(private readonly _skuService: SkuService) {}

  @ApiResponse({ status: HttpStatus.OK, type: SkuReadDTO })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ErrorResponseDTO })
  @Roles(RolEnum.ADMIN, RolEnum.DOCENTE, RolEnum.LABORATORIO)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  public async getMarcaById(@Param('id') id: string, @Res() res: Response) {
    try {
      const sku = await this._skuService.getOneById(id);
      if (sku) {
        return res.status(HttpStatus.OK).json(sku);
      }
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ ok: false, message: 'No se encontró el sku' });
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiResponse({ status: HttpStatus.OK, type: SkuReadDTO })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: ErrorResponseDTO,
  })
  @Roles(RolEnum.ADMIN, RolEnum.LABORATORIO)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('')
  public async createOne(@Body() body: FullSkuCreateDTO, @Res() res: Response) {
    try {
      const sku = await this._skuService.createOne(body);
      if (sku) {
        return res.status(HttpStatus.OK).json(sku);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false,
        message: 'No se pudo registrar el sku',
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
    @Body() body: SkuEditDTO,
    @Res() res: Response,
  ) {
    try {
      const sku = await this._skuService.getOneById(id);
      if (sku) {
        await this._skuService.updateOne(id, body);
        return res.status(HttpStatus.OK).json(body);
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        message: 'No se encontró un sku con ese id',
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
      const sku = await this._skuService.getOneById(id);
      if (sku) {
        await this._skuService.deleteOne(id);
        return res.status(HttpStatus.OK).json({ id });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        ok: false,
        message: 'No se encontró un sku con ese Id',
      });
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
