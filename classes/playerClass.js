import * as THREE from 'three';
import { CharacterModel } from './characterModelClass';
import { ModelPaths } from '../modelPaths';
import { InputManager } from './inputManagerClass';
import { getDirection } from 'three/tsl';

export { Player };

class Player {
    // Data members
    #isMoving = false;
    #isSprinting = false;
    #inputManager;
    #moveSpeed = 1.75;
    #sprintFactor = 1.4;
    #position = new THREE.Vector3(0, 0, 0);
    #directionVector = new THREE.Vector3(0, 0, 0);
    #colliders;
    #modelClass;
    
    constructor(positionVector, inputManager) {
        this.#colliders = new Array();
        this.#inputManager = inputManager;
        this.#position = positionVector;
    }

    // PROCESS SECTION: Put code that needs to run per frame in these parts
    playerPhysicsProcess(delta) {
        this.#updateDirectionVector();
        this.#updatePosition(delta);
    }

    playerProcess(delta) {
        this.#modelClass.updateMoveAnimation(this.#isMoving, this.#isSprinting, delta);
    }

    playerInputProcess() {

    }

    getSpeed() {
        return this.#isSprinting ? this.#moveSpeed * this.#sprintFactor : this.#moveSpeed;
    }

    getPosition() {
        return this.#position;
    }

    getModel() {
        return this.#modelClass.getModel();
    }

    getNextFramePosition(delta) {
        return this.#position.clone().add(this.#directionVector.multiplyScalar(this.getSpeed() * delta));
    }

    notifyCollision(collider) {
        if (collider) this.#colliders.push(collider);
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
        this.#isSprinting = this.#inputManager.getSprintKeyPressed();
        this.#directionVector = inputVector.normalize();
    }

    #updatePosition(delta) {
        const nextPoint = this.#directionVector.clone().multiplyScalar(this.getSpeed() * delta);
        // Slide across on valid angle
        if (this.#colliders.length > 0) {
            this.#calculateSlideMovement(nextPoint);
            this.#colliders.length = 0;
            return;
        }
        // If no collision occurs
        this.#position = this.#position.add(nextPoint);
        this.#modelClass.updateModel(this.#position);
    }

    #calculateSlideMovement(nextPoint) {
        let passX = true, passZ = true;
        const testPointX = new THREE.Vector3(
            this.#position.x, 
            this.#position.y + nextPoint.y, 
            this.#position.z + nextPoint.z
        );
        const testPointZ = new THREE.Vector3(
            this.#position.x + nextPoint.x, 
            this.#position.y + nextPoint.y, 
            this.#position.z
        );
        this.#colliders.forEach(collider => {
            if (collider.containsPoint(testPointX)) passX = false;
            else if (collider.containsPoint(testPointZ)) passZ = false;
        });
        if (passX) {
            this.#position = testPointX;
            this.#modelClass.updateModel(this.#position);

        } else if (passZ) {
            this.#position = testPointZ;
            this.#modelClass.updateModel(this.#position);
        }
    }
}