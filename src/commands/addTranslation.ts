import { inject, injectable } from "inversify";
import { env, window } from "vscode";
import { JsonUtilService } from "../services/json-util-service";
import TYPES from "../types";
import { Command } from "./command";

@injectable()
export class AddTranslationCommand implements Command {
  readonly id = "addTranslation";

  constructor(@inject(TYPES.JsonUtilService) private _jsonUtilService: JsonUtilService) {}

  async execute(): Promise<void> {
    const identifier = await window.showInputBox({
      title: "Provide Transloco identifier",
      placeHolder: "e.g. Homepage.Title.HelloWorld",
    });

    if (!identifier) {
      return;
    }

    const text = await window.showInputBox({
      title: "Provide text",
      placeHolder: "e.g. Welcome to my hello world app!",
    });

    if (!identifier || !text) {
      return;
    }

    this._jsonUtilService.writeToJsonFiles(identifier, text);

    env.clipboard.writeText(`t('${identifier}')`);
    window.showInformationMessage("Transloco identifier copied to clipboard");
  }
}
