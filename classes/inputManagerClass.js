import * as THREE from 'three';

export { InputManager };

class InputManager {

    #player;
    #pressedKeys = new Set();
    
    constructor(playerClass) {
        this.#player = playerClass;
        this.#setupKeyboardReading();
        this.#setupMouseInputReading();
    }

    getInputVector() {
        let horizontal = 0, vertical = 0;
        if (this.#pressedKeys.has("w")) vertical -= 1;
        if (this.#pressedKeys.has("a")) horizontal -= 1;
        if (this.#pressedKeys.has("s")) vertical += 1;
        if (this.#pressedKeys.has("d")) horizontal += 1;
        return new THREE.Vector3(horizontal, 0, vertical);
    }

    #setupKeyboardReading() {
        // For when key is pressed/held
        document.addEventListener("keydown", (event) => {
            if (event.key === "w") this.#pressedKeys.add("w");
            if (event.key === "a") this.#pressedKeys.add("a");
            if (event.key === "s") this.#pressedKeys.add("s");
            if (event.key === "d") this.#pressedKeys.add("d");    
        });
        
        // For when key is released (i.e. not held anymore)
        document.addEventListener("keyup", (event) => {
            if (event.key == "w") this.#pressedKeys.delete("w");
            if (event.key == "a") this.#pressedKeys.delete("a");
            if (event.key == "s") this.#pressedKeys.delete("s");
            if (event.key == "d") this.#pressedKeys.delete("d");
        });
    }

    // TODO: Implement WAYYY later when want to support mobile
    #setupMouseInputReading() {

    }
}