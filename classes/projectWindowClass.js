export { ProjectWindow };

class ProjectWindow {

    // Static properties, on the HTML page
    static #projectTitleLabel = document.getElementById("project-name");
    static #projectDescriptionLabel = document.getElementById("project-description");
    static #projectCreditsLabel = document.getElementById("project-credits");
    static #previewImages = document.getElementById("preview-images");

    // HTML Templates
    static #imageTemplate = `<img src="{imagePath}" alt="Project Preview" class="preview-image">`;

    #projectInfo;
    #imageIndex;

    constructor(info) {
        this.#projectInfo = info;
        this.#imageIndex = 0;
    }

    populateWindow() {
        ProjectWindow.#projectTitleLabel.innerHTML = this.#projectInfo.TITLE;
        ProjectWindow.#projectDescriptionLabel.innerHTML = this.#projectInfo.ABOUT;
        ProjectWindow.#projectCreditsLabel.innerHTML = this.#projectInfo.CREDITS?.join("<br>");
        info.IMAGES?.forEach(path => {
            ProjectWindow.#previewImages.innerHTML += ProjectWindow.#imageTemplate.replace("{imagePath}", path);
        });
    }

    openWindow() {
        // TODO: Implement open window
    }

    closeWindow() {
        // TODO: Implement close window
    }

    nextImage() {
        if (this.#imageIndex === this.#projectInfo.IMAGES?.length) this.#imageIndex = 0;
        else this.#imageIndex++;
    }

    prevImage() {
        if (this.#imageIndex === 0) this.#imageIndex = this.#projectInfo.IMAGES?.length - 1;
        else this.#imageIndex--;
    }
}