'use strict';

import * as Neutrino from '../dist/neutrinoparticles.umd.js'
import assert from 'assert'
import sinon from 'sinon'

const math = Neutrino.math;

const stateInterp = {
    set: sinon.fake()
}

const generatorModel = {
    initProps: null,
    init: sinon.fake(function(generator) 
    {
        if (this.initProps)
            Object.assign(generator, this.initProps);
    }),
    update: sinon.fake()
}

const emitter = {
    shootParticle: sinon.fake(),
    disactivate: sinon.fake()
}

describe('GeneratorPeriodic', function()
{
    beforeEach(function() {
    });

    afterEach(function() {
        sinon.reset();
    })

    describe('constructor()', function()
    {
        it('should call initGenerator exactly once', function() {
            const generator = new Neutrino.GeneratorPeriodic(emitter, generatorModel);
            assert.equal(generatorModel.init.callCount, 1);
        });
    });

    describe('initiate()', function() {
        it('should call super.initiate()', function() {
            const generator = new Neutrino.GeneratorPeriodic(emitter, generatorModel);
            const initiateStub = sinon.stub(Neutrino.Generator.prototype, 'initiate');
            generator.initiate();
            assert(initiateStub.calledOnce);
        })
    })

    describe('update()', function()
    {
        it('zero time, zero rate', function() {
            const generator = new Neutrino.GeneratorPeriodic(emitter, generatorModel);
            generator.initiate();
            generator.update(0, stateInterp);
            assert.equal(generatorModel.update.callCount, 1);
            assert.equal(emitter.shootParticle.callCount, 0);
            assert.equal(emitter.disactivate.callCount, 0);
        });

        it('zero time, non-zero rate', function() {
            generatorModel.initProps = {
                rate: 1
            };
            const generator = new Neutrino.GeneratorPeriodic(emitter, generatorModel);
            generator.initiate();
            generator.update(0, stateInterp);
            assert.equal(generatorModel.update.callCount, 1);
            assert.equal(emitter.shootParticle.callCount, 1);
            assert.equal(emitter.disactivate.callCount, 0);
        });

        it('non-zero time, zero rate', function() {
            generatorModel.initProps = {
                startPhase: 1,
                rate: 0
            };
            const generator = new Neutrino.GeneratorPeriodic(emitter, generatorModel);
            generator.initiate();
            generator.update(1, stateInterp);
            assert.equal(generatorModel.update.callCount, 1);
            assert.equal(emitter.shootParticle.callCount, 0);
        });

        it('0+1 particle to shoot withing 1 frame', function() {
            generatorModel.initProps = {
                startPhase: 0,
                rate: 1
            };
            const generator = new Neutrino.GeneratorPeriodic(emitter, generatorModel);
            generator.initiate();
            generator.update(1, stateInterp);
            assert.equal(generatorModel.update.callCount, 1);
            assert.equal(emitter.shootParticle.callCount, 1);
            assert.equal(emitter.disactivate.callCount, 0);
        });

        it('1+1 particle to shoot withing 1 frame', function() {
            generatorModel.initProps = {
                startPhase: 1,
                rate: 1
            };
            const generator = new Neutrino.GeneratorPeriodic(emitter, generatorModel);
            generator.initiate();
            generator.update(1, stateInterp);
            assert.equal(generatorModel.update.callCount, 1);
            assert.equal(emitter.shootParticle.callCount, 2);
            assert.equal(emitter.disactivate.callCount, 0);
        });

        it('1+10 particle to shoot withing 1 frame', function() {
            generatorModel.initProps = {
                startPhase: 1,
                rate: 10
            };
            const generator = new Neutrino.GeneratorPeriodic(emitter, generatorModel);
            generator.initiate();
            generator.update(1, stateInterp);
            assert.equal(generatorModel.update.callCount, 1);
            assert.equal(emitter.shootParticle.callCount, 11);
            assert.equal(emitter.disactivate.callCount, 0);
        });

        it('Fixed time', function() {
            generatorModel.initProps = {
                startPhase: 1,
                rate: 10,
                fixedTime: 0.5
            };
            const generator = new Neutrino.GeneratorPeriodic(emitter, generatorModel);
            generator.initiate();

            const stateInterp = {
                state: { time: 0 },
                set: sinon.fake(function(interp) {
                    this.state.time = math.lerp_(0, 1, interp);
                })
            }

            generator.update(1, stateInterp);
            assert.equal(generatorModel.update.callCount, 1);
            assert.equal(emitter.shootParticle.callCount, 6);
            assert.equal(emitter.disactivate.callCount, 1);
        });

        it('Fixed shots', function() {
            generatorModel.initProps = {
                startPhase: 1,
                rate: 10,
                fixedShots: 5
            };
            const generator = new Neutrino.GeneratorPeriodic(emitter, generatorModel);
            generator.initiate();
            generator.update(1, stateInterp);
            assert.equal(generatorModel.update.callCount, 1);
            assert.equal(emitter.shootParticle.callCount, 5);
            assert.equal(emitter.disactivate.callCount, 1);
        });

        function testNumFrames(numFrames) {
            generatorModel.initProps = {
                startPhase: 0,
                rate: 10
            };
            const generator = new Neutrino.GeneratorPeriodic(emitter, generatorModel);
            generator.initiate();
            for (let i = 0; i < numFrames; ++i)
                generator.update(1, stateInterp);
            assert.equal(generatorModel.update.callCount, numFrames);
            assert.equal(emitter.shootParticle.callCount, generator.rate * numFrames);
            assert.equal(emitter.disactivate.callCount, 0);
        }

        it('2 frames', function() {
            testNumFrames.call(this, 2);    
        });

        it('10 frames', function() {
            testNumFrames.call(this, 10);    
        });
    });
});