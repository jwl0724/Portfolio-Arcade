import * as THREE from "three";
import { DIALOGUE } from "../text/dialogue";
import { ShapeDrawer } from "./shapeDrawerClass";

export { DialogueManager };

// font family to use: Marker Felt, fantasy

const TEXTBOX_COLOR = 0xdadee6;

class DialogueManager {

    // Components
    #arcadeScene;
    #chatPromptBox;
    #chatPromptText;
    #chatPromptCanvas;

    // Running variables
    #animating = false;

    constructor(scene) {
        this.#arcadeScene = scene;
        
        // Create ellipses text
        this.#chatPromptCanvas = document.createElement("canvas");
        this.#chatPromptText = "...";
        const textTexture = new THREE.Texture();

        // this.#responseBoxes = new Array();

        // // Create text Texture
        // this.#textCanvas = document.createElement("canvas");
        // this.#displayedText = "send help";
        
        // // Create text box
        // const geometry = new THREE.PlaneGeometry(0.4, 0.1);
        // const textTexture = new THREE.Texture(this.#textCanvas);
        // textTexture.needsUpdate = true;
        // textTexture.minFilter= THREE.NearestFilter;
        // textTexture.magFilter = THREE.NearestFilter;

        // const material = new THREE.MeshBasicMaterial({ color: TEXTBOX_COLOR, side: THREE.DoubleSide, map: textTexture });
        // this.#textbox = new THREE.Mesh(geometry, material);
        // this.#textbox.position.set(0, -20, 0); // Hide the text box somewhere else
        // this.#arcadeScene.add(this.#textbox);
    }

    createChatPrompt(positionVector) {
        this.#chatPromptBox = ShapeDrawer.createInteractPromptBox();
        this.#arcadeScene.add(this.#chatPromptBox);
        this.#chatPromptBox.position.set(
            positionVector.x - ShapeDrawer.interactPromptWidth / 2, 
            positionVector.y + 0.85,
            positionVector.z - ShapeDrawer.interactPromptWidth / 10
        );
    }

    dialogueProcess(delta) {
        // if (!this.#displayedText) return;
        // const texture = this.#textCanvas.getContext("2d");

        // texture.font = "20pt Arial";
        // texture.fillStyle = "white";
        // texture.fillRect(0, 0, this.#textCanvas.width, this.#textCanvas.height);
        // texture.fillStyle = "black";
        // texture.textAlign = "center";
        // texture.textBaseline = "middle";
        // texture.fillText(this.#displayedText, this.#textCanvas.width / 2, this.#textCanvas.height / 2);
    }

    startDialogue(camera) {
        // this.#textbox.position.set(camera.position.x, camera.position.y - 0.1, camera.position.z - 0.275);
    }
    
    exitDialogue() {
        // this.#textbox.position.y -= 20; // Hide the text box somewhere
    }

    #displayText(text) {
        const loader = new THREE.FontLoader();
        loader.load("fonts/helvetiker_regular.typeface.json", (font) => {
            const geometry = new THREE.TextGeometry(text, {
                font: font,
                size: 0.1,
                height: 0.01
            });
            const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
            const textMesh = new THREE.Mesh(geometry, material);
            textMesh.position.set(-2.5, -0.25, -1.9);
            this.#arcadeScene.add(textMesh);
        });
    }

    #createResponseBox(text) {
    }

    #manageDialogue() {

    }
}