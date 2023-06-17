import { IsEmail, IsString } from 'class-validator';
import { UserEmailError, UserPassError } from '@const/error-messages';

export default class LoginUserDto {
  @IsEmail({}, { message: UserEmailError.IsEmail })
  public email!: string;

  @IsString({ message: UserPassError.Required })
  public pass!: string;
}
