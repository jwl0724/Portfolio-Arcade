import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export { ModelTemplate };

// Intended for models that are duplicated frequently
class ModelTemplate {
    // Data members
    #modelFilePath;
    #animationClips = null;
    #scenePrototype = null;
    #placedScenes;

    constructor(modelFilePath) {
        this.#modelFilePath = modelFilePath;
        this.#placedScenes = new Array();
    }

    // Needs to be called by the user before using place
    async loadTemplate() {
        const loader = new GLTFLoader();
        const gltf = await loader.loadAsync(this.#modelFilePath);
        this.#scenePrototype = gltf.scene;
        this.#animationClips = gltf.animations ? gltf.animations : null;
    }

    place(arcadeScene, locationVector, rotationInDegrees = 0, mixerCollection = null) {
        let clone = this.#scenePrototype.clone();
        clone.position.set(locationVector.x, locationVector.y, locationVector.z);
        
        // Convert to rad because it is more familiar to work with
        const angleInRad = rotationInDegrees * Math.PI / 180;
        clone.rotateY(angleInRad);

        if (this.#animationClips && mixerCollection) {
            // Add the mixer collection to process
            const mixer = new THREE.AnimationMixer(clone);
            mixerCollection.push(mixer);
            
            // Start the looping animations (assumes constant loop animations)
            const clip = THREE.AnimationClip.findByName(this.#animationClips, "animation");
            const action = mixer.clipAction(clip);
            action.loop = THREE.LoopRepeat;

            // Offset animation by a bit to desync from shared animations
            setTimeout(() => action.play(), Math.random() * 1000 / 2);
        }
        this.#placedScenes.push(clone);
        arcadeScene.add(clone);
    }

    // TODO: DONT USE THIS, need to find some identifier to get a specific item from placed into scene
    getModel(someIdentifier) {
        return null;
    }
}