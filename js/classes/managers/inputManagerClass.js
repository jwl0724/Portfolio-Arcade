import * as THREE from 'three';
import { ClickManager } from './clickManagerClass';

export { InputManager };

class InputManager {

    #arcadeClass;
    #pressedKeys = new Set();
    #mouseWorldPos = null;
    #isPaused = false;
    #clickManager;

    constructor(arcadeClass) {
        this.#arcadeClass = arcadeClass;
        this.#clickManager = new ClickManager(arcadeClass.getScene(), arcadeClass.getCamera());

        this.#setupKeyboardReading();
        this.#setupMouseInputReading();
    }

    getInputVector(playerPosition) {
        if (this.#isPaused) return new THREE.Vector3(0, 0, 0) // return no direction for no movement

        // Cancel movement order if a keyboard button was pressed
        if (this.#pressedKeys.has("w") || this.#pressedKeys.has("a") || this.#pressedKeys.has("s") || this.#pressedKeys.has("d"))
            this.#mouseWorldPos = null;

        if (this.#mouseWorldPos) {
            const direction = this.#mouseWorldPos.clone().sub(playerPosition);
            const inputVector = direction.normalize();
            return inputVector;
        }

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
            if (key === "shift") this.#pressedKeys.add("shift"); // sprint key
        });

        // For when key is released (i.e. not held anymore)
        document.addEventListener("keyup", (event) => {
            const key = event.key.toLowerCase();
            if (key == "w") this.#pressedKeys.delete("w");
            if (key == "a") this.#pressedKeys.delete("a");
            if (key == "s") this.#pressedKeys.delete("s");
            if (key == "d") this.#pressedKeys.delete("d");
            if (key === "shift") this.#pressedKeys.delete("shift");
        });

        // For when interact is pressed
        document.addEventListener("keypress", (event) => {
            const key = event.key.toLowerCase();
            if (key === "e") this.#arcadeClass.notifyInteractPressed();
        })

        // Add external circumstances where key pressed need to be cleared
        this.#addPressedKeyClearEvents("blur", "contextmenu");
    }

    // TODO: Implement WAYYY later when want to support mobile
    #setupMouseInputReading() {
        // For interacting with the mouse
        document.addEventListener("click", (mouseEvent) => {
            if (mouseEvent.target.tagName === "BUTTON" || this.#isPaused) return; // Ignore clicks on button or when input is paused
            this.#mouseWorldPos = this.#clickManager.getClickPosition(mouseEvent);
        });
    }

    #addPressedKeyClearEvents(...events) {
        events.forEach(event => {
            window.addEventListener(event, () => this.#pressedKeys.clear())
        });
    }
}