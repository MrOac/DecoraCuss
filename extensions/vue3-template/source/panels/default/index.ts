<<<<<<< HEAD
import { writeFileSync } from 'fs';
import { readFileSync } from 'fs-extra';
import { join } from 'path';
import { createApp, App, reactive } from 'vue';
=======
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs-extra';
import { dirname, join } from 'path';
import { createApp, App } from 'vue';
>>>>>>> e548b5cb4b1946d5ad03309eaf355f725aef1d20

const panelDataMap = new WeakMap<any, App>();

// Dữ liệu dùng chung, reactive để Vue theo dõi thay đổi
const sharedState = reactive({
    dataCpm: {} as any,
});

module.exports = Editor.Panel.define({
    listeners: {
        show() { console.log('Panel show'); },
        hide() { console.log('Panel hide'); },
    },

    template: readFileSync(join(__dirname, '../../../static/template/default/index.html'), 'utf-8'),
    style: readFileSync(join(__dirname, '../../../static/style/default/index.css'), 'utf-8'),

    $: {
        app: '#app',
        text: '#text',
    },

    methods: {
        hello() {
            if (this.$.text) {
                this.$.text.innerHTML = 'hello';
            }
        },
<<<<<<< HEAD

        callFile(msg: any) {
            try {
                const msgObj = JSON.parse(msg);
                console.log("🟡 callFile - Parsed object:", msgObj);

                Object.assign(sharedState.dataCpm, msgObj); // cập nhật vào reactive object
            } catch (err) {
                console.error("❌ JSON parse failed:", err);
            }
        },
=======
        callFile(msg: string) {
            let convertObjectData = JSON.parse(msg);
            console.log(`[index.ts]`, typeof convertObjectData, convertObjectData)
            Object.assign(dataCpm, convertObjectData);
>>>>>>> e548b5cb4b1946d5ad03309eaf355f725aef1d20

        async asyncDataToJsonAct() {
<<<<<<< HEAD
            console.log("🔄 asyncDataToJsonAct");
            const result = await Editor.Message.request('scene', 'query-node-tree');
            console.log('🌿 Node tree result:', result);
        },
=======
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
>>>>>>> e548b5cb4b1946d5ad03309eaf355f725aef1d20
    },

    ready() {
        if (this.$.text) {
            this.$.text.innerHTML = 'Hello Cocos.';
        }

        if (this.$.app) {
            const app = createApp({
                data() {
                    return {
                        counter: 0,
                        sharedState, // bind vào Vue
                    };
                },
                methods: {
                    addition() {
<<<<<<< HEAD
                        console.log("🟢 addition called");
                        console.log("📦 sharedState.dataCpm:", this.sharedState.dataCpm);
                        try {
                            const path = join(__dirname, '../../../outputdatajson/my-data.json'); // 📂 đường dẫn cần chỉnh đúng
                            const jsonString = JSON.stringify(this.sharedState.dataCpm, null, 4); // đẹp, dễ đọc
                            writeFileSync(path, jsonString, 'utf-8');
                            console.log(`✅ File JSON đã được ghi tại: ${path}`);
                            console.log('🚀 Sending to Editor:');

                            Editor.Message.send('scene', 'execute-scene-script', {
                                name: 'vue3-template',
                                method: 'hello',
                                args: []
                            });

                            Editor.Message.send('scene', 'execute-scene-script', {
                                name: 'vue3-template',
                                method: 'changeComponentProperty',
                                args: ['Player', 'PlayerController', 'speed', 50]
                            });


                        } catch (err) {
                            console.error("❌ Ghi file thất bại:", err);
                        }
                    },
                    subtraction() {
                        console.log(" subtraction called");
=======
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
>>>>>>> e548b5cb4b1946d5ad03309eaf355f725aef1d20
                    },
                },
                template: readFileSync(join(__dirname, '../../../static/template/vue/counter.html'), 'utf-8'),
            });

            app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('ui-');
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
