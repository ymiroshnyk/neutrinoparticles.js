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
            constructor() {
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

                emitter.addGeneratorModel(NP.GeneratorPeriodic, {
                    init: function(generator) {
                        ++thisEmitterModel.generatorModelInitCount;
                        // inits generator only once after emitter created
                        generator.rate = 1;
                        
                    },
                    update: function(generator, dt) {
                        ++thisEmitterModel.generatorModelUpdateCount;
                        // updates generator every emitter update when generator is active
                        //generator.rate = 1 + dt;
                    }
                });

                emitter.addTerminatorModel(NP.TerminatorCondit, {
                    init: function(terminator) {
                        ++thisEmitterModel.terminatorModelInitCount;
                        // inits terminator only once after emitter created
                    },
                    update: function(terminator, dt) {
                        ++thisEmitterModel.terminatorModelUpdateCount;
                        // works once per frame for emitter update.
                    },
                    checkParticle: function(terminator, particle) {
                        ++thisEmitterModel.terminatorModelCheckParticleCount;
                        // this works as part of update particle process, right after updateParticle.
                        return particle.time >= 10;
                    }
                });

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

    it('should call initEmitter exactly once', function() {
        let effect = new this.MockEffect();
        let pool = new NP.EmitterParticlesPool(10, function() { return {}; });
        let model = new this.SampleEmitterModel();
        let emitter = new NP.Emitter(effect, pool, model);
        assert.equal(pool.maxParticlesCount, 10);
        assert.equal(pool.numParticles, 0);
        emitter.initiate();
        assert.equal(pool.numParticles, 1);
        assert.equal(emitter.activeParticles.length, 1);
    });
})