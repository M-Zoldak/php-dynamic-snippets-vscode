import * as vscode from "vscode";
import getNamespace from "../Functions/Namespace";

export default async function phpFileBoilerplateCompletionItem(): Promise<vscode.CompletionItem> {
    const completionItem = new vscode.CompletionItem(
      "php",
      vscode.CompletionItemKind.Snippet
    );
  
    const snippet = `<?php 
  
namespace __namespace__;

class \${TM_FILENAME_BASE}{
\t\$0
}`;
  
    const namespace = await getNamespace().then((namespace) => namespace);
  
    const snippetString = new vscode.SnippetString(
      snippet.replace("__namespace__", namespace)
    );
  
    completionItem.insertText = snippetString;
  
    return completionItem;
  }
  