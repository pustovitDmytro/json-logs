import * as vscode from 'vscode';

interface CommandMessages {
    SUCCESS_MESSAGE: string;
    ERROR_MESSAGE: string;
}

type CommandHandler = (...args: any[]) => void;

export function commandDecorator(command: CommandHandler, messages: CommandMessages):CommandHandler {
    return (...args: any[]) => {
        const { SUCCESS_MESSAGE, ERROR_MESSAGE } = messages;

        try {
            command(...args);
            vscode.window.showInformationMessage(SUCCESS_MESSAGE);
        } catch (error) {
            console.error(error);
            vscode.window.showErrorMessage(ERROR_MESSAGE);
        }
    };
}
