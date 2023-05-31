import { City } from './city.type.js';
import { RentType } from './rent-type.type.js';
import { RentFacility } from './rent-facility.type.js';
import { User } from '@appTypes/user.type.js';
import { Ref } from '@typegoose/typegoose';
import { CityEntity } from '@modules/city/city.entity';
import { UserEntity } from '@modules/user/user.entity';

export type Rent = {
  title: string,
  description: string,
  createdAt: Date,
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
  author: User,
  commentCount: number,
};

export type RentEntityType = Omit<Rent, 'city' | 'author'> & {
  city: Ref<CityEntity>,
  author: Ref<UserEntity>,
};
