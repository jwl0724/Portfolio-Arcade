import { Instructions, Hint } from "../../../text/help";

export { GUIManager }

class GUIManager {

    // Constants
    static #fadeSeconds = 0.5;

    // Html elements
    #gui;
    #helpButton;
    #sfxButton;
    #musicButton;
    #helpWindow;
    #hintBox;

    // Managers
    #inputManager;
    #audioManager

    // Running variables
    #firstLoad = true;
    #disabled;

    constructor(inputManager, audioManager) {
        this.#inputManager = inputManager;
        this.#audioManager = audioManager;

        // Get elements
        this.#gui = document.getElementById("gui-menu");
        this.#helpButton = document.getElementById("help-button");
        this.#helpWindow = document.getElementById("help-box");
        this.#sfxButton = document.getElementById("sfx-button");
        this.#musicButton = document.getElementById("music-button");
        this.#hintBox = document.getElementById("hint-box");
        this.#setupHelpWindow();
    }

    showUI() {
        if (this.#firstLoad) {
            this.#firstLoad = false;
            this.#showHint();
        }
        this.#gui.style.display = "flex";
        this.#gui.style.animationName = "load-fade-in"; // Re-using animations created for loading screen
    }

    hideUI() {
        this.#gui.style.animationName = "load-fade-out"; // Re-using animations created for loading screen
        setTimeout(() => this.#gui.style.display = "none", GUIManager.#fadeSeconds * 1000);
    }

    disable(disabled) {
        this.#disabled = disabled;
    }

    helpIsOpened() {
        return this.#helpWindow.style.display === "flex";
    }

    #setupHelpWindow() {
        document.getElementById("help-instructions").innerHTML = Instructions;
        document.getElementById("gui-hint").innerHTML = Hint;

        const closeButton = document.getElementById("help-close");
        closeButton.addEventListener("click", () => this.#closeHelpWindow());
        this.#helpButton.addEventListener("click", () => {
            if (!this.#disabled) this.#openHelpWindow();
        });
        this.#musicButton.addEventListener("click", () => {
            this.#audioManager.toggleMusic();
            if (!this.#audioManager.musicEnabled()) this.#musicButton.classList.add("gui-button-toggled");
            else this.#musicButton.classList.remove("gui-button-toggled");
        });
        this.#sfxButton.addEventListener("click", () => {
            this.#audioManager.toggleSFX();
            if (!this.#audioManager.sfxEnabled()) this.#sfxButton.classList.add("gui-button-toggled");
            else this.#sfxButton.classList.remove("gui-button-toggled");
        });
    }

    #showHint() {
        const delay = 3, duration = 6;
        // Setup timeouts
        setTimeout(() => {
            this.#hintBox.style.display = "block";
            this.#hintBox.style.animationName = "hint-show";
        }, delay * 1000);
        const closeTimeout = setTimeout(() => {
            this.#hintBox.style.animationName = "hint-hide";
            setTimeout(() => this.#hintBox.style.display = "none", GUIManager.#fadeSeconds * 1000);
        }, (delay + duration) * 1000);

        // Add event listener for user to quick close the hint box
        this.#hintBox.addEventListener("click", () => {
            clearTimeout(closeTimeout);
            this.#hintBox.style.animationName = "hint-hide"; // Re-using animations created for loading screen
            setTimeout(() => this.#hintBox.style.display = "none", GUIManager.#fadeSeconds * 1000);
       });
    }

    #openHelpWindow() {
        this.#inputManager.pauseInput(true);
        this.#helpWindow.style.display = "flex";
        this.#helpWindow.style.animationName = "load-fade-in"; // Re-using animations created for loading screen
    }

    #closeHelpWindow() {
        this.#inputManager.pauseInput(false);
        this.#helpWindow.style.animationName = "load-fade-out"; // Re-using animations created for loading screen
        setTimeout(() => this.#helpWindow.style.display = "none", GUIManager.#fadeSeconds * 1000);
    }
}