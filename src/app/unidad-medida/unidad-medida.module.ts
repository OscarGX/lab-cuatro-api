import { Module } from '@nestjs/common';
import { UnidadMedidaController } from './unidad-medida.controller';
import { UnidadMedidaService } from './services/unidad-medida.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadMedida } from 'src/data/entities/unidad-medida.entity';

@Module({
  controllers: [UnidadMedidaController],
  providers: [UnidadMedidaService],
  imports: [TypeOrmModule.forFeature([UnidadMedida])],
})
export class UnidadMedidaModule {}
