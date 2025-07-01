import { writeFileSync } from 'fs';
import { readFileSync } from 'fs-extra';
import { join } from 'path';
import { createApp, App, reactive } from 'vue';

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

        callFile(msg: any) {
            try {
                const msgObj = JSON.parse(msg);
                console.log("🟡 callFile - Parsed object:", msgObj);

                Object.assign(sharedState.dataCpm, msgObj); // cập nhật vào reactive object
            } catch (err) {
                console.error("❌ JSON parse failed:", err);
            }
        },

        async asyncDataToJsonAct() {
            console.log("🔄 asyncDataToJsonAct");
            const result = await Editor.Message.request('scene', 'query-node-tree');
            console.log('🌿 Node tree result:', result);
        },
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
