import * as THREE from "three";
import { ProcessManager } from "./processManagerClass";
import { CameraManager } from "./cameraManagerClass";
import { ArcadeBuilder } from "./arcadeBuilderClass";
import { CollisionManager } from "./collisionManagerClass";
import { DialogueManager } from "./dialogueManagerClass";
import { InputManager } from "./inputManagerClass";

export { Arcade };

// Only one should exists, what the script will interface with
class Arcade {

    // Managers
    #collisionManager;
    #processManager;
    #cameraManager;
    #inputManager;
    #dialogueManager;

    // Scenes
    #arcadeScene;
    #player;
    #clerk;

    #renderer;
    #animationMixers;

    constructor() {
        // Set data members
        this.#arcadeScene = new THREE.Scene();
        this.#dialogueManager = new DialogueManager(this);
        this.#cameraManager = new CameraManager(75, window.innerWidth / window.innerHeight, 0.1, 300);
        this.#inputManager = new InputManager(this);
        this.#animationMixers = new Array();
        
        // Setup scene properties
        this.#arcadeScene.add(new THREE.AmbientLight(0xffffe6, 2)); // Slight yellow light
        this.#renderer = new THREE.WebGLRenderer({ antialias: true });
        this.#renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.#renderer.domElement);
        
        // Set the processes
        this.#collisionManager = new CollisionManager();
        this.#processManager = new ProcessManager(this.#renderer, () => this.#renderer.render(this.#arcadeScene, this.#cameraManager.getCamera()));
        this.#processManager.addProcess((delta) => this.#animationMixers.forEach(mixer => mixer.update(delta)));
        this.#processManager.addProcess((delta) => this.#cameraManager.cameraProcess(delta));
        this.#processManager.addProcess((delta) => this.#dialogueManager.dialogueProcess(delta));
    }

    getScene() {
        return this.#arcadeScene;
    }

    resizeRenderWindow(x, y) {
        this.#cameraManager.setAspectRatio(x / y);
        this.#renderer.setSize(x, y);
    }

    async instantiateArcade() {
        await ArcadeBuilder.buildArcade(this.#arcadeScene, this.#collisionManager, this.#animationMixers);
    }

    async instantiatePlayer() {
        this.#player = await ArcadeBuilder.buildPlayer(this.#arcadeScene, this.#animationMixers, this.#inputManager);

        // Add player processes
        this.#processManager.addPhysicsProcess((delta) => this.#player.playerPhysicsProcess(delta));
        this.#processManager.addProcess((delta) => this.#player.playerProcess(delta));
        this.#processManager.addInputProcess(() => this.#player.playerInputProcess());
        this.#cameraManager.setTarget(this.#player.getModel());

        // Start collision system once player is instantiated
        this.#collisionManager.addPlayerClass(this.#player);
        this.#processManager.addProcess((delta) => this.#collisionManager.collisionProcess(delta));
    }

    async instantiateClerk() {
        this.#clerk = await ArcadeBuilder.buildClerk(this.#arcadeScene, this.#animationMixers, this.#inputManager);
        this.#dialogueManager.createChatPrompt(this.#clerk.getPosition());
        this.#dialogueManager.setInteractBox(this.#clerk.getInteractBox(), this.#player);
        this.#processManager.addProcess((delta) => this.#clerk.clerkProcess(delta));
    }

    notifyInteractPressed() {
        // Handle press when in dialogue
        if (this.#dialogueManager.isInDialogue()) {
            this.#dialogueManager.nextDialogue(this); // TEMP CODE, REMOVE THIS LATER
            return;
        }
        // Handle interact within range of clerk
        if (this.#clerk.validInteract(this.#player)) this.enterDialogue();
    }

    enterDialogue() {
        this.#clerk.startInteraction(this.#cameraManager.getCamera());
        this.#cameraManager.enterDialogueCamera();
        this.#inputManager.pauseInput(true);
        this.#dialogueManager.startDialogue();
    }

    exitDialogue() {
        this.#clerk.stopInteraction();
        this.#dialogueManager.exitDialogue();
        this.#cameraManager.exitDialogueCamera(this.#player.getModel());
        this.#inputManager.pauseInput(false);
    }
}