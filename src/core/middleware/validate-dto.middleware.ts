import { Request, Response, NextFunction } from 'express';
import { ClassConstructor, plainToInstance, instanceToPlain } from 'class-transformer';
import { validate } from 'class-validator';

import { MiddlewareInterface } from '@core/middleware/middleware.interface.js';
import ValidationError from '@core/errors/validation-error.js';
import { transformErrors } from '@utils/index.js';

export class ValidateDtoMiddleware implements MiddlewareInterface {
  constructor(private dto: ClassConstructor<object>) {
  }

  public async execute(req: Request, _res: Response, next: NextFunction) {
    const { body, path } = req;
    const dtoInstance = plainToInstance(this.dto, body, {
      excludeExtraneousValues: true,
    });
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      throw new ValidationError(`Ошибки валидации: «${ path }»`, transformErrors(errors));
    }

    req.body = instanceToPlain(dtoInstance);

    next();
  }
}
