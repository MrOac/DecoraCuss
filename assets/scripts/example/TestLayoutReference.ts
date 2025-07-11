import { _decorator, CCClass, CCString, Component, director, js, log, Sprite, SpriteFrame, sys, Node, Vec3 } from 'cc';
import { EDITOR } from 'cc/env';
import { Identification } from '../DecoratorCusstooom/Identification';

const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('TestLayoutReference')
@Identification("TestLayoutReference")

export class TestLayoutReference extends Component {
    @property({ type: SpriteFrame })
    leftSF: SpriteFrame = null;

    @property({ type: SpriteFrame })
    rightSF: SpriteFrame = null;

    @property({ type: Sprite })
    rightSprite: Sprite = null;

    @property({ type: Sprite })
    leftSprite: Sprite = null;
    propertiesFillter: any = null;


    protected async start() {

        



    }

    async getCpmIdentification(): Promise<Component[]> {
        const scene = director.getScene();
        const result: Component[] = [];
        const queue: Node[] = [...scene.children];

        while (queue.length > 0) {
            const node = queue.shift()!;
            for (const comp of node.components) {
                const ctor = comp.constructor as any;
                const attrs = CCClass.Attr.getClassAttrs(ctor);
                if ('parameterKey' in comp) {
                    result.push(comp);
                }
            }
            queue.push(...node.children);
        }

        return result;
    }


    getEditorPropertiesAsJson(fromComponent: Component, filePath: string[]) {
        const attrs: any = CCClass.Attr.getClassAttrs(fromComponent.constructor);
        let listMapCompoment: Map<string, {}> = new Map();
        for (const key in fromComponent) {
            if (Object.prototype.hasOwnProperty.call(fromComponent, key)) {
                const element = fromComponent[key];
                if (filePath.indexOf(key) != -1) {
                    listMapCompoment.set(key, element);
                }
            }
        }

        const jsonObject = Object.fromEntries(listMapCompoment);
        console.log(JSON.stringify(jsonObject, null, 2));
        return;
    }

    getNewValueTypeCodeUniversal(value: any): string | null {
        if (!value || typeof value !== 'object') return null;

        const clsName = js.getClassName(value);
        const type = value.constructor;

        if (!type || !type.__props__) {
            // Không phải ValueType (Vec3, Color, ...)
            return null;
        }

        try {
            const args = type.__props__.map((prop: string) => {
                const val = value[prop];
                if (typeof val === 'string') {
                    return `"${val}"`;
                } else if (typeof val === 'number' || typeof val === 'boolean') {
                    return val;
                } else {
                    return 'null'; // nếu là object/phức tạp thì không export
                }
            });
            return `new ${clsName}(${args.join(', ')})`;
        } catch (e) {
            console.warn('Cannot serialize:', value);
            return `new ${clsName}()`;
        }
    }

    extractComponentSchema(comp: Component): any {
        const ctor = comp.constructor as any;
        const props = ctor.__props__ || [];
        const attrs = CCClass.Attr.getClassAttrs(ctor);

        const parameters: any = {};

        for (const key of props) {
            const baseKey = key + '$_$';
            const type = attrs[baseKey + 'type'];
            const ctorType = attrs[baseKey + 'ctor'];
            const tooltip = attrs[baseKey + 'tooltip'];
            const def = attrs[baseKey + 'default'];
            const min = attrs[baseKey + 'min'];
            const max = attrs[baseKey + 'max'];
            const step = attrs[baseKey + 'step'];

            let paramSchema: any = {
                label: tooltip || key,
                type: 'string',
                default: def,
            };

            if (ctorType) {
                const clsName = js.getClassName(ctorType);
                switch (clsName) {
                    case 'Vec2':
                    case 'Size':
                    case 'Vec3':
                        paramSchema.type = 'coordinates';
                        paramSchema.default = def || { x: 0, y: 0 };
                        paramSchema.x = { min, max, step };
                        paramSchema.y = { min, max, step };
                        break;
                    case 'SpriteFrame':
                    case 'ImageAsset':
                        paramSchema.type = 'image';
                        break;
                    default:
                        paramSchema.type = 'object';
                        break;
                }
            } else if (type === 'Number') {
                paramSchema.type = 'number';
                paramSchema.min = min;
                paramSchema.max = max;
                paramSchema.step = step;
            } else if (type === 'Boolean') {
                paramSchema.type = 'boolean';
            }

            parameters[key] = paramSchema;
        }

        return {
            label: js.getClassName(comp),
            type: 'object',
            category: 'Default',
            parameters
        };
    }
    getCustomPropertiesOnly(comp: Component): string[] {
        const allProps = Object.getOwnPropertyNames(comp);
        const baseProps = new Set(Object.getOwnPropertyNames(Component.prototype));

        return allProps.filter((prop) => {
            return !baseProps.has(prop) && !prop.startsWith('_') && typeof (comp as any)[prop] !== 'function';
        });
    }


}


function Deroratify(arg0: string): (target: typeof TestLayoutReference) => void | typeof TestLayoutReference {
    throw new Error('Function not implemented.');
}

