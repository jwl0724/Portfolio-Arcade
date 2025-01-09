export { ProcessManager };

// Physics and general need to have delta argument, input must have no arguments
class ProcessManager {
    
    #inputProcesses;
    #physicsProcesses;
    #generalProcesses;

    constructor() {
        this.#inputProcesses = new Array();
        this.#physicsProcesses = new Array();
        this.#generalProcesses = new Array();
    }
    
    addPhysicsProcess(process) {
        if (process) this.#physicsProcesses.push(process);
    }

    addInputProcess(process) {
        if (process) this.#inputProcesses.push(process);
    }

    addProcess(process) {
        if (process) this.#generalProcesses.push(process);
    }

    removeInputProcess(process) {
        const index = this.#inputProcesses.indexOf(process);
        if (index === -1) console.error(`Input process was not found for ${process}`); 
        else this.#inputProcesses = this.#inputProcesses.splice(index, 1);
    }

    removePhyiscsProcess(process) {
        const index = this.#physicsProcesses.indexOf(process);
        if (index === -1) console.error(`Physics process was not found for ${process}`);
        else this.#physicsProcesses = this.#physicsProcesses.splice(index, 1);
    }

    removeProcess(process) {
        const index = this.#generalProcesses.indexOf(process);
        if (index === -1) console.error(`Process was not found for ${process}`);
        else this.#generalProcesses = this.#generalProcesses.splice(index, 1);
    }

    process(delta) {
        this.#generalProcesses.forEach(process => process(delta));
    }

    processInput() {
        this.#inputProcesses.forEach(process => process());
    }

    processPhysics(delta) {
        this.#physicsProcesses.forEach(process => process(delta));
    }
}