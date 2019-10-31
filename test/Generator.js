'use strict';

import * as Neutrino from '../dist/neutrinoparticles.umd'
import * as assert from 'assert';
import sinon from 'sinon';

describe('Generator', function()
{
    beforeEach(function() {

        this.emitter = {
            shootParticle: sinon.fake.returns({})
        };
        
        this.generator = new Neutrino.Generator(this.emitter);
    });

    afterEach(function() {
        sinon.restore();
    })

    describe('burstParticles()', function()
    {
        it('burstCount == 0', function() {

            this.generator.burstCount = 0;
            this.generator.burstParticles(0);
            assert.equal(this.emitter.shootParticle.callCount, 0);
        });

        it('burstCount == 1', function() {
            this.generator.burstCount = 1;
            this.generator.burstParticles(2);
            assert.equal(this.emitter.shootParticle.callCount, 1);
        });

        it('burstCount == 10', function() {
            this.generator.burstCount = 10;
            this.generator.burstParticles(2);
            assert.equal(this.emitter.shootParticle.callCount, 10);
        });
    });
});