import * as THREE from "three";
import { ModelPaths } from "../modelPaths";
import { ModelTemplate } from "./model_wrappers/modelTemplateClass";
import { Player } from "./entities/playerClass";
import { Clerk } from "./entities/clerkClass";
import { ArcadeMachine } from "./entities/arcadeMachineClass";
import { Projects } from "../../text/projects";

export { ArcadeBuilder };

// Only one should exists, what the script will interface with
class ArcadeBuilder {

    static async buildArcade(scene, collisionManager, animationMixers) {
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
                floorTemplate.place(scene, new THREE.Vector3(col, 0, -row));
        // Create offshoot floor
        for(let row = 0; row < 2; row++)
            for(let col = 0; col < 5; col++)
                floorTemplate.place(scene, new THREE.Vector3(col + 5, 0, -row - 5));
        // Create main floor back walls
        for(let i = 0; i < 4; i++) {
            if (i == 1) continue; // gap for door
            else wallTemplate.place(scene, new THREE.Vector3(i + 1, 0, -4));
        }
        // Create offshoot floor back walls
        for(let i = 0; i < 3; i++) {
            if (i == 1) continue;
            else wallTemplate.place(scene, new THREE.Vector3(i + 6, 0, -6));
        }
        // Create left wall
        for(let i = 0; i < 5; i++) {
            if (i == 4) wallTemplate.place(scene, new THREE.Vector3(5, 0, -5), 90); // disjointed left wall
            else wallTemplate.place(scene, new THREE.Vector3(0, 0, -i), 90);
        }
        // Create right wall
        for(let i = 0; i < 6; i++) {
            if (i == 2 || i == 5) continue; // Create gap for window
            else wallTemplate.place(scene, new THREE.Vector3(9, 0, -i), -90);
        }
        // Fill corners of walls
        cornerTemplate.place(scene, new THREE.Vector3(0, 0, -4), 90);
        cornerTemplate.place(scene, new THREE.Vector3(5, 0, -6), 90);
        cornerTemplate.place(scene, new THREE.Vector3(9, 0, -6));
        cornerTemplate.place(scene, new THREE.Vector3(5, 0, -4), -90);
        // Place columns against wall
        columnTemplate.place(scene, new THREE.Vector3(5.1, 0, -3.9));
        columnTemplate.place(scene, new THREE.Vector3(0.25, 0, 0));
        columnTemplate.place(scene, new THREE.Vector3(0.25, 0, -3));
        columnTemplate.place(scene, new THREE.Vector3(8.75, 0, -3.9));
        columnTemplate.place(scene, new THREE.Vector3(8.75, 0, 0));
        // Fill window gaps
        windowTemplate.place(scene, new THREE.Vector3(9, 0, -2), -90);
        windowTemplate.place(scene, new THREE.Vector3(9, 0, -5), -90);
        windowTemplate.place(scene, new THREE.Vector3(7, 0, -6));
        // Create door
        doorTemplate.place(scene, new THREE.Vector3(2, 0, -4));

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

        // Place items with no animations
        hockeyTemplate.place(scene, new THREE.Vector3(3, 0, -3.25));
        basketballTemplate.place(scene, new THREE.Vector3(4.5, 0, -3.25));
        registerTemplate.place(scene, new THREE.Vector3(7, 0, -5));
        vendingTemplate.place(scene, new THREE.Vector3(8.5, 0, -4.5), -70);
        danceTemplate.place(scene, new THREE.Vector3(8, 0, 0), -90);
        danceTemplate.place(scene, new THREE.Vector3(8, 0, -1), -90);
        pinballTemplate.place(scene, new THREE.Vector3(8.25, 0, -2.75), -80);
        pinballTemplate.place(scene, new THREE.Vector3(8.25, 0, -3.5), -100);
        prizesTemplate.place(scene, new THREE.Vector3(8, 0, -5.5));
        prizesTemplate.place(scene, new THREE.Vector3(6, 0, -5.5));
        for(let i = 0; i < 5; i++)
            gambleTemplate.place(scene, new THREE.Vector3(0.5, 0, -i/2 - 0.5), 90);

        // Place items with animations
        wheelTemplate.place(scene, new THREE.Vector3(5.5, 0, -3.5), 45, animationMixers);
        ticketTemplate.place(scene, new THREE.Vector3(5.55, 0, -4.88), 90, animationMixers);
        ticketTemplate.place(scene, new THREE.Vector3(5.55, 0, -4.35), 90, animationMixers);
        clawTemplate.place(scene, new THREE.Vector3(1, 0, -3.25), 90, animationMixers);

        // Add hitboxes to collision manager
        wallTemplate.getBoundingBoxes().forEach(hitbox => collisionManager.addEnvironmentHitbox(hitbox));
        cornerTemplate.getBoundingBoxes().forEach(hitbox => collisionManager.addEnvironmentHitbox(hitbox));
        columnTemplate.getBoundingBoxes().forEach(hitbox => collisionManager.addEnvironmentHitbox(hitbox));
        windowTemplate.getBoundingBoxes().forEach(hitbox => collisionManager.addEnvironmentHitbox(hitbox));
        doorTemplate.getBoundingBoxes().forEach(hitbox => collisionManager.addEnvironmentHitbox(hitbox));
        hockeyTemplate.getBoundingBoxes().forEach(hitbox => collisionManager.addEnvironmentHitbox(hitbox));
        basketballTemplate.getBoundingBoxes().forEach(hitbox => collisionManager.addEnvironmentHitbox(hitbox));
        registerTemplate.getBoundingBoxes().forEach(hitbox => collisionManager.addEnvironmentHitbox(hitbox));
        vendingTemplate.getBoundingBoxes().forEach(hitbox => collisionManager.addEnvironmentHitbox(hitbox));
        danceTemplate.getBoundingBoxes().forEach(hitbox => collisionManager.addEnvironmentHitbox(hitbox));
        pinballTemplate.getBoundingBoxes().forEach(hitbox => collisionManager.addEnvironmentHitbox(hitbox));
        prizesTemplate.getBoundingBoxes().forEach(hitbox => collisionManager.addEnvironmentHitbox(hitbox));
        gambleTemplate.getBoundingBoxes().forEach(hitbox => collisionManager.addEnvironmentHitbox(hitbox));
        wheelTemplate.getBoundingBoxes().forEach(hitbox => collisionManager.addEnvironmentHitbox(hitbox));
        ticketTemplate.getBoundingBoxes().forEach(hitbox => collisionManager.addEnvironmentHitbox(hitbox));
        clawTemplate.getBoundingBoxes().forEach(hitbox => collisionManager.addEnvironmentHitbox(hitbox));

        // Add boundary wall at bottom of arcade
        const bottomBounds = new THREE.Box3(new THREE.Vector3(0, 0, 0.4), new THREE.Vector3(9, 5, 2));
        collisionManager.addEnvironmentHitbox(bottomBounds);
    }

    // Any updates to projects should be isolated to only here
    static async placeProjects(scene, collisionManager) {
        const terrainSimProject = new ArcadeMachine(Projects.TERRAIN_GENERATOR_SIMULATOR,
            new THREE.Vector3(2, 0, -0.5), 1);
        const duckHuntAtHome = new ArcadeMachine(Projects.DUCK_HUNT_AT_HOME,
            new THREE.Vector3(2.6, 0, -0.5), -1);
        const PAWsitive = new ArcadeMachine(Projects.PAWSITIVE,
            new THREE.Vector3(3.2, 0, -0.5), 0);
        const swing = new ArcadeMachine(Projects.SWING,
            new THREE.Vector3(3.8, 0, -0.5), -1);
        const touhouAtHome = new ArcadeMachine(Projects.TOUHOU_AT_HOME,
            new THREE.Vector3(4.4, 0, -0.5), 1);
        const zoomToHome = new ArcadeMachine(Projects.ZOOM_TO_HOME,
            new THREE.Vector3(1.8, 0, -2), -1);
        const spinTheBarrel = new ArcadeMachine(Projects.SPIN_THE_BARREL,
            new THREE.Vector3(2.4, 0, -2), 1);
        const aiGamer = new ArcadeMachine(Projects.AI_GAMER,
            new THREE.Vector3(3, 0, -2), -1);

        // Put arcade machine onto scene
        terrainSimProject.spawn(scene, collisionManager);
        duckHuntAtHome.spawn(scene, collisionManager);
        PAWsitive.spawn(scene, collisionManager);
        swing.spawn(scene, collisionManager);
        touhouAtHome.spawn(scene, collisionManager);
        zoomToHome.spawn(scene, collisionManager);
        spinTheBarrel.spawn(scene, collisionManager);
        aiGamer.spawn(scene, collisionManager);
    }

    static async buildPlayer(scene, animationMixers, inputManager) {
        const player = new Player(new THREE.Vector3(2, 0, -3.25), inputManager);
        await player.createPlayer(scene, animationMixers);
        return player;
    }

    static async buildClerk(scene, animationMixers, inputManager) {
        const clerk = new Clerk(new THREE.Vector3(7, 0, -5.5), inputManager);
        await clerk.createClerk(scene, animationMixers);
        return clerk;
    }
}