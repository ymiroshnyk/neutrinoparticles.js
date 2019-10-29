'use strict';

import * as Neutrino from '../dist/neutrinoparticles.umd'
import * as assert from 'assert';

describe('Generator', function()
{
    beforeEach(function() {


        class EmptyEmitter {
            constructor() {
                this.shootParticleCount = 0;
            }

            shootParticle(firstInBurst, frameTimeToSimulate) {
                ++this.shootParticleCount;
                return {};          
            }
        };
        this.EmptyEmitter = EmptyEmitter;
        
        this.emitter = new this.EmptyEmitter();
        this.generator = new Neutrino.Generator(this.emitter);
    });

    describe('burstParticles()', function()
    {
        it('burstCount == 0', function() {
            this.generator.burstCount = 0;
            this.generator.burstParticles(0);
            assert.equal(this.emitter.shootParticleCount, 0);
        });

        it('burstCount == 1', function() {
            this.generator.burstCount = 1;
            this.generator.burstParticles(2);
            assert.equal(this.emitter.shootParticleCount, 1);
        });

        it('burstCount == 10', function() {
            this.generator.burstCount = 10;
            this.generator.burstParticles(2);
            assert.equal(this.emitter.shootParticleCount, 10);
        });
    });
});