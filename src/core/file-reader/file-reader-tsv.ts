import { readFileSync } from 'node:fs';

import { FileReaderInterface } from './file-reader.interface.js';
import type { Rent } from '../../types/rent.type.js';
import { RentCity } from '../../types/rent-city.enum.js';
import { RentType } from '../../types/rent-type.enum.js';
import { RentFacility } from '../../types/rent-facility.enum';

export default class FileReaderTSV implements FileReaderInterface {
  private rawData = '';
  private readonly encoding = 'utf8';

  constructor(public file: string) {}

  public read(): void {
    this.rawData = readFileSync(this.file, { encoding: this.encoding });
  }

  public toArray(): Rent[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([ title, description, createAt, city, preview, images, isPremium, rating, type, rooms, guests, price, facilities, author, coordsString ]) => {
        const coords = coordsString.split(';');

        return {
          title,
          description,
          createAt: new Date(createAt),
          city: RentCity[city as RentCity],
          preview,
          images: images.split(';').map((image) => image),
          isPremium: Boolean(isPremium),
          rating: +Number.parseFloat(rating).toFixed(1),
          type: type as RentType,
          rooms: Number.parseInt(rooms, 10),
          guests: Number.parseInt(guests, 10),
          price: Number.parseInt(price, 10),
          facilities: facilities.split(';').map((facility) => facility as RentFacility),
          author,
          coords: {
            lat: Number.parseFloat(coords[0]),
            long: Number.parseFloat(coords[1]),
          },
        };
      });
  }
}
