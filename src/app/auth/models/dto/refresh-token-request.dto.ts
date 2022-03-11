import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenRequestDTO {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
