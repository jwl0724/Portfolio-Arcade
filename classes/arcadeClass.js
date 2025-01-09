import * as THREE from "three";
import { ModelPaths } from "../modelPaths";
import { ModelTemplate } from "./modelTemplateClass";
import { Player } from "./playerClass";
import { ProcessManager } from "./processManagerClass";
import { CameraManager } from "./cameraManagerClass";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export { Arcade };

// Only one should exists, what the script will interface with
class Arcade {

    #renderer;
    #clock;
    #processManager;
    #cameraManager;
    #animationMixers;
    #arcadeScene;

    constructor() {
        // Set data members
        this.#processManager = new ProcessManager();
        this.#arcadeScene = new THREE.Scene();
        this.#clock = new THREE.Clock();

        this.#cameraManager = new CameraManager(75, window.innerWidth / window.innerHeight, 0.1, 300);
        this.#animationMixers = new Array();

        // Setup scene properties
        this.#arcadeScene.add(new THREE.AmbientLight(0xffffe6, 2)); // Slight yellow light
        this.#renderer = new THREE.WebGLRenderer({ antialias: true });
        this.#renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.#renderer.domElement);
        
        // Set the processes
        this.#renderer.setAnimationLoop(() => this.#doProcesses());
    }

    resizeRenderWindow(x, y) {
        render.setSize(x, y);
    }

    #doProcesses() {
        const delta = this.#clock.getDelta();
        this.#processManager.processInput();
        this.#processManager.process(delta);
        this.#processManager.addPhysicsProcess(delta);
        this.#renderer.render(this.#arcadeScene, this.#cameraManager.getCamera());
    }

    async buildArcade() {
        // CREATING WALLS AND FLOORS
        const floorTemplate = new ModelTemplate(ModelPaths.FLOOR);
        await floorTemplate.loadTemplate();
        for(let row = 0; row < 5; row++)
            for(let col = 0; col < 10; col++)
                floorTemplate.place(this.#arcadeScene, new THREE.Vector3(col, 0, -row));
    }
}