import { Dialogue } from "../text/dialogue";
import { DialogueVisualsManager } from "./dialogueVisualsManagerClass";

export { DialogueManager };

class DialogueManager {

    // Components
    #dialogueVisuals;
    
    // Scenes
    #arcade;
    #playerScene;
    #interactArea;

    // Running variables
    #isReady = false;
    #inDialogue = false;

    // Dialogue tree options
    static #introTree = new Array(
        Dialogue.CLERK_INTRO.INTRO,
        Dialogue.CLERK_INTRO.DESCRIPTION,
        Dialogue.CLERK_INTRO.PROMPT,
    );
    static #interestsTree = new Array(
        Dialogue.ABOUT_DIALOGUE.INTERESTS,
        Dialogue.ABOUT_DIALOGUE.INTERESTS_2
    );
    static #educationTree = new Array(
        Dialogue.ABOUT_DIALOGUE.EDUCATION,
        Dialogue.ABOUT_DIALOGUE.EDUCATION_2
    );
    static #skillsTree = new Array(
        Dialogue.ABOUT_DIALOGUE.SKILLS,
        Dialogue.ABOUT_DIALOGUE.SKILLS_2,
        Dialogue.ABOUT_DIALOGUE.SKILLS_3
    );
    static #repeatTree = new Array(
        Dialogue.CLERK_INTRO.REPEAT_PROMPT
    );

    // Dialogue variables tracker
    #currentTree = DialogueManager.#introTree; // Set to intro on first launch
    #dialogueIndex = 0;
    
    constructor(arcade) {
        this.#arcade = arcade;
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
        this.#dialogueVisuals.createPrompts(this.#arcade.getScene(), positionVector);
        // Set scene to be ready after this is created
        this.#isReady = true;
    }

    startDialogue() {
        this.#inDialogue = true;
        this.nextDialogue();
        this.#dialogueVisuals.openDialogueBox();
    }
    
    exitDialogue() {
        this.#dialogueIndex = 0;
        this.#currentTree = DialogueManager.#repeatTree;
        this.#inDialogue = false;
        this.#dialogueVisuals.closeDialogueBox();
    }

    nextDialogue() {
        if (!this.#dialogueVisuals.isFinishedDisplaying()) this.#dialogueVisuals.skipDisplaying();
        else {
            if (this.#dialogueIndex >= this.#currentTree.length) {
                this.#arcade.exitDialogue();
                return;
            }
            this.#dialogueVisuals.setDialogueText(this.#currentTree[this.#dialogueIndex++]);
        }
    }
}