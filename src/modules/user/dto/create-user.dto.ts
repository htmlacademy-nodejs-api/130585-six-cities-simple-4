import { UserType } from '@appTypes/user-type.type.js';

export default class CreateUserDto {
  public name!: string;
  public email!: string;
  public avatar!: string;
  public type!: UserType | undefined;
  public pass!: string;
}
