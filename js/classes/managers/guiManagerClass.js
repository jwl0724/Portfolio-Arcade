import { Instructions } from "../../../text/help";

export { GUIManager }

class GUIManager {

    // Constants
    static #fadeSeconds = 0.5;

    // Html elements
    #gui;
    #helpButton
    #sfxButton;
    #musicButton;
    #helpWindow;

    // Managers
    #inputManager;

    // Running variables
    #disabled;

    constructor(inputManager) {
        this.#inputManager = inputManager;

        // Get elements
        this.#gui = document.getElementById("gui-menu");
        this.#helpButton = document.getElementById("help-button");
        this.#helpWindow = document.getElementById("help-box");
        this.#sfxButton = document.getElementById("sfx-button");
        this.#musicButton = document.getElementById("music-button");
        this.#setupHelpWindow();
    }

    showUI() {
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
        const closeButton = document.getElementById("help-close");
        closeButton.addEventListener("click", () => this.#closeHelpWindow());
        this.#helpButton.addEventListener("click", () => {
            if (!this.#disabled) this.#openHelpWindow();
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