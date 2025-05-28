import { AudioPaths } from "../../audioPaths";

export { AudioManager }

class AudioManager {

    static sfx = Object.freeze({
        arcade: [
            new Audio(AudioPaths.arcade1),
            new Audio(AudioPaths.arcade2),
            new Audio(AudioPaths.arcade3),
            new Audio(AudioPaths.arcade4),
            new Audio(AudioPaths.arcade5)
        ],
        dialogue: [
            new Audio(AudioPaths.dialogue1),
            new Audio(AudioPaths.dialogue2),
            new Audio(AudioPaths.dialogue3),
            new Audio(AudioPaths.dialogue4),
            new Audio(AudioPaths.dialogue5),
            new Audio(AudioPaths.dialogue6),
            new Audio(AudioPaths.dialogue7),
            new Audio(AudioPaths.dialogue8),
            new Audio(AudioPaths.dialogue9),
            new Audio(AudioPaths.dialogue10)
        ]
    });

    // Constants
    static #dialogueNoteRate = 0.1;

    // Components
    #musicPlayer;

    // Running variables
    #musicEnabled = false;
    #sfxEnabled = true;
    #dialogueNotesInterval = null;

    constructor() {
        this.#musicPlayer = document.getElementById("bgm");
    }

    // Expects passing parameter from sfx collection list
    playSFX(sfx) {
        if (!this.#sfxEnabled) return;
        sfx.play();
    }

    startDialogueSound() {
        if (!this.#sfxEnabled || this.#dialogueNotesInterval !== null) return;
        this.#dialogueNotesInterval = setInterval(() => {
            const dialogueNote = this.chooseRandomSFX(AudioManager.sfx.dialogue);
            dialogueNote.currentTime = 0;
            dialogueNote.playbackRate = 2;
            dialogueNote.play();

        }, AudioManager.#dialogueNoteRate * 1000);
    }

    stopDialogueSound() {
        if (!this.#sfxEnabled || this.#dialogueNotesInterval === null) return;
        clearInterval(this.#dialogueNotesInterval);
        this.#dialogueNotesInterval = null;
    }

    chooseRandomSFX(sfxList) {
        const randomIndex = Math.floor(Math.random() * sfxList.length);
        return sfxList[randomIndex];
    }

    toggleMusic() {
        this.#musicEnabled = !this.#musicEnabled;
        if (this.#musicEnabled) this.#musicPlayer.play();
        else this.#musicPlayer.pause();
    }

    toggleSFX() {
        this.#sfxEnabled =  !this.#sfxEnabled;
    }

    musicEnabled() {
        return this.#musicEnabled;
    }

    sfxEnabled() {
        return this.#sfxEnabled;
    }
}