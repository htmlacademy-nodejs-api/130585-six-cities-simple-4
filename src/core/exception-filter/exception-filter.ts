import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';

import { ExceptionFilterInterface } from '@core/exception-filter/exception-filter.interface.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import { AppComponent } from '@appTypes/app-component.enum.js';
import HttpError from '@core/errors/http-error.js';
import { createError } from '@utils/db.js';

@injectable()
export default class ExceptionFilter implements ExceptionFilterInterface {
  constructor(@inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface) {
    this.logger.info('Регистрация ExceptionFilter');
  }

  private handleHttpError(error: HttpError, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(`[${error.detail}]: ${error.httpStatusCode} — ${error.message}`);
    res
      .status(error.httpStatusCode)
      .json(createError(error.message));
  }

  private handleOtherError(error: Error, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createError(error.message));
  }

  public catch(error: Error, req: Request, res: Response, next: NextFunction): void {
    if (error instanceof HttpError) {
      return this.handleHttpError(error, req, res, next);
    }

    this.handleOtherError(error, req, res, next);
  }
}
