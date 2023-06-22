import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: string;
  DB_NAME: string;
  UPLOAD_DIRECTORY: string;
  JWT_SECRET: string;
}

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Порт для входящих подключений',
    format: 'port',
    env: 'PORT',
    default: 4000,
  },
  SALT: {
    doc: 'Соль для хеширования паролей',
    format: String,
    env: 'SALT',
    default: null,
  },
  DB_HOST: {
    doc: 'IP-адрес сервера БД (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1',
  },
  DB_USER: {
    doc: 'Имя пользователя для соединения с БД',
    format: String,
    env: 'DB_USER',
    default: null,
  },
  DB_PASSWORD: {
    doc: 'Пароль пользователя для соединения с БД',
    format: String,
    env: 'DB_PASSWORD',
    default: null,
  },
  DB_PORT: {
    doc: 'Порт БД (MongoDB)',
    format: 'port',
    env: 'DB_PORT',
    default: '27017',
  },
  DB_NAME: {
    doc: 'Название БД (MongoDB)',
    format: String,
    env: 'DB_NAME',
    default: 'six_sities',
  },
  UPLOAD_DIRECTORY: {
    doc: 'Директория для сохранения файлов',
    format: String,
    env: 'UPLOAD_DIRECTORY',
    default: null,
  },
  JWT_SECRET: {
    doc: 'Секрет для создания JWT токена',
    format: String,
    env: 'JWT_SECRET',
    default: null,
  },
});
