export const AppComponent = {
  RESTApplication: Symbol.for('RESTApplication'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DBClientInterface: Symbol.for('DBClientInterface'),
  ExceptionFilterInterface: Symbol.for('ExceptionFilterInterface'),

  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  UserController: Symbol.for('UserController'),

  CityServiceInterface: Symbol.for('CityServiceInterface'),
  CityModel: Symbol.for('CityModel'),
  CityController: Symbol.for('CityController'),

  RentServiceInterface: Symbol.for('RentServiceInterface'),
  RentModel: Symbol.for('RentModel'),

  CommentServiceInterface: Symbol.for('CommentServiceInterface'),
  CommentModel: Symbol.for('CommentModel'),
} as const;
