import { Module } from '@nestjs/common';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../../data/entities/usuario.entity';

@Module({
  providers: [UsuarioService],
  controllers: [UsuarioController],
  imports: [TypeOrmModule.forFeature([Usuario])],
})
export class UsuarioModule {}
