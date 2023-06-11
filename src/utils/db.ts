import * as crypto from 'node:crypto';
import { plainToInstance, ClassConstructor } from 'class-transformer';

import { DBAuthSource } from '@const/db.js';

export const getMongoURI = (
  username: string,
  password: string,
  host: string,
  port: string,
  dbName: string,
): string => `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=${DBAuthSource.Admin}`;

export const createSHA256 = (string: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(string).digest('hex');
};

export function fillDTO<T, V>(dto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(dto, plainObject, {
    excludeExtraneousValues: true,
  });
}

export function createError(message: string) {
  return {
    error: message,
  };
}
