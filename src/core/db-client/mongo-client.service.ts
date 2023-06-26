import { setTimeout } from 'node:timers/promises';
import { inject, injectable } from 'inversify';
import mongoose, { Mongoose } from 'mongoose';

import { DBClientInterface } from '@core/db-client/db-client.interface.js';
import { AppComponent } from '@appTypes/app-component.enum.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import { DBRetry } from '@const/db.js';

@injectable()
export default class MongoClientService implements DBClientInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    private isConnected = false,
    private mongooseInstance: Mongoose | null = null,
  ) {
  }

  private async connectWithRetry(uri: string): Promise<Mongoose> {
    let attempt = 0;

    while (attempt < DBRetry.Count) {
      try {
        return await mongoose.connect(uri);

      } catch (error) {
        attempt++;
        this.logger.error(`Неуспешная попытка соединения с БД. Попыток: ${ attempt }`);
        await setTimeout(DBRetry.Timeout);
      }
    }

    this.logger.error(`Невозможно установить соединение с БД. Попыток: ${ attempt }`);
    throw new Error('Невозможно установить соединение с БД');
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnected) {
      throw new Error('Клиент MongoDB уже подключен');
    }

    this.logger.info('Попытка соединения с MongoDB…');
    this.mongooseInstance = await this.connectWithRetry(uri);
    this.isConnected = true;
    this.logger.info('Соединение с MongoDB установлено!');
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Нет соединения с MongoDB');
    }

    await this.mongooseInstance?.disconnect();
    this.isConnected = false;
    this.mongooseInstance = null;
    this.logger.info('Соединение с MongoDB закрыто');
  }
}
