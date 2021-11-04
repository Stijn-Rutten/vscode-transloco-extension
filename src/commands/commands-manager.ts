import { injectable, multiInject } from "inversify";
import { commands, ExtensionContext } from "vscode";
import TYPES from "../types";
import { Command } from "./command";

@injectable()
export class CommandsManager {
  constructor(@multiInject(TYPES.Command) private commands: Command[]) {}

  registerCommands(context: ExtensionContext): void {
    console.log(this.commands);
    this.commands.forEach((command) => {
      const cmd = commands.registerCommand(`extension.${command.id}`, command.execute, command);
      context.subscriptions.push(cmd);
    });
  }
}
