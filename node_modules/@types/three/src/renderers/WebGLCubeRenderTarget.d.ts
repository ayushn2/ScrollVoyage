import { WebGLRenderTargetOptions, WebGLRenderTarget } from 'three/src/renderers/WebGLRenderTarget.js';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer.js';
import { Texture } from 'three/src/textures/Texture.js';
import { CubeTexture } from 'three/src/textures/CubeTexture.js';

export class WebGLCubeRenderTarget extends WebGLRenderTarget {
    constructor(size?: number, options?: WebGLRenderTargetOptions);

    texture: CubeTexture;

    fromEquirectangularTexture(renderer: WebGLRenderer, texture: Texture): this;

    clear(renderer: WebGLRenderer, color: boolean, depth: boolean, stencil: boolean): void;
}
