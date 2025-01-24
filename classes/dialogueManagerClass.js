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

    // Dialogue variables tracker
    #dialogueTree = new Array(
        Dialogue.CLERK_INTRO.INTRO,
        Dialogue.CLERK_INTRO.DESCRIPTION,
        Dialogue.CLERK_INTRO.PROMPT,
        // TODO: Implement a map for dialogue options that branch into the specific dialogue path
    );
    #dialogueIndex = 1; // Since the first dialogue intro is set on first interact

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
        this.#dialogueVisuals.runTextSpeed(delta);
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
        this.#dialogueVisuals.setDialogueText(Dialogue.CLERK_INTRO.INTRO);
        this.#dialogueVisuals.openDialogueBox();
    }
    
    exitDialogue() {
        this.#dialogueIndex = 1;
        this.#inDialogue = false;
        this.#dialogueVisuals.closeDialogueBox();
    }

    nextDialogue(arcadeClass) {
        if (!this.#dialogueVisuals.isFinishedDisplaying()) {
            this.#dialogueVisuals.skipDisplaying();
            return;

        } else {
            // TEMP CODE TO STOP DIALOGUE, MAKE A BUTTON LATER TO EXIT
            if (this.#dialogueIndex >= this.#dialogueTree.length) {
                this.exitDialogue();
                arcadeClass.exitDialogue(); // TEMP CODE, FIND BETTER WAY TO DO IT LATER
                return;
            }
            this.#dialogueVisuals.setDialogueText(this.#dialogueTree[this.#dialogueIndex++]);

        }
    }
}