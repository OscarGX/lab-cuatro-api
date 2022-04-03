import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TipoEnvaseReadDTO {
  @Expose()
  id: number;

  @Expose()
  nombre: string;

  @Expose()
  descripcion?: string;
}
