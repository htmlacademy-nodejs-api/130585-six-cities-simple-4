import { LoggerInterface } from '@core/logger/logger.interface.js';

export default class RESTApplication {
  constructor(private readonly logger: LoggerInterface) {}

  public async init() {
    this.logger.info('Инициализация приложения…');
  }
}
