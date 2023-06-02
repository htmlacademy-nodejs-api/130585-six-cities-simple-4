import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import CreateCityDto from '@modules/city/dto/create-city.dto.js';
import { CityEntity } from '@modules/city/city.entity.js';
import { CityServiceInterface } from '@modules/city/city-service.interface.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import { AppComponent } from '@appTypes/app-component.enum.js';

@injectable()
export default class CityService implements CityServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.CityModel) private readonly cityModel: types.ModelType<CityEntity>
  ) {}

  public async create(dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const result = await this.cityModel.create(dto);
    this.logger.info(`Создан новый город: ${ dto.name }`);
    return result;
  }

  public async findByCityId(cityId: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findById(cityId).exec();
  }

  public async findByCityName(cityName: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findOne({ name: cityName }).exec();
  }

  public async findByCityNameOrCreate(dto: CreateCityDto, cityName: string | undefined): Promise<DocumentType<CityEntity> | null> {
    if (!cityName) {
      return null;
    }

    const existedCity = await this.findByCityName(cityName);

    if (existedCity) {
      return existedCity;
    }

    return this.create(dto);
  }
}
