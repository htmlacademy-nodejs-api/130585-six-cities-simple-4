import { LoggerInterface } from '@core/logger/logger.interface.js';

import { showInfo, showError } from '@utils/index.js';

export default class ConsoleLoggerService implements LoggerInterface {
  public debug(message: string, ...args: unknown[]): void {
    showInfo({
      text: message,
      icon: '→',
      args: [ ...args ],
      method: 'debug',
    });
  }

  public error(message: string, ...args: unknown[]): void {
    showError({
      text: message,
      args: [ ...args ],
      error: '',
    });
  }

  public info(message: string, ...args: unknown[]): void {
    showInfo({
      text: message,
      args: [ ...args ],
      method: 'info',
    });
  }

  public warn(message: string, ...args: unknown[]): void {
    showInfo({
      text: message,
      icon: '⚠',
      args: [ ...args ],
      method: 'warn',
    });
  }
}
