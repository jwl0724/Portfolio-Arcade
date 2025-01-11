import * as THREE from 'three';
import { CharacterModel } from './characterModelClass';
import { ModelPaths } from '../modelPaths';
import { InputManager } from './inputManagerClass';
import { getDirection } from 'three/tsl';

export { Player };

class Player {
    // Data members
    #isMoving = false;
    #isColliding = false;
    #inputManager;
    #moveSpeed = 1.75;
    #position = new THREE.Vector3(0, 0, 0);
    #rotation = 0; // Only rotate around the y-axis, DEBATE IF THIS IS NEEDED
    #directionVector = new THREE.Vector3(0, 0, 0);
    #modelClass;
    
    constructor(positionVector, rotationAngle) {
        this.#inputManager = new InputManager(this);
        this.#position = positionVector;
        this.#rotation = rotationAngle;
    }

    // PROCESS SECTION: Put code that needs to run per frame in these parts
    playerPhysicsProcess(delta) {
        this.#updateDirectionVector();
        this.#updatePosition(delta);
    }

    playerProcess(delta) {
        this.#modelClass.updateMoveAnimation(this.#isMoving, delta);
    }

    playerInputProcess() {

    }

    getModel() {
        return this.#modelClass.getModel();
    }

    getNextFramePosition(delta) {
        return this.#position.clone().add(this.#directionVector.multiplyScalar(this.#moveSpeed * delta));
    }

    notifyCollision(collision) {
        this.#isColliding = collision;
    }

    async createPlayer(arcadeScene, mixerCollection) {
        // Load player model
        this.#modelClass = new CharacterModel(ModelPaths.PLAYER);
        await this.#modelClass.loadModel(arcadeScene, mixerCollection);
        this.#modelClass.setPosition(this.#position.x, this.#position.y, this.#position.z);
    }

    #updateDirectionVector() {
        // Set is moving variable
        if (this.#directionVector.x === 0 && this.#directionVector.z === 0) this.#isMoving = false;
        else this.#isMoving = true;

        const inputVector = this.#inputManager.getInputVector();
        this.#directionVector = inputVector.normalize();
    }

    #updatePosition(delta) {
        if (this.#isColliding) return;
        const nextPoint = this.#directionVector.multiplyScalar(this.#moveSpeed * delta);
        this.#position = this.#position.add(nextPoint);
        this.#modelClass.updateModel(this.#position);
    }
}