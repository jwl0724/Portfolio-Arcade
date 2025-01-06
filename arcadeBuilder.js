import * as THREE from "three";
import { loader, scene } from "/arcadeRenderer.js";
import { modelPaths } from "/modelPaths.js";
export { buildArcade, populateArcadeDecor };

function buildArcade() {    
    // Load model resources
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

function populateArcadeDecor() {
    loader.load(modelPaths.AIR_HOCKEY, (hockey) => cloneAndPlace(hockey, new THREE.Vector3(3.5, 0, -3.25)), loadHandling, errorHandling);
    
}
    
// HELPER FUNCTIONS
function cloneAndPlace(modelData, positionVector, rotationDegrees = 0) {
    let modelScene = modelData.scene.clone();
    modelScene.position.set(positionVector.x, positionVector.y, positionVector.z);
    // Convert to rad, since degrees is more familiar to work with
    const angleInRad = rotationDegrees * Math.PI / 180;
    // Will only support rotating on Y axis since all models are upright
    modelScene.rotateY(angleInRad);
    scene.add(modelScene);
}

function errorHandling(error) {
    console.error(`ERROR LOADING: ${error}`);
}

function loadHandling(loading) {
    // TODO: Sum up all of the loads for every item together to create overall loading progress bar
    console.log(`${loading.loaded / loading.total * 100}% loaded`);
}