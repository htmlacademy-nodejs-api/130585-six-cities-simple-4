import { CliCommandInterface } from './cli-command.interface.js';
import FileReaderTSV from '../file-reader/file-reader-tsv.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  public async execute(file: string): Promise<void> {
    const fileReader = new FileReaderTSV(file.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());

    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.log(`Не удалось импортировать данные из файла по причине: «${err.message}»`);
    }
  }
}
