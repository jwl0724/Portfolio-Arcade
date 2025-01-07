import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { scene, camera, loader, mixers, clerk as clerkRef } from "/arcadeRenderer.js";
import { modelPaths } from "/modelPaths.js";

export { loadModel };

function loadModel() {
    // TODO: Refactor to move loading code into separate file
    loader.load(modelPaths.EMPLOYEE, (employee) => {
            const employeeScene = employee.scene;
            employeeScene.position.set(7, 0, -5.5);
            startLoopingAnimations(employee, employeeScene, "idle");
            scene.add(employeeScene);
            clerkRef = employeeScene;
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