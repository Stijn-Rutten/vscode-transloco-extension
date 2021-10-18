import { workspace } from "vscode";
import * as fs from "fs";
import * as jsonfile from "jsonfile";

export function writeToJsonFiles(identifier: string, text: string) {
  if (!workspace.workspaceFolders) {
    return;
  }

  const workSpacePath = workspace.workspaceFolders[0].uri.fsPath;
  const i18nFolderPath = `${workSpacePath}\\src\\assets\\i18n`;
  const identifierParts = identifier?.split(".");

  fs.readdir(i18nFolderPath, (_err, files) => {
    files.forEach((file) => {
      const filePath = `${i18nFolderPath}\\${file}`;
      jsonfile.readFile(filePath, (_err, data) => {
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
    });
  });
}
