export { LoadScreenManager }

class LoadScreenManager {

    // Html elements
    #siteTitle;
    #loadScreen;
    #loadMessage;
    #loadIcon;
    #enterButton;

    #inputManager;

    constructor(inputManager) {
        this.#siteTitle = document.getElementById("site-title");
        this.#loadScreen = document.getElementById("load-screen");
        this.#loadMessage = document.getElementById("load-message");
        this.#loadIcon = document.getElementById("load-icon");
        this.#enterButton = document.getElementById("enter-button");

        this.#inputManager = inputManager;
        this.#inputManager.pauseInput(true);
        this.#enterButton.addEventListener("click", () => this.#closeLoadScreen());
    }

    showButton() {
        this.#siteTitle.style.display = "block";
        this.#enterButton.style.display = "block";
        this.#loadMessage.style.display = "none";
        this.#loadIcon.style.display = "none";
    }

    #closeLoadScreen() {
        this.#loadScreen.style.display = "none";
        this.#inputManager.pauseInput(false);
    }
}