import * as THREE from 'three';

export { ClickManager }

class ClickManager {

    #arcadeScene;
    #camera;
    #raycast = new THREE.Raycaster();
    #pointPosition = new THREE.Vector2();

    constructor(scene, camera) {
        this.#arcadeScene = scene;
        this.#camera = camera;
    }

    // Expected to be called before getClickPosition and interactableClicked
    setMouseRaycast(mouseEvent) {
        this.#pointPosition.x = (mouseEvent.clientX / window.innerWidth) * 2 - 1;
        this.#pointPosition.y = -(mouseEvent.clientY / window.innerHeight) * 2 + 1;
        this.#raycast.setFromCamera(this.#pointPosition, this.#camera);
    }

    getClickPosition() {
        // Check second intersect since first will be the invisible wall of the arcade
        const intersects = this.#raycast.intersectObjects(this.#arcadeScene.children);
        let firstIntersectPoint;
        for (let i = 0; i < intersects.length; i++) {
            firstIntersectPoint = intersects[i].point; // In case click was out of bounds, still want to register some place
            if (intersects[i].object.type === "Mesh") break; // Click was in-bound, take the first thing it raycasted to
        }
        if (!firstIntersectPoint) return null;
        else return new THREE.Vector3(firstIntersectPoint.x, 0, firstIntersectPoint.z); // Removes elevation
    }

    interactableClicked() {
        const intersects = this.#raycast.intersectObjects(this.#arcadeScene.children)
        for(let i = 0; i < intersects.length; i++) {
            if (intersects[i].object.type !== "Mesh") continue;
            // (%ignore) is the clerk for some reason, don't ask me why it turned out like this
            if (intersects[i].object.name.includes("arcade") || intersects[i].object.name.includes("(%ignore)")) return true;
        }
        return false;
    }
}