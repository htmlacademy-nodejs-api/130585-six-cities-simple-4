import { RentsGeneratorInterface } from './rents-generator.interface.js';
import { MockRent } from '@appTypes/mock-rent.type.js';
import {
  getRandomNumberFromInterval,
  getRandomItem,
  getRandomItems,
  getRandomDate,
  getRandomBoolean,
} from '@utils/index.js';
import { RentDays, RentRating, RentRooms, RentGuests, RentPrice } from '@const/validation.js';

export class RentsGenerator implements RentsGeneratorInterface {
  constructor(private readonly mockData: MockRent) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles ?? []);
    const description = getRandomItem<string>(this.mockData.descriptions ?? []);
    const createdAt = getRandomDate(RentDays.Before);
    const city = getRandomItem<string>(this.mockData.cities ?? []);
    const preview = getRandomItem<string>(this.mockData.previews ?? []);
    const images = getRandomItems<string>(this.mockData.images ?? []).join(';');
    const isPremium = getRandomBoolean();
    const rating = getRandomNumberFromInterval(RentRating.Min, RentRating.Max, 1);
    const type = getRandomItem<string>(this.mockData.types ?? []);
    const rooms = getRandomNumberFromInterval(RentRooms.Min, RentRooms.Max);
    const guests = getRandomNumberFromInterval(RentGuests.Min, RentGuests.Max);
    const price = getRandomNumberFromInterval(RentPrice.Min, RentPrice.Max);
    const facilities = getRandomItems<string>(this.mockData.facilities ?? []).join(';');
    const name = getRandomItem<string>(this.mockData.names ?? []);
    const email = getRandomItem<string>(this.mockData.emails ?? []);
    const avatar = getRandomItem<string>(this.mockData.avatars ?? []);
    const userType = getRandomItem<string>(this.mockData.userTypes ?? []);

    return [
      title,
      description,
      createdAt,
      city,
      preview,
      images,
      isPremium,
      rating,
      type,
      rooms,
      guests,
      price,
      facilities,
      name,
      email,
      avatar,
      userType,
    ].join('\t');
  }
}
