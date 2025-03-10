import { ShapeDrawer } from "../utils/shapeDrawerClass";
import { DialogueManager } from "../managers/dialogueManagerClass";
import { Dialogue } from "../../../text/dialogue";

export { DialogueVisualsManager }

// HTML elements
const dialogueBox = document.getElementById("dialogue-box");
const dialogueText = document.getElementById("dialogue-text");
const clerkName = document.getElementById("clerk-name");
const nextPrompt = document.getElementById("next-prompt");
const dialogueOptions = document.getElementById("dialogue-options");

// CSS animation names
const showDialogue = "dialogue-show";
const closeDialogue = "dialogue-close";
const showClerkName = "clerk-show";
const closeClerkName = "clerk-close";
const showOptions = "options-show";
const hideOptions = "options-hide";

class DialogueVisualsManager {

    // Components
    #dialogueManager;

    // Scenes
    #chatPrompt;
    #interactPrompt;

    // -- Running Variables --
    // Hover effect
    hoverOffset = 0.065;
    #theta = 0;

    // Dialogue box
    #dialogueOpened = false;
    #optionsOpened = false;
    #optionsQueued = false;
    #inAnimation = false;
    #dialogueText;
    #textRatio = 0;

    // Constants
    #textSpeed = 0.75;
    #hoverBaselineY;
    #animationTimeInSeconds;

    constructor(manager) {
        this.#dialogueManager = manager;
        this.#animationTimeInSeconds = parseFloat(getComputedStyle(dialogueBox).animationDuration);
        dialogueText.innerHTML = "";

        // Add event listeners to option buttons once dialogue manager is ready
        for (const option of dialogueOptions.children) {
            option.addEventListener("click", () => {
                this.#notifyPress(option.id);
            });

            // Populate button with text depending on the id (iterates through all options)
            if (option.id === "projects")  option.innerHTML = Dialogue.OPTIONS.PROJECTS;
            if (option.id === "interests") option.innerHTML = Dialogue.OPTIONS.ABOUT_INTERESTS;
            if (option.id === "skills") option.innerHTML = Dialogue.OPTIONS.ABOUT_SKILLS;
            if (option.id === "education") option.innerHTML = Dialogue.OPTIONS.ABOUT_EDUCATION;
            if (option.id === "close") option.innerHTML = Dialogue.OPTIONS.CLOSE;
        }
    }

    isFinishedDisplaying() {
        return this.#textRatio >= 1
        || !this.#dialogueText // On first launch, dialogue text is not set, so its "finished displaying"
        || this.#textRatio === 0; // The start of dialogue, not done displaying
    }

    openDialogueBox() {
        if (this.#inAnimation) return;
        // Set variables
        this.#dialogueOpened = true;
        this.#inAnimation = true;

        // Play animation for dialogue box and show box
        dialogueBox.style.display = "flex";
        clerkName.style.animationName = showClerkName;
        dialogueBox.style.animationName = showDialogue;

        // Setup callback to alert that animation is finished
        setTimeout(() => this.#inAnimation = false, this.#animationTimeInSeconds * 1000);
    }

    closeDialogueBox() {
        // Set variables
        this.#dialogueOpened = false;
        this.#inAnimation = true;
        this.#textRatio = 0;

        // Play close animation for dialogue box
        dialogueBox.style.animationName = closeDialogue;
        clerkName.style.animationName = closeClerkName;
        nextPrompt.style.display = "none";

        // Hide dialogue box a bit earlier than animation time to prevent one frame showing of box
        setTimeout(() => {
            dialogueBox.style.display = "none";
            dialogueText.innerHTML = "";

        }, (this.#animationTimeInSeconds - 0.1) * 1000);
        setTimeout(() => this.#inAnimation = false, this.#animationTimeInSeconds * 1000);
    }

    setDialogueText(text) {
        this.#textRatio = 0;
        this.#dialogueText = text;
    }

    skipDisplaying() {
        this.#textRatio = 1;
        dialogueText.innerHTML = this.#dialogueText;
    }

    runTextSpeed(delta) {
        if (this.#inAnimation || !this.#dialogueOpened) return;
        const textLength = Math.floor(this.#dialogueText.length * this.#textRatio);
        dialogueText.innerHTML = this.#dialogueText.substr(0, textLength);

        if (this.#textRatio >= 1) {
            this.#textRatio = 1;
            nextPrompt.style.display = "inherit";

        } else {
            this.#textRatio += delta * this.#textSpeed;
            nextPrompt.style.display = "none";
        }
    }

    queueOpenOptions() {
        this.#optionsQueued = true;
    }

    runOptions() {
        if (!this.#optionsQueued) return;
        if (this.#textRatio !== 1) return;
        if (this.#optionsOpened) return;
        this.openDialogueOptions();
    }

    hoverEffect(delta) {
        this.hoverOffset
        this.#interactPrompt.position.y = this.hoverOffset * Math.sin(this.#theta * 4) + this.#hoverBaselineY;
        this.#chatPrompt.position.y = this.hoverOffset * Math.sin(this.#theta * 4) + this.#hoverBaselineY;

        // Reset theta if full cycle
        if (this.#theta > Math.PI * 2) this.#theta = 0;
        else this.#theta += delta;
    }

    displayPrompt(player, interactBox) {
        const playerPosition = player.getPosition();
        // Check if player is in interact range
        if (this.#dialogueManager.isInDialogue()) {
            this.#chatPrompt.visible = false;
            this.#interactPrompt.visible = false;

        } else if (interactBox.containsPoint(playerPosition)) {
            this.#chatPrompt.visible = true;
            this.#interactPrompt.visible = false;

        } else {
            this.#chatPrompt.visible = false;
            this.#interactPrompt.visible = true;
        }
    }

    createPrompts(arcadeScene, positionVector) {
        this.#hoverBaselineY = positionVector.y + 0.85;

        // Create interact prompt box for far away
        this.#interactPrompt = ShapeDrawer.createInteractPromptMesh();
        this.#interactPrompt.position.set(
            positionVector.x - ShapeDrawer.interactPromptWidth / 2,
            positionVector.y + 0.85,
            positionVector.z - ShapeDrawer.interactPromptWidth / 10
        );
        arcadeScene.add(this.#interactPrompt);

        // Create ellipses texture for chat prompt box
        const texture = ShapeDrawer.createEllipsisTexture();

        // Create chat prompt box for close
        this.#chatPrompt = ShapeDrawer.createChatPromptMesh(texture);
        this.#chatPrompt.position.set(
            positionVector.x - ShapeDrawer.chatPromptWidth / 2,
            positionVector.y + 0.85,
            positionVector.z - ShapeDrawer.chatPromptWidth / 10
        );
        this.#chatPrompt.visible = false;
        arcadeScene.add(this.#chatPrompt);
    }

    openDialogueOptions() {
        if (this.#inAnimation || this.#optionsOpened) return;
        this.#inAnimation = true;
        this.#optionsOpened = true;
        dialogueOptions.style.display = "flex";
        dialogueOptions.style.animationName = showOptions;
        setTimeout(() => this.#inAnimation = false, this.#animationTimeInSeconds * 1000);
    }

    closeDialogueOptions() {
        if (this.#inAnimation || !this.#optionsOpened) return;
        this.#inAnimation = true;
        this.#optionsOpened = false;
        this.#optionsQueued = false;
        dialogueOptions.style.animationName = hideOptions;
        setTimeout(() => dialogueOptions.style.display = "none",
            (this.#animationTimeInSeconds - 0.1) * 1000);
        setTimeout(() => this.#inAnimation = false, this.#animationTimeInSeconds * 1000);
    }

    #notifyPress(option) {
        if (this.#inAnimation) return; // Stop button from being pressed when its still coming in
        if (option === "projects")
            this.#dialogueManager.switchTree(DialogueManager.treeOption.PROJECTS);
        else if (option === "interests")
            this.#dialogueManager.switchTree(DialogueManager.treeOption.INTERESTS);
        else if (option === "skills")
            this.#dialogueManager.switchTree(DialogueManager.treeOption.SKILLS);
        else if (option === "education")
            this.#dialogueManager.switchTree(DialogueManager.treeOption.EDUCATION);
        else if (option === "close")
            this.#dialogueManager.switchTree(DialogueManager.treeOption.CLOSE);
    }
}