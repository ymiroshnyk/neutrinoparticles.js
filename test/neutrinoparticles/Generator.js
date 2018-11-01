'use strict';

import * as NP from '../../src/neutrinoparticles';
import * as assert from 'assert';

describe('Generator', function()
{
    beforeEach(function() {


        class EmptyEmitter {
            constructor() {
                this.shootParticleCount = 0;
                this.particleInitCount = 0;
                this.particleInitBurstCount = 0;
                this.lastParticleUpdateTime = undefined;
            }

            shootParticle(frameTimeToSimulate) {
                ++this.shootParticleCount;
                var thisEmitter = this;
                return {
                    init: function() { ++thisEmitter.particleInitCount; },
                    initBurst: function() { ++thisEmitter.particleInitBurstCount; },
                    update: function(time) { thisEmitter.lastParticleUpdateTime = time; }
                };          
            }
        };
        this.EmptyEmitter = EmptyEmitter;
        
        this.emitter = new this.EmptyEmitter();
        this.generator = new NP.Generator(this.emitter);
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
            assert.equal(this.emitter.particleInitCount, 1);
            assert.equal(this.emitter.particleInitBurstCount, 0);
            assert.equal(this.emitter.lastParticleUpdateTime, 2);
        });

        it('burstCount == 10', function() {
            this.generator.burstCount = 10;
            this.generator.burstParticles(2);
            assert.equal(this.emitter.shootParticleCount, 10);
            assert.equal(this.emitter.particleInitCount, 1);
            assert.equal(this.emitter.particleInitBurstCount, 9);
            assert.equal(this.emitter.lastParticleUpdateTime, 2);
        });
    });
});