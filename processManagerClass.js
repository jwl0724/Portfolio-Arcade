export { ProcessManager };

class ProcessManager {
    
    #processBatch;

    constructor() {
        this.#processBatch = new Array();
    }

    // Processes need to be functions without any arguments
    addProcess(process) {
        this.#processBatch.push(process);
    }

    removeProcess(process) {
        const index = this.#processBatch.indexOf(process);
        if (index > -1) this.#processBatch = this.#processBatch.splice(index, 1);
    }

    processBatch() {
        this.#processBatch.forEach(process => process());
    }
}