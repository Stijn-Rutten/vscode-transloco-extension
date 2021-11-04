import "reflect-metadata";

import { Container } from "inversify";
import TYPES from "./types";
import { JsonUtilService } from "./services/json-util-service";
import { AddTranslationCommand } from "./commands/add-translation-command";
import { Command } from "./commands/command";
import { CommandsManager } from "./commands/commands-manager";
import { TranslateSelectedTextCommand } from "./commands/translate-selected-text-command";
import { LoggingService } from "./services/logging-service";

const container = new Container();

container.bind<JsonUtilService>(TYPES.JsonUtilService).to(JsonUtilService);
container.bind<LoggingService>(TYPES.LoggingService).to(LoggingService);

container.bind<Command>(TYPES.Command).to(AddTranslationCommand);
container.bind<Command>(TYPES.Command).to(TranslateSelectedTextCommand);

container.bind<CommandsManager>(TYPES.CommandsManager).to(CommandsManager);

export default container;
