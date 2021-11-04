# VsCode Transloco Extension 
This extension allows you to quickly and easily add new translations to your Angular project using [Transloco](https://github.com/ngneat/transloco)

[Marketplace](https://marketplace.visualstudio.com/items?itemName=StijnRutten.transloco-entry-generator)

## Features

Currently this extension supports the following features:


| Name | Description | Note |
|---|---|---|
| Add Translation | Provide the key you want to use for your translation, followed by the string that should be translatable. | Currently the given string is added to all json files in the `assets/i18n` directory in your project. Customizable `i18n`-directories or different translations per `json` file are not yet supported |
| Translate Highlighted text | After highlighting a string, use this command to provide an ID. The highlighted text is replaced with `t('GIVEN_ID')` and the text is placed in all json files in the `assets/i18n` directory of the project. | Currently the given string is added to all json files in the `assets/i18n` directory in your project. Customizable `i18n`-directories or different translations per `json` file are not yet supported |

## Requirements

1. This extension only works in Angular project in combination with Transloco.

## Extension Settings

Currently vscode-transloco-extension does not support extension settings.

## Release Notes

Users appreciate release notes as you update your extension.

### 0.0.1
* 🎉 Project setup 🎉 
* Added "Add Translation" and "Translate Highlighted text" commands.
