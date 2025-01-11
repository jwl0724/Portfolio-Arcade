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
        let collision = false;
        for(let i = 0; i < this.#environmentHitboxes.length; i++) {
            if (this.#environmentHitboxes[i].containsPoint(this.#playerClass.getNextFramePosition(delta))) {
                this.#playerClass.notifyCollision(true);
                collision = true;
                break;
            }
        }
        if (!collision) this.#playerClass.notifyCollision(false);
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