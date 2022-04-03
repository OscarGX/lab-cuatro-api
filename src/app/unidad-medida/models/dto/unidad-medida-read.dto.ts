import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UnidadMedidaReadDTO {
  @Expose()
  id: string;

  @Expose()
  nombre: string;

  @Expose()
  descripcion?: string;
}
