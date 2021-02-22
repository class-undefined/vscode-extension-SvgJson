import * as vscode from 'vscode';
import {viewJson} from "./api/viewJson";
import * as fs from "fs";
import * as path from "path";
import {getWebViewContent, normalizeUrl, replaceMagic} from './api/utils/utils';

export function activate(context: vscode.ExtensionContext) {
    // let readResource =
    //     (filename: string) => fs.readFileSync(path.join(context.extensionPath, "resources", filename), "UTF-8");
    // let readImage =
    //     (filename: string) => fs.readFileSync(path.join(context.extensionPath, "images", filename), "UTF-8");
    // let readOthers =
    //     (filename: string) => fs.readFileSync(path.join(context.extensionPath, filename), "UTF-8");
    // let viewer = readResource("viewer.html");
    // let templateSvg = readResource("template.svg");
    // let css = readResource("style.css");
    // let bundleJs = readResource("bundle.js");
    // console.log(replaceMagic(viewer, {'uri': '123456'}));
    console.log('Congratulations, your extension "svgjson" is now active!');
    let disposable = vscode.commands.registerCommand('svgjson.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from svgjson!');
    });
   const v = ()=>{
       viewJson(context)
   }
    let svg = vscode.commands.registerCommand('svgjson.svg', v)
    context.subscriptions.push(disposable);
    context.subscriptions.push(svg);
}

export function deactivate() {
}
