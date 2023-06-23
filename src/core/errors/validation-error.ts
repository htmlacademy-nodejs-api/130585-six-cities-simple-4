import { StatusCodes } from 'http-status-codes';

import { TransformedValidationError } from '@appTypes/transformed-validation-error.type.js';

export default class ValidationError extends Error {
  public httpStatusCode!: number;
  public details: TransformedValidationError[] = [];

  constructor(message: string, errors: TransformedValidationError[]) {
    super(message);

    this.httpStatusCode = StatusCodes.BAD_REQUEST;
    this.message = message;
    this.details = errors;
  }
}
