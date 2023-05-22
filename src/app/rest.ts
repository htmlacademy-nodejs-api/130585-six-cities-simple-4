import { LoggerInterface } from '@core/logger/logger.interface.js';
import { ConfigInterface } from '@core/config/config.interface.js';

export default class RESTApplication {
  constructor(
    private readonly logger: LoggerInterface,
    private readonly config: ConfigInterface,
  ) {}

  public async init() {
    this.logger.info('Инициализация приложения…');
    this.logger.info(`Получение значение из env $PORT: ${this.config.get('PORT')}`);
  }
}
