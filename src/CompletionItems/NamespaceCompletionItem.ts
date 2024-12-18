import * as vscode from "vscode";
import getNamespace from "../Functions/Namespace";

export default async function namespaceCompletionItem(): Promise<vscode.CompletionItem> {
  const completionItem = new vscode.CompletionItem(
    "namespace",
    vscode.CompletionItemKind.Snippet
  );

  completionItem.insertText = await getNamespace().then(
    (namespace) => "namespace " + namespace + ";"
  );

  return completionItem;
}

// This method is called when your extension is deactivated
export function deactivate() {}
