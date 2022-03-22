import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Material } from './material.entity';
import { Reactivo } from './reactivo.entity';

@Entity('skus')
export class Sku {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: false,
  })
  valor: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  desripcion?: string;

  @ManyToOne(() => Material, (material) => material.id, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  material?: Material;

  @ManyToOne(() => Reactivo, (reactivo) => reactivo.id, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  reactivo?: Reactivo;
}
