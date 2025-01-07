import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { scene, camera, loader, mixers } from "/arcadeRenderer.js";
import { loadModel } from "./clerkModelHandler.js";

export { instantiateClerk };

function instantiateClerk() {
    loadModel();
}