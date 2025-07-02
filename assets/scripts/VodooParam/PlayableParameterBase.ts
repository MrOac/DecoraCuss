import { _decorator, Color, Component, Enum, Label, LabelOutline, Node, Sprite, UITransform } from 'cc';
import {
    NumberParameter,
    RangeParameter,
    BooleanParameter,
    ColorParameter,
    TextParameter,
    ImageParameter,
    CoordinatesParameter,
    SelectParameter,
    ObjectParameter
} from './BaseParameter';
const { ccclass, property } = _decorator;
export enum typeCpm {
    BG_POPUP,
    SPRITE_BUTTON,
    RECTANGLE,
    COLOR,
    TEXT,
    NUMBER,
    TIMER,
}

@ccclass('ParameterCpm')
export class PlayableParameterBase extends Component {
    @property({ type: Enum(typeCpm) })
    typeCpm = typeCpm.BG_POPUP;


    _dataParameter: Record<string, any> = {};

    public set dataParameter(v: Record<string, any>) {
        this._dataParameter = v;
    }
    public get dataParameter() {
        if (Object.keys(this._dataParameter).length === 0) {
            this.init()
        }
        return this._dataParameter;
    }

    init() {
        this.dataParameter = this.setupPropertyByType(this.typeCpm);
    }

    setupPropertyByType(type: typeCpm) {
        let dataSetup: Record<string, any> = {};
        switch (type) {
            case typeCpm.BG_POPUP:
                dataSetup = this.getValueBG();
                break;
            case typeCpm.SPRITE_BUTTON:
                dataSetup = this.getValueSprite();
                break;
            case typeCpm.RECTANGLE:
                dataSetup = this.getValueRectangle();
                break;
            case typeCpm.COLOR:
                dataSetup = this.getValueColor();
                break;
            case typeCpm.TEXT:
                dataSetup = this.getValueText();
                break;
            case typeCpm.NUMBER:
                dataSetup = this.getValueGamePlayNumber();
                break;
            case typeCpm.TIMER:
                dataSetup = this.getValueTimer();
                break;
            default:
                break;
        }
        console.log("Check Data", dataSetup);
        return dataSetup
    }

    getValueBG() {
        const sprite = this.node.getComponent(Sprite);
        const uiTransform = this.node.getComponent(UITransform);
        const colorHex = `#${sprite.color.toHEX('#rrggbbaa')}`;
        const opacity = sprite.color.a;
        const size = {
            x: uiTransform.width,
            y: uiTransform.height
        };
        const position = {
            x: this.node.position.x,
            y: this.node.position.y
        };
        const parameters = [
            new ColorParameter('Color of BG', colorHex),
            new RangeParameter('Opacity of BG', opacity, 0, 255, 1),
            new CoordinatesParameter(
                'Size of BG',
                size,
                { min: 0, max: 10000, step: 1 },
                { min: 0, max: 10000, step: 1 }
            ),
            new CoordinatesParameter(
                'Position of BG',
                position,
                { min: -1000, max: 1000, step: 1 },
                { min: -1000, max: 1000, step: 1 }
            )
        ];

        return new ObjectParameter(
            'Background in lose popup',
            parameters,
            undefined,
            undefined,
            'Lose Popup'
        );
    }
    getValueSprite() {
        const sprite = this.node.getComponent(Sprite);
        const uiTransform = this.node.getComponent(UITransform);
        const position = this.node.getPosition();

        // Giả sử bạn đã có texture hoặc đường dẫn sprite frame
        // Nếu bạn dùng AssetManager, hãy lấy `sprite.spriteFrame.name` hoặc custom theo asset path của bạn
        const spritePath = sprite?.spriteFrame?.name || 'default.png';

        // Tạo các parameter dựa theo trạng thái hiện tại của node
        const parameters = [
            new ImageParameter('Sprite of this object', `src/assets/${spritePath}`),
            new CoordinatesParameter(
                'Size of this image',
                { x: uiTransform.width, y: uiTransform.height },
                { min: 0, max: 10000, step: 1 },
                { min: 0, max: 10000, step: 1 }
            ),
            new CoordinatesParameter(
                'Position of this image',
                { x: position.x, y: position.y },
                { min: -1000, max: 1000, step: 1 },
                { min: -1000, max: 1000, step: 1 }
            )
        ];
        return new ObjectParameter(
            'Button PLAY NOW sprite',
            parameters,
            undefined,
            undefined,
            'Gameplay'
        );
    }

    getValueText() {
        const labelCpm = this.node.getComponent(Label);
        const position = this.node.getPosition();

        const fontColor = `#${labelCpm.color.toHEX('#rrggbbaa')}`;

        const outline = this.node.getComponent(LabelOutline);
        const strokeWidth = outline ? outline.width : 0;
        const strokeColor = outline ? `#${outline.color.toHEX('#rrggbbaa')}` : '#000000';

        const parameters = [
            new TextParameter('Text of the button PLAY NOW', labelCpm.string),
            new RangeParameter('Font size', labelCpm.fontSize, 0, 200, 1),
            new ColorParameter('Font color', fontColor),
            new RangeParameter('Stroke Width', strokeWidth, 0, 10, 0.1),
            new ColorParameter('Stroke Color', strokeColor),
            new CoordinatesParameter(
                'Position',
                { x: position.x, y: position.y },
                { min: -1000, max: 1000, step: 1 },
                { min: -1000, max: 1000, step: 1 }
            )
        ];

        return new ObjectParameter(
            'Button PLAY NOW Text',
            parameters,
            undefined,
            undefined,
            'Gameplay'
        );
    }
    getValueTimer() {
        const labelCpm = this.node.getComponent(Label);
        const scale = this.node.scale; // Vec3
        const position = this.node.getPosition();

        // Giả định nội dung label là số giây (chuỗi có thể cần parse)
        let seconds = parseFloat(labelCpm.string);
        if (isNaN(seconds)) {
            seconds = 60; // fallback nếu không hợp lệ
        }

        const parameters = [
            new NumberParameter('set Second', seconds),
            new CoordinatesParameter(
                'Size of this timer',
                { x: scale.x, y: scale.y },
                { min: 0, max: 5, step: 0.1 },
                { min: 0, max: 5, step: 0.1 }
            ),
            new CoordinatesParameter(
                'Position of this timer',
                { x: position.x, y: position.y },
                { min: -1000, max: 1000, step: 1 },
                { min: -1000, max: 1000, step: 1 }
            )
        ];

        return new ObjectParameter(
            'Parameters of this timer',
            parameters,
            undefined,
            undefined,
            'Timer'
        );
    }

    getValueRectangle() {
        const uiTransform = this.node.getComponent(UITransform);

        const width = uiTransform.width;
        const height = uiTransform.height;

        const parameters = [
            new NumberParameter('width', width),
            new NumberParameter('height', height)
        ];

        return new ObjectParameter(
            'the rectangle of tutorial',
            parameters,
            undefined,
            undefined,
            'Tutorial'
        );
    }
    // value không thể lấy
    getValueGamePlayNumber() {
        const parameters = [
            new NumberParameter('Money rewarded', 10),
            new NumberParameter('Time cooldown when tower spawn creep', 3),
            new RangeParameter('Hex cost', 10, 0, 50, 1),
            new RangeParameter('Zoom percent', 1, 0, 1, 0.01)
        ];

        return new ObjectParameter(
            'Money, Time cooldown, Hex Cost, Zoom percent',
            parameters,
            undefined,
            undefined,
            'Gameplay'
        );
    }
    // value không thể lấy
    getValueColor() {
        const enemyColor = '#FF6B6B';
        const defaultColor = '#797979';
        const playerColor = '#8DFF24';

        const parameters = [
            new ColorParameter('Enemy grid color', enemyColor),   // color1
            new ColorParameter('default grid color', defaultColor), // color2
            new ColorParameter('Player grid color', playerColor)  // color3
        ];
        return new ObjectParameter(
            'Color of the grid',
            parameters,
            undefined,
            undefined,
            'Color'
        );
    }

}


