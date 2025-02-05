import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { debug } from "./arcadeClass";

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
        PICKUP: "pick-up",
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
    #hasCollision;

    // Animation Data
    #animations; // Animation keyframes to play
    #animationMixer; // Mixer to be pushed to main logic loop
    #movementAnimations; // Walking, running, idle
    
    // Components
    #characterScene;
    #collisionBox;
    #debugBox;
    
    constructor(modelFilePath) {
        this.#modelFilePath = modelFilePath;
        this.#animations = new Map();
        this.#movementAnimations = new Array();
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

    // Call if character needs to have collision
    createHitbox(arcadeScene) {
        // Needs to wait for the scene graph to update after adding model to scene
        requestAnimationFrame(() => {
            this.#collisionBox = new THREE.Box3().setFromObject(this.#characterScene);            
            if (debug) {                
                this.#debugBox = new THREE.Box3Helper(this.#collisionBox, 0xeeff00);                          
                arcadeScene.add(this.#debugBox);
            }
            this.#hasCollision = true;
        });
    }

    getModel() {
        return this.#characterScene;
    }

    getHitbox() {
        return this.#collisionBox;
    }

    setPosition(x, y, z) {
        this.#characterScene.position.set(x, y, z);
    }

    playAnimation(animationName, loop = THREE.LoopOnce) {
        const nextAnimation = this.#animations.get(animationName);
        nextAnimation.reset();
        nextAnimation.setLoop(loop);
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

    blendTo(animationName, delta) {
        const transitionStrength = 10;
        this.#movementAnimations.forEach(animation => {
            if (animation.getClip().name === animationName) {
                const newWeight = animation.getEffectiveWeight() > 1 ? 1 : animation.getEffectiveWeight() + transitionStrength * delta;
                animation.setEffectiveWeight(newWeight);

            } else {
                const newWeight = animation.getEffectiveWeight() < 0 ? 0 : animation.getEffectiveWeight() - transitionStrength * delta;
                animation.setEffectiveWeight(newWeight);
            }
        });
    }

    // Setups animations that constantly play but weight needs to adjust (i.e. idle, walk, run)
    #setupMovementAnimations(startAnimation) {
        const walkAnimation = this.#animations.get(CharacterModel.ANIMATION_NAMES.WALK);
        const idleAnimation = this.#animations.get(CharacterModel.ANIMATION_NAMES.IDLE);
        const runAnimation = this.#animations.get(CharacterModel.ANIMATION_NAMES.RUN);

        // Add endless loop animations to array
        this.#movementAnimations.push(walkAnimation, idleAnimation, runAnimation);

        // Set weights to 0 and play all
        this.#movementAnimations.forEach(animation => {
            animation.setEffectiveWeight(0);
            animation.loop = THREE.LoopRepeat;
            animation.play();
        });

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

        // Update collision box if it has it
        if (this.#hasCollision) {
            this.#collisionBox.setFromObject(this.#characterScene);
            
            // Update box visual if in debug mode
            if (debug) {                
                const collisionCenter = new THREE.Vector3();
                this.#collisionBox.getCenter(collisionCenter);
                this.#debugBox.position.copy(collisionCenter);
            }
        }
    }

    // Used to update between idle and walking
    updateMoveAnimation(isMoving, isSprinting, delta) {
        if (isSprinting && isMoving) this.blendTo(CharacterModel.ANIMATION_NAMES.RUN, delta);
        else if (isMoving) this.blendTo(CharacterModel.ANIMATION_NAMES.WALK, delta);
        else this.blendTo(CharacterModel.ANIMATION_NAMES.IDLE, delta);
    }

    #lerpAngle(oldAngle, newAngle, strength) {
        const standardizedOldAngle = (oldAngle + Math.PI) % (Math.PI * 2) - Math.PI;
        const standardizedNewAngle = (newAngle + Math.PI) % (Math.PI * 2) - Math.PI;
        let difference = standardizedNewAngle - standardizedOldAngle;

        // Wrap angle
        if (difference >= Math.PI) difference -= Math.PI * 2;
        else if (difference <= -Math.PI) difference += Math.PI * 2;
        return oldAngle + strength * difference;
    }
}