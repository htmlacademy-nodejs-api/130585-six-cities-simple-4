import { UserType } from '@appTypes/user-type.type.js';

export default class UpdateUserDto {
  public name?: string;
  public avatar?: string;
  public type!: UserType | undefined;
}
