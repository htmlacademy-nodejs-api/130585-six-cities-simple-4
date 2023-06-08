import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import express, { Express } from 'express';

import { LoggerInterface } from '@core/logger/logger.interface.js';
import { ConfigInterface } from '@core/config/config.interface.js';
import { DBClientInterface } from '@core/db-client/db-client.interface.js';
import { ControllerInterface } from '@core/controller/controller.interface.js';
import { RestSchema } from '@core/config/rest.schema.js';
import { AppComponent } from '@appTypes/app-component.enum.js';
import { getMongoURI } from '@utils/index.js';

@injectable()
export default class RESTApplication {
  constructor(
    @inject(AppComponent.LoggerInterface)private readonly logger: LoggerInterface,
    @inject(AppComponent.ConfigInterface)private readonly config: ConfigInterface<RestSchema>,
    @inject(AppComponent.DBClientInterface) private readonly dbClient: DBClientInterface,
    @inject(AppComponent.CityController) private readonly cityController: ControllerInterface,
    private expressApp: Express = express(),
  ) {}

  private async initDB() {
    this.logger.info('Инициализация БД…');

    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.dbClient.connect(mongoUri);
    this.logger.info('Инициализация БД завершена!');
  }

  private initRoutes() {
    this.logger.info('Инициализация маршрутов...');
    this.expressApp.use('/cities', this.cityController.router);
    this.logger.info('Инициализация маршрутов завершена!');
  }

  private async initServer() {
    this.logger.info('Инициализация сервера…');

    const port = this.config.get('PORT');

    this.expressApp.listen(port);
    this.logger.info(`🚀 Cервер запущен на http://localhost:${port}!`);
  }

  public async init() {
    this.logger.info('Инициализация приложения…');

    await this.initDB();
    await this.initRoutes();
    await this.initServer();
  }
}
