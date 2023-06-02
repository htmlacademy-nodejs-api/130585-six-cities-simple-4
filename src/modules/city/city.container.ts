import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { CityServiceInterface } from '@modules/city/city-service.interface.js';
import { CityEntity, CityModel } from '@modules/city/city.entity.js';
import CityService from '@modules/city/city.service.js';
import { AppComponent } from '@appTypes/app-component.enum.js';

export function createCityContainer () {
  const container = new Container();

  container.bind<CityServiceInterface>(AppComponent.UserServiceInterface).to(CityService);
  container.bind<types.ModelType<CityEntity>>(AppComponent.CityModel).toConstantValue(CityModel);

  return container;
}
