import got from 'got';

import { RentsGenerator } from '@modules/rents-generator/rents-generator.js';
import FileWriterTsv from '@core/file-writer/file-writer-tsv.js';
import { CliCommandInterface } from './cli-command.interface.js';
import type { MockRent } from '@appTypes/mock-rent.type.js';
import { showError, showInfo } from '@utils/index.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private file!: string;
  private itemsCount!: number;
  private initialData!: MockRent;

  private async generate() {
    const generator = new RentsGenerator(this.initialData);
    const fileWriterTsv = new FileWriterTsv(this.file);

    for (let itemIndex = 0; itemIndex < this.itemsCount; itemIndex++) {
      await fileWriterTsv.write(generator.generate());
    }

    fileWriterTsv.end();

    showInfo({
      text: 'Файл %% создан',
      replacer: this.file,
    });
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [ count, file, url ] = parameters;

    this.file = file;
    this.itemsCount = Number.parseInt(count, 10);

    try {
      this.initialData = await got.get(url).json();

      showInfo({
        text: 'Данные по адресу %% запрошены',
        replacer: url,
      });

      await this.generate();

    } catch (err) {
      showError({
        text: `Не удалось запросить данные по адресу ${ url } по причине:`,
        error: err,
      });
    }
  }
}
