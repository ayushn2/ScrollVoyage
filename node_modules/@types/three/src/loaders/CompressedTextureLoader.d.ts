import { Loader } from 'three/src/loaders/Loader.js';
import { LoadingManager } from 'three/src/loaders/LoadingManager.js';
import { CompressedTexture } from 'three/src/textures/CompressedTexture.js';

export class CompressedTextureLoader extends Loader<CompressedTexture> {
    constructor(manager?: LoadingManager);

    load(
        url: string,
        onLoad?: (data: CompressedTexture) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (err: unknown) => void,
    ): CompressedTexture;
}
