import * as vscode from "vscode";
import namespaceCompletionItem from "./CompletionItems/NamespaceCompletionItem";
import phpFileBoilerplateCompletionItem from "./CompletionItems/FileBoilerplateCompletionItem";

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
        const phpFileBoilerplate = await phpFileBoilerplateCompletionItem().then((ci) => ci);

        return [namespace, phpFileBoilerplate];
      },
    }
  );

  context.subscriptions.push(phpSnippetsProvider);
}
