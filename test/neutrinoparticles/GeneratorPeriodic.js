'use strict';

import * as NP from '../../src/neutrinoparticles'
import * as math from '../../src/neutrinoparticles/Math'
import * as assert from 'assert'

describe('GeneratorPeriodic', function()
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
    });

    describe('constructor()', function()
    {
        it('should call initGenerator exactly once', function() {
            let emitter = new this.MockEmitter();
            let generatorModel = new this.MockGeneratorModel();
            let generator = new NP.GeneratorPeriodic(emitter, generatorModel);
            assert.equal(generatorModel.initCount, 1);
        });
    });

    describe('update()', function()
    {
        it('zero time, zero rate', function() {
            let emitter = new this.MockEmitter();
            let generatorModel = new this.MockGeneratorModel();
            let generator = new NP.GeneratorPeriodic(emitter, generatorModel);
            let frameInterp = new this.MockFrameInterpolator(0); 
            generator.update(0, frameInterp);
            assert.equal(generatorModel.updateCount, 1);
            assert.equal(emitter.shootParticleCount, 0);
            assert.equal(emitter.disactivateCount, 0);
        });

        it('zero time, non-zero rate', function() {
            let emitter = new this.MockEmitter();
            let generatorModel = new this.MockGeneratorModel();
            let generator = new NP.GeneratorPeriodic(emitter, generatorModel);
            let frameInterp = new this.MockFrameInterpolator(0); 
            generator.rate = 1;
            generator.update(0, frameInterp);
            assert.equal(generatorModel.updateCount, 1);
            assert.equal(emitter.shootParticleCount, 1);
            assert.equal(emitter.disactivateCount, 0);
        });

        it('0+1 particle to shoot withing 1 frame', function() {
            let emitter = new this.MockEmitter();
            let generatorModel = new this.MockGeneratorModel({
                startPhase: 0,
                rate: 1
            });
            let generator = new NP.GeneratorPeriodic(emitter, generatorModel);
            let dt = 1;
            let frameInterp = new this.MockFrameInterpolator(dt); 
            generator.update(dt, frameInterp);
            assert.equal(generatorModel.updateCount, 1);
            assert.equal(emitter.shootParticleCount, 1);
            assert.equal(emitter.disactivateCount, 0);
        });

        it('1+1 particle to shoot withing 1 frame', function() {
            let emitter = new this.MockEmitter();
            let generatorModel = new this.MockGeneratorModel({
                startPhase: 1,
                rate: 1
            });
            let generator = new NP.GeneratorPeriodic(emitter, generatorModel);
            let dt = 1;
            let frameInterp = new this.MockFrameInterpolator(dt); 
            generator.update(dt, frameInterp);
            assert.equal(generatorModel.updateCount, 1);
            assert.equal(emitter.shootParticleCount, 2);
            assert.equal(emitter.disactivateCount, 0);
        });

        it('1+10 particle to shoot withing 1 frame', function() {
            let emitter = new this.MockEmitter();
            let generatorModel = new this.MockGeneratorModel({
                startPhase: 1,
                rate: 10
            });
            let generator = new NP.GeneratorPeriodic(emitter, generatorModel);
            let dt = 1;
            let frameInterp = new this.MockFrameInterpolator(dt); 
            generator.update(dt, frameInterp);
            assert.equal(generatorModel.updateCount, 1);
            assert.equal(emitter.shootParticleCount, 11);
            assert.equal(emitter.disactivateCount, 0);
        });

        it('Fixed time', function() {
            let emitter = new this.MockEmitter();
            let generatorModel = new this.MockGeneratorModel({
                startPhase: 1,
                rate: 10,
                fixedTime: 0.5
            });
            let generator = new NP.GeneratorPeriodic(emitter, generatorModel);
            let dt = 1;
            let frameInterp = new this.MockFrameInterpolator(dt); 
            generator.update(dt, frameInterp);
            assert.equal(generatorModel.updateCount, 1);
            assert.equal(emitter.shootParticleCount, 6);
            assert.equal(emitter.disactivateCount, 1);
        });

        it('Fixed shots', function() {
            let emitter = new this.MockEmitter();
            let generatorModel = new this.MockGeneratorModel({
                startPhase: 1,
                rate: 10,
                fixedShots: 5
            });
            let generator = new NP.GeneratorPeriodic(emitter, generatorModel);
            let dt = 1;
            let frameInterp = new this.MockFrameInterpolator(dt); 
            generator.update(dt, frameInterp);
            assert.equal(generatorModel.updateCount, 1);
            assert.equal(emitter.shootParticleCount, 5);
            assert.equal(emitter.disactivateCount, 1);
        });

        function testNumFrames(numFrames) {
            let emitter = new this.MockEmitter();
            let generatorModel = new this.MockGeneratorModel({
                startPhase: 0,
                rate: 10
            });
            let generator = new NP.GeneratorPeriodic(emitter, generatorModel);
            let dt = 1;
            let frameInterp = new this.MockFrameInterpolator(dt); 
            for (let i = 0; i < numFrames; ++i)
                generator.update(dt, frameInterp);
            assert.equal(generatorModel.updateCount, numFrames);
            assert.equal(emitter.shootParticleCount, generator.rate * numFrames);
            assert.equal(emitter.disactivateCount, 0);
        }

        it('2 frames', function() {
            testNumFrames.call(this, 2);    
        });

        it('10 frames', function() {
            testNumFrames.call(this, 10);    
        });
    });
});