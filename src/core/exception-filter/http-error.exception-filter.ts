import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';

import { ExceptionFilterInterface } from '@core/exception-filter/exception-filter.interface.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import { AppComponent } from '@appTypes/app-component.enum.js';
import HttpError from '@core/errors/http-error.js';
import { ServiceError } from '@appTypes/service-error.enum.js';
import { createError } from '@utils/db.js';

@injectable()
export default class HttpErrorExceptionFilter implements ExceptionFilterInterface {
  constructor(@inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface) {
    this.logger.info('Регистрация HttpErrorExceptionFilter');
  }

  public catch(error: Error, req: Request, res: Response, next: NextFunction): void {
    if (error instanceof HttpError) {
      return next(error);
    }

    this.logger.error(`[HttpErrorExceptionFilter]: ${ req.path }] — ${ error.message }`);

    res
      .status(StatusCodes.BAD_REQUEST)
      .json(createError(ServiceError.HttpError, error.message));
  }
}
