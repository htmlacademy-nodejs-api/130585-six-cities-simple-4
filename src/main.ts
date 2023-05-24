import 'reflect-metadata';
import { Container } from 'inversify';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import { ConfigInterface } from '@core/config/config.interface.js';
import { RestSchema } from '@core/config/rest.schema.js';
import { AppComponent } from '@appTypes/app-component.enum.js';
import { PinoService } from '@core/logger/pino.service.js';
import ConfigService from '@core/config/config.service.js';
import RESTApplication from '@app/rest.js';

async function boostrap() {
  const container = new Container();

  container.bind<RESTApplication>(AppComponent.RESTApplication).to(RESTApplication).inSingletonScope();
  container.bind<LoggerInterface>(AppComponent.LoggerInterface).to(PinoService).inSingletonScope();
  container.bind<ConfigInterface<RestSchema>>(AppComponent.ConfigInterface).to(ConfigService).inSingletonScope();

  const RESTApp = container.get<RESTApplication>(AppComponent.RESTApplication);

  await RESTApp.init();
}

boostrap();
