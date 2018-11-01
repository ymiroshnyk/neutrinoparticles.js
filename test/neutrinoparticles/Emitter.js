'use strict';

import * as NP from '../../src/neutrinoparticles'
import * as math from '../../src/neutrinoparticles/Math'
import * as assert from 'assert'
import * as Utils from './TestUtils'

describe('Emitter', function()
{
    beforeEach(function() {
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
                this.initGeneratorCount = 0;
                this.updateGeneratorCount = 0;
            }

            initEmitter(emitter) {
                ++this.initEmitterCount;
                emitter.generator = new MockGenerator();
            }

            initGenerator(generator) {
                ++this.initGeneratorCount;
            }

            updateGenerator(dt, emitter, generator) {
                ++this.updateGeneratorCount;
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
        it("should call generator's initiage()", function() {
            let emitterModel = new this.MockEmitterModel();
            let emitter = new NP.Emitter(null, null, emitterModel);
            emitter.initiate();
            assert.equal(emitter.generator.initiateCount, 1);
        });

        it('position/rotation by default should be zero', function() {
            let emitterModel = new this.MockEmitterModel();
            let emitter = new NP.Emitter(null, null, emitterModel);
            emitter.initiate();
            Utils.checkPosRot(emitter, [0, 0, 0], [0, 0, 0, 1]);
        });

        it('should setup position and rotation', function() {
            let emitterModel = new this.MockEmitterModel();
            let emitter = new NP.Emitter(null, null, emitterModel);
            let position = [1, 2, 3];
            let rotation = [1, 2, 3, 4];
            emitter.initiate(position, rotation);
            Utils.checkPosRot(emitter, position, rotation);
        });

        it ('public props should be inited', function() {
            let emitterModel = new this.MockEmitterModel();
            let emitter = new NP.Emitter(null, null, emitterModel);
            emitter.initiate();
            assert.equal(emitter.paused, false);
            assert.equal(emitter.generatorsPaused, false);
        })
    })
});