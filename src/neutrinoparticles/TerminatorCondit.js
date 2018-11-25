'use strict';

export class TerminatorCondit {
    constructor(emitter, model) {
        this.emitter = emitter;
        this.model = model;
    }

    initiate() {
        if (this.model.init)
            this.model.init(this);
    }

    update(dt) {
        if (this.modelupdate)
            this.model.update(this, dt);
    }

    checkParticle(particle) {
        return this.model.checkParticle(this, particle);
    }
}
