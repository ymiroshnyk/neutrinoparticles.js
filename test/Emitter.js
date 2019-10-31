'use strict';

import * as Neutrino from '../dist/neutrinoparticles.umd.js'
import assert from 'assert'
import * as utils from './TestUtils'
import sinon from 'sinon'

const math = Neutrino.math;
/*
class MockParticlesPool {
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
*/

class GeneratorClass {
    constructor() {
        this.initiate = sinon.fake();
        this.update = sinon.fake.returns(0);
    }
}

class TerminatorClass {
    constructor() {
        this.initiate = sinon.fake();
        this.check = sinon.fake();
    }
}

const emitterModel = {
    initEmitter: sinon.fake(function(emitter) {
        emitter.addGeneratorModel(GeneratorClass, {});
        emitter.addTerminatorModel(TerminatorClass, {});
    })
}

describe('Emitter', function()
{
    beforeEach(function() {
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

    afterEach(function() {
        sinon.reset();
    })

    describe('constructor()', function(){
        it('valid constructor should call initEmitter exactly once', function() {
            const emitter = new Neutrino.Emitter({}, emitterModel, {});
            assert.equal(emitterModel.initEmitter.callCount, 1);
        });

        it('should thow on invalid partiles pool', function() {
            try {
                const emitter = new Neutrino.Emitter(null, emitterModel, {});
                assert(false);
            } catch(err) {}
        });

        it('should thow on invalid model', function() {
            try {
                const emitter = new Neutrino.Emitter({}, null, {});
                assert(false);
            } catch(err) {}
        });

        it('should thow on invalid frame interpolator', function() {
            try {
                const emitter = new Neutrino.Emitter({}, emitterModel, null);
                assert(false);
            } catch(err) {}
        });
    });

    describe('addGeneratorModel()', function() {
        it ('should add instance to generators', function() {
            const emitter = new Neutrino.Emitter({}, {}, {});
            const generatorModel = {};
            const GeneratorClass = sinon.fake();

            emitter.addGeneratorModel(GeneratorClass, generatorModel);
            
            assert(GeneratorClass.calledOnceWithExactly(emitter, generatorModel));
            assert(emitter.generators.length == 1);
            assert(emitter.generators[0] instanceof GeneratorClass);
        })
    })

    describe('addTerminatorModel()', function() {
        it ('should add instance to terminators', function() {
            const emitter = new Neutrino.Emitter({}, {}, {});
            const terminatorModel = {};
            const TerminatorClass = sinon.fake();

            emitter.addTerminatorModel(TerminatorClass, terminatorModel);

            assert(TerminatorClass.calledOnceWithExactly(emitter, terminatorModel));
            assert(emitter._terminators.length == 1);
            assert(emitter._terminators[0] instanceof TerminatorClass);
        })
    })

    describe('initiate()', function() {
        it("should call generator's initiate()", function() {
            const emitter = new Neutrino.Emitter({}, emitterModel, {});
            emitter.initiate();
            emitter.generators.forEach(function(generator) {
                assert.equal(generator.initiate.callCount, 1);
            });
        });

        it("should call terminators's initiate()", function() {
            const emitter = new Neutrino.Emitter({}, emitterModel, {});
            emitter.initiate();
            emitter.terminators.forEach(function(terminator) {
                assert.equal(terminator.initiate.callCount, 1);
            });
        });

        it('position/rotation/velocity by default should be zero', function() {
            const emitter = new Neutrino.Emitter({}, {}, {});
            emitter.initiate();

            assert(math.equalv3_(emitter.position, [0, 0, 0]));
            assert(math.equalq_(emitter.rotation, [0, 0, 0, 1]));
            assert(math.equalv3_(emitter.velocity, [0, 0, 0]));
        });

        it('should setup position and rotation', function() {
            const emitter = new Neutrino.Emitter({}, {}, {});
            emitter.initiate({ 
                position: [1, 2, 3],
                rotation: [4, 5, 6, 7],
            });
            
            assert(math.equalv3_(emitter.position, [1, 2, 3]));
            assert(math.equalq_(emitter.rotation, [4, 5, 6, 7]));
            assert(math.equalv3_(emitter.velocity, [0, 0, 0]));
        });

        it ('public props should be inited by default', function() {
            const emitter = new Neutrino.Emitter({}, {}, {});
            emitter.initiate();
            assert.equal(emitter.paused, false);
            assert.equal(emitter.generatorsPaused, false);
            assert.equal(emitter.active, true)
            assert.equal(emitter.effectTime, 0);
            assert.equal(emitter.time, 0);
        });

        it ('public props should be overridden correctly', function() {
            const emitter = new Neutrino.Emitter({}, {}, {});
            emitter.initiate({
                paused: true,
                generatorsPaused: true,
                effectTime: 1
            });
            assert.equal(emitter.paused, true);
            assert.equal(emitter.generatorsPaused, true);
            assert.equal(emitter.effectTime, 1);

            assert.equal(emitter.active, true)
            assert.equal(emitter.time, 0);
        });

        it('should call update(0) if not paused', function() {
            const emitter = new Neutrino.Emitter({}, {}, {});
            const updateSpy = sinon.spy(emitter, 'update');
            emitter.initiate();
            assert(updateSpy.calledOnceWithExactly(0));
        })

        it('should NOT call update() if paused', function() {
            const emitter = new Neutrino.Emitter({}, {}, {});
            const updateSpy = sinon.spy(emitter, 'update');
            emitter.initiate({ paused: true });
            assert(updateSpy.notCalled);
        })
    });

    describe('update()', function() {

        beforeEach(function() {
            this.ShootingGeneratorClass = function(emitter) {
                this._emitter = emitter;
                
                this.initiate = sinon.fake();
                this.update = sinon.fake((dt, interp) => {
                    this._emitter.shootParticle(true, 1);
                    return 1;
                });
            }
            
            this.shootingEmitterModel = {
                initEmitter: sinon.fake(function(emitter) {
                    emitter.addGeneratorModel(this.ShootingGeneratorClass, {});
                })
            }
        });

        it ('Non-shooting initiate+update should call generator.update() twice', function() {
            const emitter = new Neutrino.Emitter({}, emitterModel, {});
            emitter.initiate();
            emitter.update(0);
            emitter.generators.forEach(function(generator) {
                assert.equal(generator.update.callCount, 2);
            });
        });

        it ('Non-shooting update with position+rotation has store them correctly ', function() {
            const emitter = new Neutrino.Emitter({}, emitterModel, {});
            emitter.initiate();

            {
                const position = [1, 2, 3];
                const rotation = math.axisangle2quat_([0, 1, 0], 45);
                emitter.update(0, position, rotation);
                utils.checkPosRot(emitter, position, rotation);
            }
            {
                const position = [2, 4, 6];
                const rotation = math.axisangle2quat_([0, 1, 0], 90);
                emitter.update(1, position, rotation);
                utils.checkPosRot(emitter, position, rotation);
            }
        });

        function testCalculateVelocity(paused) {
            const emitter = new Neutrino.Emitter({}, emitterModel, {});
            emitter.initiate({ paused: paused });

            assert.equal(emitter.paused, paused);

            emitter.update(2, [2, 4, 6]);
            assert(math.equalv3eps_(emitter.velocity, [1, 2, 3], 0.0001));
            
            emitter.update(0, [1, 1, 1]);
            assert(math.equalv3_(emitter.velocity, [0, 0, 0]));
        }

        it ('Paused should calculate velocity correctly', function() {
            testCalculateVelocity(true);
        })

        it ('Not paused should calculate velocity correctly', function() {
            testCalculateVelocity(false);
        })

        function testUpdateTime(paused) {
            const emitter = new Neutrino.Emitter({}, emitterModel, {});
            emitter.initiate({ paused: paused });

            assert.equal(emitter.paused, paused);

            emitter.update(2);
            assert.equal(emitter.time, 2);
            emitter.update(0);
            assert.equal(emitter.time, 2);
        }

        it ('Paused should update time correctly', function() {
            testUpdateTime(true);
        })

        it ('Not-paused should update time correctly', function() {
            testUpdateTime(false);
        })

        it ('Should not call generator when paused', function() {
            const emitter = new Neutrino.Emitter({}, emitterModel, {});
            emitter.initiate({ paused: true });
            emitter.update(1);
            emitter.generators.forEach((generator) => {
                assert(generator.update.notCalled);
            })            
        } )

        it ('Should not call generator when generatorsPaused', function() {
            const emitter = new Neutrino.Emitter({}, emitterModel, {});
            emitter.initiate({ generatorsPaused: true });
            emitter.update(1);
            emitter.generators.forEach((generator) => {
                assert(generator.update.notCalled);
            })            
        } )

        it('Should pass correct stateInterpolator and time to generator', function() {
            const emitter = new Neutrino.Emitter({}, emitterModel, {});
            emitter.initiate();

            {
                emitter.update(2, [2, 4, 6], [1, 2, 3, 4]);
                const updateArgs = emitter.generators[0].update.lastCall.args;
                const interp = updateArgs[1];

                assert.equal(updateArgs[0], 2);
                assert(math.equalv3_(interp.stateFrom.position, [0, 0, 0]));
                assert(math.equalv3_(interp.stateFrom.rotation, [0, 0, 0, 1]));
                assert(math.equalv3_(interp.stateFrom.velocity, [0, 0, 0]));
                assert.equal(interp.stateFrom.time, 0);

                assert(math.equalv3_(interp.stateTo.position, [2, 4, 6]));
                assert(math.equalv3_(interp.stateTo.rotation, [1, 2, 3, 4]));
                assert(math.equalv3eps_(interp.stateTo.velocity, [1, 2, 3], 0.0001));
                assert.equal(interp.stateTo.time, 2);
            }

            {
                emitter.update(2, [4, 8, 12], [2, 4, 6, 8]);
                const updateArgs = emitter.generators[0].update.lastCall.args;
                const interp = updateArgs[1];

                assert.equal(updateArgs[0], 2);
                assert(math.equalv3_(interp.stateFrom.position, [2, 4, 6]));
                assert(math.equalv3_(interp.stateFrom.rotation, [1, 2, 3, 4]));
                assert(math.equalv3eps_(interp.stateFrom.velocity, [1, 2, 3], 0.0001));
                assert.equal(interp.stateFrom.time, 2);

                assert(math.equalv3_(interp.stateTo.position, [4, 8, 12]));
                assert(math.equalv3_(interp.stateTo.rotation, [2, 4, 6, 8]));
                assert(math.equalv3eps_(interp.stateTo.velocity, [1, 2, 3], 0.0001));
                assert.equal(interp.stateTo.time, 4);
            }
        })
    });
})