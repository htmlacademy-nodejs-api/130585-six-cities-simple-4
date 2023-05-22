import { PinoService } from '@core/logger/pino.service.js';
import ConfigService from '@core/config/config.service.js';
import RESTApplication from '@app/rest.js';

async function boostrap() {
  const logger = new PinoService();
  const config = new ConfigService(logger);
  const RESTApp = new RESTApplication(logger, config);

  await RESTApp.init();
}

boostrap();
