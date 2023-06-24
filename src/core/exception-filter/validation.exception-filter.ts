import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import { ExceptionFilterInterface } from '@core/exception-filter/exception-filter.interface.js';
import { AppComponent } from '@appTypes/app-component.enum.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import ValidationError from '@core/errors/validation-error.js';
import { ServiceError } from '@appTypes/service-error.enum.js';
import { createError } from '@utils/index.js';


@injectable()
export default class ValidationExceptionFilter implements ExceptionFilterInterface {
  constructor(@inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface) {
    this.logger.info('Регистрация ValidationExceptionFilter');
  }

  private handleError(error: ValidationError, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(`[ValidationExceptionFilter]: ${ error.message }`);

    error.details.forEach(
      (errorField) => this.logger.error(`[${ errorField.property }] — ${ errorField.messages }`)
    );

    res
      .status(StatusCodes.BAD_REQUEST)
      .json(createError(ServiceError.ValidationError, error.message, error.details));
  }

  catch(error: Error, req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof ValidationError)) {
      return next(error);
    }

    this.handleError(error, req, res, next);
  }
}
