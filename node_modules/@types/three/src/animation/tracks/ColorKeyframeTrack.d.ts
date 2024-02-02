import { KeyframeTrack } from 'three/src/animation/KeyframeTrack.js';
import { InterpolationModes } from 'three/src/constants.js';

export class ColorKeyframeTrack extends KeyframeTrack {
    constructor(name: string, times: ArrayLike<number>, values: ArrayLike<number>, interpolation?: InterpolationModes);

    /**
     * @default 'color'
     */
    ValueTypeName: string;
}
