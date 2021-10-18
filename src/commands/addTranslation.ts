
import { window } from 'vscode';
export async function addTranslation() {
    const result = await window.showInputBox({
        title: 'Provide text to translate',
        placeHolder: 'For example: Click here to go to checkout',
        validateInput: text => {
            console.log(text);
            const regex = /^([a-zA-Z]+\.){2}[a-zA-Z]+$/;
            return regex.test(text) ? 'String does not match format (Domain.MessageType.Identifier e.g. Checkout.Title.WelcomeToCheckout)' : null;
        }
    });
    if (result) {
        window.showInformationMessage(result.toString());
    }
}