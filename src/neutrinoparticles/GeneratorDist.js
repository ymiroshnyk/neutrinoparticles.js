'use strict';

import { Generator } from './Generator'

export class GeneratorDist extends Generator {
    constructor(emitterInterface) {
        super(emitterInterface);
        this.emitterInterface = emitterInterface;

        this.initiate();
    }

    initiate() {
        super.initiate();

        this.startPhase = 1;
        this.burstSize = 1;
        this.segment = 0;

        this.emitterInterface.initGenerator(this);

        this.spentSegment = this.startPhase;
    }

    update(dt, frameInterp) {
        this.emitterInterface.updateGenerator(dt, this);

        let distFromPrevFrame = frameInterp.positionDisplaceLength;
        let particlesShot = 0;

        if (this.segment < 0.0001)
            return;

        let spentSegmentsFromPrevFrame = distFromPrevFrame / this.segment;
        let shotsToMake = this.spentSegment + spentSegmentsFromPrevFrame;

        let framePosition = spentSegmentsFromPrevFrame < 0.001 ?
            1.0 - this.spentSegment : (1.0 - this.spentSegment) / spentSegmentsFromPrevFrame;

        while (shotsToMake >= 1.0) {
            frameInterp.set(framePosition);

            particlesShot += this.burstParticles(dt * (1.0 - framePosition));

            framePosition += 1.0 / spentSegmentsFromPrevFrame;
            shotsToMake -= 1.0;
        }

        this.spentSegment = shotsToMake;

        return particlesShot;
    }
}
