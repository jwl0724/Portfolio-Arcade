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

        // Setup movement animations
        this.#setupMovementAnimations(CharacterModel.ANIMATION_NAMES.IDLE);
        
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

    updateMovementBlend(prevAnimation, nextAnimation, delta) {
        const transitionStrength = 10;
        const prev = this.#animations.get(prevAnimation);
        const next = this.#animations.get(nextAnimation);
        const newPrevWeight = prev.getEffectiveWeight() < 0 ? 0 : prev.getEffectiveWeight() - transitionStrength * delta;
        const newNextWeight = next.getEffectiveWeight() > 1 ? 1 : next.getEffectiveWeight() + transitionStrength * delta;
        prev.setEffectiveWeight(newPrevWeight);
        next.setEffectiveWeight(newNextWeight);
    }

    // Setups animations that constantly play but weight needs to adjust (i.e. idle, walk, run)
    #setupMovementAnimations(startAnimation) {
        const walkAnimation = this.#animations.get(CharacterModel.ANIMATION_NAMES.WALK);
        const idleAnimation = this.#animations.get(CharacterModel.ANIMATION_NAMES.IDLE);
        const runAnimation = this.#animations.get(CharacterModel.ANIMATION_NAMES.RUN); // Maybe drop, not sure yet

        // Set weights to 0 and play
        walkAnimation.setEffectiveWeight(0);
        walkAnimation.loop = THREE.LoopRepeat;
        walkAnimation.play();
        idleAnimation.setEffectiveWeight(0);
        idleAnimation.loop = THREE.LoopRepeat;
        idleAnimation.play();
        runAnimation.setEffectiveWeight(0);
        runAnimation.loop = THREE.LoopRepeat;
        runAnimation.play();

        // Set the starting animation weight to 1
        this.#animations.get(startAnimation).setEffectiveWeight(1);
    }

    updateModel(positionVector) {
        if (this.#characterScene.position.equals(positionVector)) return;
        
        // Calculate new angle
        const difference = positionVector.clone().sub(this.#characterScene.position);
        const newAngle = Math.atan2(difference.x, difference.z);
        
        // Calculate interpolated angle
        const transitionAngle = this.#lerpAngle(this.#characterScene.rotation.y, newAngle, 0.1);
        this.#characterScene.rotation.y = transitionAngle;
        
        // Set position
        this.#characterScene.position.set(positionVector.x, positionVector.y, positionVector.z);
    }

    // Used to update between idle and walking
    updateMoveAnimation(isMoving, delta) {
        if (isMoving) this.updateMovementBlend(CharacterModel.ANIMATION_NAMES.IDLE, CharacterModel.ANIMATION_NAMES.WALK, delta);
        else this.updateMovementBlend(CharacterModel.ANIMATION_NAMES.WALK, CharacterModel.ANIMATION_NAMES.IDLE, delta);
    }

    #lerpAngle(oldAngle, newAngle, strength) {
        const difference = newAngle - oldAngle;

        // Wrap angle
        if (difference > Math.PI) newAngle -= Math.PI * 2;
        else if (difference < -Math.PI) newAngle += Math.PI * 2;
        return oldAngle + strength * (newAngle - oldAngle);
    }
}