import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { CliCommandInterface } from './cli-command.interface.js';
import { showError, showSuccess } from '@utils/index.js';
import { ENCODING_UTF8 } from '@const/common.js';

export default class VersionCommand implements CliCommandInterface {
  public readonly name = '--version';
  private readonly file = './package.json';

  private readVersion(): string {
    const fileContent = readFileSync(resolve(this.file), ENCODING_UTF8);

    return JSON.parse(fileContent).version;
  }

  public async execute(): Promise<void> {
    try {
      const version = this.readVersion();

      showSuccess({
        text: 'Версия программы: %%',
        replacer: String(version),
      });

    } catch (err) {
      showError({
        text: 'Не удалось прочитать версию по причине:',
        error: err,
      });
    }
  }
}
