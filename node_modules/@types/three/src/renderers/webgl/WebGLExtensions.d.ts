import { WebGLCapabilities } from 'three/src/renderers/webgl/WebGLCapabilities.js';

export class WebGLExtensions {
    constructor(gl: WebGLRenderingContext);

    has(name: string): boolean;
    init(capabilities: WebGLCapabilities): void;
    get(name: string): any;
}
