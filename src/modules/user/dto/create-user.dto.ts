import { IsEmail, Length, IsIn } from 'class-validator';
import { Expose } from 'class-transformer';

import { UserType, userTypes } from '@appTypes/user-type.type.js';
import { UserNameValidation, UserPassValidation } from '@const/validation.js';
import { UserNameError, UserEmailError, UserTypeError, UserPassError } from '@const/error-messages.js';

export default class CreateUserDto {
  @Expose()
  @Length(UserNameValidation.Min, UserNameValidation.Max, { message: UserNameError.Length })
  public name!: string;

  @Expose()
  @IsEmail({}, { message: UserEmailError.IsEmail })
  public email!: string;

  @Expose()
  @IsIn(userTypes, { message: UserTypeError.IsIn })
  public type!: UserType;

  @Expose()
  @Length(UserPassValidation.Min, UserPassValidation.Max, { message: UserPassError.Length })
  public pass!: string;
}
