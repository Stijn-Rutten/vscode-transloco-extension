import "reflect-metadata";

import { Container } from "inversify";
import TYPES from "./types";
import { JsonUtilService, JsonUtilServiceImpl } from "./services/json-util-service";
import { AddTranslationCommand } from "./commands/addTranslation";
import { Command } from "./commands/command";
import { CommandsManager } from "./commands/commands-manager";
import { TranslateSelectedTextCommand } from "./commands/translateSelectedText";

const container = new Container();

container.bind<JsonUtilService>(TYPES.JsonUtilService).to(JsonUtilServiceImpl);
container.bind<Command>(TYPES.Command).to(AddTranslationCommand);
container.bind<Command>(TYPES.Command).to(TranslateSelectedTextCommand);
container.bind<CommandsManager>(TYPES.CommandsManager).to(CommandsManager);

export default container;
