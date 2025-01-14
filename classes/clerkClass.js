import * as THREE from "three";
import { ModelPaths } from "../modelPaths";
import { CharacterModel } from "./characterModelClass";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export { Clerk };

class Clerk {
    
    #characterModel;
    #isInteracting;
    #position;

    constructor(position) {
        this.#position = position;
    }
    
    clerkProcess(delta) {

    }

    clerkInputProcess() {
        if (this.#isInteracting)
    }

    async createClerk(scene, mixers) {
        this.#characterModel = new CharacterModel(ModelPaths.EMPLOYEE);
        await this.#characterModel.loadModel(scene, mixers);
        this.#characterModel.setPosition(this.#position.x, this.#position.y, this.#position.z);
    }

    interact() {

    }
}