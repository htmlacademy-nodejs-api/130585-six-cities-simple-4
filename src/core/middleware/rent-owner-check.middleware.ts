import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { MiddlewareInterface } from '@core/middleware/middleware.interface.js';
import HttpError from '@core/errors/http-error.js';
import { RentServiceInterface } from '@modules/rent/rent-service.interface.js';
import { UserServiceInterface } from '@modules/user/user-service.interface.js';
import { HttpErrorText } from '@const/error-messages.js';

export class RentOwnerCheckMiddleware implements MiddlewareInterface {
  constructor(
    private readonly rentService: RentServiceInterface,
    private readonly userService: UserServiceInterface,
  ) {
  }

  public async execute({ params, user }: Request, _res: Response, next: NextFunction): Promise<void> {
    const { rentId } = params;
    const rent = await this.rentService.findById(rentId);

    if (rent === null) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Предложения c rentId = ${ rentId } не существует`,
        'RentOwnerCheckMiddleware',
      );
    }

    const rentUser = await this.userService.findById(rent.author.id.toString());

    if (rentUser === null) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Пользователь для предложения ${ rentId } не найден`,
        'RentOwnerCheckMiddleware',
      );
    }

    if (user.id !== rentUser.id) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        HttpErrorText.Forbidden,
        'RentOwnerCheckMiddleware',
      );
    }

    next();
  }
}
