import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs-extra';
import { dirname, join } from 'path';
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
                const parsed = JSON.parse(msg);
                console.log("🟡 callFile - Parsed object:", parsed);

                const isString = typeof parsed === 'string';

                const dataObject = isString ? JSON.parse(parsed) : parsed;

                // Cập nhật reactive object
                Object.assign(sharedState.dataCpm, dataObject);

                // Ghi file đúng kiểu object
                this.GenFileJsonData(dataObject);

            } catch (err) {
                console.error("❌ JSON parse failed:", err);
            }
        },
        GenFileJsonData(data: any) {
            console.log("🟢 GenFileJsonData called");
            console.log("📦 sharedState.dataCpm:", data);
            try {
                const path = join(__dirname, '../../../outputdatajson/my-data.json');
                const jsonString = JSON.stringify(data, null, 4);

                writeFileSync(path, jsonString, 'utf-8');

                console.log(`✅ File JSON đã được ghi tại: ${path}`);

                Editor.Message.send('scene', 'execute-scene-script', {
                    name: 'vue3-template',
                    method: 'changeComponentProperty',
                    args: ['Player', 'PlayerController', 'speed', 50]
                });

            } catch (err) {
                console.error("❌ Ghi file thất bại:", err);
            }
        }
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
                        sharedState, // truyền reactive object từ bên ngoài
                    };
                },
                methods: {
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
