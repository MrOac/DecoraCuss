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
            let convertObjectData = JSON.parse(msg);
            console.log(`[index.ts]`, typeof convertObjectData, convertObjectData);
            Object.assign(dataCpm, convertObjectData);
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
                        console.log("Action GenFile--->>>>>>>>>>>>");
                        console.log("[index.ts method]", dataCpm);
                        // @ts-ignore
                        const pathRootProject = globalThis.projectPathRoot;
                        // 1. Tìm hoặc tạo thư mục 'output'
                        let outputDir = (0, path_1.join)(pathRootProject, 'output');
                        if (!(0, fs_extra_1.existsSync)(outputDir)) {
                            (0, fs_extra_1.mkdirSync)(outputDir, { recursive: true });
                        }
                        // 2. Tạo timestamp: 15h30_26062025
                        const now = new Date();
                        const pad = (n) => n.toString().padStart(2, '0');
                        const timeStr = `${pad(now.getHours())}h${pad(now.getMinutes())}_${pad(now.getDate())}${pad(now.getMonth() + 1)}${now.getFullYear()}`;
                        // 3. Tạo file name
                        let baseName = `data_${timeStr}`;
                        let finalPath = (0, path_1.join)(outputDir, `${baseName}.json`);
                        console.log(pathRootProject);
                        return;
                        // 4. Nếu file đã tồn tại thì thêm counter
                        let counter = 1;
                        while ((0, fs_extra_1.existsSync)(finalPath)) {
                            finalPath = (0, path_1.join)(outputDir, `${baseName}_${counter}.json`);
                            counter++;
                        }
                        // 5. Ghi file
                        (0, fs_extra_1.writeFileSync)(finalPath, JSON.stringify(dataCpm, null, 4), 'utf-8');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvcGFuZWxzL2RlZmF1bHQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBOEU7QUFDOUUsK0JBQXFDO0FBQ3JDLDZCQUFxQztBQUVyQyxNQUFNLFlBQVksR0FBRyxJQUFJLE9BQU8sRUFBWSxDQUFDO0FBQzdDOzs7R0FHRztBQUNILHlGQUF5RjtBQUV6RixNQUFNLE9BQU8sR0FBUSxFQUFFLENBQUM7QUFDeEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUNqQyxTQUFTLEVBQUU7UUFDUCxJQUFJLEtBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsSUFBSSxLQUFLLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2xDO0lBQ0QsUUFBUSxFQUFFLElBQUEsdUJBQVksRUFBQyxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsNkNBQTZDLENBQUMsRUFBRSxPQUFPLENBQUM7SUFDL0YsS0FBSyxFQUFFLElBQUEsdUJBQVksRUFBQyxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUseUNBQXlDLENBQUMsRUFBRSxPQUFPLENBQUM7SUFDeEYsQ0FBQyxFQUFFO1FBQ0MsR0FBRyxFQUFFLE1BQU07UUFDWCxJQUFJLEVBQUUsT0FBTztLQUNoQjtJQUNELE9BQU8sRUFBRTtRQUNMLEtBQUs7WUFDRCxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztZQUNwQyxDQUFDO1FBQ0wsQ0FBQztRQUNELFFBQVEsQ0FBQyxHQUFXO1lBQ2hCLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxH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WUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ04sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2xCLENBQUM7SUFDTCxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhpc3RzU3luYywgbWtkaXJTeW5jLCByZWFkRmlsZVN5bmMsIHdyaXRlRmlsZVN5bmMgfSBmcm9tICdmcy1leHRyYSc7XHJcbmltcG9ydCB7IGRpcm5hbWUsIGpvaW4gfSBmcm9tICdwYXRoJztcclxuaW1wb3J0IHsgY3JlYXRlQXBwLCBBcHAgfSBmcm9tICd2dWUnO1xyXG5cclxuY29uc3QgcGFuZWxEYXRhTWFwID0gbmV3IFdlYWtNYXA8YW55LCBBcHA+KCk7XHJcbi8qKlxyXG4gKiBAemgg5aaC5p6c5biM5pyb5YW85a65IDMuMyDkuYvliY3nmoTniYjmnKzlj6/ku6Xkvb/nlKjkuIvmlrnnmoTku6PnoIFcclxuICogQGVuIFlvdSBjYW4gYWRkIHRoZSBjb2RlIGJlbG93IGlmIHlvdSB3YW50IGNvbXBhdGliaWxpdHkgd2l0aCB2ZXJzaW9ucyBwcmlvciB0byAzLjNcclxuICovXHJcbi8vIEVkaXRvci5QYW5lbC5kZWZpbmUgPSBFZGl0b3IuUGFuZWwuZGVmaW5lIHx8IGZ1bmN0aW9uKG9wdGlvbnM6IGFueSkgeyByZXR1cm4gb3B0aW9ucyB9XHJcblxyXG5jb25zdCBkYXRhQ3BtOiBhbnkgPSB7fTtcclxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3IuUGFuZWwuZGVmaW5lKHtcclxuICAgIGxpc3RlbmVyczoge1xyXG4gICAgICAgIHNob3coKSB7IGNvbnNvbGUubG9nKCdzaG93Jyk7IH0sXHJcbiAgICAgICAgaGlkZSgpIHsgY29uc29sZS5sb2coJ2hpZGUnKTsgfSxcclxuICAgIH0sXHJcbiAgICB0ZW1wbGF0ZTogcmVhZEZpbGVTeW5jKGpvaW4oX19kaXJuYW1lLCAnLi4vLi4vLi4vc3RhdGljL3RlbXBsYXRlL2RlZmF1bHQvaW5kZXguaHRtbCcpLCAndXRmLTgnKSxcclxuICAgIHN0eWxlOiByZWFkRmlsZVN5bmMoam9pbihfX2Rpcm5hbWUsICcuLi8uLi8uLi9zdGF0aWMvc3R5bGUvZGVmYXVsdC9pbmRleC5jc3MnKSwgJ3V0Zi04JyksXHJcbiAgICAkOiB7XHJcbiAgICAgICAgYXBwOiAnI2FwcCcsXHJcbiAgICAgICAgdGV4dDogJyN0ZXh0J1xyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICBoZWxsbygpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuJC50ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiQudGV4dC5pbm5lckhUTUwgPSAnaGVsbG8nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjYWxsRmlsZShtc2c6IHN0cmluZykge1xyXG4gICAgICAgICAgICBsZXQgY29udmVydE9iamVjdERhdGEgPSBKU09OLnBhcnNlKG1zZyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBbaW5kZXgudHNdYCwgdHlwZW9mIGNvbnZlcnRPYmplY3REYXRhLCBjb252ZXJ0T2JqZWN0RGF0YSlcclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihkYXRhQ3BtLCBjb252ZXJ0T2JqZWN0RGF0YSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAsXHJcbiAgICAgICAgYXN5bmMgYXN5bmNEYXRhVG9Kc29uQWN0KCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFzeW5jRGF0YVRvSnNvbkFjdFwiKTtcclxuXHJcbiAgICAgICAgICAgIGF3YWl0IEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ3NjZW5lJywgJ3F1ZXJ5LW5vZGUtdHJlZScpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ/CfjL8gTm9kZSB0cmVlIHJlc3VsdDonLCByZXN1bHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gbGV0IHJlc3VsdCA9IEVkaXRvci5NZXNzYWdlLnNlbmQoJ215LWV4dGVuc2lvbicsICdoZWxsb0VkaXRvck1vZGUnLCAnSGlldScpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygn8J+RiSBL4bq/dCBxdeG6oyB04burIEVkaXRvcjonLCByZXN1bHQpO1xyXG4gICAgICAgICAgICAvLyByZXR1cm5cclxuICAgICAgICAgICAgLy8gRWRpdG9yLk1lc3NhZ2Uuc2VuZChcInNjZW5lXCIsKVxyXG4gICAgICAgICAgICAvLyBjb25zdCBzY2VuZSA9IGRpcmVjdG9yLmdldFNjZW5lKCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnN0IHJlc3VsdDogQ29tcG9uZW50W10gPSBbXTtcclxuICAgICAgICAgICAgLy8gY29uc3QgcXVldWUgPSBbLi4uc2NlbmUuY2hpbGRyZW5dOyAvLyDinIUgxJHDum5nIGtp4buDdVxyXG4gICAgICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBjb25zdCBub2RlID0gcXVldWVbaV07XHJcbiAgICAgICAgICAgIC8vICAgICBmb3IgKGNvbnN0IGNvbXAgb2Ygbm9kZS5jb21wb25lbnRzKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgY29uc3QgY3RvciA9IGNvbXAuY29uc3RydWN0b3IgYXMgYW55O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGNvbnN0IGF0dHJzID0gQ0NDbGFzcy5BdHRyLmdldENsYXNzQXR0cnMoY3Rvcik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgY29uc3QgaGFzUHJvcGVydHkgPSAncGFyYW1ldGVyS2V5JyBpbiBjb21wO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGlmIChoYXNQcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICByZXN1bHQucHVzaChjb21wKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICBxdWV1ZS5wdXNoKC4uLm5vZGUuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIHJldHVybiByZXN1bHQ7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZWFkeSgpIHtcclxuICAgICAgICBpZiAodGhpcy4kLnRleHQpIHtcclxuICAgICAgICAgICAgdGhpcy4kLnRleHQuaW5uZXJIVE1MID0gJ0hlbGxvIENvY29zLic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLiQuYXBwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFwcCA9IGNyZWF0ZUFwcCh7fSk7XHJcbiAgICAgICAgICAgIGFwcC5jb25maWcuY29tcGlsZXJPcHRpb25zLmlzQ3VzdG9tRWxlbWVudCA9ICh0YWcpID0+IHRhZy5zdGFydHNXaXRoKCd1aS0nKTtcclxuICAgICAgICAgICAgYXBwLmNvbXBvbmVudCgnTXlDb3VudGVyJywge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IHJlYWRGaWxlU3luYyhqb2luKF9fZGlybmFtZSwgJy4uLy4uLy4uL3N0YXRpYy90ZW1wbGF0ZS92dWUvY291bnRlci5odG1sJyksICd1dGYtOCcpLFxyXG4gICAgICAgICAgICAgICAgZGF0YSgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9LCBtZXRob2RzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkaXRpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQWN0aW9uIEdlbkZpbGUtLS0+Pj4+Pj4+Pj4+Pj5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW2luZGV4LnRzIG1ldGhvZF1cIiwgZGF0YUNwbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhdGhSb290UHJvamVjdCA9IGdsb2JhbFRoaXMucHJvamVjdFBhdGhSb290O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMS4gVMOsbSBob+G6t2MgdOG6oW8gdGjGsCBt4bulYyAnb3V0cHV0J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3V0cHV0RGlyID0gam9pbihwYXRoUm9vdFByb2plY3QsICdvdXRwdXQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFleGlzdHNTeW5jKG91dHB1dERpcikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1rZGlyU3luYyhvdXRwdXREaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAyLiBU4bqhbyB0aW1lc3RhbXA6IDE1aDMwXzI2MDYyMDI1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhZCA9IChuOiBudW1iZXIpID0+IG4udG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aW1lU3RyID0gYCR7cGFkKG5vdy5nZXRIb3VycygpKX1oJHtwYWQobm93LmdldE1pbnV0ZXMoKSl9XyR7cGFkKG5vdy5nZXREYXRlKCkpfSR7cGFkKG5vdy5nZXRNb250aCgpICsgMSl9JHtub3cuZ2V0RnVsbFllYXIoKX1gO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMy4gVOG6oW8gZmlsZSBuYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiYXNlTmFtZSA9IGBkYXRhXyR7dGltZVN0cn1gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmluYWxQYXRoID0gam9pbihvdXRwdXREaXIsIGAke2Jhc2VOYW1lfS5qc29uYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhdGhSb290UHJvamVjdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDQuIE7hur91IGZpbGUgxJHDoyB04buTbiB04bqhaSB0aMOsIHRow6ptIGNvdW50ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ZXIgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoZXhpc3RzU3luYyhmaW5hbFBhdGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbFBhdGggPSBqb2luKG91dHB1dERpciwgYCR7YmFzZU5hbWV9XyR7Y291bnRlcn0uanNvbmApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyA1LiBHaGkgZmlsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0ZUZpbGVTeW5jKGZpbmFsUGF0aCwgSlNPTi5zdHJpbmdpZnkoZGF0YUNwbSwgbnVsbCwgNCksICd1dGYtOCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhg4pyFIEZpbGUgd3JpdHRlbiB0bzogJHtmaW5hbFBhdGh9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhcHAubW91bnQodGhpcy4kLmFwcCk7XHJcbiAgICAgICAgICAgIHBhbmVsRGF0YU1hcC5zZXQodGhpcywgYXBwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYmVmb3JlQ2xvc2UoKSB7IH0sXHJcbiAgICBjbG9zZSgpIHtcclxuICAgICAgICBjb25zdCBhcHAgPSBwYW5lbERhdGFNYXAuZ2V0KHRoaXMpO1xyXG4gICAgICAgIGlmIChhcHApIHtcclxuICAgICAgICAgICAgYXBwLnVubW91bnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59KTtcclxuIl19