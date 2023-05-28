import { prop, modelOptions, defaultClasses, getModelForClass } from '@typegoose/typegoose';

import { User } from '@appTypes/user.type.js';
import { UserType } from '@appTypes/user-type.type.js';
import { createSHA256 } from '@utils/index.js';

// for type merging of interface and class UserEntity
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  public salt = '';

  @prop({
    required: true,
    trim: true,
    default: '',
  })
  public name!: string;

  @prop({
    unique: true,
    required: true,
  })
  public email!: string;

  @prop({
    default: '',
  })
  public avatar: string;

  @prop({
    type: () => String,
    required: true,
  })
  public type!: UserType | undefined;

  @prop({
    required: true,
  })
  public pass: string;

  constructor(userData: User, salt: string) {
    super();

    this.salt = salt;
    this.name = userData.name;
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.type = userData.type;
    this.pass = createSHA256(userData.pass, salt);
  }
}

export const UserModel = getModelForClass(UserEntity);
