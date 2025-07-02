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
import { IParameterSDK } from './ParameterService';

// This config object mirrors playable.json using parameter classes
export const PlayableConfig = {
  NumberParameter: new ObjectParameter(
    'Money, Time cooldown, Hex Cost, Zoom percent',
    [
      new NumberParameter('Money rewarded', 10),
      new NumberParameter('Time cooldown when tower spawn creep', 3),
      new RangeParameter('Hex cost', 10, 0, 50, 1),
      new RangeParameter('Zoom percent', 1, 0, 1, 0.01)
    ],
    undefined,
    undefined,
    'Gameplay'
  ),
  ButtonDownload: new ObjectParameter(
    'Button PLAY NOW sprite',
    [
      new ImageParameter('Sprite of this object', 'src/assets/btnWin.png'),
      new CoordinatesParameter('Size of this image', { x: 404, y: 176 }, { min: 0, max: 10000, step: 1 }, { min: 0, max: 10000, step: 1 }),
      new CoordinatesParameter('Position of this image', { x: 0, y: -545 }, { min: -1000, max: 1000, step: 1 }, { min: -1000, max: 1000, step: 1 })
    ],
    undefined,
    undefined,
    'Gameplay'
  ),
  ButtonDownloadText: new ObjectParameter(
    'Button PLAY NOW Text',
    [
      new TextParameter('Text of the button PLAY NOW', 'Play Now'),
      new RangeParameter('Font size', 50, 0, 200, 1),
      new ColorParameter('Font color', '#ffffff'),
      new RangeParameter('Stroke Width', 2.5, 0, 10, 0.1),
      new ColorParameter('Stroke Color', '#000000'),
      new CoordinatesParameter('Position', { x: 0, y: 18 }, { min: -1000, max: 1000, step: 1 }, { min: -1000, max: 1000, step: 1 })
    ],
    undefined,
    undefined,
    'Gameplay'
  ),
  DropDownLevel: new SelectParameter(
    'Level design',
    'easy',
    [
      { value: 'easy', name: 'Easy' },
      { value: 'medium', name: 'Medium' },
      { value: 'hard', name: 'Hard' }
    ],
    'Gameplay'
  ),
  LosePopupToggle: new BooleanParameter('Popup Lose Toggle', false, 'Lose Popup'),
  LoseBG: new ObjectParameter(
    'Background in lose popup',
    [
      new ColorParameter('Color of BG', '#00000096'),
      new RangeParameter('Opacity of BG', 155, 0, 255, 1),
      new CoordinatesParameter('Size of BG', { x: 5000, y: 5000 }, { min: 0, max: 10000, step: 1 }, { min: 0, max: 10000, step: 1 }),
      new CoordinatesParameter('Position of BG', { x: 0, y: 0 }, { min: -1000, max: 1000, step: 1 }, { min: -1000, max: 1000, step: 1 })
    ],
    undefined,
    undefined,
    'Lose Popup'
  ),
  Sprite1Lose: new ObjectParameter(
    'The crown image',
    [
      new ImageParameter('sprite of this object', 'src/assets/crownLose.png'),
      new CoordinatesParameter('Size of this image', { x: 848, y: 366 }, { min: 0, max: 10000, step: 1 }, { min: 0, max: 10000, step: 1 }),
      new CoordinatesParameter('Position of this image', { x: 0, y: 195 }, { min: -1000, max: 1000, step: 1 }, { min: -1000, max: 1000, step: 1 })
    ],
    undefined,
    undefined,
    'Lose Popup'
  ),
  Sprite2Lose: new ObjectParameter(
    'The icon image',
    [
      new ImageParameter('sprite of this object', 'src/assets/longqishiIcon.png'),
      new CoordinatesParameter('Size of this image', { x: 505, y: 335 }, { min: 0, max: 10000, step: 1 }, { min: 0, max: 10000, step: 1 }),
      new CoordinatesParameter('Position of this image', { x: 25, y: 160 }, { min: -1000, max: 1000, step: 1 }, { min: -1000, max: 1000, step: 1 })
    ],
    undefined,
    undefined,
    'Lose Popup'
  ),
  ButtonSpriteLose: new ObjectParameter(
    'The button image',
    [
      new ImageParameter('sprite of this object', 'src/assets/btnLose.png'),
      new CoordinatesParameter('Size of this image', { x: 404, y: 176 }, { min: 0, max: 10000, step: 1 }, { min: 0, max: 10000, step: 1 }),
      new CoordinatesParameter('Position of this image', { x: 0, y: -375 }, { min: -1000, max: 1000, step: 1 }, { min: -1000, max: 1000, step: 1 })
    ],
    undefined,
    undefined,
    'Lose Popup'
  ),
  Text1Lose: new ObjectParameter(
    'Mvp Text',
    [
      new TextParameter('Text', 'MVP'),
      new RangeParameter('Font Size', 40, 0, 200, 1),
      new ColorParameter('Font Color', '#7BD6FA'),
      new RangeParameter('Stroke Width', 3.4, 0, 10, 0.1),
      new ColorParameter('Stroke Color', '#000000'),
      new CoordinatesParameter('Position', { x: 0, y: 45 }, { min: -1000, max: 1000, step: 1 }, { min: -1000, max: 1000, step: 1 })
    ],
    undefined,
    undefined,
    'Lose Popup'
  ),
  Text2Lose: new ObjectParameter(
    'Defeated Text',
    [
      new TextParameter('Text', 'DEFEATED'),
      new RangeParameter('Font Size', 60, 0, 200, 1),
      new ColorParameter('Font Color', '#7BD6FA'),
      new RangeParameter('Stroke Width', 3.4, 0, 10, 0.1),
      new ColorParameter('Stroke Color', '#000000'),
      new CoordinatesParameter('Position', { x: 0, y: 2 }, { min: -1000, max: 1000, step: 1 }, { min: -1000, max: 1000, step: 1 })
    ],
    undefined,
    undefined,
    'Lose Popup'
  ),
  ButtonTextLose: new ObjectParameter(
    'Text in the button',
    [
      new TextParameter('Text', 'Retry'),
      new RangeParameter('Font Size', 70, 0, 200, 1),
      new ColorParameter('Font Color', '#FFFFFF'),
      new RangeParameter('Stroke Width', 3, 0, 10, 0.1),
      new ColorParameter('Stroke Color', '#000000'),
      new CoordinatesParameter('Position', { x: 0, y: 10 }, { min: -1000, max: 1000, step: 1 }, { min: -1000, max: 1000, step: 1 })
    ],
    undefined,
    undefined,
    'Lose Popup'
  ),
  WinPopupToggle: new BooleanParameter('Popup Win Toggle', false, 'Win Popup'),
  WinBG: new ObjectParameter(
    'Background in win popup',
    [
      new ColorParameter('Color of BG', '#00000096'),
      new RangeParameter('Opacity of BG', 155, 0, 255, 1),
      new CoordinatesParameter('Size of BG', { x: 5000, y: 5000 }, { min: 0, max: 10000, step: 1 }, { min: 0, max: 10000, step: 1 }),
      new CoordinatesParameter('Position of BG', { x: 0, y: 0 }, { min: -1000, max: 1000, step: 1 }, { min: -1000, max: 1000, step: 1 })
    ],
    undefined,
    undefined,
    'Win Popup'
  ),
  Sprite1Win: new ObjectParameter(
    'The crown image',
    [
      new ImageParameter('sprite of this object', 'src/assets/crownWin.png'),
      new CoordinatesParameter('Size of this image', { x: 848, y: 366 }, { min: 0, max: 10000, step: 1 }, { min: 0, max: 10000, step: 1 }),
      new CoordinatesParameter('Position of this image', { x: 0, y: 230 }, { min: -1000, max: 1000, step: 1 }, { min: -1000, max: 1000, step: 1 })
    ],
    undefined,
    undefined,
    'Win Popup'
  ),
  Sprite2Win: new ObjectParameter(
    'The icon image',
    [
      new ImageParameter('sprite of this object', 'src/assets/longIcon.png'),
      new CoordinatesParameter('Size of this image', { x: 312, y: 357 }, { min: 0, max: 10000, step: 1 }, { min: 0, max: 10000, step: 1 }),
      new CoordinatesParameter('Position of this image', { x: 4, y: 160 }, { min: -1000, max: 1000, step: 1 }, { min: -1000, max: 1000, step: 1 })
    ],
    undefined,
    undefined,
    'Win Popup'
  ),
  ButtonWinSprite: new ObjectParameter(
    'The button image',
    [
      new ImageParameter('sprite of this object', 'src/assets/btnWin.png'),
      new CoordinatesParameter('Size of this image', { x: 404, y: 176 }, { min: 0, max: 10000, step: 1 }, { min: 0, max: 10000, step: 1 }),
      new CoordinatesParameter('Position of this image', { x: 0, y: -375 }, { min: -1000, max: 1000, step: 1 }, { min: -1000, max: 1000, step: 1 })
    ],
    undefined,
    undefined,
    'Win Popup'
  ),
  Text1Win: new ObjectParameter(
    'Mvp Text',
    [
      new TextParameter('Text', 'MVP'),
      new RangeParameter('Font Size', 40, 0, 200, 1),
      new ColorParameter('Font Color', '#EFF73A'),
      new RangeParameter('Stroke Width', 3.4, 0, 10, 0.1),
      new ColorParameter('Stroke Color', '#000000'),
      new CoordinatesParameter('Position', { x: 0, y: 45 }, { min: -1000, max: 1000, step: 1 }, { min: -1000, max: 1000, step: 1 })
    ],
    undefined,
    undefined,
    'Win Popup'
  ),
  Text2Win: new ObjectParameter(
    'Victory Text',
    [
      new TextParameter('Text', 'VICTORY'),
      new RangeParameter('Font Size', 60, 0, 200, 1),
      new ColorParameter('Font Color', '#EFF73A'),
      new RangeParameter('Stroke Width', 3.4, 0, 10, 0.1),
      new ColorParameter('Stroke Color', '#000000'),
      new CoordinatesParameter('Position', { x: 0, y: 2 }, { min: -1000, max: 1000, step: 1 }, { min: -1000, max: 1000, step: 1 })
    ],
    undefined,
    undefined,
    'Win Popup'
  ),
  ButtonTextWin: new ObjectParameter(
    'Text in the button',
    [
      new TextParameter('Text', 'Next Level'),
      new RangeParameter('Font Size', 60, 0, 200, 1),
      new ColorParameter('Font Color', '#ffffff'),
      new RangeParameter('Stroke Width', 3.4, 0, 10, 0.1),
      new ColorParameter('Stroke Color', '#000000'),
      new CoordinatesParameter('Position', { x: 0, y: 10 }, { min: -1000, max: 1000, step: 1 }, { min: -1000, max: 1000, step: 1 })
    ],
    undefined,
    undefined,
    'Win Popup'
  ),
  HandReshow: new NumberParameter('Tutorial reshow time', 4, 'Tutorial'),
  TutPos: new CoordinatesParameter('Position of tutorial', { x: 0, y: 0 }, { min: -1000, max: 1000, step: 1 }, { min: -1000, max: 1000, step: 1 }, 'Tutorial'),
  HandTut: new ObjectParameter(
    'The button image',
    [
      new ImageParameter('sprite of this object', 'src/assets/hand.png'),
      new CoordinatesParameter('Size of this image', { x: 432, y: 473 }, { min: 0, max: 10000, step: 1 }, { min: 0, max: 10000, step: 1 }),
      new CoordinatesParameter('Position of this image', { x: 65, y: -207 }, { min: -1000, max: 1000, step: 1 }, { min: -1000, max: 1000, step: 1 })
    ],
    undefined,
    undefined,
    'Tutorial'
  ),
  TextTut: new ObjectParameter(
    'Text of this tutorial',
    [
      new TextParameter('Text', 'Tap to attack'),
      new RangeParameter('Font Size', 50, 0, 200, 1),
      new ColorParameter('Font Color', '#ffffff'),
      new RangeParameter('Stroke Width', 3.4, 0, 10, 0.1),
      new ColorParameter('Stroke Color', '#000000'),
      new CoordinatesParameter('Position', { x: -18, y: 565 }, { min: -1000, max: 1000, step: 1 }, { min: -1000, max: 1000, step: 1 })
    ],
    undefined,
    undefined,
    'Tutorial'
  ),
  TutorialBox: new ObjectParameter(
    'the rectangle of tutorial',
    [
      new NumberParameter('width', 300),
      new NumberParameter('height', 200)
    ],
    undefined,
    undefined,
    'Tutorial'
  ),
  TimerSprite: new ImageParameter('Image of the timer', 'src/assets/IdleReward.png', 'Timer'),
  ColorBasic: new ObjectParameter(
    'Color of the grid',
    [
      new ColorParameter('Enemy grid color', '#FF6B6B'),
      new ColorParameter('default grid color', '#797979'),
      new ColorParameter('Player grid color', '8DFF24')
    ],
    undefined,
    undefined,
    'Color'
  ),
  TimerToggle: new BooleanParameter('Timer Toggle', true, 'Timer'),
  Timer: new ObjectParameter(
    'Parameters of this timer',
    [
      new NumberParameter('set Second', 60),
      new CoordinatesParameter('Size of this timer', { x: 1, y: 1 }, { min: 0, max: 5, step: 0.1 }, { min: 0, max: 5, step: 0.1 }),
      new CoordinatesParameter('Position of this timer', { x: 0, y: 500 }, { min: -1000, max: 1000, step: 1 }, { min: -1000, max: 1000, step: 1 })
    ],
    undefined,
    undefined,
    'Timer'
  )
};

// Simple event emitter for parameter updates
const parameterUpdateListeners: Array<(parameters: Record<string, any>) => void> = [];

export function onPlayableConfigParametersUpdated(listener: (parameters: Record<string, any>) => void) {
  parameterUpdateListeners.push(listener);
  return () => {
    const idx = parameterUpdateListeners.indexOf(listener);
    if (idx !== -1) parameterUpdateListeners.splice(idx, 1);
  };
}

function emitPlayableConfigParametersUpdated(parameters: Record<string, any>) {
  parameterUpdateListeners.forEach(listener => listener(parameters));
}

// Helper: update PlayableConfig values from sdk parameters
export function updatePlayableConfigFromSDK(parameters: Record<string, any>) {
  for (const key in parameters) {
    if (PlayableConfig[key]) {
      const param = PlayableConfig[key];
      const value = parameters[key];
      if (param instanceof ObjectParameter && typeof value === 'object' && value !== null) {
        param.parameters.forEach(childParam => {
          if (childParam.label && value.hasOwnProperty(childParam.label)) {
            childParam.default = value[childParam.label];
          }
        });
      } else if ('default' in param) {
        param.default = value;
      }
    }
  }
  emitPlayableConfigParametersUpdated(parameters);
}

// Usage: pass sdkInstance (VoodooParameterSDK or TheOneParameterSDK) to subscribe
export function subscribePlayableConfigParameterUpdates(sdkInstance: IParameterSDK) {
  return sdkInstance.onParamUpdated((parameters) => {
    updatePlayableConfigFromSDK(parameters);
  });
}

// Example usage (choose one):
// const sdkInstance = new VoodooParameterSDK(Vsdk);
// const sdkInstance = new TheOneParameterSDK(TheOneSdk);
// subscribePlayableConfigParameterUpdates(sdkInstance);
