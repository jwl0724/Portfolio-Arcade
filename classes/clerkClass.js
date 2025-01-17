import * as THREE from "three";
import { ModelPaths } from "../modelPaths";
import { CharacterModel } from "./characterModelClass";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export { Clerk };

class Clerk {
    
    #ready = false;
    #sceneModel;
    #isInteracting;
    #inputManager;
    #interactBox;
    #position;
    #dialogueModel;
    #dialogueAnimationQueue;

    constructor(position, inputManager) {
        this.#position = position;
        this.#inputManager = inputManager;
        this.#dialogueAnimationQueue;
    }

    clerkProcess(delta) {
        // TODO: Add lerp stuff here for dialogue model for smooth transitioning
    }

    async createClerk(scene, mixers) {
        // Load clerk models into scene
        this.#sceneModel = new CharacterModel(ModelPaths.EMPLOYEE);
        this.#dialogueModel = new CharacterModel(ModelPaths.EMPLOYEE);
        await this.#sceneModel.loadModel(scene, mixers);
        await this.#dialogueModel.loadModel(scene, mixers);

        // Position models
        this.#sceneModel.setPosition(this.#position.x, this.#position.y, this.#position.z);

        // Create interact box for clerk
        this.#interactBox = new THREE.Box3(
            new THREE.Vector3(this.#position.x - 1, this.#position.y - 1, this.#position.z - 1.25), 
            new THREE.Vector3(this.#position.x + 1, this.#position.y + 1, this.#position.z + 1.25)
        );
        const helper = new THREE.Box3Helper(this.#interactBox, 0xffff00);
        scene.add(helper);

        // Mark class as ready
        this.#ready = true;
    }

    validInteract(player) {
        if (!this.#ready || this.#isInteracting) return false;
        // Check if player is in interact range
        if (!this.#interactBox.containsPoint(player.getModel().position)) return false;
        return true;
    }

    startInteraction(camera) {
        this.#isInteracting = true;
        this.#dialogueModel.setPosition(
            camera.position.x + 0.4, 
            camera.position.y - 0.4,
            camera.position.z - 0.75
        );
        this.#dialogueModel.getModel().rotation.y = -Math.PI / 3.5;
    }

    stopInteraction() {
        this.#isInteracting = false;
        this.#dialogueModel.setPosition(
            this.#position.x,
            this.#position.y + 6,
            this.#position.z
        );
    }

    playAnimation(animationName, queue = true) {
        if (queue) this.#queueDialogueModelAnimation.push(animationName);
        else this.#dialogueModel.playAnimation(animationName);
    }

    #queueDialogueModelAnimation(animationName) {
        this.#dialogueAnimationQueue.push(animationName);
    }
}