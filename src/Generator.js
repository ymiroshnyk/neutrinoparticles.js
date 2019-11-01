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
        this.burstCount = 1;
        this.burstPos = 0;
    }

    initiate() {
        this.burstPos = 0;
    }

    burstParticles(frameTimeToSimulate) {
        let particlesShot = 0;

        const intBurstCount = Math.max(Math.trunc(this.burstCount), 0);

        for (let partIndex = 0; partIndex < intBurstCount; ++partIndex) {
            if (intBurstCount == 1)
                this.burstPos = 0;
            else
                this.burstPos = partIndex / (intBurstCount - 1);

            if (this.emitter.shootParticle(partIndex == 0, frameTimeToSimulate)) {
                ++particlesShot;
            }
        }

        return particlesShot;
    }
}

exports.Generator = Generator;