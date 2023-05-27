import 'reflect-metadata';
import { Container } from 'inversify';

import { AppComponent } from '@appTypes/app-component.enum.js';
import RESTApplication from '@app/rest.js';
import { createRESTApplicationContainer } from '@app/rest.container.js';
import { createUserContainer } from '@modules/user/user.container.js';
import { createCityContainer } from '@modules/city/city.container.js';

async function boostrap() {
  const RESTApplicationContainer = createRESTApplicationContainer();
  const userContainer = createUserContainer();
  const cityContainer = createCityContainer();
  const mainContainer = Container.merge(
    RESTApplicationContainer,
    userContainer,
    cityContainer,
  );

  await mainContainer.get<RESTApplication>(AppComponent.RESTApplication).init();
}

boostrap();
