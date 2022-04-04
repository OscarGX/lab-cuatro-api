import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sku } from 'src/data/entities/sku.entity';
import { Repository } from 'typeorm';
import { MapperService } from '../../../common/mapper/mapper.service';
import { FullSkuCreateDTO, SkuEditDTO, SkuReadDTO } from '../models/dto';

@Injectable()
export class SkuService {
  constructor(
    @InjectRepository(Sku) private readonly _skuRepository: Repository<Sku>,
    private readonly _mapper: MapperService,
  ) {}

  public async createOne(body: FullSkuCreateDTO): Promise<SkuReadDTO> {
    const sku = this._skuRepository.create(body);
    const skuDB = await this._skuRepository.save(sku);
    if (skuDB) {
      return this._mapper.toDTO<SkuReadDTO>(sku, SkuReadDTO);
    }
    return null;
  }

  public async getOneById(id: string): Promise<SkuReadDTO> {
    const sku = await this._skuRepository.findOne(id);
    if (sku) {
      return this._mapper.toDTO<SkuReadDTO>(sku, SkuReadDTO);
    }
    return null;
  }

  public async updateOne(id: string, body: SkuEditDTO): Promise<boolean> {
    const updated = await this._skuRepository.update(id, body);
    return updated.affected > 0;
  }

  public async deleteOne(id: string): Promise<boolean> {
    const deleted = await this._skuRepository.delete(id);
    return deleted.affected > 0;
  }
}
