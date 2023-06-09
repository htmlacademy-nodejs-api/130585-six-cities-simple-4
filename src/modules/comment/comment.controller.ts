import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import { Controller } from '@core/controller/controller.abstract.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import { ConfigInterface } from '@core/config/config.interface.js';
import { RestSchema } from '@core/config/rest.schema.js';
import { CommentServiceInterface } from '@modules/comment/comment.service.interface.js';
import { RentServiceInterface } from '@modules/rent/rent-service.interface.js';
import { UserServiceInterface } from '@modules/user/user-service.interface.js';
import CreateCommentDto from '@modules/comment/dto/create-comment.dto.js';
import CommentRdo from '@modules/comment/rdo/comment.rdo.js';
import { UnknownRecord } from '@appTypes/unknown-record.type.js';
import { AppComponent } from '@appTypes/app-component.enum.js';
import { HttpMethod } from '@appTypes/http-method.enum.js';
import { fillDTO } from '@utils/index.js';
import { ValidateDtoMiddleware } from '@core/middleware/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '@core/middleware/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '@core/middleware/private-route.middleware.js';

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(AppComponent.RentServiceInterface) private readonly rentService: RentServiceInterface,
    @inject(AppComponent.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(AppComponent.ConfigInterface) protected readonly config: ConfigInterface<RestSchema>,
  ) {
    super(logger, config);

    this.logger.info('Регистрация маршрутов для CommentController…');

    this.addRoute({
      path: '/', method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto),
        new DocumentExistsMiddleware(this.rentService, 'Предложения по аренде', 'rentId'),
        new DocumentExistsMiddleware(this.userService, 'Пользователя', 'author'),
      ],
    });
  }

  public async create(
    { body, user }: Request<UnknownRecord, UnknownRecord, CreateCommentDto>,
    res: Response,
  ): Promise<void> {
    const { rentId } = body;
    const comment = await this.commentService.create({ ...body, author: user.id });

    await this.rentService.incCommentCount(rentId);
    await this.commentService.countRatingByRentId(rentId);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
