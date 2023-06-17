import { prop, Ref, modelOptions, defaultClasses, getModelForClass } from '@typegoose/typegoose';

import { CommentEntityType } from '@appTypes/comment.type.js';
import { CommentTextValidation } from '@const/validation.js';
import { RentEntity } from '@modules/rent/rent.entity.js';
import { UserEntity } from '@modules/user/user.entity.js';

// for type merging of interface and class UserEntity
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
  },
})
export class CommentEntity extends defaultClasses.TimeStamps implements CommentEntityType {
  @prop({
    trim: true,
    required: true,
    minlength: CommentTextValidation.Min,
    maxlength: CommentTextValidation.Max,
  })
  public text!: string;

  @prop({
    default: 1
  })
  public rating!: number;

  @prop({
    ref: RentEntity,
    required: true,
  })
  public rentId!: Ref<RentEntity>;

  @prop({
    ref: UserEntity,
    required: true,
    _id: false,
  })
  public author!: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
