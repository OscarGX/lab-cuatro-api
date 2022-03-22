import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from '../../../data/entities/rol.entity';
import { Repository } from 'typeorm';
import { MapperService } from '../../../common/mapper/mapper.service';
import { RolReadDTO } from '../models/dto';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol) private readonly _rolRepository: Repository<Rol>,
    private readonly _mapper: MapperService,
  ) {}

  public async getAll(): Promise<RolReadDTO[]> {
    const roles = await this._rolRepository.find();
    if (roles) {
      const rolesDTO = this._mapper.toArrayDTO<RolReadDTO>(roles, RolReadDTO);
      return rolesDTO;
    }
    return null;
  }
}
