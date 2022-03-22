import { IsInt } from 'class-validator';

export class UsuarioStatusDTO {
  @IsInt()
  status: number;
}
