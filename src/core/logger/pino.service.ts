import { Logger, pino } from 'pino';
import { LoggerInterface } from '@core/logger/logger.interface.js';

export class PinoService implements LoggerInterface {
  constructor(private readonly logger: Logger = pino()) {}

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
