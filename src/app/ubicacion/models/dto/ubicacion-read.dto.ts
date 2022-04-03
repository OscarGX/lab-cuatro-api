import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UbicacionReadDTO {
  @Expose()
  id: string;

  @Expose()
  anaquel: number;

  @Expose()
  nivel: number;
}
