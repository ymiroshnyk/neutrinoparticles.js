'use strict';

import * as Neutrino from '../dist/neutrinoparticles.umd.js'
import assert from 'assert'
import sinon from 'sinon'
import * as utils from'./TestUtils'

const math = Neutrino.math;

let stateInterp, generatorModel, emitter;

describe('GeneratorDist', function()
{
    beforeEach(function() {
        stateInterp = {
            set: sinon.fake()
        }
        
        generatorModel = {
            initProps: null,
            init: sinon.fake(function(generator) 
            {
                if (this.initProps)
                    Object.assign(generator, this.initProps);
            }),
            update: sinon.fake()
        }
        
        emitter = {
            shootParticle: sinon.fake(),
            disactivate: sinon.fake()
        }
    });

    afterEach(function() {
        sinon.reset();
    })

    describe('constructor()', function()
    {
        it('should call initGenerator exactly once', function() {
            const generator = new Neutrino.GeneratorDist(emitter, generatorModel);
            assert.equal(generatorModel.init.callCount, 1);
        });
    });

    describe('initiate()', function() {
        it('should call super.initiate()', function() {
            const generator = new Neutrino.GeneratorDist(emitter, generatorModel);
            const initiateStub = sinon.stub(Neutrino.Generator.prototype, 'initiate');
            generator.initiate();
            assert(initiateStub.calledOnce);
        })
    })

    describe('update()', function()
    {
        it('zero disp, zero segment', function() {
            const generator = new Neutrino.GeneratorDist(emitter, generatorModel);
            generator.initiate();
            generator.update(0, stateInterp);
            assert.equal(generator.segment, 0);
            assert.equal(generatorModel.update.callCount, 1);
            assert.equal(emitter.shootParticle.callCount, 0);
        });

        it('non-zero disp, zero segment', function() {
            const generator = new Neutrino.GeneratorDist(emitter, generatorModel);
            generator.initiate();

            stateInterp.stateFrom = { position: [0, 0, 0] };
            stateInterp.stateTo = { position: [10, 0, 0] };
            stateInterp.positionChanging = true;

            generator.update(0, stateInterp);
            assert.equal(generator.segment, 0);
            assert.equal(generatorModel.update.callCount, 1);
            assert.equal(emitter.shootParticle.callCount, 0);
            assert.equal(emitter.disactivate.callCount, 0);
        });

        it('zero disp, non-zero segment', function() {
            generatorModel.initProps = {
                segment: 1
            };
            const generator = new Neutrino.GeneratorDist(emitter, generatorModel);
            generator.initiate();

            stateInterp.positionChanging = false;

            generator.update(0, stateInterp);
            assert.equal(generatorModel.update.callCount, 1);
            assert.equal(emitter.shootParticle.callCount, 1);
            assert.equal(emitter.disactivate.callCount, 0);
        });

        it('non-zero disp, non-zero segment', function() {
            generatorModel.initProps = {
                segment: 1
            };
            const generator = new Neutrino.GeneratorDist(emitter, generatorModel);
            generator.initiate();

            stateInterp.stateFrom = { position: [0, 0, 0] };
            stateInterp.stateTo = { position: [10, 0, 0] };
            stateInterp.positionChanging = true;

            generator.update(0, stateInterp);
            assert.equal(generatorModel.update.callCount, 1);
            assert.equal(emitter.shootParticle.callCount, 11);
            assert.equal(emitter.disactivate.callCount, 0);

            utils.checkFakeArguments(stateInterp.set, 
                [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
                (a, b) => { utils.checkFloatEps(a, b, 0.0001); });
        });

        it('startPhase == 0', function() {
            generatorModel.initProps = {
                segment: 1,
                startPhase: 0
            };
            const generator = new Neutrino.GeneratorDist(emitter, generatorModel);
            generator.initiate();
            
            stateInterp.stateFrom = { position: [0, 0, 0] };
            stateInterp.stateTo = { position: [10, 0, 0] };
            stateInterp.positionChanging = true;

            generator.update(0, stateInterp);
            assert.equal(generatorModel.update.callCount, 1);
            assert.equal(emitter.shootParticle.callCount, 10);
            assert.equal(emitter.disactivate.callCount, 0);

            utils.checkFakeArguments(stateInterp.set, 
                [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
                (a, b) => { utils.checkFloatEps(a, b, 0.0001); });
        });

        it('startPhase == 0.3', function() {
            generatorModel.initProps = {
                segment: 1,
                startPhase: 0.3
            };
            const generator = new Neutrino.GeneratorDist(emitter, generatorModel);
            generator.initiate();
            
            stateInterp.stateFrom = { position: [0, 0, 0] };
            stateInterp.stateTo = { position: [10, 0, 0] };
            stateInterp.positionChanging = true;
            
            
            generator.update(0, stateInterp);
            assert.equal(generatorModel.update.callCount, 1);
            assert.equal(emitter.shootParticle.callCount, 10);
            assert.equal(emitter.disactivate.callCount, 0);

            utils.checkFakeArguments(stateInterp.set, 
                [0.07, 0.17, 0.27, 0.37, 0.47, 0.57, 0.67, 0.77, 0.87, 0.97],
                (a, b) => { utils.checkFloatEps(a, b, 0.0001); });
        });

        function testMultipleFrames(numFrames) {
            generatorModel.initProps = {
                segment: 1
            };
            const generator = new Neutrino.GeneratorDist(emitter, generatorModel);
            generator.initiate();

            stateInterp.stateFrom = { position: [0, 0, 0] };
            stateInterp.stateTo = { position: [2, 0, 0] };
            stateInterp.positionChanging = true;

            for (let i = 0; i < numFrames; ++i)
                generator.update(0, stateInterp);

            assert.equal(generatorModel.update.callCount, numFrames);
            assert.equal(emitter.shootParticle.callCount, 1 + numFrames * 2);
            assert.equal(emitter.disactivate.callCount, 0);

            let setValues = [0];
            for (let i = 0; i < numFrames; ++i)
                setValues = setValues.concat([0.5, 1.0]);

            utils.checkFakeArguments(stateInterp.set, setValues,
                (a, b) => { utils.checkFloatEps(a, b, 0.0001); });
        }

        it('2 frames', function() {
            testMultipleFrames.call(this, 2);
        });

        it('10 frames', function() {
            testMultipleFrames.call(this, 10);
        });
    });
});