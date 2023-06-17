import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { Controller } from '@core/controller/controller.abstract.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import { RentServiceInterface } from '@modules/rent/rent-service.interface.js';
import { UserServiceInterface } from '@modules/user/user-service.interface.js';
import { CommentServiceInterface } from '@modules/comment/comment.service.interface.js';
import RentRdo from '@modules/rent/rdo/rent.rdo.js';
import CreateRentDto from '@modules/rent/dto/create-rent.dto.js';
import UpdateRentDto from '@modules/rent/dto/update-rent.dto.js';
import CommentRdo from '@modules/comment/rdo/comment.rdo.js';
import { UnknownRecord } from '@appTypes/unknown-record.type.js';
import { AppComponent } from '@appTypes/app-component.enum.js';
import { HttpMethod } from '@appTypes/http-method.enum.js';
import { fillDTO } from '@utils/db.js';
import { RequestQuery } from '@appTypes/request-query.type';
import { ValidateObjectIdMiddleware } from '@core/middleware/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '@core/middleware/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '@core/middleware/document-exists.middleware.js';

// тип параметров запроса
type ParamsRentDetails = {
  rentId: string;
} | ParamsDictionary;

@injectable()
export default class RentController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.RentServiceInterface) private readonly rentService: RentServiceInterface,
    @inject(AppComponent.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(AppComponent.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
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
      middlewares: [
        new ValidateObjectIdMiddleware('rentId'),
        new DocumentExistsMiddleware(this.rentService, 'Предложения по аренде', 'rentId'),
      ],
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateRentDto),
        new DocumentExistsMiddleware(this.userService, 'Пользователя', 'author'),
      ],
    });
    this.addRoute({
      path: '/:rentId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateObjectIdMiddleware('rentId'),
        new DocumentExistsMiddleware(this.rentService, 'Предложения по аренде', 'rentId'),
      ],
    });
    this.addRoute({
      path: '/:rentId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('rentId'),
        new ValidateDtoMiddleware(UpdateRentDto),
        new DocumentExistsMiddleware(this.rentService, 'Предложения по аренде', 'rentId'),
      ],
    });
    this.addRoute({
      path: '/:rentId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('rentId'),
        new DocumentExistsMiddleware(this.rentService, 'Предложения по аренде', 'rentId'),
      ],
    });
    this.addRoute({
      path: '/sort/top-rated',
      method: HttpMethod.Get,
      handler: this.getTopRated,
    });
    this.addRoute({
      path: '/sort/popular',
      method: HttpMethod.Get,
      handler: this.getPopular,
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

    await this.commentService.deleteByRentId(rentId);
    this.noContent(res, fillDTO(RentRdo, rent));
  }

  public async update(
    { body, params }: Request<ParamsRentDetails, UnknownRecord, UpdateRentDto>,
    res: Response,
  ): Promise<void> {
    const { rentId } = params;
    const updatedRent = await this.rentService.updateById(rentId, body);
    this.ok(res, fillDTO(RentRdo, updatedRent));
  }

  public async getComments(
    { params, query }: Request<ParamsRentDetails, UnknownRecord, UnknownRecord, RequestQuery>,
    res: Response,
  ): Promise<void> {
    const { rentId } = params;
    const { limit } = query;
    const comments = await this.commentService.findByRentId(rentId, limit);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async getTopRated(
    { query }: Request<UnknownRecord, UnknownRecord, UnknownRecord, RequestQuery>,
    res: Response,
  ): Promise<void> {
    const { limit } = query;
    const topRatedRents = await this.rentService.findTopRated(limit);

    this.ok(res, fillDTO(RentRdo, topRatedRents));
  }

  public async getPopular(
    { query }: Request<UnknownRecord, UnknownRecord, UnknownRecord, RequestQuery>,
    res: Response,
  ): Promise<void> {
    const { limit } = query;
    const popularRents = await this.rentService.findPopular(limit);

    this.ok(res, fillDTO(RentRdo, popularRents));
  }
}
