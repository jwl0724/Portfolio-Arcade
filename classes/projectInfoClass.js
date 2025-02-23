export { ProjectInfo }

// TODO: Implement this class
class ProjectInfo {

    // DOM element
    #section;

    // Text
    #title;
    #about;
    #credits;
    #images;
    #captions;

    constructor(info) {
        this.#title = info.TITLE;
        this.#about = info.ABOUT;
        this.#credits = info.CREDITS;
        this.#images = info.IMAGES;
        this.#captions = info.CAPTIONS; // Expected same length or 0 as images array
    }

    // Will remove any prior html
    populate() {

    }

    // Not expected to be called every populate, just there in case
    remove() {

    }
}