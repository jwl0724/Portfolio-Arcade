export { CollisionManager };

class CollisionManager {

    #environmentHitboxes;
    #clerkClass;
    #playerClass;

    constructor() {
        this.#environmentHitboxes = new Array();
    }

    collisionProcess(delta) {
        console.log(this.#playerClass.getCollisionHitBox());
        this.#environmentHitboxes.forEach((hitbox) => {
            if (hitbox.intersectsBox(this.#playerClass.getCollisionHitBox())) {
                console.log("Collision detected!");
                this.#playerClass.undoMovement();
            }
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