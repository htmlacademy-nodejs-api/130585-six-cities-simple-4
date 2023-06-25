import { RentsGeneratorInterface } from './rents-generator.interface.js';
import { MockRent } from '@appTypes/mock-rent.type.js';
import {
  getRandomNumberFromInterval,
  getRandomItem,
  getRandomItems,
  getRandomDate,
  getRandomBoolean,
} from '@utils/index.js';
import {
  RentDaysValidation,
  RentRatingValidation,
  RentRoomsValidation,
  RentGuestsValidation,
  RentPriceValidation,
  RentImagesValidation,
} from '@const/validation.js';

export class RentsGenerator implements RentsGeneratorInterface {
  constructor(private readonly mockData: MockRent) {
  }

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles ?? []);
    const description = getRandomItem<string>(this.mockData.descriptions ?? []);
    const createdAt = getRandomDate(RentDaysValidation.Before);
    const city = getRandomItem<string>(this.mockData.cities ?? []);
    const preview = getRandomItem<string>(this.mockData.previews ?? []);
    const images = getRandomItems<string>(this.mockData.images ?? [], RentImagesValidation.Max).join(';');
    const isPremium = getRandomBoolean();
    const rating = getRandomNumberFromInterval(RentRatingValidation.Min, RentRatingValidation.Max, 1);
    const type = getRandomItem<string>(this.mockData.types ?? []);
    const rooms = getRandomNumberFromInterval(RentRoomsValidation.Min, RentRoomsValidation.Max);
    const guests = getRandomNumberFromInterval(RentGuestsValidation.Min, RentGuestsValidation.Max);
    const price = getRandomNumberFromInterval(RentPriceValidation.Min, RentPriceValidation.Max);
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
