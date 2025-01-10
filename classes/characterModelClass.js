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
        HOLD_LEFT: "holding-left",
        HOLD_RIGHT: "holding-right",
        HOLD_BOTH: "holding-both",
        INTERACT_LEFT: "interact-left",
        INTERACT_RIGHT: "interact-right",
    });

    // Data members
    #modelFilePath;
    #animationMixer;
    #characterScene;
    #animations;
    
    constructor(modelFilePath) {
        this.#modelFilePath = modelFilePath;
        this.#animations = new Map();
    }

    // Must be called before using the model
    async loadModel(arcadeScene, mixerCollection) {
        // Get gltf data
        const loader = new GLTFLoader();
        const gltf = await loader.loadAsync(this.#modelFilePath);
        this.#characterScene = gltf.scene;
        
        // Add player animation mixer to mixer collection
        this.#animationMixer = new THREE.AnimationMixer(this.#characterScene);
        mixerCollection.push(this.#animationMixer);
        
        // Generate clips
        gltf.animations.forEach(clip => {
            const animation = this.#animationMixer.clipAction(clip);
            this.#animations.set(clip.name, animation);
        });

        // Add to scene
        arcadeScene.add(this.#characterScene);
    }

    setPosition(x, y, z) {
        this.#characterScene.position.set(x, y, z);
    }

    playAnimation(animationName, loop = THREE.LoopOnce) {
        const nextAnimation = this.#animations.get(animationName);
        nextAnimation.loop = loop;
        nextAnimation.play();
    }

    transitionAnimation(prevAnimation, nextAnimation, blendTime) {
        const prev = this.#animations.get(prevAnimation);
        const next = this.#animations.get(nextAnimation);
        prev.crossFadeTo(next, blendTime, true);
    }

    updateModel(positionVector) {
        if (this.#characterScene.position.equals(positionVector)) return;
        this.#characterScene.lookAt(positionVector);
        this.#characterScene.position.set(positionVector.x, positionVector.y, positionVector.z);
    }

    // Used to update between idle and walking
    updateMoveAnimation(isMoving) {
        if (isMoving && this.#animations.get(CharacterModel.ANIMATION_NAMES.WALK).isRunning()) return;
        if (!isMoving && this.#animations.get(CharacterModel.ANIMATION_NAMES.IDLE).isRunning()) return;
        if (isMoving) {
            // this.transitionAnimation(CharacterModel.ANIMATION_NAMES.IDLE, CharacterModel.ANIMATION_NAMES.WALK, 0.1);
            this.playAnimation(CharacterModel.ANIMATION_NAMES.WALK, THREE.LoopRepeat);
            this.stopAnimation(CharacterModel.ANIMATION_NAMES.IDLE, true);
        } else {
            // this.transitionAnimation(CharacterModel.ANIMATION_NAMES.WALK, CharacterModel.ANIMATION_NAMES.IDLE, 0.1);
            this.playAnimation(CharacterModel.ANIMATION_NAMES.IDLE, THREE.LoopRepeat);
            this.stopAnimation(CharacterModel.ANIMATION_NAMES.WALK, true);
        }
    }
}