import { log } from "cc";
import { OnParameterUpdatedParameters, Playable } from "./Playable";
import { PlayableVsdk } from "./PlayableVsdk";

export type ParameterUpdatedCallback = (parameters: OnParameterUpdatedParameters) => void;

export class Vsdk {
    public static get vsdk() : PlayableVsdk {
        return (window as any).mainVsdk || {
            getAudioVolume() {
                return 1
            },
            getParameterValue(key) {
                return null
            },
            getScreenSize() {
                return {
                    width: 0,
                    height: 0
                }
            },
            lose() {
                return Promise.resolve()
            },
            win() {
                return Promise.resolve()
            },
            getUserLanguage() {
                return 'en'
            },
            redirectToInstallPage() {
                log('redirectToInstallPage')
            },
        }
    }
    
    public static get playable() : Playable {
        return (window as any).mainPlayable || {
            create() {
                log('create')
            },
            init() {
                log('init')
            },
            onAudioVolumeChanged() {
                log('onAudioVolumeChanged')
            },
            onParameterUpdated(parameters) {
                log('onParameterUpdated', parameters)
            },
            onResize() {
                log('onResize')
            },
            onParameterHighlighted(parameters) {
                log('onParameterHighlighted', parameters)
            },
            pause() {
                log('pause')
            },
            resume() {
                log('resume')
            },
            start() {
                log('start')
            },
        }
    }

    private static onParameterUpdatedRegistry: Set<ParameterUpdatedCallback> = new Set();

    public static onParamUpdated(callback: ParameterUpdatedCallback): () => void {
        this.onParameterUpdatedRegistry.add(callback);

        return () => {
            this.offParamUpdated(callback);
        }
    }

    public static offParamUpdated(callback: ParameterUpdatedCallback) {
        this.onParameterUpdatedRegistry.delete(callback);
    }

    public static notifyParameterUpdated(parameters: OnParameterUpdatedParameters) {
        this.onParameterUpdatedRegistry.forEach(callback => callback(parameters));
    }
}

// hook onParameterUpdated
const interval = setInterval(() => {
    if (!(window as any).mainPlayable) {
        return
    }

    const onParameterUpdated = Vsdk.playable.onParameterUpdated;
    Vsdk.playable.onParameterUpdated = (parameters) => {
        onParameterUpdated.bind(Vsdk.playable)(parameters);
        Vsdk.notifyParameterUpdated(parameters);
    }
    
    clearInterval(interval);
}, 100);
