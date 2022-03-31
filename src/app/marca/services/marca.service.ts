import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateResponse } from 'src/common/models/interface';
import { Marca } from 'src/data/entities/marca.entity';
import { Repository, Like } from 'typeorm';
import { MapperService } from '../../../common/mapper/mapper.service';
import { MarcaCreateDTO, MarcaReadDTO, MarcaEditDTO } from '../models/dto';

@Injectable()
export class MarcaService {
  constructor(
    @InjectRepository(Marca)
    private readonly _marcaRepository: Repository<Marca>,
    private readonly _mapper: MapperService,
  ) {}

  public async getAllPaginated(
    skip = 0,
    take = 10,
    query: string,
  ): Promise<PaginateResponse<MarcaReadDTO>> {
    const countAll = await this._marcaRepository.count();
    const resp = await this._marcaRepository.findAndCount({
      skip,
      take,
      where: { nombre: Like(`%${query}%`) },
    });
    const [marcas, count] = resp;
    /* const users = await this._userRepository.find({ skip, take }); */
    if (marcas) {
      const marcasDTO = this._mapper.toArrayDTO<MarcaReadDTO>(
        marcas,
        MarcaReadDTO,
      );
      return { count: countAll, data: marcasDTO, filteredCount: count };
    }
    return null;
  }

  public async getMarcaById(id: string): Promise<MarcaReadDTO> {
    const marca = await this._marcaRepository.findOne(id);
    if (marca) {
      return this._mapper.toDTO<MarcaReadDTO>(marca, MarcaReadDTO);
    }
    return null;
  }

  public async createOne(body: MarcaCreateDTO): Promise<MarcaReadDTO> {
    const marcaEntity = this._marcaRepository.create(body);
    const marcaDB = await this._marcaRepository.save(marcaEntity);
    if (marcaDB) {
      return this._mapper.toDTO<MarcaReadDTO>(marcaDB, MarcaReadDTO);
    }
    return null;
  }

  public async editOne(id: string, body: MarcaEditDTO): Promise<boolean> {
    const updated = await this._marcaRepository.update(id, body);
    return updated.affected > 0;
  }

  public async deleteOne(id: string): Promise<boolean> {
    const deleted = await this._marcaRepository.delete(id);
    return deleted.affected > 0;
  }
}
