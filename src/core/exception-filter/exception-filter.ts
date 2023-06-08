import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';

import { ExceptionFilterInterface } from '@core/exception-filter/exception-filter.interface.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import { AppComponent } from '@appTypes/app-component.enum.js';

@injectable()
export default class ExceptionFilter implements ExceptionFilterInterface {
  constructor(@inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface) {
    this.logger.info('Регистрация ExceptionFilter');
  }

  public catch(error: Error, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.error(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}
