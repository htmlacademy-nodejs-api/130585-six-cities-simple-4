import { City } from '@appTypes/city.type.js';

export type Coords = {
  lat: number,
  long: number,
};

export type CityCoord = Record<City, Coords>;
