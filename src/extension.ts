import * as vscode from "vscode";
import namespaceCompletionItem from "./CompletionItems/NamespaceCompletionItem";
import phpFileBoilerplateCompletionItem from "./CompletionItems/FileBoilerplateCompletionItem";
import path from "path";
import { clearNamespaces } from "./Functions/Namespace";

export function activate(context: vscode.ExtensionContext) {
  const phpSnippetsProvider = vscode.languages.registerCompletionItemProvider(
    {
      scheme: "file",
      language: "php",
    },
    {
      async provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position
      ) {
        const namespace = await namespaceCompletionItem().then((ci) => ci);
        const phpFileBoilerplate =
          await phpFileBoilerplateCompletionItem().then((ci) => ci);

        return [namespace, phpFileBoilerplate];
      },
    }
  );

  const onComposerConfigChangeListener =
    vscode.workspace.onDidChangeTextDocument((e) => {
      if (path.basename(e.document.fileName) === "composer.json") {
        clearNamespaces();
      }
    });

  context.subscriptions.push(
    phpSnippetsProvider,
    onComposerConfigChangeListener
  );
}
