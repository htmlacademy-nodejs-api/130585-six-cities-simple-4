import { PinoService } from '@core/logger/pino.service.js';
import RESTApplication from '@app/rest.js';

async function boostrap() {
  const logger = new PinoService();
  const RESTApp = new RESTApplication(logger);

  await RESTApp.init();
}

boostrap();
