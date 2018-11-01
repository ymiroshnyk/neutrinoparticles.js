'use strict';

import * as assert from 'assert'

class EmitterParticlesPool {
    constructor(maxParticlesCount, createParticle) {
        this.maxParticlesCount = maxParticlesCount;
        this.createParticle = createParticle;
        this.numParticles = 0;
        this.inactiveParticles = [];
    }

    aquireParticle() {
        if (this.numParticles >= this.maxParticlesCount)
            return null;

        ++this.numParticles;

        if (this.inactiveParticles.length > 0)
            return this.inactiveParticles.pop();
        else
            return this.createParticle();
    }

    releaseParticle(particle) {
        this.inactiveParticles.push(particle);
        assert.equal(this.numParticles > 0, true, "Released particle which wasn't aquired.");
        --this.numParticles;
    }
}
