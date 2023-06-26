import { Logger, pino } from 'pino';
import { injectable } from 'inversify';

import { LoggerInterface } from '@core/logger/logger.interface.js';

@injectable()
export default class PinoService implements LoggerInterface {
  constructor(private readonly logger: Logger = pino()) {
    this.logger.info('Логгер создан…');
  }

  info(message: string, ...args: unknown[]) {
    this.logger.info(message, ...args);
  }

  warn(message: string, ...args: unknown[]) {
    this.logger.warn(message, ...args);
  }

  error(message: string, ...args: unknown[]) {
    this.logger.warn(message, ...args);
  }

  debug(message: string, ...args: unknown[]) {
    this.logger.warn(message, ...args);
  }
}
