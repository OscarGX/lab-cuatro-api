import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ubicacion } from '../../../data/entities/ubicacion.entity';
import { Repository, Like } from 'typeorm';
import { MapperService } from '../../../common/mapper/mapper.service';
import {
  UbicacionCreateDTO,
  UbicacionEditDTO,
  UbicacionReadDTO,
} from '../models/dto';
import { PaginateResponse } from 'src/common/models/interface';

@Injectable()
export class UbicacionService {
  constructor(
    @InjectRepository(Ubicacion)
    private readonly _ubicacionRepository: Repository<Ubicacion>,
    private readonly _mapper: MapperService,
  ) {}

  public async getAllPaginated(
    skip = 0,
    take = 10,
    query: string,
  ): Promise<PaginateResponse<UbicacionReadDTO>> {
    const countAll = await this._ubicacionRepository.count();
    const resp = await this._ubicacionRepository.findAndCount({
      skip,
      take,
      where: { anaquel: Like(`%${query}%`) },
    });
    const [ubicaciones, count] = resp;
    if (ubicaciones) {
      const ubicacionesDTO = this._mapper.toArrayDTO<UbicacionReadDTO>(
        ubicaciones,
        UbicacionReadDTO,
      );
      return { count: countAll, data: ubicacionesDTO, filteredCount: count };
    }
    return null;
  }

  public async getAll(): Promise<UbicacionReadDTO[]> {
    const ubicaciones = await this._ubicacionRepository
      .createQueryBuilder('ubicaciones')
      .leftJoin('ubicaciones.reactivo', 'Reactivo')
      .leftJoin('ubicaciones.material', 'Material')
      .where('Reactivo.id IS NULL')
      .andWhere('Material.id IS NULL')
      .getMany();
    if (ubicaciones) {
      return this._mapper.toArrayDTO<UbicacionReadDTO>(
        ubicaciones,
        UbicacionReadDTO,
      );
    }
    return null;
  }

  public async getAllByMaterialId(
    materialId: string,
  ): Promise<UbicacionReadDTO[]> {
    const ubicaciones = await this._ubicacionRepository
      .createQueryBuilder('ubicaciones')
      .leftJoin('ubicaciones.reactivo', 'Reactivo')
      .leftJoin('ubicaciones.material', 'Material')
      .where('Reactivo.id IS NULL')
      .andWhere('Material.id = :materialId', { materialId })
      .orWhere('Material.id IS NULL')
      .getMany();
    if (ubicaciones) {
      return this._mapper.toArrayDTO<UbicacionReadDTO>(
        ubicaciones,
        UbicacionReadDTO,
      );
    }
    return null;
  }

  public async getAllByReactivoId(
    reactivoId: string,
  ): Promise<UbicacionReadDTO[]> {
    const ubicaciones = await this._ubicacionRepository
      .createQueryBuilder('ubicaciones')
      .leftJoin('ubicaciones.reactivo', 'Reactivo')
      .leftJoin('ubicaciones.material', 'Material')
      .where('Material.id IS NULL')
      .andWhere('Reactivo.id = :reactivoId', { reactivoId })
      .orWhere('Reactivo.id IS NULL')
      .getMany();
    if (ubicaciones) {
      return this._mapper.toArrayDTO<UbicacionReadDTO>(
        ubicaciones,
        UbicacionReadDTO,
      );
    }
    return null;
  }

  public async getOneById(id: string): Promise<UbicacionReadDTO> {
    const ubicacion = await this._ubicacionRepository.findOne(id);
    if (ubicacion)
      return this._mapper.toDTO<UbicacionReadDTO>(ubicacion, UbicacionReadDTO);
    return null;
  }

  public async createOne(body: UbicacionCreateDTO): Promise<UbicacionReadDTO> {
    const ubicacion = this._ubicacionRepository.create(body);
    const ubicacionDB = await this._ubicacionRepository.save(ubicacion);
    if (ubicacionDB) {
      return this._mapper.toDTO<UbicacionReadDTO>(
        ubicacionDB,
        UbicacionReadDTO,
      );
    }
    return null;
  }

  public async editOne(id: string, body: UbicacionEditDTO): Promise<boolean> {
    const updated = await this._ubicacionRepository.update(id, body);
    return updated.affected > 0;
  }

  public async deleteOne(id: string): Promise<boolean> {
    const deleted = await this._ubicacionRepository.delete(id);
    return deleted.affected > 0;
  }
}
