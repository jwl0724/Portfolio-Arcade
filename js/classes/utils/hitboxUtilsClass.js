import * as THREE from "three";

export { HitboxUtils }

class HitboxUtils {

    static createScaledHitbox(originalHitbox, scale) {
        const center = originalHitbox.getCenter(new THREE.Vector3());
        const size = originalHitbox.getSize(new THREE.Vector3());
        size.multiplyScalar(scale);
        return new THREE.Box3().setFromCenterAndSize(center, size);
    }
}