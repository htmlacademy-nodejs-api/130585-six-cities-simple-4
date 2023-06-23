import { IsEmail, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

import { UserEmailError, UserPassError } from '@const/error-messages';

export default class LoginUserDto {
  @Expose()
  @IsEmail({}, { message: UserEmailError.IsEmail })
  public email!: string;

  @Expose()
  @IsString({ message: UserPassError.Required })
  public pass!: string;
}
