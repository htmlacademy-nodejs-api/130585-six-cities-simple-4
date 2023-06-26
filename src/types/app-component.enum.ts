export const AppComponent = {
  RESTApplication: Symbol.for('RESTApplication'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DBClientInterface: Symbol.for('DBClientInterface'),

  HttpErrorExceptionFilter: Symbol.for('HttpErrorExceptionFilter'),
  ValidationExceptionFilter: Symbol.for('ValidationExceptionFilter'),
  BaseExceptionFilter: Symbol.for('BaseExceptionFilter'),

  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  UserController: Symbol.for('UserController'),

  CityServiceInterface: Symbol.for('CityServiceInterface'),
  CityModel: Symbol.for('CityModel'),
  CityController: Symbol.for('CityController'),

  RentServiceInterface: Symbol.for('RentServiceInterface'),
  RentModel: Symbol.for('RentModel'),
  RentController: Symbol.for('RentController'),

  CommentServiceInterface: Symbol.for('CommentServiceInterface'),
  CommentModel: Symbol.for('CommentModel'),
  CommentController: Symbol.for('CommentController'),
} as const;
