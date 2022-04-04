import { Exclude, Expose, Type } from 'class-transformer';
import { MarcaReadDTO } from 'src/app/marca/models/dto';
import { SkuReadDTO } from 'src/app/sku/models/dto';
import { TipoMaterialReadDTO } from 'src/app/tipo-material/models/dto';
import { UbicacionReadDTO } from 'src/app/ubicacion/models/dto';
import { UnidadMedidaReadDTO } from 'src/app/unidad-medida/models/dto';

@Exclude()
export class MaterialReadDTO {
  @Expose()
  id: string;

  @Expose()
  nombre: string;

  @Expose()
  descripcion?: string;

  @Expose()
  capacidadTamanio: string;

  @Expose()
  cantidad: number;

  @Expose()
  clasificacion: string;

  @Expose()
  fechaIngreso: string;

  @Expose()
  status: number;

  @Expose()
  @Type(() => UnidadMedidaReadDTO)
  unidadMedida?: UnidadMedidaReadDTO;

  @Expose()
  @Type(() => MarcaReadDTO)
  marca?: MarcaReadDTO;

  @Expose()
  @Type(() => TipoMaterialReadDTO)
  tipoMaterial?: TipoMaterialReadDTO;

  @Expose()
  @Type(() => UbicacionReadDTO)
  ubicacion?: UbicacionReadDTO;

  @Expose()
  @Type(() => SkuReadDTO)
  skus?: SkuReadDTO[];
}
