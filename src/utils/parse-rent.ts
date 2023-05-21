import { getTypedServerField, getCoordsByCity } from '@utils/index.js';
import type { Rent } from '@appTypes/rent.type.js';
import { cities, City } from '@appTypes/city.type.js';
import { rentFacilities, RentFacility } from '@appTypes/rent-facility.type.js';
import { rentTypes, RentType } from '@appTypes/rent-type.type.js';

export const parseRent = (rentString: string): Rent => {
  const [
    title, description, createAt, cityString, preview, images, isPremium, rating, type, rooms, guests, price, facilities, author,
  ] = rentString.replace('\n', '').split('\t');

  const city = getTypedServerField<City>(cityString, cities);

  return {
    title,
    description,
    createAt: new Date(createAt),
    city,
    preview,
    images: images.length ? images.split(';') : [],
    isPremium: Boolean(Number(isPremium)),
    rating: Number(Number(rating).toFixed(1)),
    type: getTypedServerField<RentType>(type, rentTypes),
    rooms: Number(rooms),
    guests: Number(guests),
    price: Number(price),
    facilities: facilities.length
      ? facilities.split(';')
        .map((facility) => getTypedServerField<RentFacility>(facility, rentFacilities))
        .filter((facility): facility is RentFacility => facility !== undefined)
      : [],
    author,
    coords: getCoordsByCity(city),
  };
};
