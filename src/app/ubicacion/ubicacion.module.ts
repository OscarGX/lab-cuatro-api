import { Module } from '@nestjs/common';
import { UbicacionController } from './ubicacion.controller';
import { UbicacionService } from './services/ubicacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ubicacion } from 'src/data/entities/ubicacion.entity';

@Module({
  controllers: [UbicacionController],
  providers: [UbicacionService],
  imports: [TypeOrmModule.forFeature([Ubicacion])],
})
export class UbicacionModule {}
