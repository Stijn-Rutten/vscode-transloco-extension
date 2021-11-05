import { injectable } from "inversify";
import { env, window } from "vscode";

/**
 * Service used to abstract all interaction with the Vscode api. The goal of this service is to minimize calling the vscode api directly
 */
@injectable()
export class VsCodeService {
  /**
   * Used to display a default Vscode input box
   * @param opts cotains multiple optional options to customize the shown input box
   * @returns the string value of the user input
   */
  async showInputBox(opts: { title?: string; placeHolder?: string }): Promise<string | undefined> {
    return await window.showInputBox(opts);
  }

  writeToClipboard(text: string): void {
    if (text.trim()) {
      env.clipboard.writeText(text);
    }
  }

  showInformationMessage(text: string): void {
    if (text.trim()) {
      window.showInformationMessage(text);
    }
  }

  getCurrentTextSelection(): string | undefined {
    const activeTextEditor = window.activeTextEditor;
    const currentSelection = activeTextEditor?.selection;

    return activeTextEditor?.document.getText(currentSelection);
  }

  replaceCurrentTextSelection(text: string): void {
    const activeTextEditor = window.activeTextEditor;
    activeTextEditor?.edit((editBuilder) => editBuilder.replace(activeTextEditor?.selection, text));
  }
}
