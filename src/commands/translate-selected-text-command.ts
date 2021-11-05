import { inject, injectable } from "inversify";
import { JsonUtilService } from "../services/json-util-service";
import { LoggingService } from "../services/logging-service";
import { VsCodeService } from "../services/vscode-util-service";
import TYPES from "../types";
import { Command } from "./command";

@injectable()
export class TranslateSelectedTextCommand implements Command {
  readonly id = "translateSelectedText";

  constructor(
    @inject(TYPES.JsonUtilService) private readonly _jsonUtilService: JsonUtilService,
    @inject(TYPES.LoggingService) private readonly _loggingService: LoggingService,
    @inject(TYPES.VsCodeService) private readonly _vsCodeService: VsCodeService
  ) {}

  async execute(): Promise<void> {
    const identifier = await this._vsCodeService.showInputBox({
      title: "Provide Transloco identifier",
      placeHolder: "e.g. Homepage.Title.HelloWorld",
    });

    if (!identifier?.trim()) {
      this._loggingService.logError("No identifier provided");
      return;
    }

    const text = this._vsCodeService.getCurrentTextSelection();

    if (!text) {
      this._loggingService.logError("Selected text could not be found.");
      return;
    }

    this._jsonUtilService.writeToJsonFiles(identifier, text);
    this._vsCodeService.replaceCurrentTextSelection(`t('${identifier}')`);
  }
}
