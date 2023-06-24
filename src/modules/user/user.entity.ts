import { prop, modelOptions, defaultClasses, getModelForClass } from '@typegoose/typegoose';

import { User } from '@appTypes/user.type.js';
import { UserType, userTypes } from '@appTypes/user-type.type.js';
import { IMAGE_URL_MATCH_PATTERN, UserNameValidation } from '@const/validation.js';
import { UserTypeError, UserAvatarError } from '@const/error-messages.js';
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
    minlength: UserNameValidation.Min,
    maxlength: UserNameValidation.Max,
  })
  public name!: string;

  @prop({
    unique: true,
    required: true,
  })
  public email!: string;

  @prop({
    validate: {
      validator: (avatar: string) => IMAGE_URL_MATCH_PATTERN.test(avatar),
      message: UserAvatarError.IsImg,
    },
    default: '',
  })
  public avatar?: string;

  @prop({
    type: () => String,
    required: true,
    validate: {
      validator: (type: UserType) => userTypes.includes(type),
      message: UserTypeError.IsIn,
    },
  })
  public type!: UserType;

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

  public verifyPassword(pass: string, salt: string) {
    const hashPassword = createSHA256(pass, salt);

    return hashPassword === this.pass;
  }
}

export const UserModel = getModelForClass(UserEntity);
