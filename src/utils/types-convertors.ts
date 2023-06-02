import type { CityName } from '@appTypes/city.type.js';
import type { Coords } from '@appTypes/coords.type.js';
import { CITY_COORDS } from '@const/city-coords.js';

export function getTypedServerField<T>(serverValue: string, checkedArray: readonly T[]): T | undefined {
  return checkedArray.find((item) => item === serverValue);
}

export function getCoordsByCity (city: CityName | undefined): Coords | undefined {
  if (!city) {
    return;
  }

  return CITY_COORDS[city];
}
