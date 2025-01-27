import { rand } from "three/tsl";
import { Dialogue } from "../text/dialogue";
import { CharacterModel } from "./characterModelClass";
import { DialogueVisualsManager } from "./dialogueVisualsManagerClass";

export { DialogueManager };

class DialogueManager {

    // Components
    #dialogueVisuals;
    
    // Scenes
    #arcade;
    #playerScene;
    #clerkDialogueScene;
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

    // Clerk animations to sync dialogue to
    static #dialogueAnimations = new Array(
        CharacterModel.ANIMATION_NAMES.INTERACT_RIGHT,
        CharacterModel.ANIMATION_NAMES.INTERACT_LEFT,
        CharacterModel.ANIMATION_NAMES.EMOTE_YES,
        CharacterModel.ANIMATION_NAMES.EMOTE_NO,
        CharacterModel.ANIMATION_NAMES.PICKUP,
    );
    
    constructor(arcade) {
        this.#arcade = arcade;
        this.#dialogueVisuals = new DialogueVisualsManager(this);
    }

    setClerkModel(model) {
        this.#clerkDialogueScene = model;
    }

    isInDialogue() {
        return this.#inDialogue;
    }

    dialogueProcess(delta) {
        if (!this.#isReady) return;
        // Visuals Processes
        this.#dialogueVisuals.runOptions();
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
        // Open options menu if already interacted before with clerk
        if (this.#currentTree === DialogueManager.#repeatTree) this.#dialogueVisuals.queueOpenOptions();
        this.#inDialogue = true;
        this.nextDialogue();
        this.#dialogueVisuals.openDialogueBox();
    }
    
    exitDialogue() {
        this.#dialogueIndex = 0;
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
                this.#currentTree = DialogueManager.#repeatTree; // Set tree to repeat for next interaction
                this.#dialogueVisuals.setDialogueText(this.#currentTree[0]); // Set text for next interaction
                this.#arcade.exitDialogue();
                break;
            case DialogueManager.treeOption.REPEAT:
                this.#dialogueVisuals.queueOpenOptions();
                this.#currentTree = DialogueManager.#repeatTree;
                break;
        }
        // Automatically trigger the next line of dialogue unless chosen was close dialogue
        if (option !== DialogueManager.treeOption.CLOSE) this.nextDialogue();
    }

    // Gets called whenever interact is pressed, up to dialogue manager to check what to do
    nextDialogue() {
        if (!this.#dialogueVisuals.isFinishedDisplaying()) {
            // Will automatically fill the current set text, early return so to not set text again
            this.#dialogueVisuals.skipDisplaying();
            return;
        }

        // Don't do anything if already on the repeat tree (tree where user input is waited for)
        if (this.#currentTree === DialogueManager.#repeatTree) return;

        // Play animation for new text
        if (this.#dialogueIndex < this.#currentTree.length || this.#currentTree !== DialogueManager.#repeatTree) {
            // Play animation only whe not at the end of text
            const randomIndex = Math.floor(Math.random() * DialogueManager.#dialogueAnimations.length);
            this.#clerkDialogueScene.playAnimation(DialogueManager.#dialogueAnimations[randomIndex]);
        }
        
        // Special case for intro tree since it only runs once
        if (this.#currentTree === DialogueManager.#introTree) {
            if (this.#dialogueIndex >= this.#currentTree.length) return;
            if (this.#dialogueIndex === this.#currentTree.length - 1) this.#dialogueVisuals.queueOpenOptions();
            this.#dialogueVisuals.setDialogueText(this.#currentTree[this.#dialogueIndex++]);
            return;
        }
        // If reached at the end of the tree, switch to the repeated prompt tree
        if (this.#dialogueIndex >= this.#currentTree.length) this.switchTree(DialogueManager.treeOption.REPEAT);
        this.#dialogueVisuals.setDialogueText(this.#currentTree[this.#dialogueIndex++]);
    }
}