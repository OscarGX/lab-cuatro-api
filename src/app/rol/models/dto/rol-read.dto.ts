import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RolReadDTO {
  @Expose()
  id: number;

  @Expose()
  nombre: string;

  @Expose()
  descripcion?: string;
}
