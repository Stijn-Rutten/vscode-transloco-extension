import { inject, injectable } from "inversify";
import { JsonUtilService } from "../services/json-util-service";
import { LoggingService } from "../services/logging-service";
import { VsCodeService } from "../services/vscode-util-service";
import TYPES from "../types";
import { Command } from "./command";

@injectable()
export class AddTranslationCommand implements Command {
  readonly id = "addTranslation";

  constructor(
    @inject(TYPES.JsonUtilService) private readonly _jsonUtilService: JsonUtilService,
    @inject(TYPES.LoggingService) private readonly _logginService: LoggingService,
    @inject(TYPES.VsCodeService) private readonly _vsCodeService: VsCodeService
  ) {}

  async execute(): Promise<void> {
    const identifier = await this._vsCodeService.showInputBox({
      title: "Provide Transloco identifier",
      placeHolder: "e.g. Homepage.Title.HelloWorld",
    });

    const text = await this._vsCodeService.showInputBox({
      title: "Provide text",
      placeHolder: "e.g. Welcome to my hello world app!",
    });

    if (!identifier) {
      this._logginService.logError("No identifier provided");
      return;
    }

    if (!text) {
      this._logginService.logError("No translatable text provided");
      return;
    }

    this._jsonUtilService.writeToJsonFiles(identifier, text);

    this._vsCodeService.writeToClipboard(`t('${identifier}')`);
    this._vsCodeService.showInformationMessage("Transloco identifier copied to clipboard");
  }
}
