import { prop, modelOptions, defaultClasses, getModelForClass } from '@typegoose/typegoose';

import { User } from '@appTypes/user.type.js';
import { UserType, userTypes } from '@appTypes/user-type.type.js';
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
  public avatar?: string;

  @prop({
    type: () => String,
    required: true,
    validate: {
      validator: (type: UserType | undefined) => [...userTypes, undefined].includes(type),
      message: `Тип пользователя не входят в список разрешенных: ${userTypes.join(', ')}, undefined!`
    }
  })
  public type!: UserType | undefined;

  @prop({
    required: true,
  })
  private pass?: string;

  constructor(userData: User) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.type = userData.type;
  }

  public setPassword(pass: string, salt: string) {
    this.pass = createSHA256(pass, salt);
  }

  public getPassword() {
    return this.pass;
  }
}

export const UserModel = getModelForClass(UserEntity);
