import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ClassConstructor, plainToInstance, instanceToPlain } from 'class-transformer';
import { validate } from 'class-validator';

import { MiddlewareInterface } from '@core/middleware/middleware.interface.js';

export class ValidateDtoMiddleware implements MiddlewareInterface {
  constructor(private dto: ClassConstructor<object>) {
  }

  public async execute(req: Request, res: Response, next: NextFunction) {
    const dtoInstance = plainToInstance(this.dto, req.body, {
      excludeExtraneousValues: true,
    });
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      res.status(StatusCodes.BAD_REQUEST).send(errors);
      return;
    }

    req.body = instanceToPlain(dtoInstance);

    next();
  }
}
