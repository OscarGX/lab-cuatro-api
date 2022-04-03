import { Module } from '@nestjs/common';
import { TipoMaterialController } from './tipo-material.controller';
import { TipoMaterialService } from './services/tipo-material.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoMaterial } from 'src/data/entities/tipo-material.entity';

@Module({
  controllers: [TipoMaterialController],
  providers: [TipoMaterialService],
  imports: [TypeOrmModule.forFeature([TipoMaterial])],
})
export class TipoMaterialModule {}
