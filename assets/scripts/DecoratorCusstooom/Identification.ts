import { CCClass, Component } from "cc";

const KEY_DECO_CUSTOM = '__decorator_custom';

export function getSuper(constructor: Function): any {
    const proto = constructor.prototype;
    const dunderProto = proto && Object.getPrototypeOf(proto);
    return dunderProto && dunderProto.constructor;
}

export function Identification(nameClass: string): ClassDecorator {
    return function (target: Function) {
        const prototype = target.prototype;
        const propertyMeta = getEditorPropertiesAsJson(target);
        const descriptor: PropertyDescriptor = {
            configurable: true,
            enumerable: false,
            writable: true,
            value: {
                name: nameClass,
                properties: propertyMeta,
            },
        };

        if (!Object.prototype.hasOwnProperty.call(prototype, KEY_DECO_CUSTOM)) {
            Object.defineProperty(prototype, KEY_DECO_CUSTOM, descriptor);
        }

        // console.log(`[Identification] ${nameClass}`, prototype);
    };
}

// Hàm lấy metadata từ @property
export function getEditorPropertiesAsJson(constructor: Function): Map<string, any> {
    const attrs: any = CCClass.Attr.getClassAttrs(constructor);
    const results: Map<string, any> = new Map();

    for (const key of Object.keys(attrs)) {
        const match = key.match(/^(.+)\$_\$(.+)$/);
        if (!match) continue;

        const [_, propName, metaKey] = match;

        if (!results.has(propName)) {
            results.set(propName, {});
        }
        const meta = results.get(propName);
        meta[metaKey] = attrs[key];
    }
    return results;
}