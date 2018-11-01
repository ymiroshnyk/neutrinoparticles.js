'use strict';

/*class GeneratorEmitterInterface {
    constructor(emitter) {
    }

    initGenerator(generator) {
    }

    updateGenerator(dt, generator) {
    }

    shootParticle() {
    }

    disactivateEmitter() {
    }
};*/

export class Generator {
    constructor(emitterInterface) {
        this.emitterInterface = emitterInterface;
    }

    initiate() {
        this.burstPos = 0;
        this.burstCount = 1;        
    }

    burstParticles(frameTimeToSimulate) {
        var particlesShot = 0;

        var intBurstCount = Math.max(Math.trunc(this.burstCount), 0);

        for (var partIndex = 0; partIndex < intBurstCount; ++partIndex) {
            if (intBurstCount == 1)
                this.burstPos = 0;
            else
                this.burstPos = partIndex / (intBurstCount - 1);

            var particle = this.emitterInterface.shootParticle();

            if (!particle)
                break;

            if (partIndex == 0)
                particle.init();
            else
                particle.initBurst();

            particle.update(frameTimeToSimulate);
            ++particlesShot;
        }

        return particlesShot;
    }
}

exports.Generator = Generator;