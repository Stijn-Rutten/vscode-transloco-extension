import { inject, injectable } from "inversify";
import { window } from "vscode";
import { JsonUtilService } from "../services/json-util-service";
import { LoggingService } from "../services/logging-service";
import TYPES from "../types";
import { Command } from "./command";

@injectable()
export class TranslateSelectedTextCommand implements Command {
  readonly id = "translateSelectedText";

  constructor(
    @inject(TYPES.JsonUtilService) private _jsonUtilService: JsonUtilService,
    @inject(TYPES.LoggingService) private _loggingService: LoggingService
  ) {}

  async execute(): Promise<void> {
    const identifier = await this._getIdentifier();

    if (!identifier?.trim()) {
      this._loggingService.logError("No identifier provided");
      return;
    }

    const activeTextEditor = window.activeTextEditor;
    if (!activeTextEditor) {
      this._loggingService.logError("No active editor found.");
      return;
    }

    const currentSelection = activeTextEditor.selection;
    if (!currentSelection) {
      this._loggingService.logError("No active selection. Please select the text you want to translate.");
      return;
    }

    const text = activeTextEditor.document.getText(currentSelection);
    if (!text) {
      this._loggingService.logError("Selected text could not be found.");
      return;
    }

    this._jsonUtilService.writeToJsonFiles(identifier, text);

    activeTextEditor.edit((editBuilder) => {
      editBuilder.replace(currentSelection, `t('${identifier}')`);
    });
  }

  private async _getIdentifier(): Promise<string | undefined> {
    const identifier = await window.showInputBox({
      title: "Provide Transloco identifier",
      placeHolder: "e.g. Homepage.Title.HelloWorld",
    });

    return identifier;
  }
}
