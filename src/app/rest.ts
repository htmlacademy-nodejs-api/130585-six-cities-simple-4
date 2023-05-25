import 'reflect-metadata';
import { injectable, inject } from 'inversify';

import { LoggerInterface } from '@core/logger/logger.interface.js';
import { ConfigInterface } from '@core/config/config.interface.js';
import { DBClientInterface } from '@core/db-client/db-client.interface.js';
import { RestSchema } from '@core/config/rest.schema.js';
import { AppComponent } from '@appTypes/app-component.enum.js';
import { getMongoURI } from '@utils/index.js';

@injectable()
export default class RESTApplication {
  constructor(
    @inject(AppComponent.LoggerInterface)private readonly logger: LoggerInterface,
    @inject(AppComponent.ConfigInterface)private readonly config: ConfigInterface<RestSchema>,
    @inject(AppComponent.DBClientInterface) private readonly dbClient: DBClientInterface,
  ) {}

  private async initDB() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.dbClient.connect(mongoUri);
  }

  public async init() {
    this.logger.info('Инициализация приложения…');
    this.logger.info(`Получение значений из env: $PORT = ${this.config.get('PORT')}, $SALT = ${this.config.get('SALT')}, $DB_HOST = ${this.config.get('DB_HOST')}`);

    this.logger.info('Инициализация БД…');
    await this.initDB();
    this.logger.info('Инициализация БД завершена!');
  }
}
