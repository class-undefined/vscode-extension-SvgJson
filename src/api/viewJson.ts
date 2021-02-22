import * as vscode from "vscode";
import {getExtensionFileVscodeResource, getWebViewContent, normalizeUrl} from "./utils/utils";

export const viewJson = (context: vscode.ExtensionContext) => {
    /**获取当前激活的编辑器 */
    let editor = vscode.window.activeTextEditor
    if (!editor) {
        vscode.window.showErrorMessage('no active editor!')
        return
    }
    let doc = ''

    let panel = vscode.window.createWebviewPanel('testWebview111', // viewType
        "WebView演示", // 视图标题
        vscode.ViewColumn.Beside, // 显示在编辑器的哪个部位
        {
            enableScripts: true // 启用JS，默认禁用
            // retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
        });

    /**如果有document属性 */
    if (editor?.document) {
        doc = editor.document.getText() //得到当前激活的编辑器的文档
    }
    /* 将扩展中的文件路径转换为符合vscode-resource 规范的路径 */
    console.log(getExtensionFileVscodeResource(context, 'resources/template.svg'));
    panel.webview.html = getWebViewContent(context,'resources/template/team.html')
    // let jsonText = JSON.parse(doc)

    // console.log(jsonText);
    console.log(normalizeUrl('../foo/bar.svg', 'file:///c%3A/Users/henoc/sample.svg'));
}
