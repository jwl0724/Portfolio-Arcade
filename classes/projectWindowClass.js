import { ArcadeMachine } from "./arcadeMachineClass";

export { ProjectWindow };

class ProjectWindow {

    // Static properties, on the HTML page
    static #projectTitleLabel = document.getElementById("project-name");
    static #projectDescriptionLabel = document.getElementById("project-description");
    static #projectCreditsLabel = document.getElementById("project-credits");
    static #previewImages = document.getElementById("preview-images");
    static #projectSection = document.getElementById("project");

    // HTML Templates
    static #imageTemplate = `<img src="{imagePath}" alt="Project Preview" class="preview-image">`;

    // Components
    static #isOpened = false;
    static #inAnimation = false;
    #imageIndex;
    #projectInfo;

    // Constants
    static #animationTimeInSeconds = parseFloat(getComputedStyle(ProjectWindow.#projectSection).animationDuration);

    // Add event handlers for html elements
    static {
        document.getElementById("project-close").onclick = () => this.#closeProject();
    }

    static isOpen() {
        return this.#isOpened;
    }

    static inAnimation() {
        return this.#inAnimation;
    }

    constructor(info) {
        this.#projectInfo = info;
        this.#imageIndex = 0;
    }

    // Not static because every arcade machine has it's own information
    openProject() {
        this.#populateWindow();
        ProjectWindow.#openWindow();
    }

    // Static because closing the project window has no specific information involved
    static #closeProject() {
        ArcadeMachine.notifyWindowClosed();
        this.#closeWindow();
    }

    #populateWindow() {
        ProjectWindow.#projectTitleLabel.innerHTML = this.#projectInfo.TITLE;
        ProjectWindow.#projectDescriptionLabel.innerHTML = this.#projectInfo.ABOUT;
        ProjectWindow.#projectCreditsLabel.innerHTML = this.#projectInfo.CREDITS?.join("<br>");
        ProjectWindow.#previewImages.innerHTML = "";
        this.#projectInfo.IMAGES?.forEach(path => {
            ProjectWindow.#previewImages.innerHTML += ProjectWindow.#imageTemplate.replace("{imagePath}", path);
        });
    }

    static #openWindow() {
        if (this.#isOpened || this.#inAnimation) return;

        ProjectWindow.#projectSection.style.display = "flex";

        this.#inAnimation = true;
        setTimeout(() => {
            this.#inAnimation = false;
            this.#isOpened = true;
        }, this.#animationTimeInSeconds * 1000);
    }

    static #closeWindow() {
        if (!this.#isOpened || this.#inAnimation) return;

        ProjectWindow.#projectSection.style.display = "none";

        this.#inAnimation = true;
        setTimeout(() => {
            this.#inAnimation = false;
            this.#isOpened = false;
        }, this.#animationTimeInSeconds * 1000);
    }

    #nextImage() {
        if (this.#imageIndex === this.#projectInfo.IMAGES?.length) this.#imageIndex = 0;
        else this.#imageIndex++;
    }

    #prevImage() {
        if (this.#imageIndex === 0) this.#imageIndex = this.#projectInfo.IMAGES?.length - 1;
        else this.#imageIndex--;
    }
}