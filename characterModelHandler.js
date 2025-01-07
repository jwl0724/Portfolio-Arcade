import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { scene, camera, loader, mixers } from "/arcadeRenderer.js";
import { modelPaths } from "/modelPaths.js";

export { loadModel };

function loadModel() {
    // TODO: Refactor to move loading code into separate file
    loader.load(modelPaths.PLAYER, (player) => {
            const playerScene = player.scene;
            playerScene.position.set(2, 0, -3.5);
            startLoopingAnimations(player, playerScene, "idle");
            scene.add(playerScene);
            
            // TODO: MOVE THIS SOMEWHERE ELSE FOR THE LOVE OF GOD
            document.addEventListener("keydown", (event) => {
                switch (event.key) {
                    case "w":
                        playerScene.position.z -= 0.05;
                        break;
                    case "a":
                        playerScene.position.x -= 0.05;
                        break;
                    case "s":
                        playerScene.position.z += 0.05;
                        break;
                    case "d":
                        playerScene.position.x += 0.05;
                        break;
                }
            });

            // TODO: SAME HERE MOVE THIS SOMEWHERE ELSE, JUST HERE FOR PROOF OF WORK
            document.addEventListener("keyup", (event) => {
                switch (event.key) {
                    case "w":
                        playerScene.position.z -= 0;
                        break;
                    case "a":
                        playerScene.position.x -= 0;
                        break;
                    case "s":
                        playerScene.position.z += 0;
                        break;
                    case "d":
                        playerScene.position.x += 0;
                        break;
                }
            });
        }, undefined, undefined);
}

// TODO: OH GOD FIX THIS BY MOVING IT SOMEWHERE ELSE
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