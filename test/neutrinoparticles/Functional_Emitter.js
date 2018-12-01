'use strict';

'use strict';

import * as NP from '../../src/neutrinoparticles'
import * as math from '../../src/neutrinoparticles/Math'
import * as assert from 'assert'
import * as Utils from './TestUtils'

describe('Emitter functional', function()
{
    beforeEach(function() {
        this.MockEffect = class MockEffect {
            constructor() {
                this.time = 0;
            }
        }
       
        
        this.SampleEmitterModel = class SampleEmitterModel {
            constructor(generatorModel, terminatorModel) {
                this.generatorModel = generatorModel;
                this.terminatorModel = terminatorModel;
                this.initEmitterCount = 0;
                this.initParticleCount = 0;
                this.burstInitParticleCount = 0;
                this.updateParticleCount = 0;
                this.generatorModelInitCount = 0;
                this.generatorModelUpdateCount = 0;
                this.terminatorModelInitCount = 0;
                this.terminatorModelUpdateCount = 0;
                this.terminatorModelCheckParticleCount = 0;
            }

            initEmitter(emitter) {
                ++this.initEmitterCount;

                var thisEmitterModel = this;

                emitter.addGeneratorModel(NP.GeneratorPeriodic, this.generatorModel);
                emitter.addTerminatorModel(NP.TerminatorCondit, this.terminatorModel);

                /*emitter.addConstructorModel(NP.ConstructQuads, {
                    init: function(constr) {
                        // inits constructor only once after emitter created
                    },
                    update: function(constr, dt) {
                        // works once per frame for emitter update.
                    },
                    updateParticle: function(constr, particle) {
                        // updates parameters of construction and stores them inside particle.
                        // these data will be used by constructor afterwards on every render request.
                        // update goes only on each emitter update frame (like 1/30 of second), and
                        // render may go with different frequency, so all necessary data for the
                        // constructor has to be baked inside particle.
                    }
                });*/
            }

            initParticle(emitter, particle) {
                ++this.initParticleCount;

                particle.time = 0;
            }

            burstInitParticle(emitter, particle) {
                ++this.burstInitParticleCount;

                particle.time = 0;
            }

            updateParticle(emitter, particle, dt) {
                ++this.updateParticleCount;

                particle.time += dt;
            }
        }
    });

    describe('Emitter.initiate()', function() {
        it('With generator.rate == 1 should generate particle right after Emitter.initiate()', function() {
            let generatorModel = {
                init: function(generator) {
                    generator.rate = 1;
                    generator.startPhase = 1;
                }
            };

            let terminatorModel = {
                checkParticle: function(terminator, particle) {
                    return particle.time >= 10;
                }
            };
            
            let effect = new this.MockEffect();
            let pool = new NP.EmitterParticlesPool(10, function() { return {}; });
            let model = new this.SampleEmitterModel(generatorModel, terminatorModel);
            let emitter = new NP.Emitter(effect, pool, model);
            assert.equal(pool.maxParticlesCount, 10);
            assert.equal(pool.numParticles, 0);
            emitter.initiate();
            assert.equal(pool.numParticles, 1);
            assert.equal(emitter.activeParticles.length, 1);
        });

        it('With generator.rate != 1 should not generate particle right after Emitter.initiate()', function() {
            function makeTest(rate) {
                let generatorModel = {
                    init: function(generator) {
                        generator.rate = 1;
                        generator.startPhase = 0.99;
                    }
                };
    
                let terminatorModel = {
                    checkParticle: function(terminator, particle) {
                        return particle.time >= 10;
                    }
                };
                
                let effect = new this.MockEffect();
                let pool = new NP.EmitterParticlesPool(10, function() { return {}; });
                let model = new this.SampleEmitterModel(generatorModel, terminatorModel);
                let emitter = new NP.Emitter(effect, pool, model);
                assert.equal(pool.maxParticlesCount, 10);
                assert.equal(pool.numParticles, 0);
                emitter.initiate();
                assert.equal(pool.numParticles, 0);
                assert.equal(emitter.activeParticles.length, 0);
            }
            
            makeTest.call(this, 0.99);
            makeTest.call(this, 0.5);
            makeTest.call(this, 0);
        });

        it('With generator.rate == 1 and generators paused should not generate particle right after Emitter.initiate()', function() {
            let generatorModel = {
                init: function(generator) {
                    generator.rate = 1;
                    generator.startPhase = 1;
                }
            };

            let terminatorModel = {
                checkParticle: function(terminator, particle) {
                    return particle.time >= 10;
                }
            };
            
            let effect = new this.MockEffect();
            let pool = new NP.EmitterParticlesPool(10, function() { return {}; });
            let model = new this.SampleEmitterModel(generatorModel, terminatorModel);
            let emitter = new NP.Emitter(effect, pool, model);
            assert.equal(pool.maxParticlesCount, 10);
            assert.equal(pool.numParticles, 0);
            emitter.initiate(null, null, { generatorsPaused: true });
            assert.equal(pool.numParticles, 0);
            assert.equal(emitter.activeParticles.length, 0);
        });
    })
})