import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs-extra';
import { dirname, join } from 'path';
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
        callFile(msg: string) {
            let convertObjectData = JSON.parse(msg);
            console.log(`[index.ts]`, typeof convertObjectData, convertObjectData)
            Object.assign(dataCpm, convertObjectData);

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
                        console.log("Action GenFile--->>>>>>>>>>>>");
                        console.log("[index.ts method]", dataCpm);

                        // @ts-ignore
                        const pathRootProject = globalThis.projectPathRoot;

                        // 1. Tìm hoặc tạo thư mục 'output'
                        let outputDir = join(pathRootProject, 'output');
                        if (!existsSync(outputDir)) {
                            mkdirSync(outputDir, { recursive: true });
                        }

                        // 2. Tạo timestamp: 15h30_26062025
                        const now = new Date();
                        const pad = (n: number) => n.toString().padStart(2, '0');
                        const timeStr = `${pad(now.getHours())}h${pad(now.getMinutes())}_${pad(now.getDate())}${pad(now.getMonth() + 1)}${now.getFullYear()}`;

                        // 3. Tạo file name
                        let baseName = `data_${timeStr}`;
                        let finalPath = join(outputDir, `${baseName}.json`);
                        console.log(pathRootProject)
                        return
                        // 4. Nếu file đã tồn tại thì thêm counter
                        let counter = 1;
                        while (existsSync(finalPath)) {
                            finalPath = join(outputDir, `${baseName}_${counter}.json`);
                            counter++;
                        }

                        // 5. Ghi file
                        writeFileSync(finalPath, JSON.stringify(dataCpm, null, 4), 'utf-8');
                        console.log(`✅ File written to: ${finalPath}`);
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
