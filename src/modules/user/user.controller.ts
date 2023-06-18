import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';

import { Controller } from '@core/controller/controller.abstract.js';
import CreateUserDto from '@modules/user/dto/create-user.dto.js';
import LoginUserDto from '@modules/user/dto/login-user.dto.js';
import UserRdo from '@modules/user/rdo/user.rdo.js';
import { UnknownRecord } from '@appTypes/unknown-record.type.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import { UserServiceInterface } from '@modules/user/user-service.interface.js';
import { ConfigInterface } from '@core/config/config.interface.js';
import { AppComponent } from '@appTypes/app-component.enum.js';
import { RestSchema } from '@core/config/rest.schema.js';
import { HttpMethod } from '@appTypes/http-method.enum.js';
import { fillDTO } from '@utils/db.js';
import HttpError from '@core/errors/http-error.js';
import UploadAvatarRdo from '@modules/user/rdo/upload-avatar.rdo.js';
import { ValidateObjectIdMiddleware } from '@core/middleware/validate-objectid.middleware.js';
import { DocumentExistsMiddleware } from '@core/middleware/document-exists.middleware.js';
import { ValidateDtoMiddleware } from '@core/middleware/validate-dto.middleware.js';
import { UploadFilesMiddleware } from '@core/middleware/upload-files.middleware';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(AppComponent.ConfigInterface) private readonly configService: ConfigInterface<RestSchema>,
  ) {
    super(logger);

    this.logger.info('Регистрация маршрутов для UserController…');
    this.addRoute({
      path: '/signup',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [ new ValidateDtoMiddleware(CreateUserDto) ],
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [ new ValidateDtoMiddleware(LoginUserDto) ],
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new DocumentExistsMiddleware(this.userService, 'Пользователя', 'userId'),
        new UploadFilesMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),
      ],
    });
  }

  public async create(
    { body }: Request<UnknownRecord, UnknownRecord, CreateUserDto>,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `Пользователь с email «${ body.email }» уже существует`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(
      res,
      fillDTO(UserRdo, result)
    );
  }

  public async login(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>,
    _res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (!existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `Пользователя с email ${ body.email } не существует`,
        'UserController',
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Метод не закончен',
      'UserController',
    );
  }

  public async uploadAvatar (req: Request, res: Response): Promise<void> {
    const result = {
      url: req?.file?.path,
    };

    this.created(res, fillDTO(UploadAvatarRdo, result));
  }
}
