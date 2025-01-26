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

    // Dialogue options enum
    static treeOption = Object.freeze({
        INTRO: 0,
        INTERESTS: 1,
        EDUCATION: 2,
        SKILLS: 3,
        PROJECTS: 4,
        CLOSE: 5,
        REPEAT: 6
    }); 

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
    static #projectsTree = new Array(
        Dialogue.PROJECTS_DIALOGUE.INSTRUCTIONS_DESKTOP // Temp only for desktop, mobile support way later down the line
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
        this.switchTree(DialogueManager.treeOption.REPEAT);
        this.#inDialogue = false;
        this.#dialogueVisuals.closeDialogueBox();
    }

    switchTree(option) {
        this.#dialogueIndex = 0;
        // Assumes never anything outside of the enum options
        switch(option) {
            case DialogueManager.treeOption.INTRO:
                this.#dialogueVisuals.closeDialogueOptions();
                this.#currentTree = DialogueManager.#introTree;
                break;
            case DialogueManager.treeOption.INTERESTS:
                this.#dialogueVisuals.closeDialogueOptions();
                this.#currentTree = DialogueManager.#interestsTree;
                break;
            case DialogueManager.treeOption.EDUCATION:
                this.#dialogueVisuals.closeDialogueOptions();
                this.#currentTree = DialogueManager.#educationTree;
                break;
            case DialogueManager.treeOption.SKILLS:
                this.#dialogueVisuals.closeDialogueOptions();
                this.#currentTree = DialogueManager.#skillsTree;
                break;
            case DialogueManager.treeOption.PROJECTS:
                this.#dialogueVisuals.closeDialogueOptions();
                this.#currentTree = DialogueManager.#projectsTree;
                break;
            case DialogueManager.treeOption.CLOSE:
                this.#dialogueVisuals.closeDialogueOptions();
                this.#currentTree = DialogueManager.#repeatTree;
                this.#arcade.exitDialogue()
                break;
            case DialogueManager.treeOption.REPEAT:
                this.#dialogueVisuals.openDialogueOptions();
                this.#currentTree = DialogueManager.#repeatTree;
                break;
        }
        this.nextDialogue();
    }

    nextDialogue() {
        if (!this.#dialogueVisuals.isFinishedDisplaying()) this.#dialogueVisuals.skipDisplaying();

        // Don't do anything if already on the repeat tree (tree where user input is waited for)
        if (this.#currentTree === DialogueManager.#repeatTree) return;
    
        // If reached at the end of the tree, switch to the repeated prompt tree
        if (this.#dialogueIndex >= this.#currentTree.length) this.switchTree(DialogueManager.treeOption.REPEAT);
        this.#dialogueVisuals.setDialogueText(this.#currentTree[this.#dialogueIndex++]);        
    }
}