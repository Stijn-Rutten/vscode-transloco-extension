import { injectable } from "inversify";
import { OutputChannel, window } from "vscode";

@injectable()
export class LoggingService {
  private readonly _outputChannel: OutputChannel;

  constructor() {
    this._outputChannel = window.createOutputChannel("Transloco Errors");
  }

  logError(error: string): void {
    this._writeErrorLine(error);
    this._outputChannel.show(true);
  }

  logErrors(...errors: string[]): void {
    errors.forEach((error) => this._writeErrorLine(error));
    this._outputChannel.show(true);
  }

  private _writeErrorLine(line: string): void {
    this._outputChannel.appendLine(line.trim());
  }
}
