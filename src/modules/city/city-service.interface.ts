import { DocumentType } from '@typegoose/typegoose';

import CreateCityDto from '@modules/city/dto/create-city.dto.js';
import { CityEntity } from '@modules/city/city.entity.js';

export interface CityServiceInterface {
  create(dto: CreateCityDto, salt: string): Promise<DocumentType<CityEntity>>;
  findByCityId(cityId: string): Promise<DocumentType<CityEntity> | null>;
  findByCityName(cityName: string): Promise<DocumentType<CityEntity> | null>;
  findByCityNameOrCreate(dto: CreateCityDto, cityName: string): Promise<DocumentType<CityEntity>>;
}
