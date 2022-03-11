import { AuthUsuarioPayload } from './usuario-payload.dto';

export class LoginResponseDTO extends AuthUsuarioPayload {
  accessToken: string;
}
