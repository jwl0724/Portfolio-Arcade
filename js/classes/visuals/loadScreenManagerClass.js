export { LoadScreenManager }

// TODO: Implement logic for load screen
class LoadScreenManager {

    #inputManager;
    #loadScreen;
    #enterButton;

    constructor(inputManager) {
        this.#loadScreen = document.getElementById("load-screen");
        this.#enterButton = document.getElementById("enter-button");

        this.#inputManager = inputManager;
        this.#inputManager.pauseInput(true);
    }

    showButton() {

    }
}