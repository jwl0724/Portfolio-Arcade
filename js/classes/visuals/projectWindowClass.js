import { ArcadeMachine } from "../entities/arcadeMachineClass";
import { BoolUtils } from "../utils/boolUtilsClass";

export { ProjectWindow };

class ProjectWindow {

    // Static properties, on the HTML page
    static #projectTitleLabel = document.getElementById("project-name");
    static #projectDescriptionLabel = document.getElementById("project-description");
    static #previewImage = document.getElementById("preview-images");
    static #projectSection = document.getElementById("project");
    static #previewSection = document.getElementById("preview-carousel")
    static #nextImageButton = document.getElementById("next-preview");
    static #prevImageButton = document.getElementById("prev-preview");
    static #gameEmbed = document.getElementById("game-embed");

    // Components
    static #isOpened = false;
    static #inAnimation = false;
    #imageIndex;
    #projectInfo;

    // Constants
    static #animationTimeInSeconds = parseFloat(getComputedStyle(ProjectWindow.#projectSection).animationDuration);

    static #closeFunctionQueue = new Array(); // Functions to run when closing the window

    // Add event handlers for html elements
    static {
        this.#closeFunctionQueue.push(() => ArcadeMachine.notifyWindowClosed());
        this.#closeFunctionQueue.push(() => this.#closeWindow());
        document.getElementById("project-close").onclick = () => this.#closeFunctionQueue.forEach(action => action());
    }

    static addCloseAction(action) {
        this.#closeFunctionQueue.push(action);
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

        info.IMAGES.forEach(path => {
            const img = new Image();
            img.src = path;
        });
    }

    // Not static because every arcade machine has it's own information
    openProject() {
        this.#populateWindow();
        ProjectWindow.#openWindow();
    }

    hasGameEmbed() {
        return this.#projectInfo.EMBED_MOBILE_SUPPORT != undefined; // If project has embed, then this will always be defined
    }

    #populateWindow() {
        ProjectWindow.#projectTitleLabel.innerHTML = this.#projectInfo.TITLE;
        ProjectWindow.#projectDescriptionLabel.innerHTML = this.#projectInfo.ABOUT;

        // If the project doesn't have pictures associated with it
        if (!this.#projectInfo.IMAGES || this.#projectInfo.IMAGES?.length < 1) {
            ProjectWindow.#previewSection.display = "none";
            return;
        }
        // If the project does have pictures associated with it
        ProjectWindow.#previewImage.src = this.#projectInfo.IMAGES[this.#imageIndex];

        // If the project has embed hosted on itch.io
        if (this.#projectInfo.EMBED) {
            ProjectWindow.#gameEmbed.innerHTML = "";
            if (!BoolUtils.isOnMobile() || BoolUtils.isOnMobile() && this.#projectInfo.EMBED_MOBILE_SUPPORT) {
                ProjectWindow.#gameEmbed.innerHTML = this.#projectInfo.EMBED;
            }
        }

        // If more than one picture
        if (this.#projectInfo.IMAGES.length > 1) {
            const next = ProjectWindow.#nextImageButton, prev = ProjectWindow.#prevImageButton;
                next.style.display = "block";
                next.onclick = () => this.#nextImage();
                prev.style.display = "block";
                prev.onclick = () => this.#prevImage();

        } else {
            // If only one picture hide the carousel buttons
            ProjectWindow.#nextImageButton.style.display = "none";
            ProjectWindow.#prevImageButton.style.display = "none";
        }
        // Only show preivew box after the picture file has loaded
        ProjectWindow.#previewImage.onload = () => ProjectWindow.#previewSection.style.display = "block";
    }

    static #openWindow() {
        if (this.#isOpened || this.#inAnimation) return;

        ProjectWindow.#projectSection.style.display = "flex";
        ProjectWindow.#projectSection.style.animationName = "project-show";

        this.#inAnimation = true;
        setTimeout(() => {
            this.#inAnimation = false;
            this.#isOpened = true;
        }, this.#animationTimeInSeconds * 1000);
    }

    static #closeWindow() {
        if (!this.#isOpened || this.#inAnimation) return;

        ProjectWindow.#projectSection.style.animationName = "project-hide";

        this.#inAnimation = true;
        setTimeout(() => {
            ProjectWindow.#projectSection.style.display = "none";
            this.#inAnimation = false;
            this.#isOpened = false;
        }, (this.#animationTimeInSeconds - 0.1) * 1000);
    }

    #nextImage() {
        if (this.#imageIndex === this.#projectInfo.IMAGES?.length - 1) this.#imageIndex = 0;
        else this.#imageIndex++;
        ProjectWindow.#previewImage.src = this.#projectInfo.IMAGES[this.#imageIndex];
    }

    #prevImage() {
        if (this.#imageIndex === 0) this.#imageIndex = this.#projectInfo.IMAGES?.length - 1;
        else this.#imageIndex--;
        ProjectWindow.#previewImage.src = this.#projectInfo.IMAGES[this.#imageIndex];
    }
}