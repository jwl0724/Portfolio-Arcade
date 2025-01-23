import * as THREE from "three";
import { DIALOGUE } from "../text/dialogue";
import { ShapeDrawer } from "./shapeDrawerClass";

export { DialogueManager };

// font family to use: Marker Felt, fantasy

const TEXTBOX_COLOR = 0xdadee6;

class DialogueManager {

    // Components
    #arcadeScene;
    #playerScene;
    #interactPrompt;
    #chatPrompt;
    #interactBox;

    // Running variables
    #isReady = false;
    #theta = 0;
    #hoverBaselineY;
    #inDialogue = false;
    #isTransitioning = false;

    constructor(scene) {
        this.#arcadeScene = scene;
    }

    dialogueProcess(delta) {
        this.#hoverEffect(delta);
        this.#displayPrompt();
    }

    setInteractBox(interactBox, player) {
        // Set the interact box trigger area
        this.#interactBox = interactBox;
        this.#playerScene = player;
    }

    createChatPrompt(positionVector) {
        this.#hoverBaselineY = positionVector.y + 0.85;

        // Create interact prompt box for far away
        this.#interactPrompt = ShapeDrawer.createInteractPromptMesh();
        this.#interactPrompt.position.set(
            positionVector.x - ShapeDrawer.interactPromptWidth / 2, 
            positionVector.y + 0.85,
            positionVector.z - ShapeDrawer.interactPromptWidth / 10
        );
        this.#arcadeScene.add(this.#interactPrompt);

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
        this.#arcadeScene.add(this.#chatPrompt);

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

    #hoverEffect(delta) {
        if (!this.#interactPrompt) return;
        const hoverOffset = 0.065;
        this.#interactPrompt.position.y = hoverOffset * Math.sin(this.#theta * 4) + this.#hoverBaselineY;
        this.#chatPrompt.position.y = hoverOffset * Math.sin(this.#theta * 4) + this.#hoverBaselineY;

        // Reset theta if full cycle
        if (this.#theta > Math.PI * 2) this.#theta = 0;
        else this.#theta += delta;
    }

    #displayPrompt() {
        if (!this.#isReady) return;
        const playerPosition = this.#playerScene.getPosition();
        
        // Check if player is in interact range
        if (this.#inDialogue) {
            this.#chatPrompt.visible = false;
            this.#interactPrompt.visible = false;

        } else if (this.#interactBox.containsPoint(playerPosition)) {
            this.#chatPrompt.visible = true;
            this.#interactPrompt.visible = false;

        } else {
            this.#chatPrompt.visible = false;
            this.#interactPrompt.visible = true;
        }
    }
}