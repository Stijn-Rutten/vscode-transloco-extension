import { workspace } from "vscode";
import * as fs from "fs";
import * as jsonfile from "jsonfile";
import { inject, injectable } from "inversify";
import TYPES from "../types";
import { LoggingService } from "./logging-service";

@injectable()
export class JsonUtilService implements JsonUtilService {
  constructor(@inject(TYPES.LoggingService) private readonly _loggingService: LoggingService) {}

  writeToJsonFiles(identifier: string, text: string): void {
    if (!workspace.workspaceFolders) {
      this._loggingService.logError("Current workspacefolder could not be located");
      return;
    }

    const workSpacePath = workspace.workspaceFolders[0].uri.fsPath;
    const i18nFolderPath = `${workSpacePath}\\src\\assets\\i18n`;
    const identifierParts = identifier?.split(".");

    this._writeToAllJsonFilesInGivenFolder(i18nFolderPath, identifierParts, text);
  }

  private _writeToAllJsonFilesInGivenFolder(i18nFolderPath: string, identifierParts: string[], text: string) {
    fs.readdir(i18nFolderPath, (err, files) => {
      if (err) {
        this._loggingService.logErrors("Error while reading translation files:", err.message);
        return;
      }

      files.forEach((file) => {
        const filePath = `${i18nFolderPath}\\${file}`;
        this._writeToJsonFile(filePath, identifierParts, text);
      });
    });
  }

  private _writeToJsonFile(filePath: string, identifierParts: string[], text: string) {
    jsonfile.readFile(filePath, (err, data) => {
      if (err) {
        this._loggingService.logErrors(`Error while reading ${filePath}:`, err.message);
        return;
      }

      if (!data) {
        data = {};
      }

      let schema = data;
      for (let i = 0; i < identifierParts.length; i++) {
        const elem = identifierParts[i];

        if (!schema[elem]) {
          schema[elem] = {};
        }

        if (i + 1 === identifierParts.length) {
          schema[elem] = text;
        } else {
          schema = schema[elem];
        }
      }

      jsonfile.writeFile(filePath, data, { spaces: 2 });
    });
  }
}
