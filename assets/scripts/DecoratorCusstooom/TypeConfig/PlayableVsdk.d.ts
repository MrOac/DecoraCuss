import { ParameterValue } from "./BuildConfiguration";
import { ScreenSize } from "./ScreenSize";

export interface PlayableVsdk {
    /**
     * Return the current audio volume
     * value returned will be between 0 and 1
     */
    getAudioVolume(): number;
    /**
     * Return the value of a parameter defined in the `playable.json`
     */
    getParameterValue<T extends ParameterValue>(key: string): T;
    /**
     * Return the current screen size
     * ```ts
     * const { width, height } = vsdk.getScreenSize();
     * ```
     */
    getScreenSize(): ScreenSize;
    /**
     * Call this method when player looses the game
     */
    lose(): Promise<void>;
    /**
     * Use this method to force the user to be redirected to the game installation page.
     *
     * This method should be used only if the playable provides a custom end screen.
     */
    redirectToInstallPage(): void;
    /**
     * Call this method when player wins the game
     */
    win(): Promise<void>;
    /**
     * Return the current preferred language of the user
     */
    getUserLanguage(): string;
}