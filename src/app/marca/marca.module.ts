import { Module } from '@nestjs/common';
import { MarcaController } from './marca.controller';
import { MarcaService } from './services/marca.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marca } from 'src/data/entities/marca.entity';

@Module({
  controllers: [MarcaController],
  providers: [MarcaService],
  imports: [TypeOrmModule.forFeature([Marca])],
})
export class MarcaModule {}
