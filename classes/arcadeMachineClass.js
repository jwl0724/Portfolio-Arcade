import * as THREE from "three";
import { ModelPaths } from "../modelPaths";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { ProjectWindow } from "./projectWindowClass";
import { debug } from "./arcadeClass";

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

    // Running variables
    #ready = false;

    // Helper methods to check if player interacted
    static findInteractedMachine(player) {
        for(let i = 0; i < ArcadeMachine.#allMachines.length; i++) {
            if (ArcadeMachine.#allMachines[i].inRange(player))
                return ArcadeMachine.#allMachines[i];
        }
        return null;
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
        // TODO: May need to re-factor to use a point in front of player, instead of middle point of where player is
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
}