import { RentsGeneratorInterface } from './rents-generator.interface.js';
import { MockRent } from '@appTypes/mock-rent.type.js';
import { getRandomNumberFromInterval, getRandomItem, getRandomItems, getRandomDate, getRandomBoolean } from '@utils/index.js';
import {
  RENT_DAYS_BEFORE,
  RENT_RATING_MIN,
  RENT_RATING_MAX,
  RENT_ROOMS_MIN,
  RENT_ROOMS_MAX,
  RENT_GUESTS_MIN,
  RENT_GUESTS_MAX,
  RENT_PRICE_MIN,
  RENT_PRICE_MAX
} from '@const/common.js';

export class RentsGenerator implements RentsGeneratorInterface {
  constructor(private readonly mockData: MockRent) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles ?? []);
    const description = getRandomItem<string>(this.mockData.descriptions ?? []);
    const createAt = getRandomDate(RENT_DAYS_BEFORE);
    const city = getRandomItem<string>(this.mockData.cities ?? []);
    const preview = getRandomItem<string>(this.mockData.previews ?? []);
    const images = getRandomItems<string>(this.mockData.images ?? []).join(';');
    const isPremium = getRandomBoolean();
    const rating = getRandomNumberFromInterval(RENT_RATING_MIN, RENT_RATING_MAX, 1);
    const type = getRandomItem<string>(this.mockData.types ?? []);
    const rooms = getRandomNumberFromInterval(RENT_ROOMS_MIN, RENT_ROOMS_MAX);
    const guests = getRandomNumberFromInterval(RENT_GUESTS_MIN, RENT_GUESTS_MAX);
    const price = getRandomNumberFromInterval(RENT_PRICE_MIN, RENT_PRICE_MAX);
    const facilities = getRandomItems<string>(this.mockData.facilities ?? []).join(';');
    const author = getRandomItem<string>(this.mockData.authors ?? []);

    return [
      title,
      description,
      createAt,
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
      author,
    ].join('\t');
  }
}
