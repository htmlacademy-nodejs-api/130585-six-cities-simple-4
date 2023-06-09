import { Container } from 'inversify';

import RESTApplication from '@app/rest.js';
import { AppComponent } from '@appTypes/app-component.enum.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import { ConfigInterface } from '@core/config/config.interface.js';
import { RestSchema } from '@core/config/rest.schema.js';
import { DBClientInterface } from '@core/db-client/db-client.interface.js';
import { ExceptionFilterInterface } from '@core/exception-filter/exception-filter.interface.js';

import PinoService from '@core/logger/pino.service.js';
import ConfigService from '@core/config/config.service.js';
import MongoClientService from '@core/db-client/mongo-client.service.js';
import ValidationExceptionFilter from '@core/exception-filter/validation.exception-filter.js';
import HttpErrorExceptionFilter from '@core/exception-filter/http-error.exception-filter.js';
import BaseExceptionFilter from '@core/exception-filter/base.exception-filter.js';

export function createRESTApplicationContainer() {
  const container = new Container();

  container.bind<RESTApplication>(AppComponent.RESTApplication).to(RESTApplication).inSingletonScope();
  container.bind<LoggerInterface>(AppComponent.LoggerInterface).to(PinoService).inSingletonScope();
  container.bind<ConfigInterface<RestSchema>>(AppComponent.ConfigInterface).to(ConfigService).inSingletonScope();
  container.bind<DBClientInterface>(AppComponent.DBClientInterface).to(MongoClientService).inSingletonScope();
  container.bind<ExceptionFilterInterface>(AppComponent.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();
  container.bind<ExceptionFilterInterface>(AppComponent.HttpErrorExceptionFilter).to(HttpErrorExceptionFilter).inSingletonScope();
  container.bind<ExceptionFilterInterface>(AppComponent.BaseExceptionFilter).to(BaseExceptionFilter).inSingletonScope();

  return container;
}
