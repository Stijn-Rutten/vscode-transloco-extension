// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

import { ExtensionContext } from "vscode";
import { CommandsManager } from "./commands/commands-manager";
import container from "./inversify.config";
import TYPES from "./types";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  const cmdManager = container.get<CommandsManager>(TYPES.CommandsManager);
  cmdManager.registerCommands(context);
}

// this method is called when your extension is deactivated
export function deactivate() {}
