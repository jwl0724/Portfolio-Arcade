export { LoadScreenManager }

class LoadScreenManager {

    static fadeTime = 1; // How long it takes for an element to fade out

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
        this.#fadeOutElement(this.#loadMessage);
        this.#fadeOutElement(this.#loadIcon);
        setTimeout(() => {
            this.#fadeInElement(this.#siteTitle);
            this.#fadeInElement(this.#enterButton);
        }, LoadScreenManager.fadeTime * 1000);
    }

    #closeLoadScreen() {
        this.#loadScreen.style.animationName = "load-close";
        setTimeout(() => this.#inputManager.pauseInput(false), LoadScreenManager.fadeTime * 1000);
    }

    #fadeInElement(element) {
        element.style.display = "block";
        element.style.animationDuration = LoadScreenManager.fadeTime;
        element.style.animationIterationCount = 1;
        element.style.animationDirection = "normal";
        element.style.animationFill = "forwards";
        element.style.animationName = "load-fade-in";
    }

    #fadeOutElement(element) {
        element.style.animationDuration = LoadScreenManager.fadeTime;
        element.style.animationIterationCount = 1;
        element.style.animationDirection = "normal";
        element.style.animationFill = "forwards";
        element.style.animationName = "load-fade-out";
        setTimeout(() => element.style.display = "none", LoadScreenManager.fadeTime * 1000);
    }
}