import * as THREE from "three";

export { ShapeDrawer };

class ShapeDrawer {
    static chatPromptWidth = 0.6;
    static chatPromptHeight = 0.35;
    static interactPromptWidth = this.chatPromptWidth / 3;
    static interactPromptHeight = this.chatPromptHeight / 2;

    static projectPromptWidth = 0.1;
    static projectPromptHeight = 0.1;
    static projectInteractWidth = 0.06;
    static projectInteractHeight = 0.3;

    static createChatPromptMesh(textureMap = null) {
        // Chat box size parameters
        const radius = 0.1;

        // Draw chatbox plane
        const shape = new THREE.Shape();

        // Top left rounded corner
        shape.lineTo(0, this.chatPromptHeight - radius);
        shape.quadraticCurveTo(0, this.chatPromptHeight, radius, this.chatPromptHeight);

        // Top right rounded corner
        shape.lineTo(this.chatPromptWidth - radius, this.chatPromptHeight);
        shape.quadraticCurveTo(this.chatPromptWidth, this.chatPromptHeight, this.chatPromptWidth, this.chatPromptHeight - radius);

        // Bottom right rounded corner
        shape.lineTo(this.chatPromptWidth, radius);
        shape.quadraticCurveTo(this.chatPromptWidth, 0, this.chatPromptWidth - radius, 0);

        // Chat bubble tail
        shape.lineTo(this.chatPromptWidth / 2 + radius / 1.5, 0);
        shape.lineTo(this.chatPromptWidth / 2, -this.chatPromptHeight / 3);
        shape.lineTo(this.chatPromptWidth / 2 - radius / 1.5, 0);

        // Bottom left rounded corner
        shape.lineTo(radius, 0);
        shape.quadraticCurveTo(0, 0, 0, radius);

        // Create the plane mesh
        const geometry = new THREE.ShapeGeometry( shape );
        let material;
        if (textureMap) material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.FrontSide, map: textureMap });
        else material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.FrontSide });
        return new THREE.Mesh(geometry, material);
    }

    static createInteractPromptMesh() {
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
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.FrontSide });
        return new THREE.Mesh(geometry, material);
    }

    static createEllipsisTexture() {
        // Create texture
        const canvas = document.createElement("canvas");
        const textTexture = new THREE.Texture(canvas);
        textTexture.magFilter = THREE.NearestFilter;
        textTexture.minFilter = THREE.NearestFilter;
        textTexture.wrapS = THREE.RepeatWrapping;
        textTexture.wrapT = THREE.RepeatWrapping;
        textTexture.repeat.set(1.65, 1.6);
        textTexture.needsUpdate = true;

        // Set properties of canvas
        const textContext = canvas.getContext("2d");
        textContext.fillStyle = "white";
        textContext.fillRect(0, 0, canvas.width, canvas.height);
        textContext.textAlign = "center";
        textContext.fillStyle = "rgb(80,80,80)";
        textContext.font = "150px Arial";
        textContext.textBaseline = "middle";
        textContext.fillText("...", canvas.width / 2, canvas.height / 2);

        return textTexture;
    }

    static createDotPromptMesh() {
        // Chat box size parameters
        const radius = 0.05;

        // Draw dot
        const shape = new THREE.Shape();

        // Top left rounded corner
        shape.lineTo(0, this.projectPromptHeight - radius);
        shape.quadraticCurveTo(0, this.projectPromptHeight, radius, this.projectPromptHeight);

        // Top right rounded corner
        shape.lineTo(this.projectPromptWidth - radius, this.projectPromptHeight);
        shape.quadraticCurveTo(this.projectPromptWidth, this.projectPromptHeight, this.projectPromptWidth, this.projectPromptHeight - radius);

        // Bottom right rounded corner
        shape.lineTo(this.projectPromptWidth, radius);
        shape.quadraticCurveTo(this.projectPromptWidth, 0, this.projectPromptWidth - radius, 0);

        // Bottom left rounded corner
        shape.lineTo(radius, 0);
        shape.quadraticCurveTo(0, 0, 0, radius);

        // Create the plane mesh
        const geometry = new THREE.ShapeGeometry( shape );
        const material = new THREE.MeshBasicMaterial({ color: 0xffd300, side: THREE.FrontSide });
        return new THREE.Mesh(geometry, material);
    }

    // TODO: Implement drawing a exlaimation mark instead of copy pasted code
    static createExclaimPromptMesh() {
        // Chat box size parameters
        const radius = 0.05;

        const exclaimDot = new THREE.SphereGeometry(radius, 16, 8);
        const exclaimLine = new THREE.BoxGeometry(this.projectInteractWidth, this.projectInteractHeight, this.projectInteractWidth);
        const exclaimMaterial = new THREE.MeshBasicMaterial({ color: 0xffd300 });

        const exclaimDotMesh = new THREE.Mesh(exclaimDot, exclaimMaterial);
        const exclaimLineMesh = new THREE.Mesh(exclaimLine, exclaimMaterial);
        exclaimLineMesh.position.set(0, radius * 5, 0);

        exclaimDotMesh.add(exclaimLineMesh); // Add line to child and return as one grouped mesh
        return exclaimDotMesh;
    }
}