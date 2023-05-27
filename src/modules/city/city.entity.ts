import { prop, modelOptions, defaultClasses, getModelForClass } from '@typegoose/typegoose';

import { City, CityName } from '@appTypes/city.type.js';
import { Coords } from '@appTypes/coords.type.js';

// for type merging of interface and class UserEntity
export interface CityEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
})
export class CityEntity extends defaultClasses.TimeStamps implements City {
  @prop({
    unique: true,
    required: true,
  })
  public name!: CityName;

  @prop({
    required: true,
  })
  public coords!: Coords;
}

export const CityModel = getModelForClass(CityEntity);
