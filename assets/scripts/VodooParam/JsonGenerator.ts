import { _decorator, Component, Node, director } from 'cc';
import { PlayableParameterBase } from './PlayableParameterBase';
import { log } from 'console';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('JsonGenerator')
@executeInEditMode(true)
export class JsonGenerator extends Component {
    protected onLoad(): void {
        this.generateJsonFile()

    }
    getAllParameterComponents(): PlayableParameterBase[] {
        const allNodes = this.getAllNodes(director.getScene());
        const parameterComponents: PlayableParameterBase[] = [];
        for (const node of allNodes) {
            const components = node.getComponents(PlayableParameterBase);

            if (components && components.length > 0) {
                parameterComponents.push(...components);
            }
        }
        return parameterComponents;
    }

    private getAllNodes(node: Node): Node[] {
        const result: Node[] = [node];

        for (let i = 0; i < node.children.length; i++) {
            result.push(...this.getAllNodes(node.children[i]));
        }

        return result;

    }

    generateJsonFile() {
        console.log("____________________");
        const parameters = this.getAllParameterComponents();
        let parametersJson: Record<string, any> = {};
        console.log(parameters)
       parameters.forEach((parameter, index) => {
            const label = parameter.dataParameter.label;
            const type = parameter.dataParameter.type || 'unknown';
            parametersJson[`${label}_${type}_${index}`] = parameter.dataParameter;
        })

        const fullJson = {
            "$schema": "./node_modules/@voodoo.io/playable-config/schemas/build-configuration.schema.json",
            "parameters": parametersJson
        };

        

        const jsonDataGen = JSON.stringify(fullJson, null, 2);
        Editor.Panel.has("vue3-template").then(async (value) => {
            if (!value) Editor.Panel.open("vue3-template");
            const dataCpm = JSON.stringify(jsonDataGen);
            Editor.Message.send('vue3-template', "callFile", dataCpm);

        });
    }
}
