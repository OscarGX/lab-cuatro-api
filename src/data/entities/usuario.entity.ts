import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rol } from './rol.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: false,
  })
  nombre: string;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: false,
  })
  apellidoPaterno: string;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: false,
  })
  apellidoMaterno: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  contrasena: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  status: number;

  @Generated('uuid')
  @Column({
    unique: true,
  })
  refreshToken: string;

  @ManyToOne(() => Rol, (rol) => rol.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  rol: Rol;
}
