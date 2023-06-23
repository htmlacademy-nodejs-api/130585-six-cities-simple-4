import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import { ExceptionFilterInterface } from '@core/exception-filter/exception-filter.interface.js';
import { AppComponent } from '@appTypes/app-component.enum.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import { ServiceError } from '@appTypes/service-error.enum.js';
import { createError } from '@utils/db.js';

@injectable()
export default class BaseExceptionFilter implements ExceptionFilterInterface {
  constructor(@inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface) {
    this.logger.info('Регистрация BaseExceptionFilter');
  }

  catch(error: Error, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.error(`[BaseExceptionFilter]: ${ error.message }`);

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createError(ServiceError.BaseError, error.message));
  }
}
