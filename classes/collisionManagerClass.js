import * as THREE from 'three';

export { CollisionManager };

class CollisionManager {

    // Static constants
    static collisionThreshold = 0.05;

    #environmentHitboxes;
    #playerClass;

    constructor() {
        this.#environmentHitboxes = new Array();
    }

    collisionProcess(delta) {
        if (!this.#playerClass.getHitbox()) return; // Player hitbox loads one frame after, needs check to prevent premature running

        // Test if collision in next frame
        const currentPosition = this.#playerClass.getPosition();
        this.#playerClass.setPosition(this.#playerClass.getNextFramePosition(delta));
        const playerHitbox = this.#playerClass.getHitbox();        
        this.#environmentHitboxes.forEach(hitbox => {
            if (hitbox.intersectsBox(playerHitbox)) this.#playerClass.notifyCollision(hitbox);
        });
        // Put player back to original position
        this.#playerClass.setPosition(currentPosition);

        // let collision = false;
        // const playerNextPosition = this.#playerClass.getNextFramePosition(delta);
        // for(let i = 0; i < this.#environmentHitboxes.length; i++) {
        //     if (this.#environmentHitboxes[i].containsPoint(playerNextPosition)) {
        //         this.#playerClass.notifyCollision(this.#environmentHitboxes[i]);
        //         collision = true;
        //     }
        // }
        // if (!collision) this.#playerClass.notifyCollision(null);
    }

    addPlayerClass(playerClass) {
        this.#playerClass = playerClass;
    }

    addEnvironmentHitbox(hitbox) {
        this.#environmentHitboxes.push(hitbox);
    }
}