import { Arcade } from "../arcadeClass";

export { EmbedManager }

class EmbedManager {

    static #gameDiv = document.getElementById("game-embed")
    static #embedWindow = document.getElementById("embed-window");

    #embedLink;

    static {
        document.getElementById("embed-close").onclick = () => closeGame;
    }

    constructor(link) {
        this.#embedLink = link;
    }

    openGame() {
        EmbedManager.#embedWindow.style.display = "block";
        EmbedManager.#gameDiv.innerHTML = this.#embedLink;
        Arcade.singleton.forceDisableMusic(true);
    }

    closeGame() {
        EmbedManager.#embedWindow.style.display = "none";
        EmbedManager.#gameDiv.innerHTML = "";
        Arcade.singleton.forceDisableMusic(false);
    }
}