import { prop, modelOptions, defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';

import { RentType } from '@appTypes/rent-type.type.js';
import { RentFacility } from '@appTypes/rent-facility.type.js';
import { CityEntity } from '@modules/city/city.entity.js';
import { UserEntity } from '@modules/user/user.entity.js';
import { RentRating, RentRooms, RentGuests, RentPrice } from '@const/validation.js';

// for type merging of interface and class UserEntity
export interface RentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'rents',
  },
})
export class RentEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    trim: true,
  })
  public title!: string;

  @prop({
    required: true,
    trim: true,
  })
  public description!: string;

  @prop({
    required: true,
  })
  public createAt!: Date;

  @prop({
    required: true,
    ref: CityEntity,
    _id: false,
  })
  public city!: Ref<CityEntity>;

  @prop({
    required: true,
  })
  public preview!: string;

  @prop({
    type: () => [String],
    required: true,
    default: [],
  })
  public images!: string[];

  @prop({
    required: true,
  })
  public isPremium!: boolean;

  @prop({
    required: true,
    min: RentRating.Min,
    max: RentRating.Max,
  })
  public rating!: number;

  @prop({
    type: () => String,
    required: true,
  })
  public type!: RentType;

  @prop({
    required: true,
    min: RentRooms.Min,
    max: RentRooms.Max,
  })
  public rooms!: number;

  @prop({
    required: true,
    min: RentGuests.Min,
    max: RentGuests.Max,
  })
  public guests!: number;

  @prop({
    required: true,
    min: RentPrice.Min,
    max: RentPrice.Max,
  })
  public price!: number;

  @prop({
    type: () => [String],
    required: true,
  })
  public facilities!: RentFacility[];

  @prop({
    required: true,
    ref: UserEntity,
  })
  public author!: Ref<UserEntity>;

  @prop({
    default: 0,
  })
  public commentCount!: number;
}

export const RentModel = getModelForClass(RentEntity);
