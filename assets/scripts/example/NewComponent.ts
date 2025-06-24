import { _decorator, Component, Node } from 'cc';
import { EDITOR } from 'cc/env';
import { Identification } from '../DecoratorCusstooom/Identification';
import { CompenentCustom } from '../DecoratorCusstooom/CompenentCustom';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('NewComponent')
@Identification("NewComponent")
export class NewComponent extends CompenentCustom {
    tesstaaa: "1111111111111111111111111"
    protected onLoad(): void {
        

    }

}


