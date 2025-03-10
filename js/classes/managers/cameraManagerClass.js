import * as THREE from "three";

export { CameraManager };

class CameraManager {
    
    #camera;
    #offsetFromTarget;
    #target;
    #defaultFov;

    constructor(fov, aspect, near, far) {
        this.#camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.#defaultFov = fov;
        this.#offsetFromTarget = new THREE.Vector3(0, 2, 3);
    }

    cameraProcess(delta) {
        const targetPosition = this.#target?.position;
        if (targetPosition) {
            this.#calculateCameraPosition(targetPosition);
            this.#camera.lookAt(targetPosition);
        }
    }

    enterDialogueCamera() {
        this.#target = null;
        this.#camera.fov = 60;
        this.#camera.rotation.x = 0;
        this.#camera.updateProjectionMatrix();
    }

    exitDialogueCamera(target) {
        this.#camera.fov = this.#defaultFov;
        this.setTarget(target);
        this.#camera.updateProjectionMatrix();
    }

    getCamera() {
        return this.#camera;
    }

    setFov() {
        this.#camera.fov = fov;
        this.#camera.updateProjectionMatrix();
    }

    setAspectRatio(aspect) {
        this.#camera.aspect = aspect;
        this.#camera.updateProjectionMatrix();
    }

    setOffsetFromTarget(cameraHeight, cameraDistance) {
        this.#offsetFromTarget = new THREE.Vector3(0, cameraHeight, cameraDistance);
    }

    setTarget(target = null) {
        this.#target = target;
    }

    #calculateCameraPosition(targetPosition) {
        this.#camera.position.set(targetPosition.x, this.#offsetFromTarget.y, targetPosition.z + this.#offsetFromTarget.z);
    }   
}