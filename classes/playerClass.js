import * as THREE from 'three';
import { CharacterModel } from './characterModelClass';
import { ModelPaths } from '../modelPaths';
import { InputManager } from './inputManagerClass';

export { Player };

class Player {
    // Data members
    #isMoving = false;
    #inputManager;
    #moveSpeed = 1.75;
    #lastFramePosition;
    #position = new THREE.Vector3(0, 0, 0);
    #rotation = 0; // Only rotate around the y-axis, DEBATE IF THIS IS NEEDED
    #directionVector = new THREE.Vector3(0, 0, 0);
    #collisionHitBox;
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

    getCollisionHitBox() {
        return this.#collisionHitBox;
    }

    getModel() {
        return this.#modelClass.getModel();
    }

    undoMovement() {
        this.#position = this.#lastFramePosition;
        this.#modelClass.updateModel(this.#position);
    }

    async createPlayer(arcadeScene, mixerCollection) {
        // Load player model
        this.#modelClass = new CharacterModel(ModelPaths.PLAYER);
        await this.#modelClass.loadModel(arcadeScene, mixerCollection);
        this.#modelClass.setPosition(this.#position.x, this.#position.y, this.#position.z);
        this.#collisionHitBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3()).setFromObject(this.#modelClass.getModel());
    }

    #updateDirectionVector() {
        // Set is moving variable
        if (this.#directionVector.x === 0 && this.#directionVector.z === 0) this.#isMoving = false;
        else this.#isMoving = true;

        const inputVector = this.#inputManager.getInputVector();
        this.#directionVector = inputVector.normalize();
    }

    #updatePosition(delta) {
        const nextPoint = this.#directionVector.multiplyScalar(this.#moveSpeed * delta);
        this.#position = this.#position.add(nextPoint);
        this.#modelClass.updateModel(this.#position);
        this.#lastFramePosition = this.#position;
    }
}