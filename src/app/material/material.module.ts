import { Module } from '@nestjs/common';
import { MaterialController } from './material.controller';
import { MaterialService } from './services/material.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from 'src/data/entities/material.entity';

@Module({
  controllers: [MaterialController],
  providers: [MaterialService],
  imports: [TypeOrmModule.forFeature([Material])],
})
export class MaterialModule {}
