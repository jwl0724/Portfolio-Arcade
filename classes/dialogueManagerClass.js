import * as THREE from "three";

export { DialogueManager };

// font family to use: Marker Felt, fantasy

class DialogueManager {

    #arcadeScene;
    #responseBoxes;
    #textbox;

    constructor(scene) {
        this.#arcadeScene = scene;
        this.#responseBoxes = new Array();
        
        // Create text box
        // this.#textbox = new THREE.Mesh(new THREE.PlaneGeometry(5, 1), new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide })); 
    }

    createTextbox(text, camera) {
        // Create the text box
        const geometry = new THREE.PlaneGeometry(5, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
        this.#textbox = new THREE.Mesh(geometry, material);
        this.#textbox.position.set(0, 1, -2);
        this.#arcadeScene.add(this.#textbox);

        // Create the text
        const loader = new THREE.FontLoader();
        loader.load("fonts/helvetiker_regular.typeface.json", (font) => {
            const geometry = new THREE.TextGeometry(text, {
                font: font,
                size: 0.1,
                height: 0.01
            });
            const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
            const textMesh = new THREE.Mesh(geometry, material);
            textMesh.position.set(-2.5, -0.25, -1.9);
            this.#arcadeScene.add(textMesh);
        });
    }
}