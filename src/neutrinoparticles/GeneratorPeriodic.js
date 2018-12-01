'use strict';

import { Generator } from './Generator'

export class GeneratorPeriodic extends Generator {

    constructor(emitter, model) {
        super(emitter);

        this.model = model;
        this.emitter = emitter;
        this.initiate();
    }

    initiate() {
        super.initiate();

        this.startPhase = 1;
        this.fixedTime = null;
        this.fixedShots = null;
        this.burstSize = 1;
        this.rate = 0;
        //this.spentParticle;
        //this.shotsMade

        if (this.model.init) {
            this.model.init(this);
        }

        this.spentParticle = this.startPhase;
        this.shotsMade = 0;
    }

    update(dt, frameInterp) {
        if (this.model.update) {
            this.model.update(this, dt);
        }

        if (this.rate < 0.0001)
            return;

        let frameTimeLeft = dt;
        let particlesShot = 0;
        let shotsToMake = this.spentParticle + dt * this.rate;

        while (shotsToMake >= 1.0) {
            let spentTime = (1.0 - this.spentParticle) / this.rate;
            frameTimeLeft -= spentTime;

            if (dt > 0.0001)
                frameInterp.set(1 - frameTimeLeft / dt);
            else
                frameInterp.set(0);

            if (this.fixedTime != null && frameInterp.emitterTime > this.fixedTime) {
                this.emitter.disactivate();
                break;
            }

            particlesShot += this.burstParticles(frameTimeLeft);

            this.spentParticle = 0.0;
            shotsToMake -= 1.0;

            if (this.fixedShots != null && ++this.shotsMade >= this.fixedShots) {
                this.emitter.disactivate();
                break;
            }
        }

        this.spentParticle = shotsToMake;

        return particlesShot;
    }
}
