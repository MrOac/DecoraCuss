// @ts-ignore
import { existsSync } from 'fs';
import packageJSON from '../package.json';
import { dirname, join } from 'path';
/**
 * @en Registration method for the main process of Extension
 * @zh 为扩展的主进程的注册方法
 */
export const methods: { [key: string]: (...any: any) => any } = {
    /**
     * @en A method that can be triggered by message
     * @zh 通过 message 触发的方法
     */
    openPanel() {
        console.log("OpenPanel", packageJSON.name)
        //@ts-ignore
        if (!globalThis.projectPathRoot) {
            //@ts-ignore
            globalThis.projectPathRoot = findProjectRoot(__dirname);
        }
        //@ts-ignore

        console.log(globalThis.projectPathRoot)
        Editor.Panel.open(packageJSON.name);
    },
    callFile() {
        console.log(111111111111111111222);
        console.log("call From Secene in main.ts");
    },


};

/**
 * @en Method Triggered on Extension Startup
 * @zh 扩展启动时触发的方法
 */
export function load() { }

/**
 * @en Method triggered when uninstalling the extension
 * @zh 卸载扩展时触发的方法
 */
export function unload() { }

export function findProjectRoot(startDir: string): string {
    let current = startDir;

    while (true) {
        if (
            existsSync(join(current, 'package.json')) ||
            existsSync(join(current, 'tsconfig.json'))
        ) {
            return current;
        }

        const parent = dirname(current);
        if (parent === current) break; // reached root
        current = parent;
    }

    throw new Error('Cannot find project root (no package.json or tsconfig.json found)');
}