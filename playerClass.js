export { Player };

class Player {
    // Data members
    #moveSpeed;
    #directionVector;
    #modelClass;
    #isMoving;
    
    constructor(modelFilePath) {
        this.#moveSpeed = 0.1;
        this.#directionVector = new THREE.Vector3(0, 0, 0);
    }

    readInput() {

    }

    updatePosition() {

    }
}