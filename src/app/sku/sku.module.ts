import { Module } from '@nestjs/common';
import { SkuController } from './sku.controller';
import { SkuService } from './services/sku.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sku } from 'src/data/entities/sku.entity';

@Module({
  controllers: [SkuController],
  providers: [SkuService],
  imports: [TypeOrmModule.forFeature([Sku])],
})
export class SkuModule {}
