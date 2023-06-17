import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { MiddlewareInterface } from '@core/middleware/middleware.interface.js';
import { DocumentExistsInterface } from '@appTypes/document-exists.interface.js';
import HttpError from '@core/errors/http-error.js';

export class DocumentExistsMiddleware implements MiddlewareInterface {
  constructor(
    private readonly service: DocumentExistsInterface,
    private readonly entityName: string,
    private readonly idParam: string,
  ) {
  }

  public async execute({ params, body }: Request, _res: Response, next: NextFunction): Promise<void> {
    const documentId = params[this.idParam] || body[this.idParam];

    if (documentId !== undefined && !await this.service.exists(documentId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `${ this.entityName } c ${ this.idParam } = ${ documentId } не существует`,
        'DocumentExistsMiddleware'
      );
    }

    next();
  }
}
