import { WebGLCapabilities } from 'three/src/renderers/webgl/WebGLCapabilities.js';
import { Scene } from 'three/src/scenes/Scene.js';
import { Camera } from 'three/src/cameras/Camera.js';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer.js';
import { ShadowMapType } from 'three/src/constants.js';
import { WebGLObjects } from 'three/src/renderers/webgl/WebGLObjects.js';
import { Light } from 'three/src/lights/Light.js';

export class WebGLShadowMap {
    constructor(_renderer: WebGLRenderer, _objects: WebGLObjects, _capabilities: WebGLCapabilities);

    /**
     * @default false
     */
    enabled: boolean;

    /**
     * @default true
     */
    autoUpdate: boolean;

    /**
     * @default false
     */
    needsUpdate: boolean;

    /**
     * @default THREE.PCFShadowMap
     */
    type: ShadowMapType;

    render(shadowsArray: Light[], scene: Scene, camera: Camera): void;

    /**
     * @deprecated Use {@link Material#shadowSide} instead.
     */
    cullFace: any;
}
