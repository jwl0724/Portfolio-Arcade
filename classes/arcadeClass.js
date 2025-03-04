import * as THREE from "three";
import { ProcessManager } from "./processManagerClass";
import { CameraManager } from "./cameraManagerClass";
import { ArcadeBuilder } from "./arcadeBuilderClass";
import { CollisionManager } from "./collisionManagerClass";
import { DialogueManager } from "./dialogueManagerClass";
import { InputManager } from "./inputManagerClass";
import { ProjectWindow } from "./projectWindowClass";
import { ArcadeMachine } from "./arcadeMachineClass";

export { Arcade, debug };

// Set this line to false to disable debug mode
const debug = true;

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
        ArcadeMachine.setArcadeReference(this); // Needed for middle man to notify project closing
        await ArcadeBuilder.buildArcade(this.#arcadeScene, this.#collisionManager, this.#animationMixers);
        await ArcadeBuilder.placeProjects(this.#arcadeScene, this.#collisionManager);
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
        this.#clerk = await ArcadeBuilder.buildClerk(this.#arcadeScene, this.#animationMixers);
        this.#dialogueManager.createChatPrompt(this.#clerk.getPosition());
        this.#dialogueManager.setInteractBox(this.#clerk.getInteractBox(), this.#player);
        this.#dialogueManager.setClerkModel(this.#clerk.getDialogueModel());
    }

    notifyInteractPressed(mouseEvent = null) {
        // Special cases for mouse events
        if (mouseEvent) {
            // TODO: When mouse support is fully implemented, logic goes here, for now leave it to dialogue only
            if (this.#dialogueManager.isInDialogue()) this.#dialogueManager.nextDialogue();
            return;
        }
        // Dialogue Handlers
        // Press interact during dialogue
        if (this.#dialogueManager.isInDialogue()) this.#dialogueManager.nextDialogue();
        // Handle interact within range of clerk
        else if (this.#clerk.validInteract(this.#player)) this.enterDialogue();

        // Arcade Machine Handlers
        // Handle press when in project window is open
        const interactedMachine = ArcadeMachine.findInteractedMachine(this.#player);
        if (ArcadeMachine.isInteracting()) return;
        // Check if player is next to machine
        else if (interactedMachine) this.openProject(interactedMachine);
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

    pauseInput(paused) {
        this.#inputManager.pauseInput(paused);
    }

    // Close project is handled by the arcade machine itself and it's project window
    openProject(machine) {
        machine.openProject(this, this.#player);
    }
}