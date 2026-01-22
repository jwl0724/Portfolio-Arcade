import * as THREE from "three";
import { ProcessManager } from "./managers/processManagerClass";
import { CameraManager } from "./managers/cameraManagerClass";
import { ArcadeBuilder } from "./arcadeBuilderClass";
import { CollisionManager } from "./managers/collisionManagerClass";
import { DialogueManager } from "./managers/dialogueManagerClass";
import { InputManager } from "./managers/inputManagerClass";
import { ArcadeMachine } from "./entities/arcadeMachineClass";
import { LoadScreenManager } from "./visuals/loadScreenManagerClass";
import { GUIManager } from "./managers/guiManagerClass";
import { AudioManager } from "./managers/audioManagerClass";
import { ProjectWindow } from "./visuals/projectWindowClass";

export { Arcade, debug };

// Set this line to false to disable debug mode
const debug = false;

// Only one should exists, what the script will interface with
class Arcade {

    static singleton = null;

    // Constants
    static loadSteps = 4;

    // Managers
    #loadScreenManager;
    #collisionManager;
    #processManager;
    #cameraManager;
    #inputManager;
    #dialogueManager;
    #guiManager;
    #audioManager;

    // Scenes
    #arcadeScene;
    #player;
    #clerk;

    // Running variables
    #readyCount = 0;

    #renderer;
    #animationMixers;

    constructor() {
        if (Arcade.singleton) return this;
        Arcade.singleton = this;

        // Set data members
        this.#arcadeScene = new THREE.Scene();
        this.#cameraManager = new CameraManager(75, window.innerWidth / window.innerHeight, 0.1, 300);
        this.#inputManager = new InputManager(this);
        this.#audioManager = new AudioManager();
        this.#dialogueManager = new DialogueManager(this, this.#audioManager);
        this.#loadScreenManager = new LoadScreenManager(this.#inputManager);
        this.#guiManager = new GUIManager(this.#inputManager, this.#audioManager);
        this.#animationMixers = new Array();

        // Setup scene properties
        this.#arcadeScene.add(new THREE.AmbientLight(0xffffe6, 2)); // Slight yellow light
        this.#renderer = new THREE.WebGLRenderer({ antialias: true });
        this.#renderer.setSize(window.innerWidth, window.innerHeight);
        this.resizeRenderWindow(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.#renderer.domElement);

        // Set the processes
        this.#collisionManager = new CollisionManager();
        this.#processManager = new ProcessManager(this.#renderer, () => this.#renderer.render(this.#arcadeScene, this.#cameraManager.getCamera()));
        this.#processManager.addProcess((delta) => this.#animationMixers.forEach(mixer => mixer.update(delta)));
        this.#processManager.addProcess((delta) => this.#cameraManager.cameraProcess(delta));
        this.#processManager.addProcess((delta) => this.#dialogueManager.dialogueProcess(delta));

        // Setup UI function calls
        this.#loadScreenManager.addCloseAction(() => this.#guiManager.showUI());
        this.#loadScreenManager.addCloseAction(() => this.#audioManager.toggleMusic());
        ProjectWindow.addCloseAction(() => {
            this.#guiManager.showUI();
            this.#guiManager.disable(false);
            this.#audioManager.tempDisableMusic(false);
        });
    }

    getScene() {
        return this.#arcadeScene;
    }

    getCamera() {
        return this.#cameraManager.getCamera();
    }

    inDialogue() {
        return this.#dialogueManager.isInDialogue();
    }

    forceDisableMusic(disable) {
        this.#audioManager.tempDisableMusic(disable);
    }

    resizeRenderWindow(x, y) {
        this.#cameraManager.setAspectRatio(x / y);
        this.#renderer.setSize(x, y);
        if (Math.min(x, y) < 768) this.#cameraManager.setOffsetFromTarget(3, 2);
        else this.#cameraManager.setOffsetFromTarget(2, 3);
    }

    // Builds the environment
    async instantiateArcade() {
        ArcadeMachine.setArcadeReference(this); // Needed for middle man to notify project closing
        await ArcadeBuilder.buildArcade(this, this.#collisionManager, this.#animationMixers);
        await ArcadeBuilder.placeProjects(this, this.#collisionManager);
    }

    // Builds the player
    async instantiatePlayer() {
        this.#player = await ArcadeBuilder.buildPlayer(this, this.#animationMixers, this.#inputManager);

        // Add player processes
        this.#processManager.addPhysicsProcess((delta) => this.#player.playerPhysicsProcess(delta));
        this.#processManager.addProcess((delta) => this.#player.playerProcess(delta));
        this.#processManager.addInputProcess(() => this.#player.playerInputProcess());
        this.#cameraManager.setTarget(this.#player.getModel());

        // Start collision system once player is instantiated
        this.#collisionManager.addPlayerClass(this.#player);
        this.#processManager.addProcess((delta) => this.#collisionManager.collisionProcess(delta));
        this.#processManager.addProcess((delta) => ArcadeMachine.ArcadeMachinesPromptProcess(delta, this.#player));
    }

    async instantiateClerk() {
        this.#clerk = await ArcadeBuilder.buildClerk(this, this.#animationMixers);
        this.#dialogueManager.createChatPrompt(this.#clerk.getPosition());
        this.#dialogueManager.setInteractBox(this.#clerk.getInteractBox(), this.#player);
        this.#dialogueManager.setClerkModel(this.#clerk.getModel());
    }

    notifyInteractPressed(event = null, mouseWorldPos = null) {
        // Special cases for mouse events
        if (event instanceof MouseEvent) {
            if (this.#dialogueManager.isInDialogue()) this.#dialogueManager.nextDialogue();
            if (mouseWorldPos === null) return; // Early return if no mouse world position provided

            // Handle interacts on clicking interactables
            if (this.#clerk.validInteract(this.#player, mouseWorldPos)) this.enterDialogue();
            const interactedMachine = ArcadeMachine.findInteractedMachine(this.#player, mouseWorldPos);
            if (ArcadeMachine.isInteracting()) return;
            else if (interactedMachine) this.openProject(interactedMachine);
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
        this.#clerk.startInteraction();
        this.#guiManager.disable(true);
        this.#guiManager.hideUI();
        this.#cameraManager.enterDialogueCamera();
        this.#inputManager.pauseInput(true);
        this.#dialogueManager.startDialogue();
    }

    exitDialogue() {
        this.#clerk.stopInteraction();
        this.#guiManager.disable(false);
        this.#guiManager.showUI();
        this.#dialogueManager.exitDialogue();
        this.#cameraManager.exitDialogueCamera(this.#player.getModel());
        this.#inputManager.pauseInput(false);
    }

    pauseInput(paused) {
        this.#inputManager.pauseInput(paused);
    }

    // Close project is handled by the arcade machine itself and it's project window
    openProject(machine) {
        this.#guiManager.hideUI();
        this.#guiManager.disable(true);
        this.#audioManager.playSFX(this.#audioManager.chooseRandomSFX(AudioManager.sfx.arcade));
        machine.openProject(this, this.#player);
    }

    notifyProgress(progress) { // Progress expected to be a decimal
        this.#loadScreenManager.setLoadBarProgress((Math.min(progress, 1) + this.#readyCount) / Arcade.loadSteps);
        if (progress >= 1) this.#readyCount++;
        if (this.#readyCount === Arcade.loadSteps) {
            this.#loadScreenManager.showButton();
            return;
        }
    }
}