'use strict';

import * as NP from '../../src/neutrinoparticles'
import * as math from '../../src/neutrinoparticles/Math'
import * as assert from 'assert'
import * as Utils from './TestUtils'

describe('Emitter', function()
{
    beforeEach(function() {
        this.MockEffect = class MockEffect {
            constructor() {
                this.time = 0;
            }
        }

        this.MockParticlesPool = class MockParticlesPool {
            constructor(maxParticles) {
                this.maxParticles = maxParticles;
                this.numParticles = 0;
                this.aquireParticleCount = 0;
                this.releaseParticleCount = 0;
            }

            aquireParticle() {
                if (this.numParticles >= this.maxParticles)
                    return null;

                ++this.aquireParticleCount;
                ++this.numParticles;
            }

            releaseParticle(particle) {
                assert.equal(this.numParticles > 0, true);
                --this.numParticles;
                ++this.releaseParticleCount;
            }
        }        

        class MockGenerator {
            constructor() {
                this.initiateCount = 0;
                this.updateCount = 0;
            }

            initiate() {
                ++this.initiateCount;
            }

            update() {
                ++this.updateCount;
            }
        }

        this.MockEmitterModel = class EmitterModel {
            constructor() {
                this.initEmitterCount = 0;
            }

            initEmitter(emitter) {
                ++this.initEmitterCount;
                emitter.generators = [ new MockGenerator() ];
            }
        }

        
    });

    describe('constructor()', function(){
        it('should call initEmitter exactly once', function() {
            let emitterModel = new this.MockEmitterModel();
            let emitter = new NP.Emitter(null, null, emitterModel);
            assert.equal(emitterModel.initEmitterCount, 1);
        });
    });

    describe('initiate()', function() {
        it("should call generator's initiate()", function() {
            let effect = new this.MockEffect();
            let emitterModel = new this.MockEmitterModel();
            let emitter = new NP.Emitter(effect, null, emitterModel);
            emitter.initiate();
            emitter.generators.forEach(function(generator) {
                assert.equal(generator.initiateCount, 1);
            });
        });

        it('position/rotation by default should be zero', function() {
            let effect = new this.MockEffect();
            let emitterModel = new this.MockEmitterModel();
            let emitter = new NP.Emitter(effect, null, emitterModel);
            emitter.initiate();
            Utils.checkPosRot(emitter, [0, 0, 0], [0, 0, 0, 1]);
        });

        it('should setup position and rotation', function() {
            let effect = new this.MockEffect();
            let emitterModel = new this.MockEmitterModel();
            let emitter = new NP.Emitter(effect, null, emitterModel);
            let position = [1, 2, 3];
            let rotation = [1, 2, 3, 4];
            emitter.initiate(position, rotation);
            Utils.checkPosRot(emitter, position, rotation);
        });

        it ('public props should be inited', function() {
            let effect = new this.MockEffect();
            let emitterModel = new this.MockEmitterModel();
            let emitter = new NP.Emitter(effect, null, emitterModel);
            emitter.initiate();
            assert.equal(emitter.paused, false);
            assert.equal(emitter.generatorsPaused, false);
            assert.equal(math.equalv3_(emitter.velocity, [0, 0, 0]), true);
            assert.equal(emitter.time, 0);
        });
    });

    describe('update()', function() {
        it ('dt=0, position=undefined, rotation=undefined', function() {
            let effect = new this.MockEffect();
            let emitterModel = new this.MockEmitterModel();
            let emitter = new NP.Emitter(effect, null, emitterModel);
            emitter.initiate();
            emitter.update(0);
            emitter.generators.forEach(function(generator) {
                assert.equal(generator.updateCount, 2);
            });
            Utils.checkPosRot(emitter, [0, 0, 0], [0, 0, 0, 1]);
        });

        it ('dt=0, position=defined, rotation=defined', function() {
            let effect = new this.MockEffect();
            let emitterModel = new this.MockEmitterModel();
            let emitter = new NP.Emitter(effect, null, emitterModel);
            emitter.initiate();

            let position = [1, 1, 1];
            let rotation = math.axisangle2quat_([0, 1, 0], 45);
            emitter.update(0, position, rotation);
            emitter.generators.forEach(function(generator) {
                assert.equal(generator.updateCount, 2);
            });
            Utils.checkPosRot(emitter, position, rotation);
        });

        it ('dt=1, position=undefined, rotation=undefined', function() {
            let effect = new this.MockEffect();
            let emitterModel = new this.MockEmitterModel();
            let emitter = new NP.Emitter(effect, null, emitterModel);
            emitter.initiate();
            emitter.update(1);
            emitter.generators.forEach(function(generator) {
                assert.equal(generator.updateCount, 2);
            });
            Utils.checkPosRot(emitter, [0, 0, 0], [0, 0, 0, 1]);
            assert.equal(math.equalv3_(emitter.velocity, [0, 0, 0]), true);
        });

        it ('dt=1, position=defined, rotation=defined', function() {
            let effect = new this.MockEffect();
            let emitterModel = new this.MockEmitterModel();
            let emitter = new NP.Emitter(effect, null, emitterModel);
            emitter.initiate();

            let position = [1, 1, 1];
            let rotation = math.axisangle2quat_([0, 1, 0], 45);
            emitter.update(1, position, rotation);
            emitter.generators.forEach(function(generator) {
                assert.equal(generator.updateCount, 2);
            });
            Utils.checkPosRot(emitter, position, rotation);
            assert.equal(math.equalv3_(emitter.velocity, [1, 1, 1]), true);
        });
    });
})