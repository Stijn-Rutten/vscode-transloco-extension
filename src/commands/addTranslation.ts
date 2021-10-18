import { env, window, workspace } from "vscode";
import { writeToJsonFiles } from "./write-to-json-files";

export async function addTranslation() {
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

  writeToJsonFiles(identifier, text);

  env.clipboard.writeText(`t('${identifier}')`);
  window.showInformationMessage("Transloco identifier copied to clipboard");
}
