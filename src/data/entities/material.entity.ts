import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { ClasificacionEnum } from '../enums/clasificacion.enum';
import { StatusEnum } from '../enums/status.enum';
import { UnidadMedida } from './unidad-medida.entity';
import { Marca } from './marca.entity';
import { TipoMaterial } from './tipo-material.entity';
import { Ubicacion } from './ubicacion.entity';
import { Sku } from './sku.entity';

@Entity('materiales')
export class Material {
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
    type: 'varchar',
    length: 80,
    nullable: false,
  })
  capacidadTamanio: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  cantidad: number;

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
    type: 'int',
    nullable: false,
    default: StatusEnum.ACTIVO,
  })
  status: number;

  @ManyToOne(() => UnidadMedida, (unidadMedida) => unidadMedida.id, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  unidadMedida?: UnidadMedida;

  @ManyToOne(() => Marca, (marca) => marca.id, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  marca?: Marca;

  @ManyToOne(() => TipoMaterial, (tipoMaterial) => tipoMaterial.id, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  tipoMaterial?: TipoMaterial;

  @OneToOne(() => Ubicacion, (ubi) => ubi.id, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  ubicacion?: Ubicacion;

  @OneToMany(() => Sku, (sku) => sku.material, {
    nullable: true,
    cascade: ['insert'],
  })
  skus?: Sku[];
}
