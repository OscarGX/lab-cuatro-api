import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoEnvase } from 'src/data/entities/tipo-envase.entity';
import { Repository } from 'typeorm';
import { MapperService } from '../../../common/mapper/mapper.service';
import { TipoEnvaseReadDTO } from '../models/dto';

@Injectable()
export class TipoEnvaseService {
  constructor(
    @InjectRepository(TipoEnvase)
    private readonly _tipoEnvaseRepository: Repository<TipoEnvase>,
    private readonly _mapper: MapperService,
  ) {}

  public async getAll(): Promise<TipoEnvaseReadDTO[]> {
    const tipoEnvases = await this._tipoEnvaseRepository.find();
    if (tipoEnvases) {
      const envasesDTO = this._mapper.toArrayDTO<TipoEnvaseReadDTO>(
        tipoEnvases,
        TipoEnvaseReadDTO,
      );
      return envasesDTO;
    }
    return null;
  }
}
