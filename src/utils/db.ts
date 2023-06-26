import * as crypto from 'node:crypto';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { SignJWT } from 'jose';
import { ValidationError } from 'class-validator';

import { DBAuthSource } from '@const/db.js';
import { JwtPayload } from '@appTypes/jwt-payload.type.js';
import { TransformedValidationError } from '@appTypes/transformed-validation-error.type.js';
import { Encoding } from '@const/common.js';
import { JwtParam } from '@modules/user/user.const.js';
import { ServiceError } from '@appTypes/service-error.enum.js';

export const getMongoURI = (
  username: string,
  password: string,
  host: string,
  port: string,
  dbName: string,
): string => `mongodb://${ username }:${ password }@${ host }:${ port }/${ dbName }?authSource=${ DBAuthSource.Admin }`;

export const getServerPath = (host: string, port: number) => `http://${ host }:${ port }`;

export const createSHA256 = (string: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(string).digest('hex');
};

export function fillDTO<T, V>(dto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(dto, plainObject, {
    excludeExtraneousValues: true,
  });
}

export function createError(serviceError: ServiceError, message: string, details: TransformedValidationError[] = []) {
  return {
    message,
    errorType: serviceError,
    details: [ ...details ],
  };
}

export async function createJWT(alg: string, jwtSecret: string, payload: JwtPayload): Promise<string> {
  const secretKey = crypto.createSecretKey(jwtSecret, Encoding.Utf8);

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(JwtParam.ExpTime)
    .sign(secretKey);
}

export function transformErrors(errors: ValidationError[]): TransformedValidationError[] {
  return errors.map(({ property, value, constraints }) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));
}
