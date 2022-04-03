import { IsInt } from 'class-validator';

export class UbicacionCreateDTO {
  @IsInt()
  anaquel: number;

  @IsInt()
  nivel: number;
}
