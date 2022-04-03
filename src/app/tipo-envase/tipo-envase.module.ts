import { Module } from '@nestjs/common';
import { TipoEnvaseController } from './tipo-envase.controller';
import { TipoEnvaseService } from './services/tipo-envase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoEnvase } from 'src/data/entities/tipo-envase.entity';

@Module({
  controllers: [TipoEnvaseController],
  providers: [TipoEnvaseService],
  imports: [TypeOrmModule.forFeature([TipoEnvase])],
})
export class TipoEnvaseModule {}
