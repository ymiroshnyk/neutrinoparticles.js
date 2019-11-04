'use strict';

import * as Neutrino from '../dist/neutrinoparticles.umd'
import assert from 'assert';
import sinon from 'sinon';

describe('Generator', function()
{
    const sandbox = sinon.createSandbox();

    beforeEach(function() {

        this.emitter = {
            shootParticle: sandbox.fake.returns({})
        };
        
        this.generator = new Neutrino.Generator(this.emitter);
    });

    afterEach(function() {
        sandbox.restore();
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

        it('Should return exact number of valid particles', function() {
            let particlesLeft = 2;
            const emitter = {
                shootParticle: sandbox.fake(() => {
                    if (particlesLeft-- > 0)
                        return {};
                    else
                        return null;
                })
            }

            const generator = new Neutrino.Generator(emitter);
            generator.burstCount = 3;
            assert.equal(generator.burstParticles(1), 2);
            assert.equal(emitter.shootParticle.callCount, 3);
            assert(emitter.shootParticle.getCall(0).calledWithExactly(true, 1));
            assert(emitter.shootParticle.getCall(1).calledWithExactly(false, 1));
            assert(emitter.shootParticle.getCall(2).calledWithExactly(false, 1));
        })
    });
});