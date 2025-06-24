"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const vue_1 = require("vue");
const panelDataMap = new WeakMap();
/**
 * @zh 如果希望兼容 3.3 之前的版本可以使用下方的代码
 * @en You can add the code below if you want compatibility with versions prior to 3.3
 */
// Editor.Panel.define = Editor.Panel.define || function(options: any) { return options }
const dataCpm = {};
module.exports = Editor.Panel.define({
    listeners: {
        show() { console.log('show'); },
        hide() { console.log('hide'); },
    },
    template: (0, fs_extra_1.readFileSync)((0, path_1.join)(__dirname, '../../../static/template/default/index.html'), 'utf-8'),
    style: (0, fs_extra_1.readFileSync)((0, path_1.join)(__dirname, '../../../static/style/default/index.css'), 'utf-8'),
    $: {
        app: '#app',
        text: '#text'
    },
    methods: {
        hello() {
            if (this.$.text) {
                this.$.text.innerHTML = 'hello';
            }
        },
        callFile(msg) {
            console.log("call From Secene in to index.js", msg);
            Object.assign(panelDataMap, {});
        },
        async asyncDataToJsonAct() {
            console.log("asyncDataToJsonAct");
            await Editor.Message.request('scene', 'query-node-tree').then((result) => {
                console.log('🌿 Node tree result:', result);
            });
            // let result = Editor.Message.send('my-extension', 'helloEditorMode', 'Hieu');
            // console.log('👉 Kết quả từ Editor:', result);
            // return
            // Editor.Message.send("scene",)
            // const scene = director.getScene();
            // const result: Component[] = [];
            // const queue = [...scene.children]; // ✅ đúng kiểu
            // for (let i = 0; i < queue.length; i++) {
            //     const node = queue[i];
            //     for (const comp of node.components) {
            //         const ctor = comp.constructor as any;
            //         const attrs = CCClass.Attr.getClassAttrs(ctor);
            //         const hasProperty = 'parameterKey' in comp;
            //         if (hasProperty) {
            //             result.push(comp);
            //         }
            //     }
            //     queue.push(...node.children);
            // }
            // return result;
        }
    },
    ready() {
        if (this.$.text) {
            this.$.text.innerHTML = 'Hello Cocos.';
        }
        if (this.$.app) {
            const app = (0, vue_1.createApp)({});
            app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('ui-');
            app.component('MyCounter', {
                template: (0, fs_extra_1.readFileSync)((0, path_1.join)(__dirname, '../../../static/template/vue/counter.html'), 'utf-8'),
                data() {
                    return {
                        counter: 0,
                    };
                }, methods: {
                    addition() {
                        ///genFile 
                        console.log("Action GenFile--->>>>>>>>>>>>");
                        // const { quickSpawn } = globalThis.Editor.Utils.Process;
                        // const winPath = globalThis.Editor.Project.path.replace(/\//g, '\\');
                        // const fullPath = `${winPath}\\assets\\my-file.json`;
                        // const json = data
                        // const jsonString = JSON.stringify(json, null, 4);
                        // console.log(jsonString);
                        // // Sử dụng PowerShell để ghi nội dung JSON an toàn
                        // const psCommand = `Set-Content -Path "${fullPath}" -Value '${jsonString}'`;
                        // quickSpawn('powershell', ['-Command', psCommand], {
                        //     downGradeLog: true,
                        //     onlyPrintWhenError: false,
                        //     prefix: '',
                        // }).then(() => {
                        //     console.log(`✅ JSON file created at: ${fullPath}`);
                        // }).catch(err => {
                        //     console.error('❌ Failed to create JSON file:', err.message);
                        // });
                    },
                    subtraction() {
                    },
                },
            });
            app.mount(this.$.app);
            panelDataMap.set(this, app);
        }
    },
    beforeClose() { },
    close() {
        const app = panelDataMap.get(this);
        if (app) {
            app.unmount();
        }
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvcGFuZWxzL2RlZmF1bHQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBd0M7QUFDeEMsK0JBQTRCO0FBQzVCLDZCQUFxQztBQUVyQyxNQUFNLFlBQVksR0FBRyxJQUFJLE9BQU8sRUFBWSxDQUFDO0FBQzdDOzs7R0FHRztBQUNILHlGQUF5RjtBQUV6RixNQUFNLE9BQU8sR0FBUSxFQUFFLENBQUM7QUFDeEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUNqQyxTQUFTLEVBQUU7UUFDUCxJQUFJLEtBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsSUFBSSxLQUFLLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2xDO0lBQ0QsUUFBUSxFQUFFLElBQUEsdUJBQVksRUFBQyxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsNkNBQTZDLENBQUMsRUFBRSxPQUFPLENBQUM7SUFDL0YsS0FBSyxFQUFFLElBQUEsdUJBQVksRUFBQyxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUseUNBQXlDLENBQUMsRUFBRSxPQUFPLENBQUM7SUFDeEYsQ0FBQyxFQUFFO1FBQ0MsR0FBRyxFQUFFLE1BQU07UUFDWCxJQUFJLEVBQUUsT0FBTztLQUNoQjtJQUNELE9BQU8sRUFBRTtRQUNMLEtBQUs7WUFDRCxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztZQUNwQyxDQUFDO1FBQ0wsQ0FBQztRQUNELFFBQVEsQ0FBQyxHQUFRO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsRUFBRSxHQUFHLENB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YyB9IGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IGNyZWF0ZUFwcCwgQXBwIH0gZnJvbSAndnVlJztcblxuY29uc3QgcGFuZWxEYXRhTWFwID0gbmV3IFdlYWtNYXA8YW55LCBBcHA+KCk7XG4vKipcbiAqIEB6aCDlpoLmnpzluIzmnJvlhbzlrrkgMy4zIOS5i+WJjeeahOeJiOacrOWPr+S7peS9v+eUqOS4i+aWueeahOS7o+eggVxuICogQGVuIFlvdSBjYW4gYWRkIHRoZSBjb2RlIGJlbG93IGlmIHlvdSB3YW50IGNvbXBhdGliaWxpdHkgd2l0aCB2ZXJzaW9ucyBwcmlvciB0byAzLjNcbiAqL1xuLy8gRWRpdG9yLlBhbmVsLmRlZmluZSA9IEVkaXRvci5QYW5lbC5kZWZpbmUgfHwgZnVuY3Rpb24ob3B0aW9uczogYW55KSB7IHJldHVybiBvcHRpb25zIH1cblxuY29uc3QgZGF0YUNwbTogYW55ID0ge307XG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRvci5QYW5lbC5kZWZpbmUoe1xuICAgIGxpc3RlbmVyczoge1xuICAgICAgICBzaG93KCkgeyBjb25zb2xlLmxvZygnc2hvdycpOyB9LFxuICAgICAgICBoaWRlKCkgeyBjb25zb2xlLmxvZygnaGlkZScpOyB9LFxuICAgIH0sXG4gICAgdGVtcGxhdGU6IHJlYWRGaWxlU3luYyhqb2luKF9fZGlybmFtZSwgJy4uLy4uLy4uL3N0YXRpYy90ZW1wbGF0ZS9kZWZhdWx0L2luZGV4Lmh0bWwnKSwgJ3V0Zi04JyksXG4gICAgc3R5bGU6IHJlYWRGaWxlU3luYyhqb2luKF9fZGlybmFtZSwgJy4uLy4uLy4uL3N0YXRpYy9zdHlsZS9kZWZhdWx0L2luZGV4LmNzcycpLCAndXRmLTgnKSxcbiAgICAkOiB7XG4gICAgICAgIGFwcDogJyNhcHAnLFxuICAgICAgICB0ZXh0OiAnI3RleHQnXG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGhlbGxvKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuJC50ZXh0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kLnRleHQuaW5uZXJIVE1MID0gJ2hlbGxvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2FsbEZpbGUobXNnOiBhbnkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FsbCBGcm9tIFNlY2VuZSBpbiB0byBpbmRleC5qc1wiLCBtc2cpO1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihwYW5lbERhdGFNYXAsIHt9KVxuXG4gICAgICAgIH1cbiAgICAgICAgLFxuICAgICAgICBhc3luYyBhc3luY0RhdGFUb0pzb25BY3QoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFzeW5jRGF0YVRvSnNvbkFjdFwiKTtcbiAgICAgICAgICAgIGF3YWl0IEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ3NjZW5lJywgJ3F1ZXJ5LW5vZGUtdHJlZScpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfwn4y/IE5vZGUgdHJlZSByZXN1bHQ6JywgcmVzdWx0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gbGV0IHJlc3VsdCA9IEVkaXRvci5NZXNzYWdlLnNlbmQoJ215LWV4dGVuc2lvbicsICdoZWxsb0VkaXRvck1vZGUnLCAnSGlldScpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ/CfkYkgS+G6v3QgcXXhuqMgdOG7qyBFZGl0b3I6JywgcmVzdWx0KTtcbiAgICAgICAgICAgIC8vIHJldHVyblxuICAgICAgICAgICAgLy8gRWRpdG9yLk1lc3NhZ2Uuc2VuZChcInNjZW5lXCIsKVxuICAgICAgICAgICAgLy8gY29uc3Qgc2NlbmUgPSBkaXJlY3Rvci5nZXRTY2VuZSgpO1xuICAgICAgICAgICAgLy8gY29uc3QgcmVzdWx0OiBDb21wb25lbnRbXSA9IFtdO1xuICAgICAgICAgICAgLy8gY29uc3QgcXVldWUgPSBbLi4uc2NlbmUuY2hpbGRyZW5dOyAvLyDinIUgxJHDum5nIGtp4buDdVxuICAgICAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy8gICAgIGNvbnN0IG5vZGUgPSBxdWV1ZVtpXTtcbiAgICAgICAgICAgIC8vICAgICBmb3IgKGNvbnN0IGNvbXAgb2Ygbm9kZS5jb21wb25lbnRzKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIGNvbnN0IGN0b3IgPSBjb21wLmNvbnN0cnVjdG9yIGFzIGFueTtcbiAgICAgICAgICAgIC8vICAgICAgICAgY29uc3QgYXR0cnMgPSBDQ0NsYXNzLkF0dHIuZ2V0Q2xhc3NBdHRycyhjdG9yKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgY29uc3QgaGFzUHJvcGVydHkgPSAncGFyYW1ldGVyS2V5JyBpbiBjb21wO1xuICAgICAgICAgICAgLy8gICAgICAgICBpZiAoaGFzUHJvcGVydHkpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNvbXApO1xuICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gICAgIHF1ZXVlLnB1c2goLi4ubm9kZS5jaGlsZHJlbik7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyByZXR1cm4gcmVzdWx0O1xuXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlYWR5KCkge1xuICAgICAgICBpZiAodGhpcy4kLnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuJC50ZXh0LmlubmVySFRNTCA9ICdIZWxsbyBDb2Nvcy4nO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLiQuYXBwKSB7XG4gICAgICAgICAgICBjb25zdCBhcHAgPSBjcmVhdGVBcHAoe30pO1xuICAgICAgICAgICAgYXBwLmNvbmZpZy5jb21waWxlck9wdGlvbnMuaXNDdXN0b21FbGVtZW50ID0gKHRhZykgPT4gdGFnLnN0YXJ0c1dpdGgoJ3VpLScpO1xuICAgICAgICAgICAgYXBwLmNvbXBvbmVudCgnTXlDb3VudGVyJywge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiByZWFkRmlsZVN5bmMoam9pbihfX2Rpcm5hbWUsICcuLi8uLi8uLi9zdGF0aWMvdGVtcGxhdGUvdnVlL2NvdW50ZXIuaHRtbCcpLCAndXRmLTgnKSxcbiAgICAgICAgICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcjogMCxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9LCBtZXRob2RzOiB7XG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8vZ2VuRmlsZSBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQWN0aW9uIEdlbkZpbGUtLS0+Pj4+Pj4+Pj4+Pj5cIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHsgcXVpY2tTcGF3biB9ID0gZ2xvYmFsVGhpcy5FZGl0b3IuVXRpbHMuUHJvY2VzcztcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3Qgd2luUGF0aCA9IGdsb2JhbFRoaXMuRWRpdG9yLlByb2plY3QucGF0aC5yZXBsYWNlKC9cXC8vZywgJ1xcXFwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGZ1bGxQYXRoID0gYCR7d2luUGF0aH1cXFxcYXNzZXRzXFxcXG15LWZpbGUuanNvbmA7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBqc29uID0gZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QganNvblN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGpzb24sIG51bGwsIDQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coanNvblN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAvLyBT4butIGThu6VuZyBQb3dlclNoZWxsIMSR4buDIGdoaSBu4buZaSBkdW5nIEpTT04gYW4gdG/DoG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHBzQ29tbWFuZCA9IGBTZXQtQ29udGVudCAtUGF0aCBcIiR7ZnVsbFBhdGh9XCIgLVZhbHVlICcke2pzb25TdHJpbmd9J2A7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHF1aWNrU3Bhd24oJ3Bvd2Vyc2hlbGwnLCBbJy1Db21tYW5kJywgcHNDb21tYW5kXSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGRvd25HcmFkZUxvZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBvbmx5UHJpbnRXaGVuRXJyb3I6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHByZWZpeDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhg4pyFIEpTT04gZmlsZSBjcmVhdGVkIGF0OiAke2Z1bGxQYXRofWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmVycm9yKCfinYwgRmFpbGVkIHRvIGNyZWF0ZSBKU09OIGZpbGU6JywgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSk7XG5cblxuXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHN1YnRyYWN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFwcC5tb3VudCh0aGlzLiQuYXBwKTtcbiAgICAgICAgICAgIHBhbmVsRGF0YU1hcC5zZXQodGhpcywgYXBwKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYmVmb3JlQ2xvc2UoKSB7IH0sXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIGNvbnN0IGFwcCA9IHBhbmVsRGF0YU1hcC5nZXQodGhpcyk7XG4gICAgICAgIGlmIChhcHApIHtcbiAgICAgICAgICAgIGFwcC51bm1vdW50KCk7XG4gICAgICAgIH1cbiAgICB9LFxufSk7XG4iXX0=