import { readFileSync } from 'node:fs';

import { FileReaderInterface } from './file-reader.interface.js';
import type { Rent } from '@appTypes/rent.type.js';
import { parseRent } from '@utils/index.js';

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
      .map((rentString) => parseRent(rentString));
  }
}
