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
        const playerNextPosition = this.#playerClass.getNextFramePosition(delta);
        for(let i = 0; i < this.#environmentHitboxes.length; i++) {
            if (this.#environmentHitboxes[i].containsPoint(playerNextPosition)) {
                this.#playerClass.notifyCollision(this.#environmentHitboxes[i]);
                collision = true;
                break;
            }
        }
        if (!collision) this.#playerClass.notifyCollision(null);
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