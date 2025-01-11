import * as THREE from 'three';

export { CollisionManager };

class CollisionManager {

    #environmentHitboxes;
    #clerkClass;
    #playerClass;

    constructor() {
        this.#environmentHitboxes = new Array();
    }

    collisionProcess(delta) {
        this.#environmentHitboxes.forEach((hitbox) => {
            if (hitbox.containsPoint(this.#playerClass.getNextFramePosition(delta))) {
                console.log("Collision detected!");
                this.#playerClass.notifyCollision(true);
            } else this.#playerClass.notifyCollision(false);
        });
    }

    addPlayerClass(playerClass) {
        this.#playerClass = playerClass;
    }

    // TODO: DO NOT USE, CLERK WILL BE IMPLEMENTED WAY LATER
    addClerkClass(clerkClass) {
        this.#clerkClass = clerkClass;
    }

    addEnvironmentHitbox(hitbox) {
        this.#environmentHitboxes.push(hitbox);
    }
}