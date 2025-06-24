import { _decorator, CCString, Color, Component, Enum, Label, size, Sprite, SpriteFrame, UITransform, Vec3 } from 'cc';
import { typeReusltBGEnd, createDefaultBGEnd, typeParameter, XYBase, typeParameterPropertyBase, typePos, typeResultSprite, creatDefaultSprite, creatDefaultText } from './TypeConfig/ResultType';
import { SpriteUltis } from './Ultis/SpriteUltis';
import { clearScreenDown } from 'readline';
const { ccclass, property, executeInEditMode } = _decorator;
export enum typeCpm {
    DROP_DOW,
    HEX_COST,
    BG_END_SCREEN,
    SPRITE_END,
    TEXT_END,
    TUTORIAL_BOX
}
@ccclass('CompenentCustom')
@executeInEditMode(true)
export class CompenentCustom extends Component {
    @property({ type: Enum(typeCpm) })
    typeCpm = typeCpm.BG_END_SCREEN;
    @property(CCString)
    parameterKey: string = "";
    private _dataCpm: any = {}

    public set dataCpm(v: string) {
        this._dataCpm = v;
    }

    public get dataCpm(): string {
        return this._dataCpm
    }

    protected onLoad(): void {
        this.dataCpm = this.setupPropertyByType(this.typeCpm);
    }
    setupPropertyByType(type: typeCpm) {
        let dataSetup: any = undefined;
        console.log("chek type", type);

        switch (type) {
            case typeCpm.DROP_DOW:

                break;

            case typeCpm.HEX_COST:

                break;

            case typeCpm.BG_END_SCREEN:
                console.log("BG_END_SCREEN");
                dataSetup = this.getValueBGEnd();
                break;
            case typeCpm.SPRITE_END:
                console.log("SPRITE_END");

                dataSetup = this.getValueSprite();
                console.log(dataSetup);
                break;

            case typeCpm.TEXT_END:

                break;

            case typeCpm.TUTORIAL_BOX:


                break;

            default:
                break;
        }
        console.log("Check Data", dataSetup);
        Object.assign(this.dataCpm, { [`${this.parameterKey}`]: dataSetup })
        return this.dataCpm
    }

    getValueBGEnd() {
        let dataSetup: typeReusltBGEnd = createDefaultBGEnd();
        const sprite = this.node.getComponent(Sprite);
        sprite.color = Color.fromHEX(new Color(), dataSetup.color);
        if (sprite) {
            const color = sprite.color.clone();
            color.a = dataSetup.opacity;
            sprite.color = color;
        }
        this.node.getComponent(UITransform)?.setContentSize(dataSetup.size.x, dataSetup.size.y);
        this.node.position = new Vec3(dataSetup.pos.x, dataSetup.pos.y, 0);
        return dataSetup;
    }

    getValueSprite() {
        let dataSprite = creatDefaultSprite();
        let spriteCpm = this.node.getComponent(Sprite)
        let contentSize: UITransform = this.node.getComponent(UITransform)
        dataSprite.label = "The button image";
        dataSprite.type = "object";
        dataSprite.parameters.sprite.label = "sprite of this object";
        dataSprite.parameters.sprite.type = "image";
        dataSprite.default.x = contentSize?.contentSize.x;
        dataSprite.default.y = contentSize?.contentSize.y;

        
        dataSprite.parameters.pos.default.x = this.node.getPosition().x
        dataSprite.parameters.pos.default.y = this.node.getPosition().y
        return dataSprite;
    }

    getValueText() {
        let dataText = creatDefaultText();
        let labelCpm = this.node.getComponent(Label);

        dataText.label = `${labelCpm.string} Text`;
        dataText.parameters.text.label = "Text";
        dataText.parameters.text.type = "text";
        dataText.parameters.text.default = labelCpm.string;;

        dataText.parameters.fontSize.label = "Font Size";
        dataText.parameters.fontSize.type = "range";
        dataText.parameters.fontSize.max = 200;
        dataText.parameters.fontSize.step = 1;
        dataText.parameters.fontSize.default = 60;

        dataText.parameters.fontColor.label = "Font Color";
        dataText.parameters.fontColor.type = "color";
        dataText.parameters.fontColor.default = `${labelCpm.color}`;



        dataText.parameters.strokeWidth.label = "Stroke Width";
        dataText.parameters.strokeWidth.type = "range";
        dataText.parameters.strokeWidth.max = 10;
        dataText.parameters.strokeWidth.step = 0.1;
        dataText.parameters.strokeWidth.default = `${labelCpm.outlineWidth}`;

        dataText.parameters.strokeColor.label = "Stroke Color";
        dataText.parameters.strokeColor.type = "color";
        dataText.parameters.strokeColor.default = `${labelCpm.outlineColor}`;

        dataText.parameters.pos.type = "coordinates";
        dataText.parameters.pos.label = 'Position';
        dataText.parameters.pos.default.x = this.node.getPosition().x;
        dataText.parameters.pos.default.y = this.node.getPosition().y;

        return dataText;
    }
}



