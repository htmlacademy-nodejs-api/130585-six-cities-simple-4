import { JwtPayload } from '@appTypes/jwt-payload.type.js';

export {};

declare global {
  namespace Express {
    export interface Request {
      user: JwtPayload;
    }
  }
}
