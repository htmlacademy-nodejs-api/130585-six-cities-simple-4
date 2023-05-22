import { LoggerInterface } from '@core/logger/logger.interface.js';
import { ConfigInterface } from '@core/config/config.interface.js';
import { RestSchema } from '@core/config/rest.schema.js';

export default class RESTApplication {
  constructor(
    private readonly logger: LoggerInterface,
    private readonly config: ConfigInterface<RestSchema>,
  ) {}

  public async init() {
    this.logger.info('Инициализация приложения…');
    this.logger.info(`Получение значений из env: $PORT = ${this.config.get('PORT')}, $SALT = ${this.config.get('SALT')}, $DB_HOST = ${this.config.get('DB_HOST')}`);
  }
}
