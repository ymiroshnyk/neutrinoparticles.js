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
            constructor(generator) {
            }

            initEmitter(emitter) {
                emitter.addGeneratorModel(NP.GeneratorPeriodic, {
                    init: function(generator) {
                        // inits generator only once after emitter created
                        generator.rate = 1;
                    },
                    update: function(generator, dt) {
                        // updates generator every emitter update when generator is active
                        //generator.rate = 1 + dt;
                    }
                });

                emitter.addTerminatorModel(NP.TerminatorCondit, {
                    init: function(terminator) {
                        // inits terminator only once after emitter created
                    },
                    update: function(generator, dt) {
                        // works once per frame for emitter update.
                    },
                    checkParticle: function(generator, particle) {
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
                particle.time = 0;
            }

            burstInitParticle(emitter, particle) {
                particle.time = 0;
            }

            updateParticle(emitter, particle, dt) {
                particle.time += dt;
            }
        }
    });

    it('should call initEmitter exactly once', function() {
    });
})