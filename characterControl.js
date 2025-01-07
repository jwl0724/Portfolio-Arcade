import * as THREE from "three";
import { scene, camera, loader, mixers } from "/arcadeRenderer.js";
import { loadModel } from "./characterModelHandler.js";

export { instantiatePlayer }

let player = null;

function instantiatePlayer() {
    player = loadModel();
}