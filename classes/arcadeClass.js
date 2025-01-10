import * as THREE from "three";
import { ModelPaths } from "../modelPaths";
import { ModelTemplate } from "./modelTemplateClass";
import { Player } from "./playerClass";
import { ProcessManager } from "./processManagerClass";
import { CameraManager } from "./cameraManagerClass";
import { CharacterModel } from "./characterModelClass";

export { Arcade };

// Only one should exists, what the script will interface with
class Arcade {

    #renderer;
    #processManager;
    #cameraManager;
    #animationMixers;
    #arcadeScene;
    #player;
    #clerk;

    constructor() {
        // Set data members
        this.#arcadeScene = new THREE.Scene();
        
        this.#cameraManager = new CameraManager(75, window.innerWidth / window.innerHeight, 0.1, 300);
        this.#animationMixers = new Array();
        
        // Setup scene properties
        this.#arcadeScene.add(new THREE.AmbientLight(0xffffe6, 2)); // Slight yellow light
        this.#renderer = new THREE.WebGLRenderer({ antialias: true });
        this.#renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.#renderer.domElement);
        
        // Set the processes
        this.#processManager = new ProcessManager(this.#renderer, () => this.#renderer.render(this.#arcadeScene, this.#cameraManager.getCamera()));
        this.#processManager.addProcess((delta) => this.#animationMixers.forEach(mixer => mixer.update(delta)));
        this.#processManager.addProcess((delta) => this.#cameraManager.cameraProcess(delta));
    }

    resizeRenderWindow(x, y) {
        this.#cameraManager.setAspectRatio(x / y);
        this.#renderer.setSize(x, y);
    }

    async buildArcade() {
        // CREATING WALLS AND FLOORS

        // Load building templates
        const floorTemplate = new ModelTemplate(ModelPaths.FLOOR);
        const wallTemplate = new ModelTemplate(ModelPaths.WALL);
        const cornerTemplate = new ModelTemplate(ModelPaths.WALL_CORNER);
        const columnTemplate = new ModelTemplate(ModelPaths.COLUMN);
        const windowTemplate = new ModelTemplate(ModelPaths.WINDOW);
        const doorTemplate = new ModelTemplate(ModelPaths.DOOR);

        await floorTemplate.loadTemplate();
        await wallTemplate.loadTemplate();
        await cornerTemplate.loadTemplate();
        await columnTemplate.loadTemplate();
        await windowTemplate.loadTemplate();
        await doorTemplate.loadTemplate();

        // Create main floor
        for(let row = 0; row < 5; row++)
            for(let col = 0; col < 10; col++)
                floorTemplate.place(this.#arcadeScene, new THREE.Vector3(col, 0, -row));
        // Create offshoot floor
        for(let row = 0; row < 2; row++)
            for(let col = 0; col < 5; col++)
                floorTemplate.place(this.#arcadeScene, new THREE.Vector3(col + 5, 0, -row - 5));
        // Create main floor back walls
        for(let i = 0; i < 4; i++) {
            if (i == 1) continue; // gap for door
            else wallTemplate.place(this.#arcadeScene, new THREE.Vector3(i + 1, 0, -4));
        }
        // Create offshoot floor back walls
        for(let i = 0; i < 3; i++) {
            if (i == 1) continue;
            else wallTemplate.place(this.#arcadeScene, new THREE.Vector3(i + 6, 0, -6));
        }
        // Create left wall
        for(let i = 0; i < 5; i++) {
            if (i == 4) wallTemplate.place(this.#arcadeScene, new THREE.Vector3(5, 0, -5), 90); // disjointed left wall
            else wallTemplate.place(this.#arcadeScene, new THREE.Vector3(0, 0, -i), 90);
        }
        // Create right wall
        for(let i = 0; i < 6; i++) {
            if (i == 2 || i == 5) continue; // Create gap for window
            else wallTemplate.place(this.#arcadeScene, new THREE.Vector3(9, 0, -i), -90);
        }
        // Fill corners of walls
        cornerTemplate.place(this.#arcadeScene, new THREE.Vector3(0, 0, -4), 90);
        cornerTemplate.place(this.#arcadeScene, new THREE.Vector3(5, 0, -6), 90);
        cornerTemplate.place(this.#arcadeScene, new THREE.Vector3(9, 0, -6));
        cornerTemplate.place(this.#arcadeScene, new THREE.Vector3(5, 0, -4), -90);
        // Place columns against wall
        columnTemplate.place(this.#arcadeScene, new THREE.Vector3(5.1, 0, -3.9));
        columnTemplate.place(this.#arcadeScene, new THREE.Vector3(0.25, 0, 0));
        columnTemplate.place(this.#arcadeScene, new THREE.Vector3(0.25, 0, -3));
        columnTemplate.place(this.#arcadeScene, new THREE.Vector3(8.75, 0, -3.9));
        columnTemplate.place(this.#arcadeScene, new THREE.Vector3(8.75, 0, 0));
        // Fill window gaps
        windowTemplate.place(this.#arcadeScene, new THREE.Vector3(9, 0, -2), -90);
        windowTemplate.place(this.#arcadeScene, new THREE.Vector3(9, 0, -5), -90);
        windowTemplate.place(this.#arcadeScene, new THREE.Vector3(7, 0, -6));
        // Create door
        doorTemplate.place(this.#arcadeScene, new THREE.Vector3(2, 0, -4));

        // ADD ARCADE DECOR TO SCENE

        // Load templates
        const hockeyTemplate = new ModelTemplate(ModelPaths.AIR_HOCKEY);
        const basketballTemplate = new ModelTemplate(ModelPaths.BASKETBALL);
        const registerTemplate = new ModelTemplate(ModelPaths.CASH_REGISTER);
        const vendingTemplate = new ModelTemplate(ModelPaths.VENDING_MACHINE);
        const danceTemplate = new ModelTemplate(ModelPaths.DANCE_MACHINE);
        const pinballTemplate = new ModelTemplate(ModelPaths.PINBALL);
        const prizesTemplate = new ModelTemplate(ModelPaths.PRIZES);
        const gambleTemplate = new ModelTemplate(ModelPaths.GAMBLING_MACHINE);
        const wheelTemplate = new ModelTemplate(ModelPaths.PRIZE_WHEEL);
        const ticketTemplate = new ModelTemplate(ModelPaths.TICKET_MACHINE);
        const clawTemplate = new ModelTemplate(ModelPaths.CLAW_MACHINE);
        const arcadeTemplate = new ModelTemplate(ModelPaths.ARCADE_MACHINE);

        await hockeyTemplate.loadTemplate();
        await basketballTemplate.loadTemplate();
        await registerTemplate.loadTemplate();
        await vendingTemplate.loadTemplate();
        await danceTemplate.loadTemplate();
        await pinballTemplate.loadTemplate();
        await prizesTemplate.loadTemplate();
        await gambleTemplate.loadTemplate();
        await wheelTemplate.loadTemplate();
        await ticketTemplate.loadTemplate();
        await clawTemplate.loadTemplate();
        await arcadeTemplate.loadTemplate();

        // Place items with no animations
        hockeyTemplate.place(this.#arcadeScene, new THREE.Vector3(3, 0, -3.25));
        basketballTemplate.place(this.#arcadeScene, new THREE.Vector3(4.5, 0, -3.25));
        registerTemplate.place(this.#arcadeScene, new THREE.Vector3(7, 0, -5));
        vendingTemplate.place(this.#arcadeScene, new THREE.Vector3(8.5, 0, -4.5), -70);
        danceTemplate.place(this.#arcadeScene, new THREE.Vector3(8, 0, 0), -90);
        danceTemplate.place(this.#arcadeScene, new THREE.Vector3(8, 0, -1), -90);
        pinballTemplate.place(this.#arcadeScene, new THREE.Vector3(8.25, 0, -2.75), -80);
        pinballTemplate.place(this.#arcadeScene, new THREE.Vector3(8.25, 0, -3.5), -100);
        prizesTemplate.place(this.#arcadeScene, new THREE.Vector3(8, 0, -5.5));
        prizesTemplate.place(this.#arcadeScene, new THREE.Vector3(6, 0, -5.5));
        for(let i = 0; i < 5; i++)
            gambleTemplate.place(this.#arcadeScene, new THREE.Vector3(0.5, 0, -i/2 - 0.5), 90);

        // Place items with animations
        wheelTemplate.place(this.#arcadeScene, new THREE.Vector3(5.5, 0, -3.5), 45, this.#animationMixers);
        ticketTemplate.place(this.#arcadeScene, new THREE.Vector3(5.55, 0, -4.88), 90, this.#animationMixers);
        ticketTemplate.place(this.#arcadeScene, new THREE.Vector3(5.55, 0, -4.35), 90, this.#animationMixers);
        clawTemplate.place(this.#arcadeScene, new THREE.Vector3(1, 0, -3.25), 90, this.#animationMixers);

        // TODO: See what projects to showcase, just populate randomly for now
        for(let i = 0; i < 6; i++) {
            arcadeTemplate.place(this.#arcadeScene, new THREE.Vector3(i * 0.7 + 2.2, 0, -1), i * 2 - 5);
            arcadeTemplate.place(this.#arcadeScene, new THREE.Vector3(i * 0.7 + 2.2, 0, -1.7), i * 2 - 185);
        }
    }

    async instantiatePlayer() {
        this.#player = new Player(new THREE.Vector3(2, 0, -3.5), 0);
        await this.#player.createPlayer(this.#arcadeScene, this.#animationMixers);
        this.#processManager.addPhysicsProcess((delta) => this.#player.playerPhysicsProcess(delta));
        this.#processManager.addProcess((delta) => this.#player.playerProcess(delta));
        this.#processManager.addInputProcess(() => this.#player.playerInputProcess());
        this.#cameraManager.setTarget(this.#player.getModel());
    }

    async instantiateClerk() {
        this.#clerk = new CharacterModel(ModelPaths.EMPLOYEE);
        await this.#clerk.loadModel(this.#arcadeScene, this.#animationMixers);
        this.#clerk.setPosition(7, 0, -5.5);
    }
}