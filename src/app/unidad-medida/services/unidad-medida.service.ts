import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UnidadMedida } from '../../../data/entities/unidad-medida.entity';
import { Repository, Like } from 'typeorm';
import { MapperService } from '../../../common/mapper/mapper.service';
import { PaginateResponse } from 'src/common/models/interface';
import {
  UnidadMedidaCreateDTO,
  UnidadMedidaReadDTO,
  UnidadMedidaEditDTO,
} from '../models/dto';

@Injectable()
export class UnidadMedidaService {
  constructor(
    @InjectRepository(UnidadMedida)
    private readonly _unidadMedidaRepository: Repository<UnidadMedida>,
    private readonly _mapper: MapperService,
  ) {}

  public async getAllPaginated(
    skip = 0,
    take = 10,
    query: string,
  ): Promise<PaginateResponse<UnidadMedidaReadDTO>> {
    const countAll = await this._unidadMedidaRepository.count();
    const resp = await this._unidadMedidaRepository.findAndCount({
      skip,
      take,
      where: { nombre: Like(`%${query}%`) },
    });
    const [unidades, count] = resp;
    if (unidades) {
      const unidadesDTO = this._mapper.toArrayDTO<UnidadMedidaReadDTO>(
        unidades,
        UnidadMedidaReadDTO,
      );
      return { count: countAll, data: unidadesDTO, filteredCount: count };
    }
    return null;
  }

  public async getOneById(id: string): Promise<UnidadMedidaReadDTO> {
    const unidad = await this._unidadMedidaRepository.findOne(id);
    if (unidad) {
      return this._mapper.toDTO<UnidadMedidaReadDTO>(
        unidad,
        UnidadMedidaReadDTO,
      );
    }
    return null;
  }

  public async createOne(
    body: UnidadMedidaCreateDTO,
  ): Promise<UnidadMedidaReadDTO> {
    const unidadMedida = this._unidadMedidaRepository.create(body);
    const unidad = await this._unidadMedidaRepository.save(unidadMedida);
    if (unidad) {
      return this._mapper.toDTO<UnidadMedidaReadDTO>(
        unidad,
        UnidadMedidaReadDTO,
      );
    }
    return null;
  }

  public async editOne(
    id: string,
    body: UnidadMedidaEditDTO,
  ): Promise<boolean> {
    const updated = await this._unidadMedidaRepository.update(id, body);
    return updated.affected > 0;
  }

  public async deleteOne(id: string): Promise<boolean> {
    const deleted = await this._unidadMedidaRepository.delete(id);
    return deleted.affected > 0;
  }
}
