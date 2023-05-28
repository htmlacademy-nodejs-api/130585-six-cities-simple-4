import { City } from './city.type.js';
import { RentType } from './rent-type.type.js';
import { RentFacility } from './rent-facility.type.js';
import { User } from '@appTypes/user.type.js';

export type Rent = {
  title: string,
  description: string,
  createAt: Date,
  city: City,
  preview: string,
  images: string[],
  isPremium: boolean,
  rating: number,
  type: RentType | undefined,
  rooms: number,
  guests: number,
  price: number,
  facilities: RentFacility[],
  author: Omit<User, 'pass'>,
};
