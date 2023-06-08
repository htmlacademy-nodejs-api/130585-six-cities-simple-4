import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Controller } from '@core/controller/controller.abstract.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import { CityServiceInterface } from '@modules/city/city-service.interface.js';
import CreateCityDto from '@modules/city/dto/create-city.dto.js';
import CityRdo from '@modules/city/rdo/city.rdo.js';
import { AppComponent } from '@appTypes/app-component.enum.js';
import { HttpMethod } from '@appTypes/http-method.enum.js';
import { fillDTO } from '@utils/db.js';

@injectable()
export default class CityController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(AppComponent.CityServiceInterface) private readonly cityService: CityServiceInterface,
  ) {
    super(logger);

    this.logger.info('Регистрация маршрутов для CategoryController…');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const cities = await this.cityService.find();
    const citiesToResponse = fillDTO(CityRdo, cities);

    this.ok(res, citiesToResponse);
  }

  public async create({ body }: Request<Record<string, unknown>, Record<string, unknown>, CreateCityDto>, res: Response): Promise<void> {
    const existCity = await this.cityService.findByCityName(body.name);

    if (existCity) {
      const errorMessage = `Город с названием «${ body.name }» уже существует`;

      this.send(res, StatusCodes.UNPROCESSABLE_ENTITY, { error: errorMessage });
      return this.logger.error(errorMessage);
    }

    const result = await this.cityService.create(body);

    this.created(res, fillDTO(CityRdo, result));
  }
}
