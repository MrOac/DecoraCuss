"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.methods = void 0;
exports.load = load;
exports.unload = unload;
exports.findProjectRoot = findProjectRoot;
// @ts-ignore
const fs_1 = require("fs");
const package_json_1 = __importDefault(require("../package.json"));
const path_1 = require("path");
/**
 * @en Registration method for the main process of Extension
 * @zh 为扩展的主进程的注册方法
 */
exports.methods = {
    /**
     * @en A method that can be triggered by message
     * @zh 通过 message 触发的方法
     */
    openPanel() {
        console.log("OpenPanel", package_json_1.default.name);
        //@ts-ignore
        if (!globalThis.projectPathRoot) {
            //@ts-ignore
            globalThis.projectPathRoot = findProjectRoot(__dirname);
        }
        //@ts-ignore
        console.log(globalThis.projectPathRoot);
        Editor.Panel.open(package_json_1.default.name);
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
function load() { }
/**
 * @en Method triggered when uninstalling the extension
 * @zh 卸载扩展时触发的方法
 */
function unload() { }
function findProjectRoot(startDir) {
    let current = startDir;
    while (true) {
        if ((0, fs_1.existsSync)((0, path_1.join)(current, 'package.json')) ||
            (0, fs_1.existsSync)((0, path_1.join)(current, 'tsconfig.json'))) {
            return current;
        }
        const parent = (0, path_1.dirname)(current);
        if (parent === current)
            break; // reached root
        current = parent;
    }
    throw new Error('Cannot find project root (no package.json or tsconfig.json found)');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQXFDQSxvQkFBMEI7QUFNMUIsd0JBQTRCO0FBRTVCLDBDQWlCQztBQTlERCxhQUFhO0FBQ2IsMkJBQWdDO0FBQ2hDLG1FQUEwQztBQUMxQywrQkFBcUM7QUFDckM7OztHQUdHO0FBQ1UsUUFBQSxPQUFPLEdBQTRDO0lBQzVEOzs7T0FHRztJQUNILFNBQVM7UUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxzQkFBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzFDLFlBQVk7UUFDWixJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQzlCLFlBQVk7WUFDWixVQUFVLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBQ0QsWUFBWTtRQUVaLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ3ZDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLHNCQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUNELFFBQVE7UUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Q0FHSixDQUFDO0FBRUY7OztHQUdHO0FBQ0gsU0FBZ0IsSUFBSSxLQUFLLENBQUM7QUFFMUI7OztHQUdHO0FBQ0gsU0FBZ0IsTUFBTSxLQUFLLENBQUM7QUFFNUIsU0FBZ0IsZUFBZSxDQUFDLFFBQWdCO0lBQzVDLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQztJQUV2QixPQUFPLElBQUksRUFBRSxDQUFDO1FBQ1YsSUFDSSxJQUFBLGVBQVUsRUFBQyxJQUFBLFdBQUksRUFBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDekMsSUFBQSxlQUFVLEVBQUMsSUFBQSxXQUFJLEVBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDLEVBQzVDLENBQUM7WUFDQyxPQUFPLE9BQU8sQ0FBQztRQUNuQixDQUFDO1FBRUQsTUFBTSxNQUFNLEdBQUcsSUFBQSxjQUFPLEVBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsSUFBSSxNQUFNLEtBQUssT0FBTztZQUFFLE1BQU0sQ0FBQyxlQUFlO1FBQzlDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVELE1BQU0sSUFBSSxLQUFLLENBQUMsbUVBQW1FLENBQUMsQ0FBQztBQUN6RixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQHRzLWlnbm9yZVxyXG5pbXBvcnQgeyBleGlzdHNTeW5jIH0gZnJvbSAnZnMnO1xyXG5pbXBvcnQgcGFja2FnZUpTT04gZnJvbSAnLi4vcGFja2FnZS5qc29uJztcclxuaW1wb3J0IHsgZGlybmFtZSwgam9pbiB9IGZyb20gJ3BhdGgnO1xyXG4vKipcclxuICogQGVuIFJlZ2lzdHJhdGlvbiBtZXRob2QgZm9yIHRoZSBtYWluIHByb2Nlc3Mgb2YgRXh0ZW5zaW9uXHJcbiAqIEB6aCDkuLrmianlsZXnmoTkuLvov5vnqIvnmoTms6jlhozmlrnms5VcclxuICovXHJcbmV4cG9ydCBjb25zdCBtZXRob2RzOiB7IFtrZXk6IHN0cmluZ106ICguLi5hbnk6IGFueSkgPT4gYW55IH0gPSB7XHJcbiAgICAvKipcclxuICAgICAqIEBlbiBBIG1ldGhvZCB0aGF0IGNhbiBiZSB0cmlnZ2VyZWQgYnkgbWVzc2FnZVxyXG4gICAgICogQHpoIOmAmui/hyBtZXNzYWdlIOinpuWPkeeahOaWueazlVxyXG4gICAgICovXHJcbiAgICBvcGVuUGFuZWwoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJPcGVuUGFuZWxcIiwgcGFja2FnZUpTT04ubmFtZSlcclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICBpZiAoIWdsb2JhbFRoaXMucHJvamVjdFBhdGhSb290KSB7XHJcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBnbG9iYWxUaGlzLnByb2plY3RQYXRoUm9vdCA9IGZpbmRQcm9qZWN0Um9vdChfX2Rpcm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL0B0cy1pZ25vcmVcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coZ2xvYmFsVGhpcy5wcm9qZWN0UGF0aFJvb3QpXHJcbiAgICAgICAgRWRpdG9yLlBhbmVsLm9wZW4ocGFja2FnZUpTT04ubmFtZSk7XHJcbiAgICB9LFxyXG4gICAgY2FsbEZpbGUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coMTExMTExMTExMTExMTExMTExMjIyKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNhbGwgRnJvbSBTZWNlbmUgaW4gbWFpbi50c1wiKTtcclxuICAgIH0sXHJcblxyXG5cclxufTtcclxuXHJcbi8qKlxyXG4gKiBAZW4gTWV0aG9kIFRyaWdnZXJlZCBvbiBFeHRlbnNpb24gU3RhcnR1cFxyXG4gKiBAemgg5omp5bGV5ZCv5Yqo5pe26Kem5Y+R55qE5pa55rOVXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbG9hZCgpIHsgfVxyXG5cclxuLyoqXHJcbiAqIEBlbiBNZXRob2QgdHJpZ2dlcmVkIHdoZW4gdW5pbnN0YWxsaW5nIHRoZSBleHRlbnNpb25cclxuICogQHpoIOWNuOi9veaJqeWxleaXtuinpuWPkeeahOaWueazlVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHVubG9hZCgpIHsgfVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRQcm9qZWN0Um9vdChzdGFydERpcjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGxldCBjdXJyZW50ID0gc3RhcnREaXI7XHJcblxyXG4gICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIGV4aXN0c1N5bmMoam9pbihjdXJyZW50LCAncGFja2FnZS5qc29uJykpIHx8XHJcbiAgICAgICAgICAgIGV4aXN0c1N5bmMoam9pbihjdXJyZW50LCAndHNjb25maWcuanNvbicpKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IGRpcm5hbWUoY3VycmVudCk7XHJcbiAgICAgICAgaWYgKHBhcmVudCA9PT0gY3VycmVudCkgYnJlYWs7IC8vIHJlYWNoZWQgcm9vdFxyXG4gICAgICAgIGN1cnJlbnQgPSBwYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZmluZCBwcm9qZWN0IHJvb3QgKG5vIHBhY2thZ2UuanNvbiBvciB0c2NvbmZpZy5qc29uIGZvdW5kKScpO1xyXG59Il19