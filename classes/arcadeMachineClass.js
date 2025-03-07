import * as THREE from "three";
import { ModelPaths } from "../modelPaths";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { ProjectWindow } from "./projectWindowClass";
import { debug } from "./arcadeClass";
import { ShapeDrawer } from "./shapeDrawerClass";

export { ArcadeMachine };

class ArcadeMachine {

    // Static variables
    static #allMachines = new Array();
    static #isInteracting = false;
    static #arcadeClass;

    // Properties
    #scene; // Don't need class wrapper since there's no animations
    #projectWindow;

    // World properties
    #position;
    #rotation; // In degrees
    #hitbox;
    #interactBox;

    // Components
    #dotPrompt;
    #exclaimPrompt;

    // Constants
    #hoverOffset = 0.025;
    #spinSpeed = 0.5;

    // Running variables
    #hoverBaselineY;
    #ready = false;
    #theta;


    // Helper methods to check if player interacted
    static findInteractedMachine(player) {
        for(let i = 0; i < ArcadeMachine.#allMachines.length; i++) {
            if (ArcadeMachine.#allMachines[i].inRange(player))
                return ArcadeMachine.#allMachines[i];
        }
        return null;
    }

    static ArcadeMachinesPromptProcess(delta, player) {
        ArcadeMachine.#allMachines.forEach(machine => machine.process(delta, player));
    }

    static notifyWindowClosed() {
        if (!ProjectWindow.isOpen() || ProjectWindow.inAnimation()) return;
        ArcadeMachine.#isInteracting = false;
        this.#arcadeClass.pauseInput(false);
    }

    static setArcadeReference(ref) {
        this.#arcadeClass = ref;
    }

    static isInteracting() {
        return ArcadeMachine.#isInteracting;
    }

    constructor(projectInfo, position, rotation) {
        this.#position = position;
        this.#rotation = rotation;
        this.#projectWindow = new ProjectWindow(projectInfo);
        this.#theta = Math.random() * Math.PI * 2;
    }


    isReady() {
        return this.#ready;
    }

    async spawn(arcadeScene, collisionManager) {
        const loader = new GLTFLoader();
        const gltf = await loader.loadAsync(ModelPaths.ARCADE_MACHINE);
        this.#scene = gltf.scene;

        this.#scene.position.set(this.#position.x, this.#position.y, this.#position.z);
        this.#scene.rotateY(this.#rotation * Math.PI / 180);

        // Create hitbox
        this.#hitbox = new THREE.Box3().setFromObject(this.#scene);
        arcadeScene.add(this.#scene);

        // Create interact zone
        this.#interactBox = new THREE.Box3(
            new THREE.Vector3(this.#position.x - 0.45, this.#position.y - 1, this.#position.z - 0.3),
            new THREE.Vector3(this.#position.x + 0.45, this.#position.y + 1, this.#position.z + 0.6)
        );

        if (debug) {
            arcadeScene.add(new THREE.Box3Helper(this.#hitbox, 0xffffff));
            arcadeScene.add(new THREE.Box3Helper(this.#interactBox, 0xffc0cb));
        }
        // Add to object trackers
        collisionManager.addEnvironmentHitbox(this.#hitbox);
        ArcadeMachine.#allMachines.push(this);
        this.#ready = true;

        // Add prompts visuals to scene
        this.#hoverBaselineY = this.#position.y + 0.85;
        this.#dotPrompt = ShapeDrawer.createDotPromptMesh();
        this.#dotPrompt.position.set(
            this.#position.x - ShapeDrawer.projectPromptWidth / 2,
            this.#hoverBaselineY,
            this.#position.z - ShapeDrawer.projectPromptWidth / 10
        );
        arcadeScene.add(this.#dotPrompt);

        this.#exclaimPrompt = ShapeDrawer.createExclaimPromptMesh();
        // Exclamation mark is a 3D model, so no need to offset
        this.#exclaimPrompt.position.set(this.#position.x, this.#hoverBaselineY, this.#position.z);
        arcadeScene.add(this.#exclaimPrompt);
    }

    inRange(player) {
        if (!this.#ready || ArcadeMachine.#isInteracting) return false;
        return this.#interactBox.containsPoint(player.getModel().position);
    }

    openProject(arcadeClass, playerClass) {
        if (ProjectWindow.isOpen() || ProjectWindow.inAnimation()) return;
        playerClass.playInteract();
        arcadeClass.pauseInput(true);
        ArcadeMachine.#isInteracting = true;
        this.#projectWindow.openProject();
    }

    process(delta, player) {
        this.#checkInRange(player);
        this.#hoverAndSpingEffect(delta);
    }

    #hoverAndSpingEffect(delta) {
        this.#dotPrompt.position.y = this.#hoverOffset * Math.sin(this.#theta * 4) + this.#hoverBaselineY;
        this.#exclaimPrompt.position.y = this.#hoverOffset * Math.sin(this.#theta * 4) + this.#hoverBaselineY;
        this.#exclaimPrompt.rotation.y = this.#theta * this.#spinSpeed;

        // Reset theta if full cycle
        if (this.#theta > Math.PI * 2) this.#theta = 0;
        else this.#theta += delta;
    }

    #checkInRange(player) {
        // Check if player is in interact range
        if (ProjectWindow.isOpen()) {
            this.#exclaimPrompt.visible = false;
            this.#dotPrompt.visible = false;

        } else if (this.inRange(player)) {
            this.#exclaimPrompt.visible = true;
            this.#dotPrompt.visible = false;

        } else {
            this.#exclaimPrompt.visible = false;
            this.#dotPrompt.visible = true;
        }
    }
}