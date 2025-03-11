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

    getClickPosition(mouseEvent) {

        this.#pointPosition.x = (mouseEvent.clientX / window.innerWidth) * 2 - 1;
        this.#pointPosition.y = -(mouseEvent.clientY / window.innerHeight) * 2 + 1;

        this.#raycast.setFromCamera(this.#pointPosition, this.#camera);

        // Check second intersect since first will be the invisible wall of the arcade
        const intersects = this.#raycast.intersectObjects(this.#arcadeScene.children)
        let firstIntersectPoint;
        for (let i = 0; i < intersects.length; i++) {
            if(intersects[i].object.type === "Box3Helper") continue;
            firstIntersectPoint = intersects[i].point;
            break;
        }
        if (!firstIntersectPoint) return null;
        else return new THREE.Vector3(firstIntersectPoint.x, 0, firstIntersectPoint.z); // Removes elevation
    }
}