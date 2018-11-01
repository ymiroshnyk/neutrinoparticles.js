'use strict';

import * as NP from '../../src/neutrinoparticles'
import * as math from '../../src/neutrinoparticles/Math'
import * as assert from 'assert'

describe('GeneratorDist', function()
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
            constructor(disp) {
                this.positionDisplaceLength = disp;
                this.emitterTime = 0;
                this.setCount = 0;
                this.setValues = undefined;
                this.setValuesEps = 0.0001;
            }

            set(interp) {
                ++this.setCount;

                if (this.setValues)
                {
                    assert.equal(this.setValues.length > 0, true);
                    assert.equal(Math.abs(this.setValues[0] - interp) < this.setValuesEps, true);
                    this.setValues.shift();
                }
            }
        }
        this.MockFrameInterpolator = MockFrameInterpolator;
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
        it('zero disp, zero segment', function() {
            let emitterInterface = new this.MockGeneratorEmitterInterface();
            let generator = new NP.GeneratorDist(emitterInterface);
            let frameInterp = new this.MockFrameInterpolator(0); 
            generator.update(0, frameInterp);
            assert.equal(generator.segment, 0);
            assert.equal(emitterInterface.updateGeneratorCount, 1);
            assert.equal(emitterInterface.shootParticleCount, 0);
            assert.equal(emitterInterface.disactivateEmitterCount, 0);
        });

        it('non-zero disp, zero segment', function() {
            let emitterInterface = new this.MockGeneratorEmitterInterface();
            let generator = new NP.GeneratorDist(emitterInterface);
            let frameInterp = new this.MockFrameInterpolator(10); 
            generator.update(0, frameInterp);
            assert.equal(generator.segment, 0);
            assert.equal(emitterInterface.updateGeneratorCount, 1);
            assert.equal(emitterInterface.shootParticleCount, 0);
            assert.equal(emitterInterface.disactivateEmitterCount, 0);
        });

        it('zero disp, non-zero segment', function() {
            let emitterInterface = new this.MockGeneratorEmitterInterface({
                segment: 1
            });
            let generator = new NP.GeneratorDist(emitterInterface);
            let frameInterp = new this.MockFrameInterpolator(0);
            generator.update(0, frameInterp);
            assert.equal(emitterInterface.updateGeneratorCount, 1);
            assert.equal(emitterInterface.shootParticleCount, 1);
            assert.equal(emitterInterface.disactivateEmitterCount, 0);
        });

        it('non-zero disp, non-zero segment', function() {
            let emitterInterface = new this.MockGeneratorEmitterInterface({
                segment: 1
            });
            let generator = new NP.GeneratorDist(emitterInterface);
            let frameInterp = new this.MockFrameInterpolator(10); 
            frameInterp.setValues = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
            generator.update(0, frameInterp);
            assert.equal(emitterInterface.updateGeneratorCount, 1);
            assert.equal(emitterInterface.shootParticleCount, 11);
            assert.equal(emitterInterface.disactivateEmitterCount, 0);
        });

        it('startPhase == 0', function() {
            let emitterInterface = new this.MockGeneratorEmitterInterface({
                segment: 1,
                startPhase: 0
            });
            let generator = new NP.GeneratorDist(emitterInterface);
            let frameInterp = new this.MockFrameInterpolator(10); 
            frameInterp.setValues = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
            generator.update(0, frameInterp);
            assert.equal(emitterInterface.updateGeneratorCount, 1);
            assert.equal(emitterInterface.shootParticleCount, 10);
            assert.equal(emitterInterface.disactivateEmitterCount, 0);
        });

        it('startPhase == 0.3', function() {
            let emitterInterface = new this.MockGeneratorEmitterInterface({
                segment: 1,
                startPhase: 0.3
            });
            let generator = new NP.GeneratorDist(emitterInterface);
            let frameInterp = new this.MockFrameInterpolator(10); 
            frameInterp.setValues = [0.07, 0.17, 0.27, 0.37, 0.47, 0.57, 0.67, 0.77, 0.87, 0.97];
            generator.update(0, frameInterp);
            assert.equal(emitterInterface.updateGeneratorCount, 1);
            assert.equal(emitterInterface.shootParticleCount, 10);
            assert.equal(emitterInterface.disactivateEmitterCount, 0);
        });

        function testMultipleFrames(numFrames) {
            let emitterInterface = new this.MockGeneratorEmitterInterface({
                segment: 1,
            });
            let generator = new NP.GeneratorDist(emitterInterface);
            let frameInterp = new this.MockFrameInterpolator(2); 

            frameInterp.setValues = [0];
            for (let i = 0; i < numFrames; ++i)
                frameInterp.setValues = frameInterp.setValues.concat([0.5, 1.0]);

            for (let i = 0; i < numFrames; ++i)
                generator.update(0, frameInterp);

            assert.equal(emitterInterface.updateGeneratorCount, numFrames);
            assert.equal(emitterInterface.shootParticleCount, 1 + numFrames * 2);
            assert.equal(emitterInterface.disactivateEmitterCount, 0);
        }

        it('2 frames', function() {
            testMultipleFrames.call(this, 2);
        });

        it('10 frames', function() {
            testMultipleFrames.call(this, 10);
        });
    });
});