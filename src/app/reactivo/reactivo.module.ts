import { Module } from '@nestjs/common';
import { ReactivoController } from './reactivo.controller';
import { ReactivoService } from './services/reactivo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reactivo } from 'src/data/entities/reactivo.entity';

@Module({
  controllers: [ReactivoController],
  providers: [ReactivoService],
  imports: [TypeOrmModule.forFeature([Reactivo])],
})
export class ReactivoModule {}
