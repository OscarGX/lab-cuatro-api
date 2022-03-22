import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Material } from './material.entity';
import { Reactivo } from './reactivo.entity';

@Entity('marcas')
export class Marca {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  nombre: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  descripcion?: string;

  @OneToMany(() => Material, (mat) => mat.marca, {
    nullable: true,
  })
  materiales?: Material[];

  @OneToMany(() => Reactivo, (reactjs) => reactjs.marca, {
    nullable: true,
  })
  reactivos?: Reactivo[];
}
