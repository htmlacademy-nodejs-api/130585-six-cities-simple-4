import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';

import { Controller } from '@core/controller/controller.abstract.js';
import CreateUserDto from '@modules/user/dto/create-user.dto.js';
import LoginUserDto from '@modules/user/dto/login-user.dto.js';
import UserRdo from '@modules/user/rdo/user.rdo.js';
import LoginUserRdo from '@modules/user/rdo/login-user.rdo.js';
import { UnknownRecord } from '@appTypes/unknown-record.type.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import { UserServiceInterface } from '@modules/user/user-service.interface.js';
import { ConfigInterface } from '@core/config/config.interface.js';
import { AppComponent } from '@appTypes/app-component.enum.js';
import { RestSchema } from '@core/config/rest.schema.js';
import { HttpMethod } from '@appTypes/http-method.enum.js';
import { fillDTO, createJWT } from '@utils/index.js';
import HttpError from '@core/errors/http-error.js';
import UploadAvatarRdo from '@modules/user/rdo/upload-avatar.rdo.js';
import { ValidateObjectIdMiddleware } from '@core/middleware/validate-objectid.middleware.js';
import { DocumentExistsMiddleware } from '@core/middleware/document-exists.middleware.js';
import { ValidateDtoMiddleware } from '@core/middleware/validate-dto.middleware.js';
import { JWT_ALGORITHM } from '@modules/user/user.const.js';
import { UploadFilesMiddleware } from '@core/middleware/upload-files.middleware.js';
import { PrivateRouteMiddleware } from '@core/middleware/private-route.middleware.js';
import { UserAvatarError, HttpErrorText } from '@const/error-messages.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(AppComponent.ConfigInterface) protected readonly config: ConfigInterface<RestSchema>,
  ) {
    super(logger, config);

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
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuthenticate,
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('userId'),
        new DocumentExistsMiddleware(this.userService, 'Пользователя', 'userId'),
        new UploadFilesMiddleware(this.config.get('UPLOAD_DIRECTORY'), 'avatar'),
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

    const result = await this.userService.create(body, this.config.get('SALT'));

    this.created(res, fillDTO(UserRdo, result));
  }

  public async login(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>,
    res: Response,
  ): Promise<void> {
    const user = await this.userService.verifyUser(body, this.config.get('SALT'));

    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        HttpErrorText.Unauthorized,
        'UserController',
      );
    }

    const { email, id } = user;
    const token = await createJWT(
      JWT_ALGORITHM,
      this.config.get('JWT_SECRET'),
      {
        email,
        id,
      }
    );

    this.ok(res, {
      ...fillDTO(LoginUserRdo, user),
      token,
    });
  }

  public async checkAuthenticate({ user }: Request, res: Response): Promise<void> {
    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        HttpErrorText.Unauthorized,
        'UserController'
      );
    }

    const { email } = user;
    const existedUser = await this.userService.findByEmail(email);

    this.ok(res, fillDTO(UserRdo, existedUser));
  }

  public async uploadAvatar({ file, params }: Request, res: Response): Promise<void> {
    if (!file?.filename) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        UserAvatarError.IsRequired,
        'UserController',
      );
    }

    const { userId } = params;
    const updateDto = {
      avatar: file?.filename,
    };

    await this.userService.updateById(userId, updateDto);
    this.created(res, fillDTO(UploadAvatarRdo, updateDto));
  }
}
