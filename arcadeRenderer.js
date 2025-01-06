import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { buildArcade } from "/arcadeBuilder.js";

// Setup scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 300);
const loader = new GLTFLoader();    

// Add lighting
let light = new THREE.AmbientLight(0xffffff, 2); // White light, with 2 intensity
scene.add(light);

// Setup renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Export important variables for building scene
export { scene, camera, renderer, loader };

// Position camera
camera.position.set(4, 5, -2);
camera.lookAt(4,0,-2);

// Create the arcade
buildArcade();

// Render the scene
renderer.setAnimationLoop(process);

function process() {
    renderer.render(scene, camera);
}
