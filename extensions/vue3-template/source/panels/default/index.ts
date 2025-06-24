import { readFileSync } from 'fs-extra';
import { join } from 'path';
import { createApp, App } from 'vue';

const panelDataMap = new WeakMap<any, App>();
/**
 * @zh 如果希望兼容 3.3 之前的版本可以使用下方的代码
 * @en You can add the code below if you want compatibility with versions prior to 3.3
 */
// Editor.Panel.define = Editor.Panel.define || function(options: any) { return options }

const dataCpm: any = {};
module.exports = Editor.Panel.define({
    listeners: {
        show() { console.log('show'); },
        hide() { console.log('hide'); },
    },
    template: readFileSync(join(__dirname, '../../../static/template/default/index.html'), 'utf-8'),
    style: readFileSync(join(__dirname, '../../../static/style/default/index.css'), 'utf-8'),
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
        callFile(msg: any) {
            console.log("call From Secene in to index.js", msg);
            Object.assign(panelDataMap, {})

        }
        ,
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
            const app = createApp({});
            app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('ui-');
            app.component('MyCounter', {
                template: readFileSync(join(__dirname, '../../../static/template/vue/counter.html'), 'utf-8'),
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
