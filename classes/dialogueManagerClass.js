import * as THREE from "three";
import { Dialogue } from "../text/dialogue";
import { DialogueVisualsManager } from "./dialogueVisualsManagerClass";
import { ShapeDrawer } from "./shapeDrawerClass";

export { DialogueManager };

// font family to use: Marker Felt, fantasy

const TEXTBOX_COLOR = 0xdadee6;

class DialogueManager {

    // Components
    #dialogueVisuals;
    
    // Scenes
    #arcadeScene;
    #playerScene;
    #interactArea;

    // Running variables
    #isReady = false;
    #inDialogue = false;
    #isTransitioning = false;

    constructor(scene) {
        this.#arcadeScene = scene;
        this.#dialogueVisuals = new DialogueVisualsManager(this);
    }

    isInDialogue() {
        return this.#inDialogue;
    }

    dialogueProcess(delta) {
        if (!this.#isReady) return;
        // Visuals Processes
        this.#dialogueVisuals.hoverEffect(delta);
        this.#dialogueVisuals.displayPrompt(this.#playerScene, this.#interactArea);
    }

    setInteractBox(interactBox, player) {
        // Set the interact box trigger area
        this.#interactArea = interactBox;
        this.#playerScene = player;
    }

    createChatPrompt(positionVector) {
        this.#dialogueVisuals.createPrompts(this.#arcadeScene, positionVector);
        // Set scene to be ready after this is created
        this.#isReady = true;
    }

    startDialogue(camera) {
        this.#inDialogue = true;
        // this.#textbox.position.set(camera.position.x, camera.position.y - 0.1, camera.position.z - 0.275);
    }
    
    exitDialogue() {
        this.#inDialogue = false;
        // this.#textbox.position.y -= 20; // Hide the text box somewhere
    }

    #createResponseBox(text) {
    }

    #manageDialogue() {

    }
}