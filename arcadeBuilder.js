import { loader, scene } from "/arcadeRenderer.js";
import { modelPaths } from "/modelPaths.js";
export { buildArcade };

function buildArcade() {    
    // Load model resources
    let totalLoad = 0, loaded = 0 // TODO: Find how to calculate cumulative loading and display it

    // Create flooring
    loader.load(modelPaths.FLOOR, 
        function(floor) {
            // Once loaded
            // Create main floor
            for(let col = 0; col < 5; col++) {
                for(let row = 0; row < 10; row++) {
                    const floorScene = floor.scene.clone();
                    floorScene.position.set(row, 0, -col);
                    scene.add(floorScene);
                }
            }
            // Create offshoot floor
            for(let col = 0; col < 2; col++) {
                for(let row = 0; row < 5; row++) {
                    const floorScene = floor.scene.clone();
                    floorScene.position.set(row + 5, 0, -col - 5);
                    scene.add(floorScene);
                }
            }
        }, loadHandling, errorHandling);

    // Create walls
    loader.load(modelPaths.WALL,
        function(wall) {
            // Create main floor back walls
            for(let i = 0; i < 4; i++) {
                if (i == 1) continue; // make a gap for a door
                const wallScene = wall.scene.clone();
                wallScene.position.set(i + 1, 0, -4);
                scene.add(wallScene);
            }
            // Create offshoot floor back walls
            for(let i = 0; i < 3; i++) {
                if (i == 1) continue; // make gap for window
                const wallScene = wall.scene.clone();
                wallScene.position.set(i + 6, 0, -6);
                scene.add(wallScene);
            }
            // Create left wall
            for(let i = 0; i < 5; i++) {
                const wallScene = wall.scene.clone();
                if (i == 4) wallScene.position.set(5, 0, -5); // Special case where need to set offshoot left wall
                else wallScene.position.set(0, 0, -i);
                wallScene.rotateY(Math.PI / 2);
                scene.add(wallScene);
            }
            // Create right wall
            for(let i = 0; i < 6; i++) {
                const wallScene = wall.scene.clone();
                if (i == 2 || i == 5) continue; // Make gap for window
                wallScene.position.set(9, 0, -i);
                wallScene.rotateY(-Math.PI / 2);
                scene.add(wallScene);
            }
        }, loadHandling, errorHandling
    );
    // Create wall corners
    loader.load(modelPaths.WALL_CORNER,
        function (corner) {
            // Fill corners of walls
            let cornerScene = corner.scene.clone();
            cornerScene.position.set(0, 0, -4);
            cornerScene.rotateY(Math.PI / 2);
            scene.add(cornerScene);
            
            cornerScene = corner.scene.clone();
            cornerScene.position.set(5, 0, -6);
            cornerScene.rotateY(Math.PI / 2);
            scene.add(cornerScene);

            cornerScene = corner.scene.clone();
            cornerScene.position.set(9, 0, -6);
            scene.add(cornerScene);

            cornerScene = corner.scene.clone();
            cornerScene.position.set(5, 0, -4);
            cornerScene.rotateY(-Math.PI / 2);
            scene.add(cornerScene);

        }, loadHandling, errorHandling
    );
    loader.load(modelPaths.COLUMN,
        function (column) {
            // Add columns to wall semi-randomly
            let columnScene = column.scene.clone();
            columnScene.position.set(5.1, 0, -3.9);
            scene.add(columnScene);
            
            columnScene = column.scene.clone();
            columnScene.position.set(0.25, 0, 0);
            scene.add(columnScene);

            columnScene = column.scene.clone();
            columnScene.position.set(0.25, 0, -3);
            scene.add(columnScene);

            columnScene = column.scene.clone();
            columnScene.position.set(8.75, 0, -3.9);
            scene.add(columnScene);

            columnScene = column.scene.clone();
            columnScene.position.set(8.75, 0, 0);
            scene.add(columnScene);
        }, loadHandling, errorHandling
    );
    // Create window
    loader.load(modelPaths.WINDOW, function(window) {
        let windowScene = window.scene.clone();
        windowScene.position.set(9, 0, -2);
        windowScene.rotateY(-Math.PI / 2);
        scene.add(windowScene);

        windowScene = window.scene.clone();
        windowScene.position.set(9, 0, -5);
        windowScene.rotateY(-Math.PI / 2);
        scene.add(windowScene);

        windowScene = window.scene.clone();
        windowScene.position.set(7, 0, -6);
        scene.add(windowScene);

    }, loadHandling, errorHandling);
    // Create door
    loader.load(modelPaths.DOOR, function(door) {
        let doorScene = door.scene.clone();
        doorScene.position.set(2, 0, -4);
        scene.add(doorScene);

    }, loadHandling, errorHandling)
}
    
function errorHandling(error) {
    console.error(`ERROR LOADING: ${error}`);
}

function loadHandling(loading) {
    // TODO: Sum up all of the loads for every item together to create overall loading progress bar
    console.log(`${loading.loaded / loading.total * 100}% loaded`);
}