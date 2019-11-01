'use strict';

import * as Neutrino from '../dist/neutrinoparticles.umd.js'
import assert from 'assert'
import * as utils from './TestUtils'
import sinon from 'sinon'

const math = Neutrino.math;

class GeneratorClass {
    constructor() {
        this.initiate = sinon.fake();
        this.update = sinon.fake.returns(0);
    }
}

class ShootingGeneratorClass {
    constructor(emitter, model) {
        this._emitter = emitter;
        
        this.initiate = sinon.fake();
        this.update = sinon.fake((dt, interp) => {
            if (this._emitter.shootParticle(true, dt))
                return 1;
            else
                return 0;
        });
    }
}

class MockEmitterModel {
    constructor(options) {
        this.generatorClass = options.generatorClass;
 
        this.initEmitter = sinon.fake(function(emitter) {
            emitter.addGeneratorModel(this.generatorClass, {});
        });
        this.initParticle = sinon.fake();
        this.burstInitParticle = sinon.fake();
        this.updateParticle = sinon.fake.returns(true);
        this.onParticleTerminated = sinon.fake();
    }
}

const emitterModel = new MockEmitterModel({ 
    generatorClass: GeneratorClass
});

const particlesPool = {
    aquireParticle: sinon.fake(() => {
        return {};
    }),
    releaseParticle: sinon.fake()
}

describe('Emitter', function()
{
    beforeEach(function() {
    });

    afterEach(function() {
        sinon.reset();
    })

    describe('constructor()', function(){
        it('valid constructor should call initEmitter exactly once', function() {
            const emitter = new Neutrino.Emitter({}, emitterModel);
            assert.equal(emitterModel.initEmitter.callCount, 1);
        });

        it('should thow on invalid partiles pool', function() {
            try {
                const emitter = new Neutrino.Emitter(null, emitterModel);
                assert(false);
            } catch(err) {}
        });

        it('should thow on invalid model', function() {
            try {
                const emitter = new Neutrino.Emitter({}, null);
                assert(false);
            } catch(err) {}
        });

    });

    describe('addGeneratorModel()', function() {
        it ('should add instance to generators', function() {
            const emitter = new Neutrino.Emitter({}, {});
            const generatorModel = {};
            const GeneratorClass = sinon.fake();

            emitter.addGeneratorModel(GeneratorClass, generatorModel);
            
            assert(GeneratorClass.calledOnceWithExactly(emitter, generatorModel));
            assert(emitter.generators.length == 1);
            assert(emitter.generators[0] instanceof GeneratorClass);
        })
    })

    describe('initiate()', function() {
        it("should call generator's initiate()", function() {
            const emitter = new Neutrino.Emitter({}, emitterModel);
            emitter.initiate();
            emitter.generators.forEach(function(generator) {
                assert.equal(generator.initiate.callCount, 1);
            });
        });

        it('position/rotation/velocity by default should be zero', function() {
            const emitter = new Neutrino.Emitter({}, {});
            emitter.initiate();

            assert(math.equalv3_(emitter.position, [0, 0, 0]));
            assert(math.equalq_(emitter.rotation, [0, 0, 0, 1]));
            assert(math.equalv3_(emitter.velocity, [0, 0, 0]));
        });

        it('should setup position, rotation and velocity', function() {
            const emitter = new Neutrino.Emitter({}, {});
            emitter.initiate({ 
                position: [1, 2, 3],
                rotation: [4, 5, 6, 7],
                velocity: [8, 9, 10]
            });
            
            assert(math.equalv3_(emitter.position, [1, 2, 3]));
            assert(math.equalq_(emitter.rotation, [4, 5, 6, 7]));
            assert(math.equalv3_(emitter.velocity, [8, 9, 10]));
        });

        it ('other public props should be inited by default', function() {
            const emitter = new Neutrino.Emitter({}, {});
            emitter.initiate();
            assert.equal(emitter.paused, false);
            assert.equal(emitter.generatorsPaused, false);
            assert.equal(emitter.effectTime, 0);
            assert.equal(emitter.time, 0);
        });

        it ('public props should be overridden correctly', function() {
            const emitter = new Neutrino.Emitter({}, {});
            emitter.initiate({
                paused: true,
                generatorsPaused: true,
                effectTime: 1
            });
            assert.equal(emitter.paused, true);
            assert.equal(emitter.generatorsPaused, true);
            assert.equal(emitter.effectTime, 1);

            assert.equal(emitter.time, 0);
        });

        it('should call update(0) if not paused', function() {
            const emitter = new Neutrino.Emitter({}, {});
            const updateSpy = sinon.spy(emitter, 'update');
            emitter.initiate();
            assert(updateSpy.calledOnceWithExactly(0));
        })

        it('should NOT call update() if paused', function() {
            const emitter = new Neutrino.Emitter({}, {});
            const updateSpy = sinon.spy(emitter, 'update');
            emitter.initiate({ paused: true });
            assert(updateSpy.notCalled);
        })
    });

    describe('update()', function() {

        beforeEach(function() {
            this.shootingEmitterModel = new MockEmitterModel({
                generatorClass: ShootingGeneratorClass
            });
        });

        it ('Non-shooting initiate+update should call generator.update() twice', function() {
            const emitter = new Neutrino.Emitter({}, emitterModel);
            emitter.initiate();
            emitter.update(0);
            emitter.generators.forEach(function(generator) {
                assert.equal(generator.update.callCount, 2);
            });
        });

        it ('Non-shooting update with position+rotation has store them correctly ', function() {
            const emitter = new Neutrino.Emitter({}, emitterModel);
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
            const emitter = new Neutrino.Emitter({}, emitterModel);
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
            const emitter = new Neutrino.Emitter({}, emitterModel);
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
            const emitter = new Neutrino.Emitter({}, emitterModel);
            emitter.initiate({ paused: true });
            emitter.update(1);
            emitter.generators.forEach((generator) => {
                assert(generator.update.notCalled);
            })            
        } )

        it ('Should not call generator when generatorsPaused', function() {
            const emitter = new Neutrino.Emitter({}, emitterModel);
            emitter.initiate({ generatorsPaused: true });
            emitter.update(1);
            emitter.generators.forEach((generator) => {
                assert(generator.update.notCalled);
            })            
        } )

        it('Should pass correct stateInterpolator and time to generator', function() {
            const emitter = new Neutrino.Emitter({}, emitterModel);
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

        it("Should skip update of just generated particles.", function() {
            const emitter = new Neutrino.Emitter(particlesPool, this.shootingEmitterModel);
            emitter.initiate(); // 1st particle shot and updated
            emitter.update(0); // 2nd particle shot and updated, and 1st only updated
            assert.equal(this.shootingEmitterModel.updateParticle.callCount, 3); 
        })

        it('Should kill particle right on the same update if necessary', function() {
            const emitterModel = new MockEmitterModel({
                generatorClass: ShootingGeneratorClass
            });
            emitterModel.updateParticle = sinon.fake(() => {
                return false; // means particle finished it's life
            });

            const emitter = new Neutrino.Emitter(particlesPool, emitterModel);
            emitter.initiate(); // 1st particle shot, updated and killed
            emitter.update(0); // 2nd particle shot, updated and killed

            assert.equal(particlesPool.aquireParticle.callCount, 2);
            const particle1 = particlesPool.aquireParticle.getCall(0).returnValue;
            const particle2 = particlesPool.aquireParticle.getCall(1).returnValue;

            // particles updated 2 times
            assert.equal(emitterModel.updateParticle.callCount, 2); 
            assert(emitterModel.updateParticle.getCall(0).calledWithExactly(particle1, 0, emitter));
            assert(emitterModel.updateParticle.getCall(1).calledWithExactly(particle2, 0, emitter));
            // emitterModel.onParticleTerminated() called for both particles
            assert.equal(emitterModel.onParticleTerminated.callCount, 2);
            assert(emitterModel.onParticleTerminated.getCall(0).calledWithExactly(particle1));
            assert(emitterModel.onParticleTerminated.getCall(1).calledWithExactly(particle2));
            // both particles was returned to the pool
            assert.equal(particlesPool.releaseParticle.callCount, 2);
            assert(particlesPool.releaseParticle.getCall(0).calledWithExactly(particle1));
            assert(particlesPool.releaseParticle.getCall(1).calledWithExactly(particle2));
            // no particles left in emitter
            assert.equal(emitter.particlesCount, 0);
        });
    });

    describe('shootParticle()', function() {
        it('Should return null if particles pool is full', function() {
            const fullParticlesPool = {
                aquireParticle: sinon.fake(function() { return null; })
            }
            const emitter = new Neutrino.Emitter(fullParticlesPool, emitterModel);
            emitter.initiate();
            assert.equal(emitter.shootParticle(true, 0), null);
        })

        it('Should init and update particle after it is shot', function() {
            const emitter = new Neutrino.Emitter(particlesPool, emitterModel);
            emitter.initiate();
            
            const particle1 = emitter.shootParticle(true, 1);
            const particle2 = emitter.shootParticle(false, 2);
            
            assert(particlesPool.aquireParticle.calledTwice);
            assert(particlesPool.aquireParticle.getCall(0).returned(particle1));
            assert(particlesPool.aquireParticle.getCall(1).returned(particle2));

            assert(emitterModel.initParticle.calledOnceWithExactly(particle1, emitter));
            assert(emitterModel.burstInitParticle.calledOnceWithExactly(particle2, emitter));

            assert(emitterModel.updateParticle.calledTwice);
            assert(emitterModel.updateParticle.getCall(0).calledWithExactly(particle1, 1, emitter));
            assert(emitterModel.updateParticle.getCall(1).calledWithExactly(particle2, 2, emitter));

            assert.equal(emitter.particlesCount, 2);
        })
    })

    describe('resetLocation()', function() {
        it('Should update position, rotation and velocity right away', function() {
            const emitter = new Neutrino.Emitter(particlesPool, emitterModel);
            emitter.initiate();
            emitter.resetLocation({
                position: [1, 2, 3],
                rotation: [4, 5, 6, 7],
                velocity: [8, 9, 10]
            });
            assert(math.equalv3_(emitter.position, [1, 2, 3]));
            assert(math.equalq_(emitter.rotation, [4, 5, 6, 7]));
            assert(math.equalv3_(emitter.velocity, [8, 9, 10]));
        })

        it('Should set zero velocity by defaul', function() {
            const emitter = new Neutrino.Emitter(particlesPool, emitterModel);
            emitter.initiate();
            emitter.update(1, [1, 1, 1]);
            assert(math.equalv3_(emitter.velocity, [1, 1, 1]));
            emitter.resetLocation();
            assert(math.equalv3_(emitter.velocity, [0, 0, 0]));
        })
    })

    describe('Pause/unpause', function() {
        it('Should set pause correctly', function() {
            const emitter = new Neutrino.Emitter(particlesPool, emitterModel);
            emitter.initiate();
            assert.equal(emitter.paused, false);    
            emitter.pause();
            assert.equal(emitter.paused, true);
        })

        it('Unpause should call update(0), and keep velocity', function() {
            const emitter = new Neutrino.Emitter(particlesPool, emitterModel);
            emitter.initiate({
                velocity: [1, 2, 3],
                paused: true
            });
            const updateSpy = sinon.spy(emitter, 'update');
            emitter.unpause();
            assert(updateSpy.calledOnceWithExactly(0));
            assert(math.equalv3_(emitter.velocity, [1, 2, 3]));
            assert.equal(emitter.paused, false);
        })
    })

    describe('Attached emitters', function() {

        class Generator {
            constructor(emitter, model) {
                const { particlesToShoot } = model;                

                this._emitter = emitter;
                this._particlesLeft = particlesToShoot;

                this.initiate = sinon.fake();
                this.update = sinon.fake((dt, stateInterp) => {
                    if (this._particlesLeft > 0) {
                        const particle = this._emitter.shootParticle(true, dt);

                        if (--this._particlesLeft == 0)
                            this._emitter.pauseGenerators();

                        return particle ? 1 : 0;
                    }
                    return 0;
                })
            }
        }

        class ChildEmitterParticlesPool {
            constructor() {
                this.aquireParticle = sinon.fake(() => {
                    return { frames: 0 }
                });

                this.releaseParticle = sinon.fake();
            }
        }

        class ParentEmitterParticlesPool {
            constructor(childEmitterPool, childEmitterModel) {
                this._childEmitterPool = childEmitterPool;
                this._childEmitterModel = childEmitterModel;
    
                this.aquireParticle = sinon.fake(() => {
                    return {
                        frames: 0,
                        attachedEmitters: [
                            new Neutrino.Emitter(this._childEmitterPool, this._childEmitterModel)
                        ]
                    }
                })

                this.releaseParticle = sinon.fake();
            }
        }

        class AttachEmitterModel {
            constructor(params) {
                const { 
                    particlesToShoot, 
                    lifeFrames,
                    onTerminate } = params;

                this.initEmitter = sinon.fake((emitter) => {
                    emitter.addGeneratorModel(Generator, {
                        particlesToShoot: particlesToShoot
                    });
                });

                const initParticle = (particle, emitter) => {
                    particle.frame = 0;
                    particle.attachedEmitters.forEach((attachedEmitter) => {
                        attachedEmitter.initiate({
                            paused: onTerminate
                        })
                    })
                }

                this.initParticle = sinon.fake(initParticle);
                this.burstInitParticle = sinon.fake(initParticle);

                this.updateParticle = sinon.fake((particle, dt, emitter) => {
                    return ++particle.frame != lifeFrames;
                });

                this.onParticleTerminated = sinon.fake((particle, emitter) => {
                    particle.attachedEmitters.forEach((attachedEmitter) => {
                        if (onTerminate)
                            attachedEmitter.unpause();
                        else
                            attachedEmitter.pauseGenerators();
                    })
                });
            }            
        }

        /*it('Should correctly simulate normal attached emitter', function() {
            const childParticlesPool = new ChildEmitterParticlesPool();
            const childEmitterModel = new AttachEmitterModel({
                particlesToShoot: 1000,
                lifeFrames: 1,
                onTerminate: false
            })
            const parentParticlesPool = new ParentEmitterParticlesPool(
                childParticlesPool, childEmitterModel);

            const parentEmitterModel = new AttachEmitterModel({
                particlesToShoot: 1,
                lifeFrames: 2,
                onTerminate: false
            })

            const emitter = new Neutrino.Emitter(parentParticlesPool, parentEmitterModel);
            emitter.initiate(); // parent particle shot
            emitter.update(1);
        })*/
    })
})