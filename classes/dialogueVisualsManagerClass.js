import { ShapeDrawer } from "./shapeDrawerClass";

export { DialogueVisualsManager }

const dialogueBox = document.getElementById("dialogue-box");
const dialogueText = dialogueBox.firstChild;

class DialogueVisualsManager {
    
    // Components
    #dialogueManager;

    // Scenes
    #chatPrompt;
    #interactPrompt;

    // Running variables
    #theta = 0;
    hoverOffset = 0.065;
    #hoverBaselineY;

    constructor(manager) {
        this.#dialogueManager = manager;
    }
    
    getInteractPrompt() {
        return this.#interactPrompt;
    }

    getChatPrompt() {
        return this.#chatPrompt;
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