import * as THREE from "three";

export { ShapeDrawer };

class ShapeDrawer {
    static ChatPromptWidth = 0.6;
    static ChatPromptHeight = 0.35;

    static CreateChatPromptMesh(textureMap = null) {
        // Chat box size parameters
        const radius = 0.1;

        // Draw chatbox plane
        const shape = new THREE.Shape();

        // Top left rounded corner
        shape.lineTo(0, this.ChatPromptHeight - radius);
        shape.quadraticCurveTo(0, this.ChatPromptHeight, radius, this.ChatPromptHeight);

        // Top right rounded corner
        shape.lineTo(this.ChatPromptWidth - radius, this.ChatPromptHeight);
        shape.quadraticCurveTo(this.ChatPromptWidth, this.ChatPromptHeight, this.ChatPromptWidth, this.ChatPromptHeight - radius);

        // Bottom right rounded corner
        shape.lineTo(this.ChatPromptWidth, radius);
        shape.quadraticCurveTo(this.ChatPromptWidth, 0, this.ChatPromptWidth - radius, 0);

        // Chat bubble tail
        shape.lineTo(this.ChatPromptWidth / 2 + radius / 1.5, 0);
        shape.lineTo(this.ChatPromptWidth / 2, -this.ChatPromptHeight / 3);
        shape.lineTo(this.ChatPromptWidth / 2 - radius / 1.5, 0);
        
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
}