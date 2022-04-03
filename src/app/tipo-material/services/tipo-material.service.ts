import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoMaterial } from 'src/data/entities/tipo-material.entity';
import { Repository } from 'typeorm';
import { MapperService } from '../../../common/mapper/mapper.service';
import { TipoMaterialReadDTO } from '../models/dto';

@Injectable()
export class TipoMaterialService {
  constructor(
    @InjectRepository(TipoMaterial)
    private readonly _tipoMaterialRepository: Repository<TipoMaterial>,
    private readonly _mapper: MapperService,
  ) {}

  public async getAll(): Promise<TipoMaterialReadDTO[]> {
    const tiposMaterial = await this._tipoMaterialRepository.find();
    if (tiposMaterial) {
      const tiposMatDTO = this._mapper.toArrayDTO<TipoMaterialReadDTO>(
        tiposMaterial,
        TipoMaterialReadDTO,
      );
      return tiposMatDTO;
    }
    return null;
  }
}
