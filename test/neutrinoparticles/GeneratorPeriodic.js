'use strict';

import * as NP from '../../src/neutrinoparticles'
import * as math from '../../src/neutrinoparticles/Math'
import * as assert from 'assert'

describe('GeneratorPeriodic', function()
{
    beforeEach(function() {

        class MockGeneratorEmitterInterface {
            constructor(initProps) {
                this.initProps = initProps;
                this.initGeneratorCount = 0;
                this.updateGeneratorCount = 0;
                this.shootParticleCount = 0;
                this.disactivateEmitterCount = 0;
            }

            initGenerator(generator) {
                ++this.initGeneratorCount;
                if (this.initProps)
                    Object.assign(generator, this.initProps);
            }

            updateGenerator() {
                ++this.updateGeneratorCount;
            }

            shootParticle() {
                ++this.shootParticleCount;
            }

            disactivateEmitter() {
                ++this.disactivateEmitterCount;
            }
        }
        this.MockGeneratorEmitterInterface = MockGeneratorEmitterInterface;

        class MockFrameInterpolator {
            constructor(dt) {
                this.dt = dt;
                this.emitterTime = 0;
                this.setCount = 0;
            }

            set(interp) {
                ++this.setCount;
                this.emitterTime = math.lerp_(0, this.dt, interp);
            }
        }
        this.MockFrameInterpolator = MockFrameInterpolator;

        this.emitterInterface = new MockGeneratorEmitterInterface();
        this.generator = new NP.GeneratorPeriodic(this.emitterInterface);
    });

    describe('constructor()', function()
    {
        it('should call initGenerator exactly once', function() {
            let emitterInterface = new this.MockGeneratorEmitterInterface();
            let generator = new NP.GeneratorPeriodic(emitterInterface);
            assert.equal(emitterInterface.initGeneratorCount, 1);
        });
    });

    describe('update()', function()
    {
        it('zero time, zero rate', function() {
            let frameInterp = new this.MockFrameInterpolator(0); 
            this.generator.update(0, frameInterp);
            assert.equal(this.emitterInterface.updateGeneratorCount, 1);
            assert.equal(this.emitterInterface.shootParticleCount, 0);
            assert.equal(this.emitterInterface.disactivateEmitterCount, 0);
        });

        it('zero time, non-zero rate', function() {
            let frameInterp = new this.MockFrameInterpolator(0); 
            this.generator.rate = 1;
            this.generator.update(0, frameInterp);
            assert.equal(this.emitterInterface.updateGeneratorCount, 1);
            assert.equal(this.emitterInterface.shootParticleCount, 1);
            assert.equal(this.emitterInterface.disactivateEmitterCount, 0);
        });

        it('0+1 particle to shoot withing 1 frame', function() {
            let emitterInterface = new this.MockGeneratorEmitterInterface({
                startPhase: 0,
                rate: 1
            });
            let generator = new NP.GeneratorPeriodic(emitterInterface);
            let dt = 1;
            let frameInterp = new this.MockFrameInterpolator(dt); 
            generator.update(dt, frameInterp);
            assert.equal(emitterInterface.updateGeneratorCount, 1);
            assert.equal(emitterInterface.shootParticleCount, 1);
            assert.equal(emitterInterface.disactivateEmitterCount, 0);
        });

        it('1+1 particle to shoot withing 1 frame', function() {
            let emitterInterface = new this.MockGeneratorEmitterInterface({
                startPhase: 1,
                rate: 1
            });
            let generator = new NP.GeneratorPeriodic(emitterInterface);
            let dt = 1;
            let frameInterp = new this.MockFrameInterpolator(dt); 
            generator.update(dt, frameInterp);
            assert.equal(emitterInterface.updateGeneratorCount, 1);
            assert.equal(emitterInterface.shootParticleCount, 2);
            assert.equal(emitterInterface.disactivateEmitterCount, 0);
        });

        it('1+10 particle to shoot withing 1 frame', function() {
            let emitterInterface = new this.MockGeneratorEmitterInterface({
                startPhase: 1,
                rate: 10
            });
            let generator = new NP.GeneratorPeriodic(emitterInterface);
            let dt = 1;
            let frameInterp = new this.MockFrameInterpolator(dt); 
            generator.update(dt, frameInterp);
            assert.equal(emitterInterface.updateGeneratorCount, 1);
            assert.equal(emitterInterface.shootParticleCount, 11);
            assert.equal(emitterInterface.disactivateEmitterCount, 0);
        });

        it('Fixed time', function() {
            let emitterInterface = new this.MockGeneratorEmitterInterface({
                startPhase: 1,
                rate: 10,
                fixedTime: 0.5
            });
            let generator = new NP.GeneratorPeriodic(emitterInterface);
            let dt = 1;
            let frameInterp = new this.MockFrameInterpolator(dt); 
            generator.update(dt, frameInterp);
            assert.equal(emitterInterface.updateGeneratorCount, 1);
            assert.equal(emitterInterface.shootParticleCount, 6);
            assert.equal(emitterInterface.disactivateEmitterCount, 1);
        });

        it('Fixed shots', function() {
            let emitterInterface = new this.MockGeneratorEmitterInterface({
                startPhase: 1,
                rate: 10,
                fixedShots: 5
            });
            let generator = new NP.GeneratorPeriodic(emitterInterface);
            let dt = 1;
            let frameInterp = new this.MockFrameInterpolator(dt); 
            generator.update(dt, frameInterp);
            assert.equal(emitterInterface.updateGeneratorCount, 1);
            assert.equal(emitterInterface.shootParticleCount, 5);
            assert.equal(emitterInterface.disactivateEmitterCount, 1);
        });

        function testNumFrames(numFrames) {
            let emitterInterface = new this.MockGeneratorEmitterInterface({
                startPhase: 0,
                rate: 10
            });
            let generator = new NP.GeneratorPeriodic(emitterInterface);
            let dt = 1;
            let frameInterp = new this.MockFrameInterpolator(dt); 
            for (let i = 0; i < numFrames; ++i)
                generator.update(dt, frameInterp);
            assert.equal(emitterInterface.updateGeneratorCount, numFrames);
            assert.equal(emitterInterface.shootParticleCount, generator.rate * numFrames);
            assert.equal(emitterInterface.disactivateEmitterCount, 0);
        }

        it('2 frames', function() {
            testNumFrames.call(this, 2);    
        });

        it('10 frames', function() {
            testNumFrames.call(this, 10);    
        });
    });
});