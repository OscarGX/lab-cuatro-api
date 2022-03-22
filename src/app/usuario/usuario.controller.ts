import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { API_BASE_URL } from 'src/common/constants/route.constant';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UsuarioService } from './services/usuario.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { RolEnum } from '../../data/enums/rol.enum';
import { Roles } from '../auth/decorators/rol.decorator';
import { UsuarioEditDTO, UsuarioStatusDTO } from './models/dto';
import { Response } from 'express';
import { PaginateResponse } from 'src/common/models/interface';
import { UsuarioReadDTO, FullUsuarioReadDTO } from 'src/app/auth/models/dto';
import { ErrorResponseDTO } from 'src/common/models/dto';

@ApiTags('Usuarios')
@ApiBearerAuth()
@Roles(RolEnum.ADMIN)
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller(`${API_BASE_URL}/usuarios`)
export class UsuarioController {
  constructor(private readonly _usuarioService: UsuarioService) {}

  @Get('')
  public async getUsuarios() {
    try {
      const usuarios = await this._usuarioService.getAll();
      return usuarios;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiResponse({ status: 200 })
  @Get('filter')
  public async getUsuariosPaginados(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
    @Query('query') query: string,
  ) {
    try {
      const usuarios = await this._usuarioService.getAllPaginated(
        skip,
        take,
        query,
      );
      return usuarios;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiResponse({ status: 200, type: UsuarioReadDTO })
  @ApiResponse({ status: 400, type: ErrorResponseDTO })
  @Get(':id')
  public async getUsuarioById(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this._usuarioService.getUsuarioById(id);
      if (user) return res.status(HttpStatus.OK).json(user);
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ ok: true, message: 'Id inválido' });
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiResponse({ status: 200, type: FullUsuarioReadDTO })
  @ApiResponse({ status: 400, type: ErrorResponseDTO })
  @Get('full/:id')
  public async getFullUsuarioById(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const user = await this._usuarioService.getFullUsuarioById(id);
      if (user) return res.status(HttpStatus.OK).json(user);
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ ok: true, message: 'Id inválido' });
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  @Put(':id/status')
  public async enableDisableStatus(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() userDTO: UsuarioStatusDTO,
  ) {
    try {
      const user = await this._usuarioService.getUsuarioById(id);
      if (user) {
        await this._usuarioService.usuarioStatusToggle(id, userDTO.status);
        return res.status(200).json({ status: userDTO.status });
      }
      return res
        .status(404)
        .json({ ok: false, message: 'No se encontró el usuario' });
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiResponse({ status: 200, type: UsuarioEditDTO })
  @ApiResponse({ status: 400, type: ErrorResponseDTO })
  @Put(':id')
  public async updateOne(
    @Param('id') id: string,
    @Body() body: UsuarioEditDTO,
    @Res() res: Response,
  ) {
    try {
      const userExists = await this._usuarioService.getUsuarioById(id);
      if (userExists) {
        await this._usuarioService.editOne(id, body);
        return res.status(HttpStatus.OK).json(body);
      }
      return res
        .status(404)
        .json({ ok: false, message: 'No se encontró el usuario' });
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  public async deleteOne(@Param('id') id: string) {
    try {
      const user = await this._usuarioService.getUsuarioById(id);
      if (user) {
        await this._usuarioService.deleteOne(user.id);
        return user;
      }
      return null;
      // bad request
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
