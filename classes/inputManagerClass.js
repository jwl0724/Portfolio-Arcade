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
            const key = event.key.toLowerCase();
            if (key === "w") this.#pressedKeys.add("w");
            if (key === "a") this.#pressedKeys.add("a");
            if (key === "s") this.#pressedKeys.add("s");
            if (key === "d") this.#pressedKeys.add("d");    
        });
        
        // For when key is released (i.e. not held anymore)
        document.addEventListener("keyup", (event) => {
            const key = event.key.toLowerCase();
            if (key == "w") this.#pressedKeys.delete("w");
            if (key == "a") this.#pressedKeys.delete("a");
            if (key == "s") this.#pressedKeys.delete("s");
            if (key == "d") this.#pressedKeys.delete("d");
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