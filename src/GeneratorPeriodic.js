'use strict';

import { Generator } from './Generator'

export class GeneratorPeriodic extends Generator {

    constructor(emitter, model) {
        super(emitter);

        this.model = model;
        this.emitter = emitter;

        this.startPhase = 1;
        this.fixedTime = null;
        this.fixedShots = null;
        this.burstSize = 1;
        this.rate = 0;

        if (this.model.init) {
            this.model.init(this);
        }

        this._spentParticle = 0;
        this._shotsMade = 0;

        this._initiated = false;
    }

    initiate() {
        super.initiate();
        
        this._spentParticle = this.startPhase;
        this._shotsMade = 0;

        this._initiated = true;
    }

    update(dt, stateInterp) {
        if (!this._initiated) {
            throw Error("initiate() must be called first!");
        }

        if (this.model.update) {
            this.model.update(this, dt);
        }

        if (this.rate < 0.0001)
            return;

        let frameTimeLeft = dt;
        let particlesShot = 0;
        let shotsToMake = this._spentParticle + dt * this.rate;

        while (shotsToMake >= 1.0) {
            let spentTime = (1.0 - this._spentParticle) / this.rate;
            frameTimeLeft -= spentTime;

            if (dt > 0.0001)
                stateInterp.set(1 - frameTimeLeft / dt);
            else
                stateInterp.set(0);

            if (this.fixedTime != null && stateInterp.state.time > this.fixedTime) {
                this.emitter.disactivate();
                break;
            }

            particlesShot += this.burstParticles(frameTimeLeft);

            this._spentParticle = 0.0;
            shotsToMake -= 1.0;

            if (this.fixedShots != null && ++this._shotsMade >= this.fixedShots) {
                this.emitter.disactivate();
                break;
            }
        }

        this._spentParticle = shotsToMake;

        return particlesShot;
    }
}
