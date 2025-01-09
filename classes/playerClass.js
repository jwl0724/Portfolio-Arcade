import * as THREE from 'three';
import { CharacterModel } from './characterModelClass';
import { ModelPaths } from '../modelPaths';

export { Player };

class Player {
    // Data members
    #isMoving = false;
    #moveSpeed = 0.1;
    #position = new THREE.Vector3(0, 0, 0);
    #rotation = 0; // Only rotate around the y-axis
    #directionVector = new THREE.Vector3(0, 0, 0);
    #modelClass;
    
    constructor(positionVector, rotationAngle) {
        this.#position = positionVector;
        this.#rotation = rotationAngle;
    }

    async createPlayer(arcadeScene, mixerCollection) {
        // Load player model
        this.#modelClass = new CharacterModel(ModelPaths.PLAYER);
        await this.#modelClass.loadModel(arcadeScene, mixerCollection);
        this.#modelClass.playAnimation(CharacterModel.ANIMATION_NAMES.IDLE, THREE.LoopRepeat);
        this.#modelClass.setPosition(this.#position.x, this.#position.y, this.#position.z);
    }

    // Input direction will be wherever the screen is clicked OR keyboard input direction
    updateDirectionVector(inputDirection) {
        this.#directionVector = inputDirection.normalized();
    }

    // Will move the player in the direction of the direction vector
    updatePosition(delta) {
        this.#modelClass.updatePosition(this.#directionVector.multiplyScalar(this.#moveSpeed * delta));
    }

}