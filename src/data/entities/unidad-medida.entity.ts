import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Material } from './material.entity';
import { Reactivo } from './reactivo.entity';

@Entity('unidades-medidas')
export class UnidadMedida {
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

  @OneToMany(() => Material, (material) => material.unidadMedida, {
    nullable: true,
  })
  materiales?: Material[];

  @OneToMany(() => Reactivo, (reactjs) => reactjs.unidadMedida, {
    nullable: true,
  })
  reactivos?: Reactivo[];
}
