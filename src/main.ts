import 'reflect-metadata';
import { Container } from 'inversify';

import { AppComponent } from '@appTypes/app-component.enum.js';
import RESTApplication from '@app/rest.js';
import { createRESTApplicationContainer } from '@app/rest.container.js';
import { createUserContainer } from '@modules/user/user.container.js';
import { createCityContainer } from '@modules/city/city.container.js';
import { createRentContainer } from '@modules/rent/rent.container.js';

async function boostrap() {
  const mainContainer = Container.merge(
    createRESTApplicationContainer(),
    createUserContainer(),
    createCityContainer(),
    createRentContainer(),
  );

  await mainContainer.get<RESTApplication>(AppComponent.RESTApplication).init();
}

boostrap();
