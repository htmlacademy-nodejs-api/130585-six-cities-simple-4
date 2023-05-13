import chalk from 'chalk';

import { CliCommandInterface } from './cli-command.interface.js';
import FileReaderTSV from '../file-reader/file-reader-tsv.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  public async execute(file: string): Promise<void> {
    const fileName = file.trim();
    const fileReader = new FileReaderTSV(fileName);

    try {
      fileReader.read();
      console.log(`${chalk.green.bold('✔')} Содержимое файла ${chalk.hex('#318495').bold(fileName)}:\n`, fileReader.toArray());

    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.log(`
        ${chalk.red.bold('!')} Не удалось импортировать данные из файла по причине:
            «${chalk.italic(err.message)}»
        `);
    }
  }
}
