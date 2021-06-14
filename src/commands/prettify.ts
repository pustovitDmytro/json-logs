import * as vscode from 'vscode';
import { LINE_SEPERATOR, TAB_SIZE } from '../constants';
import { commandDecorator } from './utils';

export const MESSAGES = {
    SUCCESS_MESSAGE : 'Logs prettified',
    ERROR_MESSAGE   : 'Error occured',

    EDITOR_NOT_FOUND : 'No editor found'
};

function parseJSONLine(line: string, index: number) {
    try {
        const json = JSON.parse(line);

        return JSON.stringify(json, null, TAB_SIZE);
    } catch (error) {
        console.error(`CANT_PARSE_LINE ${index}`);
        console.error(line);
        console.error(error);

        return line;
    }
}

export function prettify() {
    const editor = vscode.window.activeTextEditor;

    if (!editor) return console.error(MESSAGES.EDITOR_NOT_FOUND);

    const raw = editor.document.getText();
    const lines = raw.split(LINE_SEPERATOR);
    const modified = lines.map((line, index) => parseJSONLine(line, index));

    editor.edit(builder => {
        const firstLine = editor.document.lineAt(0);
        const lastLine = editor.document.lineAt(editor.document.lineCount - 1);
        const range = new vscode.Range(firstLine.range.start, lastLine.range.end);

        builder.replace(range, modified.join('\n'));
    });
}

export default commandDecorator(prettify, MESSAGES);
