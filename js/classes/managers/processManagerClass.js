import * as THREE from 'three';

export { ProcessManager };

// Physics and general need to have delta argument, input must have no arguments
class ProcessManager {
    
    #clock
    #renderer;
    #sceneRenderFunction;
    #inputProcesses;
    #physicsProcesses;
    #generalProcesses;

    constructor(renderer, renderFunction) {
        this.#inputProcesses = new Array();
        this.#physicsProcesses = new Array();
        this.#generalProcesses = new Array();
        this.#clock = new THREE.Clock();

        this.#renderer = renderer;
        this.#renderer.setAnimationLoop(() => this.#doProcess());
        this.#sceneRenderFunction = renderFunction;
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

    #doProcess() {
        const delta = this.#clock.getDelta();
        this.processInput();
        this.process(delta);
        this.processPhysics(delta);
        this.#sceneRenderFunction();
    }
}