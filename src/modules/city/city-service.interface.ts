import { DocumentType } from '@typegoose/typegoose';

import CreateCityDto from '@modules/city/dto/create-city.dto.js';
import { CityEntity } from '@modules/city/city.entity.js';
import { DocumentExistsInterface } from '@appTypes/document-exists.interface.js';

export interface CityServiceInterface extends DocumentExistsInterface {
  create(dto: CreateCityDto): Promise<DocumentType<CityEntity>>;
  findByCityId(cityId: string): Promise<DocumentType<CityEntity> | null>;
  findByCityName(cityName: string): Promise<DocumentType<CityEntity> | null>;
  findByCityNameOrCreate(dto: CreateCityDto, cityName: string): Promise<DocumentType<CityEntity>>;
  find(): Promise<DocumentType<CityEntity>[]>;
}
