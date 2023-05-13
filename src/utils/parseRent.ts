import { getTypedServerField } from '@utils/index.js';
import type { Rent } from '@appTypes/rent.type.js';
import { rentCities, RentCity } from '@appTypes/rent-city.type.js';
import { rentFacilities, RentFacility } from '@appTypes/rent-facility.type.js';
import { rentTypes, RentType } from '@appTypes/rent-type.type.js';

export const parseRent = (rentString: string): Rent => {
  const [
    title, description, createAt, city, preview, images, isPremium, rating, type, rooms, guests, price, facilities, author, coords
  ] = rentString.split('\t');

  const [ lat, long ] = coords.split(';');

  return {
    title,
    description,
    createAt: new Date(createAt),
    city: getTypedServerField<RentCity>(city, rentCities),
    preview,
    images: images.split(';'),
    isPremium: Boolean(isPremium),
    rating: Number(Number(rating).toFixed(1)),
    type: getTypedServerField<RentType>(type, rentTypes),
    rooms: Number(rooms),
    guests: Number(guests),
    price: Number(price),
    facilities: facilities.split(';')
      .map((facility) => getTypedServerField<RentFacility>(facility, rentFacilities))
      .filter((facility) => facility !== undefined),
    author,
    coords: {
      lat: Number(lat),
      long: Number(long),
    },
  } as Rent;
};
