import { ShapeDrawer } from "./shapeDrawerClass";

export { DialogueVisualsManager }

const dialogueBox = document.getElementById("dialogue-box");
const dialogueText = document.getElementById("dialogue-text");
const clerkName = document.getElementById("clerk-name");

// CSS animation names
const showDialogue = "dialogue-show";
const closeDialogue = "dialogue-close";
const showClerkName = "clerk-show";
const closeClerkName = "clerk-close";

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
    }

    isFinishedDisplaying() {
        return this.#textRatio >= 1;
    }

    openDialogueBox() {
        if (this.#inAnimation) return;
        this.#dialogueOpened = true;
        this.#inAnimation = true;
        clerkName.style.display = "flex";
        clerkName.style.animationName = showClerkName;
        dialogueBox.style.display = "flex";
        dialogueBox.style.animationName = showDialogue;
        setTimeout(() => this.#inAnimation = false, this.#animationTimeInSeconds * 1000);
    }

    closeDialogueBox() {
        if (this.#inAnimation) return;
        this.#dialogueOpened = false;
        this.#inAnimation = true;
        dialogueBox.style.animationName = closeDialogue;
        clerkName.style.animationName = closeClerkName;
        // Hide dialogue box a bit earlier than animation time to prevent one frame showing of box
        setTimeout(() => {
            dialogueBox.style.display = "none";
            clerkName.style.display = "none";
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
    }

    runTextSpeed(delta) {
        if (this.#inAnimation || !this.#dialogueOpened) return;
        const textLength = Math.floor(this.#dialogueText.length * this.#textRatio);
        dialogueText.innerHTML = this.#dialogueText.substr(0, textLength);

        if (this.#textRatio >= 1) this.#textRatio = 1;
        else this.#textRatio += delta *this.#textSpeed;
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
}