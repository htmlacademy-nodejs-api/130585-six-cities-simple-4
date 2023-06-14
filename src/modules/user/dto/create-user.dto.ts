import { IsEmail, Length, Matches, IsOptional, IsIn } from 'class-validator';

import { UserType, userTypes } from '@appTypes/user-type.type.js';
import { UserNameValidation, UserPassValidation } from '@const/validation.js';
import { UserNameError, UserAvatarError, UserEmailError, UserTypeError, UserPassError } from '@const/error-messages.js';
import { IMAGE_URL_MATCH_PATTERN } from '@const/validation';

export default class CreateUserDto {
  @Length(UserNameValidation.Min, UserNameValidation.Max, { message: UserNameError.Length })
  public name!: string;

  @IsEmail({}, { message: UserEmailError.IsEmail })
  public email!: string;

  @IsOptional()
  @Matches(IMAGE_URL_MATCH_PATTERN, { message: UserAvatarError.IsImg })
  public avatar?: string;

  @IsIn(userTypes, { message: UserTypeError.IsIn })
  public type!: UserType;

  @Length(UserPassValidation.Min, UserPassValidation.Max, { message: UserPassError.Length })
  public pass!: string;
}
