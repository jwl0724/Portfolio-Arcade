import * as THREE from 'three';
import { CharacterModel } from '../model_wrappers/characterModelClass';
import { ModelPaths } from '../../modelPaths';

export { Player };

class Player {
    // Components
    #inputManager;
    #modelClass;

    // Constants
    #sprintFactor = 1.4;
    #moveSpeed = 1.75;

    // Running variables
    #colliders; // Array that stores collisions in one frame
    #isMoving = false;
    #isSprinting = false;
    #position = new THREE.Vector3(0, 0, 0);
    #directionVector = new THREE.Vector3(0, 0, 0);

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

    getHitbox() {
        return this.#modelClass.getHitbox();
    }

    getNextFramePosition(delta) {
        return this.#position.clone().add(this.#directionVector.clone().multiplyScalar(this.getSpeed() * delta));
    }

    setPosition(positionVector) {
        this.#position = positionVector;
        this.#modelClass.updateModel(positionVector, false);
    }

    notifyCollision(collider) {
        if (collider) this.#colliders.push(collider);
    }

    async createPlayer(arcadeScene, mixerCollection) {
        // Load player model
        this.#modelClass = new CharacterModel(ModelPaths.PLAYER);
        await this.#modelClass.loadModel(arcadeScene, mixerCollection);
        this.#modelClass.createHitbox(arcadeScene);
        this.#modelClass.setPosition(this.#position.x, this.#position.y, this.#position.z);
    }

    playInteract() {
        const animation = Math.floor(Math.random() * 2) ? CharacterModel.ANIMATION_NAMES.INTERACT_LEFT : CharacterModel.ANIMATION_NAMES.INTERACT_RIGHT;
        this.#modelClass.playAnimation(animation);
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
            this.#moveWithSlide(nextPoint);
            this.#colliders.length = 0;
            return;
        }
        // If no collision occurs
        this.#position = this.#position.add(nextPoint);
        this.#modelClass.updateModel(this.#position);
    }

    #moveWithSlide(nextPoint) {
        this.#position = this.#position.add(nextPoint);
        this.#modelClass.updateModel(this.#position);

        // Move player outside of hitbox to prevent partial clipping
        this.#colliders.forEach(collider => {
            // Calculate intersecting box properties
            const intersectingBox = collider.clone().intersect(this.#modelClass.getHitbox());
            const insetX = intersectingBox.max.x - intersectingBox.min.x;
            const insetZ = intersectingBox.max.z - intersectingBox.min.z;

            // Do nothing if both insets are infinite (when box incorrect sometimes)
            if (Math.abs(insetX) === Infinity && Math.abs(insetZ) === Infinity) return;
            if (Math.abs(insetX) < Math.abs(insetZ)) {
                this.#position.x = intersectingBox.max.x < this.#position.x ? this.#position.x + insetX : this.#position.x - insetX;
                this.setPosition(this.#position);
            } else {
                this.#position.z = intersectingBox.max.z < this.#position.z ? this.#position.z + insetZ : this.#position.z - insetZ;
                this.setPosition(this.#position);
            }
        });
    }
}