import { Module } from '@nestjs/common';
import { UbicacionController } from './ubicacion.controller';

@Module({
  controllers: [UbicacionController]
})
export class UbicacionModule {}
