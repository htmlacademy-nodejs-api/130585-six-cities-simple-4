import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { RentServiceInterface } from '@modules/rent/rent-service.interface.js';
import { RentEntity, RentModel } from '@modules/rent/rent.entity.js';
import { RentService } from '@modules/rent/rent.service.js';
import { AppComponent } from '@appTypes/app-component.enum.js';

export function createRentContainer () {
  const container = new Container();

  container.bind<RentServiceInterface>(AppComponent.RentServiceInterface).to(RentService);
  container.bind<types.ModelType<RentEntity>>(AppComponent.RentModel).toConstantValue(RentModel);

  return container;
}
