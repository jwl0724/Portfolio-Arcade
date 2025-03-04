import * as THREE from "three";
import { ModelPaths } from "../modelPaths";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { ProjectWindow } from "./projectWindowClass";
import { debug } from "./arcadeClass";

export { ArcadeMachine };

class ArcadeMachine {

    // Static variables
    static #allMachines = new Array();

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
    #isInteracting = false;

    // Helper methods to check if player interacted
    static findInteractedMachine(player) {
        ArcadeMachine.#allMachines.forEach(machine => {
            if (machine.inRange(player)) return machine;
        });
        // Return null if player not in range of any machine
        return null;
    }

    constructor(projectInfo, position, rotation) {
        this.#position = position;
        this.#rotation = rotation;
        this.#projectWindow = new ProjectWindow(projectInfo);
    }

    async spawn(arcadeScene) {
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
            new THREE.Vector3(this.#position.x - 0.25, this.#position.y - 1, this.#position.z - 0.25),
            new THREE.Vector3(this.#position.x + 0.25, this.#position.y + 1, this.#position.z + 0.25)
        );

        if (debug) {
            arcadeScene.add(new THREE.Box3Helper(this.#hitbox, 0xffffff));
            arcadeScene.add(new THREE.Box3Helper(this.#interactBox, 0xffc0cb));
        }

        ArcadeMachine.#allMachines.push(this);
        this.#ready = true;
    }

    inRange(player) {
        if (!this.#ready || this.#isInteracting) return false;
        return this.#interactBox.containsPoint(player.getModel().position);
    }

    openProject() {
        this.#isInteracting = true;
        this.#projectWindow.populateWindow();
        this.#projectWindow.openWindow();
    }

    closeProject() {
        this.#isInteracting = false;
        this.#projectWindow.closeWindow();
    }
}