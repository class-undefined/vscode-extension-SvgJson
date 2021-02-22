import * as vscode from "vscode";
import * as path from "path";
import {ExtensionContext, workspace} from "vscode";
import * as fs from "fs";
/** Parse xml using sax.js - svgditor => xmlParser.ts */


/**
 * 从某个HTML文件读取能被Webview加载的HTML内容
 * @param {*} context 上下文
 * @param {*} templatePath 相对于插件根目录的html文件相对路径
 */
export function getWebViewContent(context: ExtensionContext, templatePath: string): string {
    const resourcePath = path.join(context.extensionPath, templatePath);
    const dirPath = path.dirname(resourcePath);
    let html = fs.readFileSync(resourcePath, 'utf-8');
    // vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
    html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
        return $1 + vscode.Uri.file(path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
    });
    return html;
}

/**
 * 获取某个扩展文件相对于webview需要的一种特殊路径格式
 * 形如：vscode-resource:/Users/toonces/projects/vscode-cat-coding/media/cat.gif
 * @param context 上下文
 * @param relativePath 扩展中某个文件相对于根目录的路径，如 images/test.jpg
 */
export const getExtensionFileVscodeResource = function(context: { extensionPath: string; }, relativePath: string) {
    const diskPath = vscode.Uri.file(path.join(context.extensionPath, relativePath));
    return diskPath.with({ scheme: 'vscode-resource' }).toString();
}
export const isAbsoluteUrl = (str:string) => /^[a-z][a-z0-9+.-]*:/.test(str);
/**
 * @param urlFragment `../foo/bar.svg`, `/foo/bar/baz.svg`, `C:\\Users\\henoc\\sample.svg`
 * @param baseUrl `file:///c%3A/Users/henoc/sample.svg` accept file uri scheme
 */
export function normalizeUrl(urlFragment: string, baseUrl: string): string | null {
    let uri = path.isAbsolute(urlFragment) ? vscode.Uri.file(urlFragment) : isAbsoluteUrl(urlFragment) ? vscode.Uri.parse(urlFragment) : vscode.Uri.parse(path.posix.join(path.posix.dirname(baseUrl), urlFragment.replace(/\\/g, "/")));
    if (uri.scheme === "file") uri = uri.with({scheme: "vscode-resource"});
    return uri.scheme === "untitled" ? null : uri.toString();
}

/* format */
export function replaceMagic(str: string, vars: {[key: string]: string}): string {
    return str.replace(/(?:\/\*|<!--)\?\s*([a-zA-Z_$]\w*)\s*(?:\*\/|-->)/g, (_match, p1) => {
        return vars[p1];
    });
}


