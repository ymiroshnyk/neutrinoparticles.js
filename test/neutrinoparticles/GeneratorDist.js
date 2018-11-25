'use strict';

import * as NP from '../../src/neutrinoparticles'
import * as math from '../../src/neutrinoparticles/Math'
import * as assert from 'assert'

describe('GeneratorDist', function()
{
    beforeEach(function() {

        class MockGeneratorModel {
            constructor(initProps) {
                this.initProps = initProps;
                this.initCount = 0;
                this.updateCount = 0;
            }

            init(generator) {
                ++this.initCount;
                if (this.initProps)
                    Object.assign(generator, this.initProps);
            }

            update() {
                ++this.updateCount;
            }
        }
        this.MockGeneratorModel = MockGeneratorModel;

        class MockEmitter {
            constructor() {
                this.shootParticleCount = 0;
                this.disactivateCount = 0;
            }

            shootParticle() {
                ++this.shootParticleCount;
            }

            disactivate() {
                ++this.disactivateCount;
            }
        }
        this.MockEmitter = MockEmitter;

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
            let emitter = new this.MockEmitter();
            let generatorModel = new this.MockGeneratorModel();
            let generator = new NP.GeneratorDist(emitter, generatorModel);
            assert.equal(generatorModel.initCount, 1);
        });
    });

    describe('update()', function()
    {
        it('zero disp, zero segment', function() {
            let emitter = new this.MockEmitter();
            let generatorModel = new this.MockGeneratorModel();
            let generator = new NP.GeneratorDist(emitter, generatorModel);
            let frameInterp = new this.MockFrameInterpolator(0); 
            generator.update(0, frameInterp);
            assert.equal(generator.segment, 0);
            assert.equal(generatorModel.updateCount, 1);
            assert.equal(emitter.shootParticleCount, 0);
            assert.equal(emitter.disactivateCount, 0);
        });

        it('non-zero disp, zero segment', function() {
            let emitter = new this.MockEmitter();
            let generatorModel = new this.MockGeneratorModel();
            let generator = new NP.GeneratorDist(emitter, generatorModel);
            let frameInterp = new this.MockFrameInterpolator(10); 
            generator.update(0, frameInterp);
            assert.equal(generator.segment, 0);
            assert.equal(generatorModel.updateCount, 1);
            assert.equal(emitter.shootParticleCount, 0);
            assert.equal(emitter.disactivateCount, 0);
        });

        it('zero disp, non-zero segment', function() {
            let emitter = new this.MockEmitter();
            let generatorModel = new this.MockGeneratorModel({
                segment: 1
            });
            let generator = new NP.GeneratorDist(emitter, generatorModel);
            let frameInterp = new this.MockFrameInterpolator(0);
            generator.update(0, frameInterp);
            assert.equal(generatorModel.updateCount, 1);
            assert.equal(emitter.shootParticleCount, 1);
            assert.equal(emitter.disactivateCount, 0);
        });

        it('non-zero disp, non-zero segment', function() {
            let emitter = new this.MockEmitter();
            let generatorModel = new this.MockGeneratorModel({
                segment: 1
            });
            let generator = new NP.GeneratorDist(emitter, generatorModel);
            let frameInterp = new this.MockFrameInterpolator(10); 
            frameInterp.setValues = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
            generator.update(0, frameInterp);
            assert.equal(generatorModel.updateCount, 1);
            assert.equal(emitter.shootParticleCount, 11);
            assert.equal(emitter.disactivateCount, 0);
        });

        it('startPhase == 0', function() {
            let emitter = new this.MockEmitter();
            let generatorModel = new this.MockGeneratorModel({
                segment: 1,
                startPhase: 0
            });
            let generator = new NP.GeneratorDist(emitter, generatorModel);
            let frameInterp = new this.MockFrameInterpolator(10); 
            frameInterp.setValues = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
            generator.update(0, frameInterp);
            assert.equal(generatorModel.updateCount, 1);
            assert.equal(emitter.shootParticleCount, 10);
            assert.equal(emitter.disactivateCount, 0);
        });

        it('startPhase == 0.3', function() {
            let emitter = new this.MockEmitter();
            let generatorModel = new this.MockGeneratorModel({
                segment: 1,
                startPhase: 0.3
            });
            let generator = new NP.GeneratorDist(emitter, generatorModel);
            let frameInterp = new this.MockFrameInterpolator(10); 
            frameInterp.setValues = [0.07, 0.17, 0.27, 0.37, 0.47, 0.57, 0.67, 0.77, 0.87, 0.97];
            generator.update(0, frameInterp);
            assert.equal(generatorModel.updateCount, 1);
            assert.equal(emitter.shootParticleCount, 10);
            assert.equal(emitter.disactivateCount, 0);
        });

        function testMultipleFrames(numFrames) {
            let emitter = new this.MockEmitter();
            let generatorModel = new this.MockGeneratorModel({
                segment: 1
            });
            let generator = new NP.GeneratorDist(emitter, generatorModel);
            let frameInterp = new this.MockFrameInterpolator(2); 

            frameInterp.setValues = [0];
            for (let i = 0; i < numFrames; ++i)
                frameInterp.setValues = frameInterp.setValues.concat([0.5, 1.0]);

            for (let i = 0; i < numFrames; ++i)
                generator.update(0, frameInterp);

            assert.equal(generatorModel.updateCount, numFrames);
            assert.equal(emitter.shootParticleCount, 1 + numFrames * 2);
            assert.equal(emitter.disactivateCount, 0);
        }

        it('2 frames', function() {
            testMultipleFrames.call(this, 2);
        });

        it('10 frames', function() {
            testMultipleFrames.call(this, 10);
        });
    });
});