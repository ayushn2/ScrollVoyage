import { KeyframeTrack } from 'three/src/animation/KeyframeTrack.js';
import { InterpolationModes } from 'three/src/constants.js';

export class StringKeyframeTrack extends KeyframeTrack {
    constructor(name: string, times: ArrayLike<number>, values: ArrayLike<any>, interpolation?: InterpolationModes);

    /**
     * @default 'string'
     */
    ValueTypeName: string;
}
