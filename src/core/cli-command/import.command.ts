import { CliCommandInterface } from './cli-command.interface.js';
import FileReaderTSV from '@core/file-reader/file-reader-tsv.js';
import { parseRent, showSuccess } from '@utils/index.js';
import { showError } from '@utils/index.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  private handleStart(file: string) {
    showSuccess({
      icon: '→',
      text: 'Начато чтение файла %%:',
      replacer: file,
    });
  }

  private handleLine(line: string) {
    console.log(parseRent(line));
  }

  private handleEnd(count: number) {
    showSuccess({
      text: '%%  строк прочитано',
      replacer: String(count),
    });
  }

  public async execute(file: string): Promise<void> {
    const fileName = file.trim();
    const fileReader = new FileReaderTSV(fileName);

    fileReader.on('start', this.handleStart);
    fileReader.on('line', this.handleLine);
    fileReader.on('end', this.handleEnd);

    try {
      await fileReader.read();

    } catch (err) {
      showError({
        text: 'Не удалось импортировать данные из файла по причине:',
        error: err,
      });
    }
  }
}
