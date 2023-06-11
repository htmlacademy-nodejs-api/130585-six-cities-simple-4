import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';

import { Controller } from '@core/controller/controller.abstract.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import { RentServiceInterface } from '@modules/rent/rent-service.interface.js';
import RentRdo from '@modules/rent/rdo/rent.rdo.js';
import CreateRentDto from '@modules/rent/dto/create-rent.dto.js';
import UpdateRentDto from '@modules/rent/dto/update-rent.dto.js';
import { UnknownRecord } from '@appTypes/unknown-record.type.js';
import { AppComponent } from '@appTypes/app-component.enum.js';
import { HttpMethod } from '@appTypes/http-method.enum.js';
import { fillDTO } from '@utils/db.js';
import HttpError from '@core/errors/http-error.js';

// тип параметров запроса
type ParamsRentDetails = {
  rentId: string;
} | ParamsDictionary;

@injectable()
export default class RentController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(AppComponent.RentServiceInterface) private readonly rentService: RentServiceInterface,
  ) {
    super(logger);

    this.logger.info('Регистрация маршрутов для RentController…');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
    });
    this.addRoute({
      path: '/:rentId',
      method: HttpMethod.Get,
      handler: this.show,
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
    });
    this.addRoute({
      path: '/:rentId',
      method: HttpMethod.Delete,
      handler: this.delete,
    });
    this.addRoute({
      path: '/:rentId',
      method: HttpMethod.Patch,
      handler: this.update,
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const rents = await this.rentService.find();
    const rentsToResponse = fillDTO(RentRdo, rents);

    this.ok(res, rentsToResponse);
  }

  public async show(
    { params }: Request<ParamsRentDetails>,
    res: Response,
  ): Promise<void> {
    const { rentId } = params;
    const rent = await this.rentService.findById(rentId);

    if (!rent) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Предложения с id ${ rentId } не существует`,
        'RentController'
      );
    }

    this.ok(res, fillDTO(RentRdo, rent));
  }

  public async create(
    { body }: Request<UnknownRecord, UnknownRecord, CreateRentDto>,
    res: Response,
  ): Promise<void> {
    const newRent = await this.rentService.create(body);
    const rent = await this.rentService.findById(newRent.id);

    this.created(res, fillDTO(RentRdo, rent));
  }

  public async delete(
    { params }: Request<ParamsRentDetails>,
    res: Response,
  ): Promise<void> {
    const { rentId } = params;
    const rent = await this.rentService.deleteById(rentId);

    if (!rent) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Предложения с id ${ rentId } не существует`,
        'RentController'
      );
    }

    this.noContent(res, fillDTO(RentRdo, rent));
  }

  public async update(
    { body, params }: Request<ParamsRentDetails, UnknownRecord, UpdateRentDto>,
    res: Response,
  ): Promise<void> {
    const { rentId } = params;
    const updatedRent = await this.rentService.updateById(rentId, body);

    if (!updatedRent) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Предложения с id ${ rentId } не существует`,
        'RentController'
      );
    }

    this.ok(res, fillDTO(RentRdo, updatedRent));
  }
}
