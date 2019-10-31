'use strict';

import { Generator } from './Generator'
import * as math from './Math'

export class GeneratorDist extends Generator {
    constructor(emitter, model) {
        super(emitter);

        this.model = model;

        this.startPhase = 1;
        this.burstSize = 1;
        this.segment = 0;

        if (this.model.init) {
            this.model.init(this);
        }

        this._spentSegment = 0;

        this._initiated = false;
        this._helperA = [0, 0, 0];
    }

    initiate() {
        super.initiate();
        this._spentSegment = this.startPhase;

        this._initiated = true;
    }

    update(dt, stateInterp) {
        if (!this._initiated) {
            throw Error("initiate() must be called first!");
        }

        if (this.model.update) {
            this.model.update(this, dt);
        }

        let distFromPrevFrame;
        if (stateInterp.positionChanging) {
            math.subv3(this._helperA, stateInterp.stateTo.position, stateInterp.stateFrom.position);
            distFromPrevFrame = math.lengthv3_(this._helperA);
        } else {
            distFromPrevFrame = 0;
        }

        let particlesShot = 0;

        if (this.segment < 0.0001)
            return;

        const spentSegmentsFromPrevFrame = distFromPrevFrame / this.segment;
        let shotsToMake = this._spentSegment + spentSegmentsFromPrevFrame;

        let framePosition = spentSegmentsFromPrevFrame < 0.001 ?
            1.0 - this._spentSegment : (1.0 - this._spentSegment) / spentSegmentsFromPrevFrame;

        while (shotsToMake >= 1.0) {
            stateInterp.set(framePosition);

            particlesShot += this.burstParticles(dt * (1.0 - framePosition));

            framePosition += 1.0 / spentSegmentsFromPrevFrame;
            shotsToMake -= 1.0;
        }

        this._spentSegment = shotsToMake;

        return particlesShot;
    }
}
