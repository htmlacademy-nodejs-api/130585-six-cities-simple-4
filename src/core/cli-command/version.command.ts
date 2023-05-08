import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { CliCommandInterface } from './cli-command.interface.js';

export default class VersionCommand implements CliCommandInterface {
  public readonly name = '--version';
  private readonly file = './package.json';
  private readonly encoding = 'utf-8';

  private readVersion(): string {
    const fileContent = readFileSync(resolve(this.file), this.encoding);

    return JSON.parse(fileContent).version;
  }

  public async execute(): Promise<void> {
    console.log(this.readVersion());
  }
}
