import chalk from 'chalk';

import { CliCommandInterface } from './cli-command.interface.js';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
      ${chalk.green.bold('✔')} Программа для подготовки данных для REST API сервера.

      ${chalk.bold('Пример:')} ${chalk.hex('#318495')('cli.js --<command> [--arguments]')}

      ${chalk.bold('Команды:')}
        ${chalk.hex('#318495')('--version:')}                   ${chalk.gray('# выводит номер версии')}
        ${chalk.hex('#318495')('--help:')}                      ${chalk.gray('# печатает этот текст')}
        ${chalk.hex('#318495')('--import <path>:')}             ${chalk.gray('# импортирует данные из TSV')}
        ${chalk.hex('#318495')('--generate <n> <path> <url>')}  ${chalk.gray('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
