export const methods = {
    changeComponentProperty(nodeName: string, componentName: string, propertyName: string, newValue: any) {
            console.log(1111);
        //@ts-ignore
        const scene = cc.director.getScene();
        if (!scene) {
            console.warn("⚠️ Scene chưa được load");
            return;
        }

        const node = scene.getChildByName(nodeName);
        if (!node) {
            console.warn(`❌ Không tìm thấy node: ${nodeName}`);
            return;
        }

        const comp = node.getComponent(componentName);
        if (!comp) {
            console.warn(`❌ Không tìm thấy component: ${componentName}`);
            return;
        }

        comp[propertyName] = newValue;
        console.log(`✅ Đã thay đổi ${componentName}.${propertyName} =`, newValue);
    },
    hello() {
        console.log("👋 Hello from vue3-template scene-script");
    }
};