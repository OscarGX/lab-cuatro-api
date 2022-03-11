import { IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginRequestDTO {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  contrasena: string;
}
