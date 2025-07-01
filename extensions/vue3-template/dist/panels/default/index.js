"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const vue_1 = require("vue");
const panelDataMap = new WeakMap();
// Dữ liệu dùng chung, reactive để Vue theo dõi thay đổi
const sharedState = (0, vue_1.reactive)({
    dataCpm: {},
});
module.exports = Editor.Panel.define({
    listeners: {
        show() { console.log('Panel show'); },
        hide() { console.log('Panel hide'); },
    },
    template: (0, fs_extra_1.readFileSync)((0, path_1.join)(__dirname, '../../../static/template/default/index.html'), 'utf-8'),
    style: (0, fs_extra_1.readFileSync)((0, path_1.join)(__dirname, '../../../static/style/default/index.css'), 'utf-8'),
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
        callFile(msg) {
            try {
                const msgObj = JSON.parse(msg);
                console.log("🟡 callFile - Parsed object:", msgObj);
                Object.assign(sharedState.dataCpm, msgObj); // cập nhật vào reactive object
            }
            catch (err) {
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
            const app = (0, vue_1.createApp)({
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
                            const path = (0, path_1.join)(__dirname, '../../../outputdatajson/my-data.json'); // 📂 đường dẫn cần chỉnh đúng
                            const jsonString = JSON.stringify(this.sharedState.dataCpm, null, 4); // đẹp, dễ đọc
                            (0, fs_1.writeFileSync)(path, jsonString, 'utf-8');
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
                        }
                        catch (err) {
                            console.error("❌ Ghi file thất bại:", err);
                        }
                    },
                    subtraction() {
                        console.log(" subtraction called");
                    },
                },
                template: (0, fs_extra_1.readFileSync)((0, path_1.join)(__dirname, '../../../static/template/vue/counter.html'), 'utf-8'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvcGFuZWxzL2RlZmF1bHQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQkFBbUM7QUFDbkMsdUNBQXdDO0FBQ3hDLCtCQUE0QjtBQUM1Qiw2QkFBK0M7QUFFL0MsTUFBTSxZQUFZLEdBQUcsSUFBSSxPQUFPLEVBQVksQ0FBQztBQUU3Qyx3REFBd0Q7QUFDeEQsTUFBTSxXQUFXLEdBQUcsSUFBQSxjQUFRLEVBQUM7SUFDekIsT0FBTyxFQUFFLEVBQVM7Q0FDckIsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUNqQyxTQUFTLEVBQUU7UUFDUCxJQUFJLEtBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3hDO0lBRUQsUUFBUSxFQUFFLElBQUEsdUJBQVksRUFBQyxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsNkNBQTZDLENBQUMsRUFBRSxPQUFPLENBQUM7SUFDL0YsS0FBSyxFQUFFLElBQUEsdUJBQVksRUFBQyxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUseUNBQXlDLENBQUMsRUFBRSxPQUFPLENBQUM7SUFFeEYsQ0FBQyxFQUFFO1FBQ0MsR0FBRyxFQUFFLE1BQU07UUFDWCxJQUFJLEVBQUUsT0FBTztLQUNoQjtJQUVELE9BQU8sRUFBRTtRQUNMLEtBQUs7WUFDRCxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2QsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztZQUNwQyxDQUFDO1FBQ0wsQ0FBQztRQUVELFFBQVEsQ0FBQyxHQUFRO1lBQ2IsSUFBSSxDQUFDO2dCQUNELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBRXBELE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLCtCQUErQjtZQUMvRSxDQUFDO1lBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztnQkFDWCxPQUFPLENBQUMsS0FBSyxDQUFDLHNCQUFzQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQy9DLENBQUM7UUFDTCxDQUFDO1FBRUQsS0FBSyxDQUFDLGtCQUFrQjtZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDckMsTUFBTSxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUN4RSxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELENBQUM7S0FDSjtJQUVELEtBQUs7UUFDRCxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDO1FBQzNDLENBQUM7UUFFRCxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDYixNQUFNLEdBQUcsR0FBRyxJQUFBLGVBQVMsRUFBQztnQkFDbEIsSUFBSTtvQkFDQSxPQUFPO3dCQUNILE9BQU8sRUFBRSxDQUFDO3dCQUNWLFdBQVcsRUFBRSxlQUFlO3FCQUMvQixDQUFDO2dCQUNOLENBQUM7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLFFBQVE7d0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO3dCQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ2pFLElBQUksQ0FBQzs0QkFDRCxNQUFNLElBQUksR0FBRyxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsc0NBQXNDLENBQUMsQ0FBQyxDQUFDLDhCQUE4Qjs0QkFDcEcsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjOzRCQUNwRixJQUFBLGtCQUFhLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQzs0QkFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsSUFBSSxFQUFFLENBQUMsQ0FBQzs0QkFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDOzRCQUVyQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUU7Z0NBQ2pELElBQUksRUFBRSxlQUFlO2dDQUNyQixNQUFNLEVBQUUsT0FBTztnQ0FDZixJQUFJLEVBQUUsRUFBRTs2QkFDWCxDQUFDLENBQUM7NEJBRUgsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFO2dDQUNqRCxJQUFJLEVBQUUsZUFBZTtnQ0FDckIsTUFBTSxFQUFFLHlCQUF5QjtnQ0FDakMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUM7NkJBQ3BELENBQUMsQ0FBQzt3QkFHUCxDQUFDO3dCQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7NEJBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLENBQUMsQ0FBQzt3QkFDL0MsQ0FBQztvQkFDTCxDQUFDO29CQUNELFdBQVc7d0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO29CQUN2QyxDQUFDO2lCQUNKO2dCQUNELFFBQVEsRUFBRSxJQUFBLHVCQUFZLEVBQUMsSUFBQSxXQUFJLEVBQUMsU0FBUyxFQUFFLDJDQUEyQyxDQUFDLEVBQUUsT0FBTyxDQUFDO2FBQ2hHLENBQUMsQ0FBQztZQUVILEdBQUcsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLGVBQWUsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1RSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEIsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDaEMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXLEtBQUssQ0FBQztJQUVqQixLQUFLO1FBQ0QsTUFBTSxHQUFHLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ04sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2xCLENBQUM7SUFDTCxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgd3JpdGVGaWxlU3luYyB9IGZyb20gJ2ZzJztcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IGNyZWF0ZUFwcCwgQXBwLCByZWFjdGl2ZSB9IGZyb20gJ3Z1ZSc7XG5cbmNvbnN0IHBhbmVsRGF0YU1hcCA9IG5ldyBXZWFrTWFwPGFueSwgQXBwPigpO1xuXG4vLyBE4buvIGxp4buHdSBkw7luZyBjaHVuZywgcmVhY3RpdmUgxJHhu4MgVnVlIHRoZW8gZMO1aSB0aGF5IMSR4buVaVxuY29uc3Qgc2hhcmVkU3RhdGUgPSByZWFjdGl2ZSh7XG4gICAgZGF0YUNwbToge30gYXMgYW55LFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRWRpdG9yLlBhbmVsLmRlZmluZSh7XG4gICAgbGlzdGVuZXJzOiB7XG4gICAgICAgIHNob3coKSB7IGNvbnNvbGUubG9nKCdQYW5lbCBzaG93Jyk7IH0sXG4gICAgICAgIGhpZGUoKSB7IGNvbnNvbGUubG9nKCdQYW5lbCBoaWRlJyk7IH0sXG4gICAgfSxcblxuICAgIHRlbXBsYXRlOiByZWFkRmlsZVN5bmMoam9pbihfX2Rpcm5hbWUsICcuLi8uLi8uLi9zdGF0aWMvdGVtcGxhdGUvZGVmYXVsdC9pbmRleC5odG1sJyksICd1dGYtOCcpLFxuICAgIHN0eWxlOiByZWFkRmlsZVN5bmMoam9pbihfX2Rpcm5hbWUsICcuLi8uLi8uLi9zdGF0aWMvc3R5bGUvZGVmYXVsdC9pbmRleC5jc3MnKSwgJ3V0Zi04JyksXG5cbiAgICAkOiB7XG4gICAgICAgIGFwcDogJyNhcHAnLFxuICAgICAgICB0ZXh0OiAnI3RleHQnLFxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGhlbGxvKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuJC50ZXh0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kLnRleHQuaW5uZXJIVE1MID0gJ2hlbGxvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBjYWxsRmlsZShtc2c6IGFueSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBtc2dPYmogPSBKU09OLnBhcnNlKG1zZyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLwn5+hIGNhbGxGaWxlIC0gUGFyc2VkIG9iamVjdDpcIiwgbXNnT2JqKTtcblxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oc2hhcmVkU3RhdGUuZGF0YUNwbSwgbXNnT2JqKTsgLy8gY+G6rXAgbmjhuq10IHbDoG8gcmVhY3RpdmUgb2JqZWN0XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi4p2MIEpTT04gcGFyc2UgZmFpbGVkOlwiLCBlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGFzeW5jIGFzeW5jRGF0YVRvSnNvbkFjdCgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi8J+UhCBhc3luY0RhdGFUb0pzb25BY3RcIik7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBFZGl0b3IuTWVzc2FnZS5yZXF1ZXN0KCdzY2VuZScsICdxdWVyeS1ub2RlLXRyZWUnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfwn4y/IE5vZGUgdHJlZSByZXN1bHQ6JywgcmVzdWx0KTtcbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgcmVhZHkoKSB7XG4gICAgICAgIGlmICh0aGlzLiQudGV4dCkge1xuICAgICAgICAgICAgdGhpcy4kLnRleHQuaW5uZXJIVE1MID0gJ0hlbGxvIENvY29zLic7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy4kLmFwcCkge1xuICAgICAgICAgICAgY29uc3QgYXBwID0gY3JlYXRlQXBwKHtcbiAgICAgICAgICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcjogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYXJlZFN0YXRlLCAvLyBiaW5kIHbDoG8gVnVlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLwn5+iIGFkZGl0aW9uIGNhbGxlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi8J+TpiBzaGFyZWRTdGF0ZS5kYXRhQ3BtOlwiLCB0aGlzLnNoYXJlZFN0YXRlLmRhdGFDcG0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXRoID0gam9pbihfX2Rpcm5hbWUsICcuLi8uLi8uLi9vdXRwdXRkYXRhanNvbi9teS1kYXRhLmpzb24nKTsgLy8g8J+TgiDEkcaw4budbmcgZOG6q24gY+G6p24gY2jhu4luaCDEkcO6bmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBqc29uU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodGhpcy5zaGFyZWRTdGF0ZS5kYXRhQ3BtLCBudWxsLCA0KTsgLy8gxJHhurlwLCBk4buFIMSR4buNY1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlRmlsZVN5bmMocGF0aCwganNvblN0cmluZywgJ3V0Zi04Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYOKchSBGaWxlIEpTT04gxJHDoyDEkcaw4bujYyBnaGkgdOG6oWk6ICR7cGF0aH1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn8J+agCBTZW5kaW5nIHRvIEVkaXRvcjonKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVkaXRvci5NZXNzYWdlLnNlbmQoJ3NjZW5lJywgJ2V4ZWN1dGUtc2NlbmUtc2NyaXB0Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAndnVlMy10ZW1wbGF0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2hlbGxvJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnczogW11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVkaXRvci5NZXNzYWdlLnNlbmQoJ3NjZW5lJywgJ2V4ZWN1dGUtc2NlbmUtc2NyaXB0Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAndnVlMy10ZW1wbGF0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ2NoYW5nZUNvbXBvbmVudFByb3BlcnR5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnczogWydQbGF5ZXInLCAnUGxheWVyQ29udHJvbGxlcicsICdzcGVlZCcsIDUwXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLinYwgR2hpIGZpbGUgdGjhuqV0IGLhuqFpOlwiLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzdWJ0cmFjdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIHN1YnRyYWN0aW9uIGNhbGxlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiByZWFkRmlsZVN5bmMoam9pbihfX2Rpcm5hbWUsICcuLi8uLi8uLi9zdGF0aWMvdGVtcGxhdGUvdnVlL2NvdW50ZXIuaHRtbCcpLCAndXRmLTgnKSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBhcHAuY29uZmlnLmNvbXBpbGVyT3B0aW9ucy5pc0N1c3RvbUVsZW1lbnQgPSAodGFnKSA9PiB0YWcuc3RhcnRzV2l0aCgndWktJyk7XG4gICAgICAgICAgICBhcHAubW91bnQodGhpcy4kLmFwcCk7XG4gICAgICAgICAgICBwYW5lbERhdGFNYXAuc2V0KHRoaXMsIGFwcCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYmVmb3JlQ2xvc2UoKSB7IH0sXG5cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgY29uc3QgYXBwID0gcGFuZWxEYXRhTWFwLmdldCh0aGlzKTtcbiAgICAgICAgaWYgKGFwcCkge1xuICAgICAgICAgICAgYXBwLnVubW91bnQoKTtcbiAgICAgICAgfVxuICAgIH0sXG59KTtcbiJdfQ==