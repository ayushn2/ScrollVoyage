import { LoadingManager } from 'three/src/loaders/LoadingManager.js';
import { Loader } from 'three/src/loaders/Loader.js';
import { AnimationClip } from 'three/src/animation/AnimationClip.js';

export class AnimationLoader extends Loader<AnimationClip[]> {
    constructor(manager?: LoadingManager);

    parse(json: readonly unknown[]): AnimationClip[];
}
