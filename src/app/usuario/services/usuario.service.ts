import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../../../data/entities/usuario.entity';
import { Like, Repository } from 'typeorm';
import { MapperService } from '../../../common/mapper/mapper.service';
import {
  FullUsuarioReadDTO,
  UsuarioCreateDTO,
  UsuarioReadDTO,
} from 'src/app/auth/models/dto';
import { StatusEnum } from 'src/data/enums/status.enum';
import { PaginateResponse } from 'src/common/models/interface';
import { hashSync } from 'bcrypt';
import { UsuarioEditDTO } from '../models/dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly _userRepository: Repository<Usuario>,
    private readonly _mapper: MapperService,
  ) {}

  public async getAll(): Promise<UsuarioReadDTO[]> {
    const users = await this._userRepository.find();
    if (users) {
      const usersDTO = this._mapper.toArrayDTO<UsuarioReadDTO>(
        users,
        UsuarioReadDTO,
      );
      return usersDTO;
    }
    return null;
  }

  public async getAllPaginated(
    skip = 0,
    take = 10,
    query: string,
  ): Promise<PaginateResponse<UsuarioReadDTO>> {
    const countAll = await this._userRepository.count();
    const resp = await this._userRepository.findAndCount({
      skip,
      take,
      where: { nombre: Like(`%${query}%`) },
    });
    const [users, count] = resp;
    /* const users = await this._userRepository.find({ skip, take }); */
    if (users) {
      const usersDTO = this._mapper.toArrayDTO<UsuarioReadDTO>(
        users,
        UsuarioReadDTO,
      );
      return { count: countAll, data: usersDTO, filteredCount: count };
    }
    return null;
  }

  public async getUsuarioById(id: string): Promise<UsuarioReadDTO> {
    const user = await this._userRepository.findOne(id);
    if (user) {
      const userDTO = this._mapper.toDTO<UsuarioReadDTO>(user, UsuarioReadDTO);
      return userDTO;
    }
    return null;
  }

  public async getFullUsuarioById(id: string): Promise<FullUsuarioReadDTO> {
    const user = await this._userRepository.findOne(id);
    if (user) {
      const userDTO = this._mapper.toDTO<FullUsuarioReadDTO>(
        user,
        FullUsuarioReadDTO,
      );
      return userDTO;
    }
    return null;
  }

  public async usuarioStatusToggle(
    id: string,
    status: number,
  ): Promise<boolean> {
    const updated = await this._userRepository.update(id, { status });
    return updated.affected > 0;
  }

  public async editOne(id: string, body: UsuarioEditDTO): Promise<boolean> {
    const updated = await this._userRepository.update(id, body);
    return updated.affected > 0;
  }

  public async deleteOne(id: string): Promise<boolean> {
    const deleted = await this._userRepository.delete(id);
    return deleted.affected > 0;
  }
}
