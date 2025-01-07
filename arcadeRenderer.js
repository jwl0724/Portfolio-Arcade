import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { buildArcade, populateArcadeDecor } from "/arcadeBuilder.js";

// Setup scene
const clock = new THREE.Clock();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 300);
const loader = new GLTFLoader();    
const mixers = new Array();

// Add lighting
let light = new THREE.AmbientLight(0xffffff, 2); // White light, with 2 intensity
scene.add(light);

// Setup renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Export important variables for building scene
export { scene, camera, renderer, loader, mixers };

// Position camera
camera.position.set(5, 3, 2);
camera.lookAt(5, 0, 2);
camera.rotateX(Math.PI / 3);

// Create the arcade
buildArcade();
populateArcadeDecor();

// Render the scene
renderer.setAnimationLoop(process);

function process() {
    // Play animations
    const delta = clock.getDelta();
    mixers.forEach(mixer => {
        mixer.update(delta)
    });

    renderer.render(scene, camera);
}
