import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reactivo } from './reactivo.entity';

@Entity('tipos-envases')
export class TipoEnvase {
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

  @OneToMany(() => Reactivo, (reactjs) => reactjs.tipoEnvase, {
    nullable: true,
  })
  reactivos?: Reactivo[];
}
