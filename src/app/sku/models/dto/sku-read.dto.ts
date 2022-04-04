import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SkuReadDTO {
  @Expose()
  id: number;

  @Expose()
  valor: string;

  @Expose()
  descripcion?: string;
}
