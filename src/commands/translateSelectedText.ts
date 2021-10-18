import { window } from "vscode";
import { writeToJsonFiles } from "./write-to-json-files";

export async function translateSelectedText() {
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

  writeToJsonFiles(identifier, text);

  activeTextEditor.edit((editBuilder) => {
    editBuilder.replace(currentSelection, `t('${identifier}')`);
  });
}
