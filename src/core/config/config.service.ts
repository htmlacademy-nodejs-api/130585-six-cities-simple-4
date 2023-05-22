import { DotenvParseOutput, config } from 'dotenv';
import { ConfigInterface } from '@core/config/config.interface.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';

export default class ConfigService implements ConfigInterface {
  private readonly config: NodeJS.ProcessEnv;

  constructor(private readonly logger: LoggerInterface) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Невозможно прочитать файл .env. Возможно, он отсутствует.');
    }

    this.config = <DotenvParseOutput>parsedOutput.parsed;
    this.logger.info('Файл .env успешно прочитан!');
  }

  public get(key: string): string | undefined {
    return this.config[key];
  }
}
