import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../../data/entities/usuario.entity';
import {
  AuthUsuarioPayload,
  LoginResponseDTO,
  UsuarioCreateDTO,
  UsuarioReadDTO,
  RefreshTokenRequestDTO,
  RefreshTokenResponseDTO,
} from '../models/dto';
import { MapperService } from '../../../common/mapper/mapper.service';
import { compareSync, hashSync } from 'bcrypt';
import { StatusEnum } from '../../../data/enums/status.enum';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly _userRepository: Repository<Usuario>,
    private readonly _mapper: MapperService,
    private _jwtService: JwtService,
  ) {}

  public async createOne(user: UsuarioCreateDTO): Promise<UsuarioReadDTO> {
    const userEntity = this._userRepository.create(user);
    userEntity.contrasena = hashSync(userEntity.contrasena, 10);
    const userDB = await this._userRepository.save(userEntity);
    const userDTO = this._mapper.toDTO<UsuarioReadDTO>(userDB, UsuarioReadDTO);
    return userDB ? userDTO : null;
  }

  public async login(user: AuthUsuarioPayload): Promise<LoginResponseDTO> {
    const loginResponse: LoginResponseDTO = {
      accessToken: this._jwtService.sign(instanceToPlain(user)),
      ...user,
    };
    return loginResponse;
  }

  async validateUser(email: string, pass: string): Promise<AuthUsuarioPayload> {
    const user = await this.findOneAuth(email);
    if (user && compareSync(pass, user.contrasena)) {
      const userDTO = this._mapper.toDTO<AuthUsuarioPayload>(
        user,
        AuthUsuarioPayload,
      );
      return userDTO;
    }
    return null;
  }

  private async findOneAuth(email: string): Promise<Usuario | undefined> {
    return this._userRepository.findOne({
      where: { email, status: StatusEnum.ACTIVO },
    });
  }

  public async findOneRefreshToken(
    refresTokenObj: RefreshTokenRequestDTO,
  ): Promise<Usuario | undefined> {
    return this._userRepository.findOne({
      where: {
        email: refresTokenObj.email,
        refreshToken: refresTokenObj.refreshToken,
        status: StatusEnum.ACTIVO,
      },
    });
  }

  public async refreshToken(
    usuario: Usuario,
  ): Promise<RefreshTokenResponseDTO> {
    const userDTO = this._mapper.toDTO<AuthUsuarioPayload>(
      usuario,
      AuthUsuarioPayload,
    );
    userDTO.refreshToken = uuidv4();
    const updated = await this._userRepository.update(userDTO.id, {
      refreshToken: userDTO.refreshToken,
    });
    return updated.affected > 0
      ? {
          accessToken: this._jwtService.sign(instanceToPlain(userDTO)),
          refreshToken: userDTO.refreshToken,
        }
      : null;
  }
}
