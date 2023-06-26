import { Types } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { MiddlewareInterface } from '@core/middleware/middleware.interface.js';
import HttpError from '@core/errors/http-error.js';

export class ValidateObjectIdMiddleware implements MiddlewareInterface {
  constructor(private readonly param: string) {
  }

  public execute({ params }: Request, _res: Response, next: NextFunction) {
    const objectId = params[this.param];

    if (Types.ObjectId.isValid(objectId)) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `«${ objectId }» не валидный ObjectID`,
      'ValidateObjectIdMiddleware'
    );
  }
}
