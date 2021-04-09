import * as vscode from 'vscode';

const LINE_SEPERATOR = /\n|\r\n/;
const TAB_SIZE = 4;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "json-logs" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand('json-logs.prettify', () => {
        try {
            console.log('start');
            const editor = vscode.window.activeTextEditor;

            if (!editor) {
                return console.log('No editor found');
            }


            // const eol = {
            //     '1' : 'LF',
            //     '2' : 'CRLF'
            // }[editor.document.eol];
            // const lineSeparator = eol === 'LF' ? '\n' : '\r\n';
            const raw = editor.document.getText();
            const lines = raw.split(LINE_SEPERATOR);
            const modified = lines.map((line, index) => {
                try {
                    const json = JSON.parse(line);


                    return JSON.stringify(json, null, TAB_SIZE);
                } catch (error) {
                    console.error(`CANT_PARSE_LINE ${index}`);
                    console.error(line);
                    console.error(error);

                    return line;
                }
            });

            editor.edit(builder => {
                const firstLine = editor.document.lineAt(0);
                const lastLine = editor.document.lineAt(editor.document.lineCount - 1);
                const range = new vscode.Range(firstLine.range.start, lastLine.range.end);

                builder.replace(range, modified.join('\n'));
            });

            vscode.window.showInformationMessage('Logs prettified');
        } catch (error) {
            console.error(error);
            vscode.window.showErrorMessage('Error occured');
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
