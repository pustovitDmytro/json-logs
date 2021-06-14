import * as vscode from 'vscode';
import prettify from './commands/prettify';

export const MESSAGES = {
    'ACTIVATION' : 'Congratulations, your extension "json-logs" is now active!'
};

export function activate(context: vscode.ExtensionContext) {
    console.log(MESSAGES.ACTIVATION);

    const disposable = vscode.commands.registerCommand('json-logs.prettify', prettify);

    context.subscriptions.push(disposable);
}

export function deactivate() {}
