export const AppComponent = {
  RESTApplication: Symbol.for('RESTApplication'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DBClientInterface: Symbol.for('DBClientInterface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  CityServiceInterface: Symbol.for('CityServiceInterface'),
  CityModel: Symbol.for('CityModel'),
} as const;
