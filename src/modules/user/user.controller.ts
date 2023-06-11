import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';

import { Controller } from '@core/controller/controller.abstract.js';
import CreateUserDto from '@modules/user/dto/create-user.dto.js';
import LoginUserDto from '@modules/user/dto/login-user.dto.js';
import UserRdo from '@modules/user/rdo/user.rdo.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import { UserServiceInterface } from '@modules/user/user-service.interface.js';
import { ConfigInterface } from '@core/config/config.interface.js';
import { AppComponent } from '@appTypes/app-component.enum.js';
import { RestSchema } from '@core/config/rest.schema.js';
import { HttpMethod } from '@appTypes/http-method.enum.js';
import HttpError from '@core/errors/http-error.js';
import { fillDTO } from '@utils/db.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(AppComponent.ConfigInterface) private readonly configService: ConfigInterface<RestSchema>
  ) {
    super(logger);

    this.logger.info('Регистрация маршрутов для UserController…');
    this.addRoute({
      path: '/signup',
      method: HttpMethod.Post,
      handler: this.create,
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
    });
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
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
}
