import * as THREE from "three";
import { ModelPaths } from "../modelPaths";
import { CharacterModel } from "./characterModelClass";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export { Clerk };

class Clerk {
    
    #ready = false;
    #characterModel;
    #isInteracting;
    #inputManager;
    #interactBox;
    #position;

    constructor(position, inputManager) {
        this.#position = position;
        this.#inputManager = inputManager;
    }

    async createClerk(scene, mixers) {
        // Load clerk model into scene
        this.#characterModel = new CharacterModel(ModelPaths.EMPLOYEE);
        await this.#characterModel.loadModel(scene, mixers);
        this.#characterModel.setPosition(this.#position.x, this.#position.y, this.#position.z);

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

    onInteract(player) {
        if (!this.#ready || this.#isInteracting) return;
        
        // Check if player is in interact range
        if (!this.#interactBox.containsPoint(player.getModel().position)) return;

        // Check if player is facing towards clerk

        console.log("interacted!");
    }

    stopInteraction() {
        this.#isInteracting = false;
    }
}