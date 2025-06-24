export interface OnParameterUpdatedParameters {
    key: string;
}
export interface HighlightParameters {
    key: string;
    isHighlighted: boolean;
}
/**
 * ⚠️WARNING any breaking changes (i.e. adding a new method) will break existing playable ⚠️
 * Any modification needs to be backward compatible untile we properly handle version of playable/vsdk
 */
/**
 * This interface describe the expected Playable object returned by a {@link PlayableFactory}
 *
 * Example implementation:
 * ```ts
 * import type { Logger, Playable as PlayableInterface, PlayableVsdk } from '@voodoo.io/playable-vsdk';
 *
 * export class Playable implements PlayableInterface {
 *   private readonly logger: Logger;
 *   private readonly vsdk: PlayableVsdk;
 *
 *   constructor({ vsdk, logger }: { vsdk: PlayableVsdk; logger: Logger }) {
 *     this.logger = logger;
 *     this.vsdk = vsdk;
 *   }
 *
 *   public async init(): Promise<void> {
 *     // Initialize things in memory
 *     this.logger.info('Initialized');
 *   }
 *
 *   public async create(): Promise<void> {
 *     // render the waiting screen
 *     this.logger.info('Created');
 *   }
 *
 *   public async start(): Promise<void> {
 *     // start the gameplay
 *     this.logger.info('Starting');
 *   }
 *
 *   public async pause(): Promise<void> {
 *     // Pause gameplay and sounds
 *     this.logger.info('Paused');
 *   }
 *
 *   public async resume(): Promise<void> {
 *     // Resume gameplay and sounds
 *     this.logger.info('Resumed');
 *   }
 *
 *   public async onParameterUpdated({ key }: { key: string }): Promise<void> {
 *     // Update game with new parameter value
 *     const value = this.vsdk.getParameterValue(key);
 *     this.logger.info('Parameter updated', { key, value });
 *   }
 *
 *   public async onResize(): Promise<void> {
 *     // resize the playable
 *     const { width, height } = this.vsdk.getScreenSize();
 *     this.logger.info('Parameter updated', { width, height});
 *   }
 *
 *   public async onAudioVolumeChanged(): Promise<void> {
 *     // adapt volume
 *     const volume: number = this.vsdk.getAudioVolume();
 *     this.logger.debug('Volume changed', { volume: this.vsdk.getAudioVolume() });
 *   }
 * }
 * ```
 *
 * @devPortal
 * @category VSDK
 */
export interface Playable {
    /**
     * Use the `create()` method to render the waiting screen before
     * the game starts.
     *
     * This method can be called `multiple times` by the vsdk
     */
    create(): void | Promise<void>;
    /**
     * This is the first method called by the VSDK.
     * It is called only `once` at bootstrap phase.
     *
     * Use the `init()` to initialize objects in memory.
     */
    init(): void | Promise<void>;
    /**
     * This method is called by the vsdk when the audio volume changes
     *
     * Use {@link PlayableVsdk.getAudioVolume} to get the new volume
     */
    onAudioVolumeChanged(): void | Promise<void>;
    /**
     * This method is called by the vsdk when a parameter value changes
     *
     * Use {@link PlayableVsdk.getParameterValue} to get the new value
     */
    onParameterUpdated(parameters: OnParameterUpdatedParameters): void | Promise<void>;
    /**
     * This method is called by the vsdk when the screen size changes
     *
     * Use {@link PlayableVsdk.getScreenSize} to get the new width and height
     */
    onResize(): void | Promise<void>;
    /**
     * This method is call by the vsdk when a parameter should be highlighted or not
     *
     * This method is optional
     */
    onParameterHighlighted?(parameters: HighlightParameters): Promise<void>;
    /**
     * The pause method is called when the game should be paused.
     * For instance, when the visibility changes.
     *
     * This method should also stop any sounds
     */
    pause(): void | Promise<void>;
    /**
     * The resume method is called when a game has been paused an the user want to resume playing.
     */
    resume(): void | Promise<void>;
    /**
     * The start method is called when the user want to start playing the game
     */
    start(): void | Promise<void>;
}
