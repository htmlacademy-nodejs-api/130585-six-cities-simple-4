import { prop, modelOptions, defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';

import { RentType, rentTypes } from '@appTypes/rent-type.type.js';
import { RentFacility, rentFacilities } from '@appTypes/rent-facility.type.js';
import { RentEntityType } from '@appTypes/rent.type.js';
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
export class RentEntity extends defaultClasses.TimeStamps implements RentEntityType {
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
    default: RentRating.Min,
  })
  public rating!: number;

  @prop({
    type: () => String,
    required: true,
    validate: {
      validator: (type: RentType) => rentTypes.includes(type),
      message: `Тип объявления не входит в список разрешенных: ${rentTypes.join(',')}!`
    }
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
    validate: {
      validator: (facilities: RentFacility[]) => facilities.every((facility) => rentFacilities.includes(facility)),
      message: `Удобства не входят в список разрешенных: ${rentFacilities.join(', ')}!`
    }
  })
  public facilities!: RentFacility[];

  @prop({
    required: true,
    ref: UserEntity,
    _id: false,
  })
  public author!: Ref<UserEntity>;

  @prop({
    default: 0,
  })
  public commentCount!: number;
}

export const RentModel = getModelForClass(RentEntity);
