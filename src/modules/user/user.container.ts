import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { UserServiceInterface } from '@modules/user/user-service.interface.js';
import { UserEntity, UserModel } from '@modules/user/user.entity.js';
import UserService from '@modules/user/user.service.js';
import { AppComponent } from '@appTypes/app-component.enum.js';

export function createUserContainer () {
  const container = new Container();

  container.bind<UserServiceInterface>(AppComponent.UserServiceInterface).to(UserService).inSingletonScope();
  container.bind<types.ModelType<UserEntity>>(AppComponent.UserModel).toConstantValue(UserModel);

  return container;
}
