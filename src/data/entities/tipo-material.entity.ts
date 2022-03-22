import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Material } from './material.entity';

@Entity('tipos-materiales')
export class TipoMaterial {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

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

  @OneToMany(() => Material, (material) => material.tipoMaterial, {
    nullable: true,
  })
  materiales?: Material[];
}
