import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TipoMaterialReadDTO {
  @Expose()
  id: number;

  @Expose()
  nombre: string;

  @Expose()
  descripcion?: string;
}
