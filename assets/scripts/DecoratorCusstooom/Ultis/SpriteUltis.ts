

import { ImageAsset, SpriteFrame, Texture2D, } from "cc";
export class SpriteUltis {
    static getTextureFromBase64(imgStringBase64: string): Promise<Texture2D> {
        return new Promise((resolve, reject) => {
            const tex = new Texture2D();

            const img = new Image();
            img.src = imgStringBase64;

            img.onload = () => {
                tex.image = new ImageAsset(img);
                tex.setWrapMode(Texture2D.WrapMode.CLAMP_TO_EDGE, Texture2D.WrapMode.CLAMP_TO_EDGE);
                resolve(tex);
            }
        });
    }

    static async setSpriteFromBase64(imgStringBase64: string): Promise<SpriteFrame> {
        const tex = await SpriteUltis.getTextureFromBase64(imgStringBase64);
        const spriteFrame = new SpriteFrame();
        spriteFrame.texture = tex;
        return spriteFrame;

    }
}
