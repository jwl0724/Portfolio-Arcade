import * as THREE from "three";
import { loader, scene, mixers } from "/arcadeRenderer.js";
import { modelPaths } from "/modelPaths.js";
export { buildArcade, populateArcadeDecor };

// Builds the room itself
function buildArcade() {    
    let totalLoad = 0, loaded = 0 // TODO: Find how to calculate cumulative loading and display it

    // Create flooring
    loader.load(modelPaths.FLOOR, 
        (floor) => {
            // Once loaded
            // Create main floor
            for(let col = 0; col < 5; col++) {
                for(let row = 0; row < 10; row++) cloneAndPlace(floor, new THREE.Vector3(row, 0, -col));
            }
            // Create offshoot floor
            for(let col = 0; col < 2; col++) {
                for(let row = 0; row < 5; row++) cloneAndPlace(floor, new THREE.Vector3(row + 5, 0, -col - 5));
            }
        }, loadHandling, errorHandling
    );

    // Create walls
    loader.load(modelPaths.WALL,
        (wall) => {
            // Create main floor back walls
            for(let i = 0; i < 4; i++) {
                if (i == 1) continue; // Make gap for door
                else cloneAndPlace(wall, new THREE.Vector3(i + 1, 0, -4));
            }
            // Create offshoot floor back walls
            for(let i = 0; i < 3; i++) {
                if (i == 1) continue; // make gap for window
                else cloneAndPlace(wall, new THREE.Vector3(i + 6, 0, -6));
            }
            // Create left wall
            for(let i = 0; i < 5; i++) {
                if (i == 4) cloneAndPlace(wall, new THREE.Vector3(5, 0, -5), 90) // Add disjointed left wall
                else cloneAndPlace(wall, new THREE.Vector3(0, 0, -i), 90);
            }
            // Create right wall
            for(let i = 0; i < 6; i++) {
                if (i == 2 || i == 5) continue; // Create gap for window
                else cloneAndPlace(wall, new THREE.Vector3(9, 0, -i), -90);
            }
        }, loadHandling, errorHandling
    );

    // Create wall corners
    loader.load(modelPaths.WALL_CORNER,
        (corner) => {
            // Fill corners of walls
            cloneAndPlace(corner, new THREE.Vector3(0, 0, -4), 90);
            cloneAndPlace(corner, new THREE.Vector3(5, 0, -6), 90);
            cloneAndPlace(corner, new THREE.Vector3(9, 0, -6));
            cloneAndPlace(corner, new THREE.Vector3(5, 0, -4), -90);
            
        }, loadHandling, errorHandling
    );

    // Create random columns against wall
    loader.load(modelPaths.COLUMN,
        (column) => {
            cloneAndPlace(column, new THREE.Vector3(5.1, 0, -3.9));
            cloneAndPlace(column, new THREE.Vector3(0.25, 0, 0));
            cloneAndPlace(column, new THREE.Vector3(0.25, 0, -3));
            cloneAndPlace(column, new THREE.Vector3(8.75, 0, -3.9));
            cloneAndPlace(column, new THREE.Vector3(8.75, 0, 0));

        }, loadHandling, errorHandling
    );

    // Create windows
    loader.load(modelPaths.WINDOW, 
        (window) => {
            cloneAndPlace(window, new THREE.Vector3(9, 0, -2), -90);
            cloneAndPlace(window, new THREE.Vector3(9, 0, -5), -90);
            cloneAndPlace(window, new THREE.Vector3(7, 0, -6));

    }, loadHandling, errorHandling);

    // Create door
    loader.load(modelPaths.DOOR, (door) => cloneAndPlace(door, new THREE.Vector3(2, 0, -4)), loadHandling, errorHandling);
}

// Adds the decor to the room
function populateArcadeDecor() {
    // Static items with no animations
    loader.load(modelPaths.AIR_HOCKEY, (hockey) => cloneAndPlace(hockey, new THREE.Vector3(3, 0, -3.25)), loadHandling, errorHandling);
    loader.load(modelPaths.BASKETBALL, (basketball) => cloneAndPlace(basketball, new THREE.Vector3(4.5, 0, -3.25)), loadHandling, errorHandling);
    loader.load(modelPaths.CASH_REGISTER, (cash) => cloneAndPlace(cash, new THREE.Vector3(7, 0, -5)), loadHandling, errorHandling);
    loader.load(modelPaths.VENDING_MACHINE, (vending) => cloneAndPlace(vending, new THREE.Vector3(8.5, 0, -4.5), -70), loadHandling, errorHandling);
    loader.load(modelPaths.DANCE_MACHINE, (dance) => {
        cloneAndPlace(dance, new THREE.Vector3(8, 0, 0), -90);
        cloneAndPlace(dance, new THREE.Vector3(8, 0, -1), -90);
    }, loadHandling, errorHandling);
    loader.load(modelPaths.PINBALL, (pinball) => {
        cloneAndPlace(pinball, new THREE.Vector3(8.25, 0, -2.75), -80);
        cloneAndPlace(pinball, new THREE.Vector3(8.25, 0, -3.5), -100);
    }, loadHandling, errorHandling);
    loader.load(modelPaths.PRIZES, (prizes) => {
        cloneAndPlace(prizes, new THREE.Vector3(8, 0, -5.5));
        cloneAndPlace(prizes, new THREE.Vector3(6, 0, -5.5));
    }, loadHandling, errorHandling);
    for(let i = 0; i < 5; i++)
        loader.load(modelPaths.GAMBLING_MACHINE, (gamble) => cloneAndPlace(gamble, new THREE.Vector3(0.5, 0, -i / 2 - 0.5), 90), loadHandling, errorHandling);
    
    // Items with animations
    loader.load(modelPaths.PRIZE_WHEEL, (wheel) => {
        const placedWheel = cloneAndPlace(wheel, new THREE.Vector3(5.5, 0, -3.5), 45);
        startLoopingAnimations(wheel, placedWheel, "animation");
    }, loadHandling, errorHandling);
    loader.load(modelPaths.TICKET_MACHINE, (ticket) => {
        const placed1 = cloneAndPlace(ticket, new THREE.Vector3(5.55, 0, -4.88), 90);
        const placed2 = cloneAndPlace(ticket, new THREE.Vector3(5.55, 0, -4.35), 90)
        startLoopingAnimations(ticket, placed1, "animation");
        startLoopingAnimations(ticket, placed2, "animation", 0.15);
    }, loadHandling, errorHandling);
    loader.load(modelPaths.CLAW_MACHINE, (claw) => {
        const placedClaw = cloneAndPlace(claw, new THREE.Vector3(1, 0, -3.25), 45);
        startLoopingAnimations(claw, placedClaw, "animation");
    }, loadHandling, errorHandling);

    // Populating arcade machines, will depend on how many games showcased
    // TODO: See what projects to showcase, for now populate the arcade with the machines
    for(let i = 0; i < 6; i++) {
        loader.load(modelPaths.ARCADE_MACHINE, (arcade) => cloneAndPlace(arcade, new THREE.Vector3(i * 0.7 + 2.2, 0, -1), i * 2 - 5), loadHandling, errorHandling);    
        loader.load(modelPaths.ARCADE_MACHINE, (arcade) => cloneAndPlace(arcade, new THREE.Vector3(i * 0.7 + 2.2, 0, -1.7), i * 2 - 185), loadHandling, errorHandling);    
    }
}
    
// HELPER FUNCTIONS
function cloneAndPlace(modelData, positionVector, rotationDegrees = 0) {
    let sceneClone = modelData.scene.clone();
    sceneClone.position.set(positionVector.x, positionVector.y, positionVector.z);

    // Convert to rad, since degrees is more familiar to work with
    const angleInRad = rotationDegrees * Math.PI / 180;
    
    // Will only support rotating on Y axis since all models are upright
    sceneClone.rotateY(angleInRad);
    scene.add(sceneClone);
    return sceneClone;
}

// Assumes models will have animations (check glb files before usage)
function startLoopingAnimations(modelData, placedModel, animationName, delaySeconds = 0) {
    // Add mixer to mixers for render to update once placed
    const mixer = new THREE.AnimationMixer(placedModel);
    mixers.push(mixer);

    // Find the animation and play it
    const clip = THREE.AnimationClip.findByName(modelData.animations, animationName);
    const action = mixer.clipAction(clip);
    action.loop = THREE.LoopRepeat;

    // Account for delay parameter
    if (delaySeconds > 0) {
        setTimeout(() => action.play(), delaySeconds * 1000);
    } else action.play();
}

function errorHandling(error) {
    console.error(`ERROR LOADING: ${error}`);
}

function loadHandling(loading) {
    // TODO: Sum up all of the loads for every item together to create overall loading progress bar
    console.log(`${loading.loaded / loading.total * 100}% loaded`);
}