import { env, window, workspace } from "vscode";
import * as fs from "fs";
import * as jsonfile from "jsonfile";

export async function addTranslation() {
  if (!workspace.workspaceFolders) {
    return;
  }

  const workSpacePath = workspace.workspaceFolders[0].uri.fsPath;
  const i18nFolderPath = `${workSpacePath}\\src\\assets\\i18n`;

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

  const identifierParts = identifier?.split(".");

  fs.readdir(i18nFolderPath, (err, files) => {
    files.forEach((file) => {
      const filePath = `${i18nFolderPath}\\${file}`;
      jsonfile.readFile(filePath, (err, data) => {
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

  env.clipboard.writeText(`{{ t('${identifier}') }}`);
  window.showInformationMessage("Transloco identifier copied to clipboard");
}
