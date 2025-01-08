import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export { Model };

// TODO: Implement class
class Model {
    // Data members
    #animationClips = null;
    #animationMixer = null;
    #scene;

    constructor(modelFilePath) {
        // TODO: move loading stuff here
        const loader = new GLTFLoader();
        loader.load(modelFilePath, (gltf) => {
            this.#scene = gltf.scene;
            this.#animationClips = gltf.animations;
            if (this.#animationClips?.length > 0) {
                this.#animationMixer = new THREE.AnimationMixer(this.#scene);
            }
        });
    }

    // Will return the position vector of the model
    getPosition() {
        return this.#scene.position;
    }

    // Will return the rotation of the model
    getRotation() {
        return this.#scene.rotation;
    }

    // Will move character to the new position vector
    move(newPositionVector) {
        this.#scene.position.set(newPositionVector.x, newPositionVector.y, newPositionVector.z);
    }

    // Will rotate the model on the Y axis based on the angle in radians
    rotate(angleInRadians) {
        this.#scene.rotateY(angleInRadians);
    }

    // TODO: will play the animation with the given name
    playAnimation(animationName, delayInSeconds = 0, loopOption = THREE.LoopOnce) {
        if (!this.#animationClips) {
            console.error("No animations found for this model");
            return;
        }

        const mixer = new THREE.AnimationMixer(this.#scene);
        // mixers.push(mixer);
        const clip = THREE.AnimationClip.findByName(this.#animationClips, animationName);
        const action = mixer.clipAction(clip);
        action.loop = loopOption;

        if (delayInSeconds > 0) {
            setTimeout(() => action.play(), delayInSeconds * 1000);
        } else action.play();
    }
}