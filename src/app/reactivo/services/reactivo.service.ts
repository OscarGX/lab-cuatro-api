import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateResponse } from 'src/common/models/interface';
import { Reactivo } from 'src/data/entities/reactivo.entity';
import { Repository, Like, getConnection } from 'typeorm';
import { MapperService } from '../../../common/mapper/mapper.service';
import {
  ReactivoCreateDTO,
  ReactivoEditDTO,
  ReactivoReadDTO,
} from '../models/dto';

@Injectable()
export class ReactivoService {
  constructor(
    @InjectRepository(Reactivo)
    private readonly _reactivoRepository: Repository<Reactivo>,
    private readonly _mapper: MapperService,
  ) {}

  public async getAllPaginated(
    skip = 0,
    take = 10,
    query: string,
  ): Promise<PaginateResponse<ReactivoReadDTO>> {
    const countAll = await this._reactivoRepository.count();
    const resp = await this._reactivoRepository.findAndCount({
      skip,
      take,
      where: { nombre: Like(`%${query}%`) },
      relations: ['skus'],
    });
    const [reactivos, count] = resp;
    if (reactivos) {
      const reactivosDTO = this._mapper.toArrayDTO<ReactivoReadDTO>(
        reactivos,
        ReactivoReadDTO,
      );
      return { count: countAll, data: reactivosDTO, filteredCount: count };
    }
    return null;
  }

  public async getAllByStockAndCantidad(
    stock = 5,
    cantidad = 5,
  ): Promise<ReactivoReadDTO[]> {
    const reactivos = await this._reactivoRepository
      .createQueryBuilder('reactivos')
      .innerJoinAndSelect('reactivos.unidadMedida', 'unidades-medidas')
      .innerJoinAndSelect('reactivos.marca', 'marcas')
      .innerJoinAndSelect('reactivos.tipoEnvase', 'tipos-envases')
      .innerJoinAndSelect('reactivos.ubicacion', 'ubicaciones')
      .where('reactivos.stock <= :stock', { stock })
      .orWhere('reactivos.cantidad <= :cantidad', { cantidad })
      .orderBy('reactivos.stock', 'ASC')
      .getMany();
    if (reactivos) {
      return this._mapper.toArrayDTO<ReactivoReadDTO>(
        reactivos,
        ReactivoReadDTO,
      );
    }
    return null;
  }

  public async getOneById(id: string): Promise<ReactivoReadDTO> {
    const reactivo = await this._reactivoRepository.findOne(id, {
      relations: ['skus'],
    });
    if (reactivo) {
      return this._mapper.toDTO<ReactivoReadDTO>(reactivo, ReactivoReadDTO);
    }
    return null;
  }

  public async createOne(body: ReactivoCreateDTO): Promise<ReactivoReadDTO> {
    const entity = this._reactivoRepository.create(body);
    const reactivo = await this._reactivoRepository.save(entity);
    if (reactivo) {
      return this._mapper.toDTO<ReactivoReadDTO>(reactivo, ReactivoReadDTO);
    }
    return null;
  }

  public async editOne(id: string, body: ReactivoEditDTO): Promise<boolean> {
    const updated = await this._reactivoRepository.update(id, body);
    return updated.affected > 0;
  }

  public async deleteOneWithSkus(id: string): Promise<boolean> {
    const reactivo = await this._reactivoRepository.findOne(id, {
      relations: ['skus'],
    });
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const skusDeleted = await queryRunner.manager.remove(reactivo.skus);
      if (skusDeleted && skusDeleted.length === reactivo.skus.length) {
        const reactivoDeleted = await queryRunner.manager.delete(Reactivo, id);
        if (reactivoDeleted.affected > 0) {
          await queryRunner.commitTransaction();
          return true;
        }
        await queryRunner.rollbackTransaction();
        return false;
      }
      await queryRunner.rollbackTransaction();
      return false;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return false;
    } finally {
      await queryRunner.release();
    }
  }
}
