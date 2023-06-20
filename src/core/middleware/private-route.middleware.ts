import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { MiddlewareInterface } from '@core/middleware/middleware.interface.js';
import HttpError from '@core/errors/http-error.js';

export class PrivateRouteMiddleware implements MiddlewareInterface {
  public async execute({ user }: Request, _res: Response, next: NextFunction): Promise<void> {
    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Пользователь не авторизован',
        'PrivateRouteMiddleware',
      );
    }

    next();
  }
}
