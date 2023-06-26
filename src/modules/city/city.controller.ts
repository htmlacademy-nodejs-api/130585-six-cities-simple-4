import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import { Controller } from '@core/controller/controller.abstract.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import { ConfigInterface } from '@core/config/config.interface.js';
import { RestSchema } from '@core/config/rest.schema.js';
import { CityServiceInterface } from '@modules/city/city-service.interface.js';
import { RentServiceInterface } from '@modules/rent/rent-service.interface.js';
import CreateCityDto from '@modules/city/dto/create-city.dto.js';
import CityRdo from '@modules/city/rdo/city.rdo.js';
import RentRdo from '@modules/rent/rdo/rent.rdo.js';
import { UnknownRecord } from '@appTypes/unknown-record.type.js';
import { RequestQuery } from '@appTypes/request-query.type.js';
import { AppComponent } from '@appTypes/app-component.enum.js';
import { HttpMethod } from '@appTypes/http-method.enum.js';
import { fillDTO } from '@utils/index.js';
import HttpError from '@core/errors/http-error.js';
import { ValidateObjectIdMiddleware } from '@core/middleware/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '@core/middleware/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '@core/middleware/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '@core/middleware/private-route.middleware.js';

type ParamsCityDetails = {
  cityId: string;
} | ParamsDictionary

@injectable()
export default class CityController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.CityServiceInterface) private readonly cityService: CityServiceInterface,
    @inject(AppComponent.RentServiceInterface) private readonly rentService: RentServiceInterface,
    @inject(AppComponent.ConfigInterface) protected readonly config: ConfigInterface<RestSchema>,
  ) {
    super(logger, config);

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
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCityDto),
      ],
    });
    this.addRoute({
      path: '/:cityId/rents',
      method: HttpMethod.Get,
      handler: this.getRentsFromCity,
      middlewares: [
        new ValidateObjectIdMiddleware('cityId'),
        new DocumentExistsMiddleware(this.cityService, 'Города', 'cityId'),
      ],
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const cities = await this.cityService.find();
    const citiesToResponse = fillDTO(CityRdo, cities);

    this.ok(res, citiesToResponse);
  }

  public async create(
    { body }: Request<UnknownRecord, UnknownRecord, CreateCityDto>,
    res: Response,
  ): Promise<void> {
    const existCity = await this.cityService.findByCityName(body.name);

    if (existCity) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Город с названием «${ body.name }» уже существует`,
        'CityController'
      );
    }

    const result = await this.cityService.create(body);

    this.created(res, fillDTO(CityRdo, result));
  }

  public async getRentsFromCity(
    { params, query }: Request<ParamsCityDetails, UnknownRecord, UnknownRecord, RequestQuery>,
    res: Response
  ): Promise<void> {
    const { cityId } = params;
    const { limit } = query;
    const rents = await this.rentService.findByCityId(cityId, limit);

    this.ok(res, fillDTO(RentRdo, rents));
  }
}
