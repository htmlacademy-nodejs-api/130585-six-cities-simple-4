import { Coords } from '@appTypes/coords.type.js';

export const cities = [ 'Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf' ] as const;

export type CityName = typeof cities[number];

export type City = {
  name?: CityName,
  coords?: Coords,
};
