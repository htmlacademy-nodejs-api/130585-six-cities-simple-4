import { CliCommandInterface } from '../core/cli-command/cli-command.interface.js';

type ParsedCommand = {
  [key: string]: string[];
}

export default class CLIApplication {
  private commands: {[key: string]: CliCommandInterface} = {};
  private defaultCommand = '--help';

  private parseCommand(args: string[]): ParsedCommand {
    let command = '';

    return args.reduce((parsedCommand, arg) => {
      if (arg.startsWith('--')) {
        parsedCommand[arg] = [];
        command = arg;

      } else if (command && arg) {
        parsedCommand[command].push(arg);
      }

      return parsedCommand;
    }, {} as ParsedCommand);
  }

  public getCommand(commandName: string): CliCommandInterface {
    return this.commands[commandName] ?? this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = this.parseCommand(argv);
    const [commandName] = Object.keys(parsedCommand);
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
