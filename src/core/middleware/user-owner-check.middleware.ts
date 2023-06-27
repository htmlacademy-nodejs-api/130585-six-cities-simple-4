import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { MiddlewareInterface } from '@core/middleware/middleware.interface.js';
import HttpError from '@core/errors/http-error.js';
import { UserServiceInterface } from '@modules/user/user-service.interface.js';
import { HttpErrorText } from '@const/error-messages.js';

export class UserOwnerCheckMiddleware implements MiddlewareInterface {
  constructor(private readonly userService: UserServiceInterface) {
  }

  public async execute({ params, user }: Request, _res: Response, next: NextFunction): Promise<void> {
    const { userId } = params;
    const existsUser = await this.userService.findById(userId);

    if (existsUser === null) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Пользователя c userId = ${ userId } не существует`,
        'UserOwnerCheckMiddleware',
      );
    }

    if (user.id !== existsUser.id) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        HttpErrorText.Forbidden,
        'UserOwnerCheckMiddleware',
      );
    }

    next();
  }
}
