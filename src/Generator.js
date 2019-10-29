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
    constructor(emitter) {
        this.emitter = emitter;
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

            let particle = this.emitter.shootParticle(partIndex == 0, frameTimeToSimulate);

            if (!particle)
                break;

            ++particlesShot;
        }

        return particlesShot;
    }
}

exports.Generator = Generator;