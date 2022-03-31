import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class MarcaReadDTO {
  @Expose()
  id: string;

  @Expose()
  nombre: string;

  @Expose()
  descripcion?: string;
}
