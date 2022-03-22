import { PrimaryGeneratedColumn, Column, OneToOne, Entity } from 'typeorm';
import { Material } from './material.entity';
import { Reactivo } from './reactivo.entity';

@Entity('ubicaciones')
export class Ubicacion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  anaquel: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  nivel: number;

  @OneToOne(() => Material, (material) => material.ubicacion, {
    nullable: true,
  })
  material?: Material;

  @OneToOne(() => Reactivo, (reactjs) => reactjs.ubicacion, {
    nullable: true,
  })
  reactivo?: Reactivo;
}
