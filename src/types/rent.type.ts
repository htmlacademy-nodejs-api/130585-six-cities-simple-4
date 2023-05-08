import { RentCity } from './rent-city.enum.js';
import { RentType } from './rent-type.enum.js';
import { RentFacility } from './rent-facility.enum.js';
import { Coords } from './coords.type.js';

export type Rent = {
  title: string,
  description: string,
  createAt: Date,
  city: RentCity,
  preview: string,
  images: string[],
  isPremium: boolean,
  rating: number,
  type: RentType,
  rooms: number,
  guests: number,
  price: number,
  facilities: RentFacility[],
  author: string,
  coords: Coords,
};
