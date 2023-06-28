import { createSecretKey } from 'node:crypto';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { jwtVerify } from 'jose';

import { MiddlewareInterface } from '@core/middleware/middleware.interface.js';
import HttpError from '@core/errors/http-error.js';
import { Encoding } from '@const/common.js';
import { HttpErrorText } from '@const/error-messages.js';
import { JwtParam } from '@modules/user/user.const.js';

export class AuthenticateMiddleware implements MiddlewareInterface {
  constructor(private readonly jwtSecret: string) {
  }

  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const { headers } = req;
    const token = headers?.authorization?.replace(JwtParam.TokenName, '')?.trim();

    if (!token) {
      return next();
    }

    try {
      const { payload } = await jwtVerify(
        token,
        createSecretKey(this.jwtSecret, Encoding.Utf8),
      );

      req.user = {
        id: String(payload.id),
        email: String(payload.email),
      };

      return next();

    } catch {
      return next(
        new HttpError(
          StatusCodes.UNAUTHORIZED,
          HttpErrorText.NotValidToken,
          'AuthenticateMiddleware',
        ),
      );
    }
  }
}
