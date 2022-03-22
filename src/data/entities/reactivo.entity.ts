import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { EstadoFisicoEnum } from '../enums/estado-fisico.enum';
import { ClasificacionEnum } from '../enums/clasificacion.enum';
import { Marca } from './marca.entity';
import { UnidadMedida } from './unidad-medida.entity';
import { TipoEnvase } from './tipo-envase.entity';
import { OneToOne } from 'typeorm';
import { Ubicacion } from './ubicacion.entity';
import { StatusEnum } from '../enums/status.enum';
import { Sku } from './sku.entity';

@Entity('reactivos')
export class Reactivo {
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
    length: 255,
    nullable: true,
  })
  desripcion?: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  stock: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  cantidad: number;

  @Column({
    type: 'enum',
    nullable: false,
    enum: EstadoFisicoEnum,
  })
  estadoFisico: EstadoFisicoEnum;

  @Column({
    type: 'enum',
    nullable: false,
    enum: ClasificacionEnum,
  })
  clasificacion: ClasificacionEnum;

  @Column({
    type: 'date',
    nullable: false,
  })
  fechaIngreso: string;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  hojaSeguridad: boolean;

  @Column({
    type: 'int',
    nullable: false,
    default: StatusEnum.ACTIVO,
  })
  status: number;

  @ManyToOne(() => Marca, (marca) => marca.id, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  marca?: Marca;

  @ManyToOne(() => UnidadMedida, (unidadMedida) => unidadMedida.id, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  unidadMedida?: UnidadMedida;

  @ManyToOne(() => TipoEnvase, (tipoEnvase) => tipoEnvase.id, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  tipoEnvase?: TipoEnvase;

  @OneToOne(() => Ubicacion, (ubi) => ubi.id, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  ubicacion?: Ubicacion;

  @OneToMany(() => Sku, (sku) => sku.reactivo, {
    nullable: true,
    cascade: ['insert'],
  })
  skus?: Sku[];
}
