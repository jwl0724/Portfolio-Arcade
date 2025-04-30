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
            if (intersects[i].object.type !== "Mesh") continue;
            firstIntersectPoint = intersects[i].point;
            break;
        }
        if (!firstIntersectPoint) return this.#calculatePointAtYZero();
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

    // Gets the point in the line where Y = 0
    #calculatePointAtYZero() {
        const origin = this.#raycast.ray.origin;
        const direction = this.#raycast.ray.direction;
        // Prevent divide by 0 errors
        if (direction.y !== 0) {
            // P(t) = origin + direction * t (i.e. y = mx + b, the slope formula), solve for t when P(t) = 0
            const t = -origin.y / direction.y;
            return direction.clone().multiplyScalar(t).add(origin);
        }
        return null;
    }
}