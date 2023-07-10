import { Request } from 'express';


declare interface ProtectedRequest extends Request{
  user: any;
  accessToken: string;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
