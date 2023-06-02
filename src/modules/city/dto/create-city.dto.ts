import { Coords } from '@appTypes/coords.type.js';
import { CityName } from '@appTypes/city.type.js';

export default class CreateCityDto {
  public name?: CityName;
  public coords?: Coords;
}
