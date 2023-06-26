import { CliCommandInterface } from './cli-command.interface.js';
import { UserServiceInterface } from '@modules/user/user-service.interface.js';
import { CityServiceInterface } from '@modules/city/city-service.interface.js';
import { RentServiceInterface } from '@modules/rent/rent-service.interface.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import { ConfigInterface } from '@core/config/config.interface.js';
import { DBClientInterface } from '@core/db-client/db-client.interface.js';
import { RestSchema } from '@core/config/rest.schema.js';
import { Rent } from '@appTypes/rent.type.js';

import UserService from '@modules/user/user.service.js';
import { UserModel } from '@modules/user/user.entity.js';
import CityService from '@modules/city/city.service.js';
import { CityModel } from '@modules/city/city.entity.js';
import { RentService } from '@modules/rent/rent.service.js';
import { RentModel } from '@modules/rent/rent.entity.js';
import ConsoleLoggerService from '@core/logger/console.service.js';
import ConfigService from '@core/config/config.service.js';
import MongoClientService from '@core/db-client/mongo-client.service.js';
import FileReaderTSV from '@core/file-reader/file-reader-tsv.js';
import { parseRent, getMongoURI } from '@utils/index.js';
import { UserDefault } from '@modules/user/user.const.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private logger: LoggerInterface;
  private userService!: UserServiceInterface;
  private cityService!: CityServiceInterface;
  private rentService!: RentServiceInterface;
  private config!: ConfigInterface<RestSchema>;
  private DBService!: DBClientInterface;

  constructor() {
    this.handleStart = this.handleStart.bind(this);
    this.handleLine = this.handleLine.bind(this);
    this.handleEnd = this.handleEnd.bind(this);

    this.logger = new ConsoleLoggerService();
    this.config = new ConfigService(this.logger);
    this.userService = new UserService(this.logger, UserModel);
    this.cityService = new CityService(this.logger, CityModel);
    this.rentService = new RentService(this.logger, RentModel);
    this.DBService = new MongoClientService(this.logger);
  }

  private async saveRent(rent: Rent) {
    const existCity = await this.cityService.findByCityNameOrCreate(rent.city, rent.city.name);
    const user = await this.userService.findOrCreate({
      ...rent.author,
      pass: UserDefault.Password,
    }, this.config.get('SALT'));

    if (rent.author.avatar) {
      await this.userService.updateById(user.id, {
        avatar: rent.author.avatar,
      });
    }

    const savedRent = await this.rentService.create({
      ...rent,
      city: existCity.id,
      author: user.id,
    });

    if (rent.preview) {
      await this.rentService.updateById(savedRent.id, {
        preview: rent.preview,
      });
    }
  }

  private handleStart(file: string) {
    this.logger.debug(`Начато чтение файла ${ file }:`);
  }

  private async handleLine(line: string, resolve: () => void) {
    const rent = parseRent(line);

    if (rent !== null) {
      await this.saveRent(rent);

    } else {
      this.logger.error(`Ошибка при чтении строки ${ line }`);
    }

    resolve();
  }

  private handleEnd(count: number) {
    this.logger.debug(`${ count } строк прочитано`);
    this.DBService.disconnect();
  }

  public async execute(file: string): Promise<void> {
    const fileName = file.trim();
    const uri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.DBService.connect(uri);

    const fileReader = new FileReaderTSV(fileName);

    fileReader.on('start', this.handleStart);
    fileReader.on('line', this.handleLine);
    fileReader.on('end', this.handleEnd);

    try {
      await fileReader.read();

    } catch (err) {
      this.logger.error('Не удалось импортировать данные из файла по причине:', err);
    }
  }
}
