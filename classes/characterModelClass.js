import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export { CharacterModel };

class CharacterModel {
    // Animation names part of the assets used
    static ANIMATION_NAMES = Object.freeze({
        RESET: "static",
        IDLE: "idle",
        WALK: "walk",
        RUN: "sprint",
        JUMP: "jump",
        FALL: "fall",
        CROUCH: "crouch",
        DIE: "die",
        SIT: "sit",
        PICKUP: "pickup",
        EMOTE_YES: "emote-yes",
        EMOTE_NO: "emote-no",
        HOLD_LEFT: "holding-left-",
        HOLD_RIGHT: "holding-right-",
        HOLD_BOTH: "holding-both-",
        INTERACT_LEFT: "interact-left",
        INTERACT_RIGHT: "interact-right",
    });

    // Data members
    #modelFilePath;
    #gltfData;
    #animationMixer;
    #animationClips;
    #characterScene;
    
    constructor(modelFilePath) {
        this.#modelFilePath = modelFilePath;
    }

    // Must be called before using the model
    async loadModel(arcadeScene, mixerCollection) {
        // Get gltf data
        const loader = new GLTFLoader();
        const gltf = await loader.loadAsync(this.#modelFilePath);
        this.#gltfData = gltf;
        this.#characterScene = gltf.scene;
        this.#animationClips = gltf.animations; // Assume animations are present

        // Add player animation mixer to mixer collection
        this.#animationMixer = new THREE.AnimationMixer(this.#characterScene);
        mixerCollection.push(this.#animationMixer);

        // Add to scene
        arcadeScene.add(this.#characterScene);
    }

    setPosition(x, y, z) {
        this.#characterScene.position.set(x, y, z);
    }

    playAnimation(animationName, loop = THREE.LoopOnce) {
        const clip = THREE.AnimationClip.findByName(this.#animationClips, animationName);
        const action = this.#animationMixer.clipAction(clip);
        action.loop = loop;
        action.play();
    }

    updateModel(positionVector) {
        this.#characterScene.lookAt(positionVector);
        this.#characterScene.position.set(positionVector.x, positionVector.y, positionVector.z);
    }
}