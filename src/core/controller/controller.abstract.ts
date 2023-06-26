import { Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { injectable } from 'inversify';
import asyncHandler from 'express-async-handler';

import { ControllerInterface } from '@core/controller/controller.interface.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import { ConfigInterface } from '@core/config/config.interface.js';
import { RestSchema } from '@core/config/rest.schema.js';
import { RouteInterface } from '@appTypes/route.interface.js';
import { ContentType } from '@const/common.js';
import { UnknownRecord } from '@appTypes/unknown-record.type.js';
import { transformObjectStaticPaths, getServerPath, isUnknownRecord } from '@utils/index.js';
import { STATIC_FIELDS } from '@const/db.js';

@injectable()
export abstract class Controller implements ControllerInterface {
  private readonly _router: Router;

  constructor(
    protected readonly logger: LoggerInterface,
    protected readonly config: ConfigInterface<RestSchema>,
  ) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  protected addStaticPath(data: UnknownRecord): void {
    const serverPath = getServerPath(this.config.get('HOST'), this.config.get('PORT'));

    transformObjectStaticPaths(
      STATIC_FIELDS,
      `${ serverPath }/${ this.config.get('STATIC_DIRECTORY') }`,
      `${ serverPath }/${ this.config.get('UPLOAD_DIRECTORY') }`,
      data,
    );
  }

  public addRoute(route: RouteInterface) {
    const routeHandler = asyncHandler(route.handler.bind(this));
    const middlewares = route.middlewares?.map(
      (middleware) => asyncHandler(middleware.execute.bind(middleware))
    ) || [];

    this._router[route.method](route.path, [ ...middlewares, routeHandler ]);
    this.logger.info(`Зарегистрирован маршрут: ${ route.method.toUpperCase() } ${ route.path }`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    if (isUnknownRecord(data)) {
      this.addStaticPath(data);
    }

    res
      .type(ContentType.Json)
      .status(statusCode)
      .json(data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }
}

