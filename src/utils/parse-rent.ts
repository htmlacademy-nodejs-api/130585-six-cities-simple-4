import { getTypedServerField, getCoordsByCity } from '@utils/index.js';
import type { Rent } from '@appTypes/rent.type.js';
import { cities, CityName } from '@appTypes/city.type.js';
import { rentFacilities, RentFacility } from '@appTypes/rent-facility.type.js';
import { rentTypes, RentType } from '@appTypes/rent-type.type.js';
import { userTypes, UserType } from '@appTypes/user-type.type.js';

export const parseRent = (rentString: string): Rent | null => {
  const [
    title, description, createdAt, cityString, preview, images, isPremium, rating, type, rooms, guests, price, facilities, name, email, avatar, userType
  ] = rentString.replace('\n', '').split('\t');

  const cityName = getTypedServerField<CityName>(cityString, cities);
  const rentType = getTypedServerField<RentType>(type, rentTypes);
  const authorType = getTypedServerField<UserType>(userType, userTypes);

  if (cityName === undefined || rentType === undefined || authorType === undefined) {
    return null;
  }

  return {
    title,
    description,
    createdAt: new Date(createdAt),
    city: {
      name: cityName,
      coords: getCoordsByCity(cityName),
    },
    preview,
    images: images.length ? images.split(';') : [],
    isPremium: Boolean(Number(isPremium)),
    rating: Number(Number(rating).toFixed(1)),
    type: rentType,
    rooms: Number(rooms),
    guests: Number(guests),
    price: Number(price),
    facilities: facilities.length
      ? facilities.split(';')
        .map((facility) => getTypedServerField<RentFacility>(facility, rentFacilities))
        .filter((facility): facility is RentFacility => facility !== undefined)
      : [],
    author: {
      name,
      email,
      avatar,
      type: authorType,
    },
    commentCount: 0,
  };
};
