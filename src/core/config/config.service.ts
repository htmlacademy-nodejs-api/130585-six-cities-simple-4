import { config } from 'dotenv';
import { ConfigInterface } from '@core/config/config.interface.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import { RestSchema, configRestSchema } from '@core/config/rest.schema.js';

export default class ConfigService implements ConfigInterface<RestSchema> {
  private readonly config: RestSchema;

  constructor(private readonly logger: LoggerInterface) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Невозможно прочитать файл .env. Возможно, он отсутствует.');
    }

    configRestSchema.load({});
    configRestSchema.validate({
      allowed: 'strict',
      output: this.logger.info,
    });

    this.config = configRestSchema.getProperties();
    this.logger.info('Файл .env успешно прочитан!');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
