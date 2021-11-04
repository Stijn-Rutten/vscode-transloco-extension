import { inject, injectable } from "inversify";
import { window } from "vscode";
import { JsonUtilService, JsonUtilServiceImpl } from "../services/json-util-service";
import TYPES from "../types";
import { Command } from "./command";

@injectable()
export class TranslateSelectedTextCommand implements Command {
  readonly id = "translateSelectedText";

  constructor(@inject(TYPES.JsonUtilService) private _jsonUtilService: JsonUtilService) {}

  async execute(): Promise<void> {
    const identifier = await window.showInputBox({
      title: "Provide Transloco identifier",
      placeHolder: "e.g. Homepage.Title.HelloWorld",
    });

    const activeTextEditor = window.activeTextEditor;
    if (!activeTextEditor) {
      return;
    }

    const currentSelection = activeTextEditor.selection;
    if (!currentSelection) {
      return;
    }

    const text = activeTextEditor.document.getText(currentSelection);
    if (!identifier || !text) {
      return;
    }

    this._jsonUtilService.writeToJsonFiles(identifier, text);

    activeTextEditor.edit((editBuilder) => {
      editBuilder.replace(currentSelection, `t('${identifier}')`);
    });
  }
}
