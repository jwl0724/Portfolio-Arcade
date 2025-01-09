export { Player };

class Player {
    // Data members
    #isMoving = false;
    #moveSpeed = 0.1;
    #directionVector = new THREE.Vector3(0, 0, 0);
    #modelClass = null;
    
    constructor(modelFilePath) {
        
    }

    isMoving() {
        return this.#isMoving;
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