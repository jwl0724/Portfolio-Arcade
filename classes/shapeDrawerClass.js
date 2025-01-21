import * as THREE from "three";

export { ShapeDrawer };

class ShapeDrawer {
    static interactPromptWidth = 0.6;
    static interactPromptHeight = 0.35;
    static interactPromptWidth = this.interactPromptWidth / 3;
    static interactPromptHeight = this.interactPromptHeight / 2;

    static createChatPromptMesh(textureMap = null) {
        // Chat box size parameters
        const radius = 0.1;

        // Draw chatbox plane
        const shape = new THREE.Shape();

        // Top left rounded corner
        shape.lineTo(0, this.interactPromptHeight - radius);
        shape.quadraticCurveTo(0, this.interactPromptHeight, radius, this.interactPromptHeight);

        // Top right rounded corner
        shape.lineTo(this.interactPromptWidth - radius, this.interactPromptHeight);
        shape.quadraticCurveTo(this.interactPromptWidth, this.interactPromptHeight, this.interactPromptWidth, this.interactPromptHeight - radius);

        // Bottom right rounded corner
        shape.lineTo(this.interactPromptWidth, radius);
        shape.quadraticCurveTo(this.interactPromptWidth, 0, this.interactPromptWidth - radius, 0);

        // Chat bubble tail
        shape.lineTo(this.interactPromptWidth / 2 + radius / 1.5, 0);
        shape.lineTo(this.interactPromptWidth / 2, -this.interactPromptHeight / 3);
        shape.lineTo(this.interactPromptWidth / 2 - radius / 1.5, 0);
        
        // Bottom left rounded corner
        shape.lineTo(radius, 0);
        shape.quadraticCurveTo(0, 0, 0, radius);

        // Create the plane mesh
        const geometry = new THREE.ShapeGeometry( shape );
        let material;
        if (textureMap) material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, map: textureMap });
        else material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        return new THREE.Mesh(geometry, material);
    }

    static createInteractPromptBox() {
        // Chat box size parameters
        const radius = 0.075;

        // Draw chatbox plane
        const shape = new THREE.Shape();

        // Top left rounded corner
        shape.lineTo(0, this.interactPromptHeight - radius);
        shape.quadraticCurveTo(0, this.interactPromptHeight, radius, this.interactPromptHeight);

        // Top right rounded corner
        shape.lineTo(this.interactPromptWidth - radius, this.interactPromptHeight);
        shape.quadraticCurveTo(this.interactPromptWidth, this.interactPromptHeight, this.interactPromptWidth, this.interactPromptHeight - radius);

        // Bottom right rounded corner
        shape.lineTo(this.interactPromptWidth, radius);
        shape.quadraticCurveTo(this.interactPromptWidth, 0, this.interactPromptWidth - radius, 0);
        
        // Bottom left rounded corner
        shape.lineTo(radius, 0);
        shape.quadraticCurveTo(0, 0, 0, radius);

        // Create the plane mesh
        const geometry = new THREE.ShapeGeometry( shape );
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        return new THREE.Mesh(geometry, material);
    } 
}