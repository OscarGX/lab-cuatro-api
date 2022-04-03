import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ubicacion } from '../../../data/entities/ubicacion.entity';
import { Repository } from 'typeorm';
import { MapperService } from '../../../common/mapper/mapper.service';

@Injectable()
export class UbicacionService {
  constructor(
    @InjectRepository(Ubicacion)
    private readonly _ubicacionRepository: Repository<Ubicacion>,
    private readonly _mapper: MapperService,
  ) {}
}
