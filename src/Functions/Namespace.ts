import * as vscode from "vscode";
import path from "path";
import fs from "fs";

let namespaces: Map<
  string,
  {
    namespace: string;
    composerPath: string;
  }
> = new Map();

export default async function getNamespace() {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const filePath = editor.document.fileName;
    const composerPath = findComposerJson(filePath);

    if (!composerPath) {
      vscode.window.showErrorMessage("composer.json not found!");
      return "";
    }

    const namespaceMapping = getNamespaceMapping(composerPath);

    if (!namespaceMapping) {
      vscode.window.showErrorMessage(
        "No PSR-4 namespace found in composer.json!"
      );
      return "";
    }

    if (namespaces.has(filePath)) {
      return namespaces.get(filePath)!.namespace;
    }

    const [namespacePrefix, srcPath] = Object.entries(namespaceMapping).filter(
      (e) => filePath.replaceAll("\\", "/").includes(e[1])
    )[0];

    const correctSrcPath = srcPath.startsWith("/")
      ? srcPath.replace("/", "./")
      : srcPath;

    const absoluteSrcPath = path.resolve(
      path.dirname(composerPath),
      correctSrcPath
    );

    const namespace = computeNamespace(
      filePath,
      absoluteSrcPath,
      namespacePrefix
    );

    namespaces.set(filePath, {
      namespace: namespace,
      composerPath: composerPath,
    });

    return namespace;
  }
  return "";
}

function findComposerJson(startDir: string): string | null {
  let currentDir = startDir;

  while (currentDir !== path.parse(currentDir).root) {
    const composerPath = path.join(currentDir, "composer.json");
    if (fs.existsSync(composerPath)) {
      return composerPath;
    }
    currentDir = path.dirname(currentDir); // Go one level up
  }

  return null; // composer.json not found
}

function getNamespaceMapping(
  composerPath: string
): { [key: string]: string } | null {
  const composerData = fs.readFileSync(composerPath, "utf8");
  const composerJson = JSON.parse(composerData);

  if (composerJson.autoload && composerJson.autoload["psr-4"]) {
    return composerJson.autoload["psr-4"];
  }

  return null; // No PSR-4 mapping found
}

function computeNamespace(
  filePath: string,
  srcPath: string,
  namespacePrefix: string
): string {
  const relativePath = path.relative(srcPath, path.dirname(filePath));
  const namespacePath = relativePath
    .replace(/\\/g, "/") // Normalize path separators
    .replace(/\.(php|txt|html)$/, "") // Remove file extension
    .replace(/\//g, "\\"); // Convert directory separators to namespace format

  return namespacePath.length === 0
    ? namespacePrefix.slice(0, -1)
    : namespacePrefix + namespacePath;
}

export const clearNamespaces = () => {
  namespaces = new Map();
};
