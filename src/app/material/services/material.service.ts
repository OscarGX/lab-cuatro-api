import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Material } from 'src/data/entities/material.entity';
import { Repository, Like, getConnection } from 'typeorm';
import { MapperService } from '../../../common/mapper/mapper.service';
import { PaginateResponse } from '../../../common/models/interface/paginate-response.interface';
import {
  MaterialCreateDTO,
  MaterialEditDTO,
  MaterialReadDTO,
} from '../models/dto';
@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private readonly _materialRepository: Repository<Material>,
    private readonly _mapper: MapperService,
  ) {}

  public async getAllPaginated(
    skip = 0,
    take = 10,
    query: string,
  ): Promise<PaginateResponse<MaterialReadDTO>> {
    const countAll = await this._materialRepository.count();
    const resp = await this._materialRepository.findAndCount({
      skip,
      take,
      where: { nombre: Like(`%${query}%`) },
      relations: ['skus'],
    });
    const [materiales, count] = resp;
    if (materiales) {
      const materialesDTO = this._mapper.toArrayDTO<MaterialReadDTO>(
        materiales,
        MaterialReadDTO,
      );
      return { count: countAll, data: materialesDTO, filteredCount: count };
    }
    return null;
  }

  public async getAllByCantidad(cantidad = 5): Promise<MaterialReadDTO[]> {
    const materiales = await this._materialRepository
      .createQueryBuilder('materiales')
      .innerJoinAndSelect('materiales.unidadMedida', 'unidades-medidas')
      .innerJoinAndSelect('materiales.marca', 'marcas')
      .innerJoinAndSelect('materiales.tipoMaterial', 'tipos-materiales')
      .innerJoinAndSelect('materiales.ubicacion', 'ubicaciones')
      .where('materiales.cantidad <= :cantidad', { cantidad })
      .orderBy('materiales.cantidad', 'ASC')
      .getMany();
    if (materiales) {
      return this._mapper.toArrayDTO<MaterialReadDTO>(
        materiales,
        MaterialReadDTO,
      );
    }
    return null;
  }

  public async getOneById(id: string): Promise<MaterialReadDTO> {
    const material = await this._materialRepository.findOne(id, {
      relations: ['skus'],
    });
    if (material) {
      return this._mapper.toDTO<MaterialReadDTO>(material, MaterialReadDTO);
    }
    return null;
  }

  public async createOne(body: MaterialCreateDTO): Promise<MaterialReadDTO> {
    const entity = this._materialRepository.create(body);
    const material = await this._materialRepository.save(entity);
    if (material) {
      return this._mapper.toDTO<MaterialReadDTO>(material, MaterialReadDTO);
    }
    return null;
  }

  public async editOne(id: string, body: MaterialEditDTO): Promise<boolean> {
    const updated = await this._materialRepository.update(id, body);
    return updated.affected > 0;
  }

  public async deleteOne(id: string): Promise<boolean> {
    const deleted = await this._materialRepository.delete(id);
    return deleted.affected > 0;
  }

  public async deleteOneWithSkus(id: string): Promise<boolean> {
    const material = await this._materialRepository.findOne(id, {
      relations: ['skus'],
    });
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const skusDeleted = await queryRunner.manager.remove(material.skus);
      if (skusDeleted && skusDeleted.length === material.skus.length) {
        const materialDeleted = await queryRunner.manager.delete(Material, id);
        if (materialDeleted.affected > 0) {
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
