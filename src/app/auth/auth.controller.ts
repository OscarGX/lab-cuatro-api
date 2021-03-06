import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { API_BASE_URL } from 'src/common/constants/route.constant';
import {
  AuthLoginRequestDTO,
  RefreshTokenRequestDTO,
  UsuarioCreateDTO,
} from './models/dto';
import { AuthService } from './services/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Response } from 'express';
import { Roles } from './decorators/rol.decorator';
import { RolEnum } from '../../data/enums/rol.enum';
import { RoleGuard } from './guards/role.guard';

@ApiTags('Auth')
@Controller(`${API_BASE_URL}/auth`)
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() loginDTO: AuthLoginRequestDTO) {
    const loginResponse = await this._authService.login(req.user);
    return loginResponse;
  }

  @ApiBearerAuth()
  @Roles(RolEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('new-user')
  public async newUser(@Body() userDTO: UsuarioCreateDTO) {
    try {
      const user = await this._authService.createOne(userDTO);
      if (user) return user;
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('refresh')
  public async refreshToken(
    @Res() res: Response,
    @Body() refreshDTO: RefreshTokenRequestDTO,
  ) {
    try {
      const user = await this._authService.findOneRefreshToken(refreshDTO);
      if (user) {
        const refreshToken = await this._authService.refreshToken(user);
        if (refreshToken) return res.status(HttpStatus.OK).json(refreshToken);
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ ok: false, message: 'Error al refrescar el token' });
      }
      return res.status(HttpStatus.BAD_REQUEST).json({
        ok: false,
        message: 'El usuario no existe, est?? inactivo o los datos est??n mal',
      });
    } catch (error) {
      throw new HttpException(
        'Something went wrong.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  public test() {
    return { ok: true };
  }
}
