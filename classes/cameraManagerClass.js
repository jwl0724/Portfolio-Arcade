import * as THREE from "three";

export { CameraManager };

class CameraManager {
    
    #camera;

    constructor(fov, aspect, near, far) {
        this.#camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.#camera.position.set(5, 3, 2);
        this.#camera.lookAt(5, 0, 2);
        this.#camera.rotateX(Math.PI / 3);
    }

    getCamera() {
        return this.#camera;
    }

    setAspectRatio(aspect) {
        this.#camera.aspect = aspect;
        this.#camera.updateProjectionMatrix();
    }
}