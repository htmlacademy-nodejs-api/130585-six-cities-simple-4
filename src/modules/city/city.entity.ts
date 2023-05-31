import { prop, modelOptions, defaultClasses, getModelForClass } from '@typegoose/typegoose';

import { City, CityName, cities } from '@appTypes/city.type.js';
import { Coords } from '@appTypes/coords.type.js';

class CityCoordsEntity {
  @prop()
  public lat?: number;

  @prop()
  public long?: number;
}

// for type merging of interface and class UserEntity
export interface CityEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'cities',
  },
})
export class CityEntity extends defaultClasses.TimeStamps implements City {
  @prop({
    type: () => String,
    unique: true,
    required: true,
    validate: {
      validator: (cityName: CityName) => cities.includes(cityName),
      message: `Название города не входит в список разрешенных: ${cities.join(', ')}!`
    }
  })
  public name!: CityName;

  @prop({
    type: () => CityCoordsEntity,
    required: true,
    default: {},
    _id: false,
  })
  public coords!: Coords;
}

export const CityModel = getModelForClass(CityEntity);
