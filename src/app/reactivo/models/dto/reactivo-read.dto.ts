import { Exclude, Type, Expose } from 'class-transformer';
import { MarcaReadDTO } from 'src/app/marca/models/dto';
import { SkuReadDTO } from 'src/app/sku/models/dto';
import { TipoEnvaseReadDTO } from 'src/app/tipo-envase/models/dto';
import { UbicacionReadDTO } from 'src/app/ubicacion/models/dto';
import { UnidadMedidaReadDTO } from 'src/app/unidad-medida/models/dto';
import { ClasificacionEnum } from 'src/data/enums/clasificacion.enum';
import { EstadoFisicoEnum } from 'src/data/enums/estado-fisico.enum';

@Exclude()
export class ReactivoReadDTO {
  @Expose()
  id: string;

  @Expose()
  nombre: string;

  @Expose()
  desripcion?: string;

  @Expose()
  stock: number;

  @Expose()
  cantidad: number;

  @Expose()
  estadoFisico: EstadoFisicoEnum;

  @Expose()
  clasificacion: ClasificacionEnum;

  @Expose()
  fechaIngreso: string;

  @Expose()
  hojaSeguridad: boolean;

  @Expose()
  status: number;

  @Expose()
  @Type(() => UnidadMedidaReadDTO)
  unidadMedida?: UnidadMedidaReadDTO;

  @Expose()
  @Type(() => MarcaReadDTO)
  marca?: MarcaReadDTO;

  @Expose()
  @Type(() => TipoEnvaseReadDTO)
  tipoEnvase?: TipoEnvaseReadDTO;

  @Expose()
  @Type(() => UbicacionReadDTO)
  ubicacion?: UbicacionReadDTO;

  @Expose()
  @Type(() => SkuReadDTO)
  skus?: SkuReadDTO[];
}
