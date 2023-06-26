import { IsIn, IsOptional, Length } from 'class-validator';
import { Expose } from 'class-transformer';

import { UserType, userTypes } from '@appTypes/user-type.type.js';
import { UserNameValidation } from '@const/validation.js';
import { UserNameError, UserTypeError } from '@const/error-messages.js';

export default class UpdateUserDto {
  @Expose()
  @IsOptional()
  @Length(UserNameValidation.Min, UserNameValidation.Max, { message: UserNameError.Length })
  public name?: string;

  @Expose()
  @IsOptional()
  public avatar?: string;

  @Expose()
  @IsOptional()
  @IsIn(userTypes, { message: UserTypeError.IsIn })
  public type?: UserType | undefined;
}
