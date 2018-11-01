'use strict';

class Terminator {
    constructor(emitterInterface) {
        this.emitterInterface = emitterInterface;
    }

    checkParticle(particle) {
        return emitterInterface.terminatorCheck(thisEmitter, particle, this); // IMPL
    }
}
