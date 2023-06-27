import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { MiddlewareInterface } from '@core/middleware/middleware.interface.js';
import HttpError from '@core/errors/http-error.js';
import { HttpErrorText } from '@const/error-messages.js';

export class AlreadyAuthorizedMiddleware implements MiddlewareInterface {
  public async execute({ user }: Request, _res: Response, next: NextFunction): Promise<void> {
    if (user) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        HttpErrorText.AlreadyAuthorized,
        'AlreadyAuthorizedMiddleware',
      );
    }

    next();
  }
}
