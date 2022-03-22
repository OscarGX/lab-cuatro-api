import { Module } from '@nestjs/common';
import { RolController } from './rol.controller';
import { RolService } from './services/rol.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from '../../data/entities/rol.entity';

@Module({
  controllers: [RolController],
  providers: [RolService],
  imports: [TypeOrmModule.forFeature([Rol])],
})
export class RolModule {}
