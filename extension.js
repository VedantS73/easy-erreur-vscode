// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const axios = require('axios');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	// 
	// const res = await axios.get("")
	// console.group(res.data)

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "Easy-Erreur" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('Easy-Erreur.saveCodeSnippet', function (selectedText) {

	// 	vscode.window.showInformationMessage('Hello World from hello!');
	// 	vscode.window.showInformationMessage(`Selected Text: ${selectedText}`);
	// });

	let disposable = vscode.commands.registerCommand('Easy-Erreur.saveCodeSnippet', async function () {
		vscode.window.showInformationMessage('Saving Snippet @Easy-Erreur ...');
		const editor = vscode.window.activeTextEditor;
        const selectedText = editor.document.getText(editor.selection);

		if (!editor) {
            vscode.window.showInformationMessage('No text selected');
            return;
        }

		const snippetTitle = await vscode.window.showInputBox({
            prompt: 'Enter a title for the snippet',
			timeout: 10000
        });

		if (snippetTitle !== undefined) {
            // Do something with the selected text and snippet title
            vscode.window.showInformationMessage(`Title: ${snippetTitle}, Selected Text: ${selectedText}`);
        } else {
			vscode.window.showInformationMessage('Operation cancelled or timed out.');
		}

		const tagsInput = await vscode.window.showInputBox({
            prompt: 'Enter tags separated by commas (,) (optional)',
            placeHolder: 'e.g., tag1, tag2, tag3'
        });

		let tags = [];
        if (tagsInput !== undefined) {
            tags = tagsInput.split(',').map(tag => tag.trim());
        }

		vscode.window.showInformationMessage(`Title: ${snippetTitle}, Selected Text: ${selectedText}, Tags: ${tags.join(', ')}`);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
