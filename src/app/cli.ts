import 'reflect-metadata';

import { CliCommandInterface } from '@core/cli-command/cli-command.interface.js';

type ParsedCommands = Record<string, string[]>;
type RegisteredCommands = Record<string, CliCommandInterface>;

export default class CLIApplication {
  private commands: RegisteredCommands = {};
  private defaultCommand = '--help';

  private parseCommand(args: string[]): ParsedCommands {
    let command = '';

    return args.reduce<ParsedCommands>((parsedCommands, arg) => {
      if (arg.startsWith('--')) {
        parsedCommands[arg] = [];
        command = arg;

      } else if (command && arg) {
        parsedCommands[command].push(arg);
      }

      return parsedCommands;
    }, {});
  }

  public getCommand(commandName: string): CliCommandInterface {
    return this.commands[commandName] ?? this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = this.parseCommand(argv);
    const [ commandName ] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);

    command.execute(...parsedCommand[commandName] ?? []);
  }

  public registerCommands(commands: CliCommandInterface[]): void {
    commands.reduce((regCommands, command) => {
      regCommands[command.name] = command;

      return regCommands;
    }, this.commands);
  }
}
