'use strict';

import * as math from './Math'

export class FrameInterpolator {
    constructor(emitter) {
        this.effect = emitter.effect;
        this.emitter = emitter;
        this.position = false;
        this.startEmitterPosition = [];
        this.endEmitterPosition = [];
        this.rotation = false;
        this.startEmitterRotation = [];
        this.endEmitterRotation = [];
    }

    // only for effect
    begin(dt, endPosition, endRotation) {
        this.startEffectTime = this.effect.time;
        this.startEmitterTime = this.emitter.time;
        
        this.endEffectTime = this.startEffectTime + dt;
        this.endEmitterTime = this.startEmitterTime + dt;

        
        if (endPosition) {
            this.position = true;
            math.copyv3(this.startEmitterPosition, this.emitter.position);
            math.copyv3(this.endEmitterPosition, endPosition);
        }
        
        if (endRotation) {
            this.rotation = true;
            math.copyq(this.startEmitterRotation, this.emitter.rotation);
            math.copyq(this.endEmitterRotation, endRotation);
        }
    }

    set(interp) {
        this.effect.time = math.lerp_(this.startEffectTime, this.endEffectTime, interp);
        this.emitter.time = math.lerp_(this.startEmitterTime, this.endEmitterTime, interp);

        if (this.position)
            math.lerpv3(this.emitter.position, this.startEmitterPosition, this.endEmitterPosition, interp);

        if (this.rotation)
            math.slerpq(this.emitter.rotation, this.startEmitterRotation, this.endEmitterRotation, interp);
    }

    // only for effect
    end() {
        this.effect.time = this.endEffectTime;
        this.emitter.time = this.endEmitterTime;

        if (this.position)
            math.copyv3(this.emitter.position, this.endEmitterPosition);

        if (this.rotation)
            math.copyq(this.emitter.rotation, this.endEmitterRotation);
    }

    get emitterTime() {
        return this.emitter.time;
    }

    get positionDisplaceLength() {
        return this.position ? math.lengthv3_(ctx.subv3_(this.endEmitterPosition, 
            this.startEmitterPosition)) : 0;
    }
}
