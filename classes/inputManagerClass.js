import * as THREE from 'three';

export { InputManager };

class InputManager {

    #pressedKeys = new Set();
    #isPaused = false;
    
    constructor() {
        this.#setupKeyboardReading();
        this.#setupMouseInputReading();
    }

    getInputVector() {
        if (this.#isPaused) return new THREE.Vector3(0, 0, 0) // return no direction for no movement
        let horizontal = 0, vertical = 0;
        if (this.#pressedKeys.has("w")) vertical -= 1;
        if (this.#pressedKeys.has("a")) horizontal -= 1;
        if (this.#pressedKeys.has("s")) vertical += 1;
        if (this.#pressedKeys.has("d")) horizontal += 1;
        return new THREE.Vector3(horizontal, 0, vertical);
    }

    getSprintKeyPressed() {
        return this.#pressedKeys.has("shift");
    }

    getInteractPressed() {
        return this.#pressedKeys.has("e");
    }

    pauseInput(pause) {
        this.#isPaused = pause;
    }

    #setupKeyboardReading() {
        // For when key is pressed/held
        document.addEventListener("keydown", (event) => {
            const key = event.key.toLowerCase();
            if (key === "w") this.#pressedKeys.add("w");
            if (key === "a") this.#pressedKeys.add("a");
            if (key === "s") this.#pressedKeys.add("s");
            if (key === "d") this.#pressedKeys.add("d");
            if (key === "e") this.#pressedKeys.add("e"); // interact key
            if (key === "shift") this.#pressedKeys.add("shift"); // sprint key
        });
        
        // For when key is released (i.e. not held anymore)
        document.addEventListener("keyup", (event) => {
            const key = event.key.toLowerCase();
            if (key == "w") this.#pressedKeys.delete("w");
            if (key == "a") this.#pressedKeys.delete("a");
            if (key == "s") this.#pressedKeys.delete("s");
            if (key == "d") this.#pressedKeys.delete("d");
            if (key === "e") this.#pressedKeys.add("e");
            if (key === "shift") this.#pressedKeys.delete("shift");
        });

        // Add external circumstances where key pressed need to be cleared
        this.#addPressedKeyClearEvents("blur", "contextmenu");
    }

    // TODO: Implement WAYYY later when want to support mobile
    #setupMouseInputReading() {

    }

    #addPressedKeyClearEvents(...events) {
        events.forEach(event => {
            window.addEventListener(event, () => this.#pressedKeys.clear())
        });
    }
}