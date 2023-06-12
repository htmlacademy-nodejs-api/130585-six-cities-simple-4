import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Controller } from '@core/controller/controller.abstract.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import { CommentServiceInterface } from '@modules/comment/comment.service.interface.js';
import { RentServiceInterface } from '@modules/rent/rent-service.interface.js';
import CreateCommentDto from '@modules/comment/dto/create-comment.dto.js';
import CommentRdo from '@modules/comment/rdo/comment.rdo.js';
import { UnknownRecord } from '@appTypes/unknown-record.type.js';
import { AppComponent } from '@appTypes/app-component.enum.js';
import { HttpMethod } from '@appTypes/http-method.enum.js';
import { fillDTO } from '@utils/db.js';
import HttpError from '@core/errors/http-error.js';

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(AppComponent.RentServiceInterface) private readonly rentService: RentServiceInterface,

  ) {
    super(logger);

    this.logger.info('Регистрация маршрутов для CommentController…');

    this.addRoute({
      path: '/', method: HttpMethod.Post,
      handler: this.create,
    });
  }

  public async create(
    { body }: Request<UnknownRecord, UnknownRecord, CreateCommentDto>,
    res: Response,
  ): Promise<void> {
    const { rentId } = body;
    const existsRent = await this.rentService.findById(rentId);

    if (!existsRent) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Предложения об аренде с id «${ rentId }» не существует`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create(body);
    await this.rentService.incCommentCount(rentId);
    await this.commentService.countRatingByRentId(rentId);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
