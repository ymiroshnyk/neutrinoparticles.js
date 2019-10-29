'use strict';

import * as Neutrino from '../dist/neutrinoparticles.umd.js';
import * as assert from 'assert';
import * as utils from './TestUtils'

const math = Neutrino.math;

describe('FrameInterpolator', function()
{
    beforeEach(function() {
        var defaultPosition = this.defaultPosition = [0, 0, 0];
        var defaultRotation = this.defaultRotation = math.axisangle2quat_([0, 1, 0], 0);

        class MockEffect {
            constructor() {
                this.time = 0;
            }
        }

        class MockEmitter {
            constructor(effect) {
                this.effect = effect;
                this.time = 0;
                this.position = defaultPosition.slice();
                this.rotation = defaultRotation.slice();
            }
        };

        this.effect = new MockEffect();
        this.emitter = new MockEmitter(this.effect);
        this.frameInterp = new Neutrino.FrameInterpolator(this.emitter);
    });

    describe('Empty location', function()
    {
        it('zero time', function() {
            this.frameInterp.begin(0);

            this.frameInterp.set(0);
            assert.equal(this.emitter.time, 0);
            assert.equal(this.effect.time, 0);
            utils.checkPosRot(this.emitter, this.defaultPosition, this.defaultRotation);

            this.frameInterp.set(0.5);
            assert.equal(this.emitter.time, 0);
            assert.equal(this.effect.time, 0);
            utils.checkPosRot(this.emitter, this.defaultPosition, this.defaultRotation);

            this.frameInterp.set(1);
            assert.equal(this.emitter.time, 0);
            assert.equal(this.effect.time, 0);
            utils.checkPosRot(this.emitter, this.defaultPosition, this.defaultRotation);

            this.frameInterp.end();
            assert.equal(this.emitter.time, 0);
            assert.equal(this.effect.time, 0);
            utils.checkPosRot(this.emitter, this.defaultPosition, this.defaultRotation);
        });

        it('non-zero time', function() {
            this.frameInterp.begin(1);

            this.frameInterp.set(0);
            assert.equal(this.emitter.time, 0);
            assert.equal(this.effect.time, 0);
            utils.checkPosRot(this.emitter, this.defaultPosition, this.defaultRotation);

            this.frameInterp.set(0.5);
            assert.equal(this.emitter.time, 0.5);
            assert.equal(this.effect.time, 0.5);
            utils.checkPosRot(this.emitter, this.defaultPosition, this.defaultRotation);

            this.frameInterp.set(1);
            assert.equal(this.emitter.time, 1);
            assert.equal(this.effect.time, 1);
            utils.checkPosRot(this.emitter, this.defaultPosition, this.defaultRotation);

            this.frameInterp.end();
            assert.equal(this.emitter.time, 1);
            assert.equal(this.effect.time, 1);
            utils.checkPosRot(this.emitter, this.defaultPosition, this.defaultRotation);
        });


    });

    describe('Valid location', function()
    {
        beforeEach(function() {
            this.thirdPosition = [1 / 3, 1 / 3, 1 / 3];
            this.validPosition = [1, 1, 1];
            this.thirdRotation = math.axisangle2quat_([0, 1, 0], 1 / 3);
            this.validRotation = math.axisangle2quat_([0, 1, 0], 1);
        });

        it('zero time', function() {
            this.frameInterp.begin(0, this.validPosition, this.validRotation);

            this.frameInterp.set(0);
            assert.equal(this.emitter.time, 0);
            assert.equal(this.effect.time, 0);
            utils.checkPosRotEps(this.emitter, this.defaultPosition, this.defaultRotation, 0.0001);

            this.frameInterp.set(1 / 3);
            assert.equal(this.emitter.time, 0);
            assert.equal(this.effect.time, 0);
            utils.checkPosRotEps(this.emitter, this.thirdPosition, this.thirdRotation, 0.0001);

            this.frameInterp.set(1);
            assert.equal(this.emitter.time, 0);
            assert.equal(this.effect.time, 0);
            utils.checkPosRotEps(this.emitter, this.validPosition, this.validRotation, 0.0001);

            this.frameInterp.end();
            assert.equal(this.emitter.time, 0);
            assert.equal(this.effect.time, 0);
            utils.checkPosRotEps(this.emitter, this.validPosition, this.validRotation, 0.0001);
        });

        it('non-zero time', function() {
            this.frameInterp.begin(1, this.validPosition, this.validRotation);

            this.frameInterp.set(0);
            utils.checkFloatEps(this.emitter.time, 0, 0.0001);
            utils.checkFloatEps(this.effect.time, 0, 0.0001);
            utils.checkPosRotEps(this.emitter, this.defaultPosition, this.defaultRotation, 0.0001);

            this.frameInterp.set(1 / 3);
            utils.checkFloatEps(this.emitter.time, 1 / 3, 0.0001);
            utils.checkFloatEps(this.effect.time, 1 / 3, 0.0001);
            utils.checkPosRotEps(this.emitter, this.thirdPosition, this.thirdRotation, 0.0001);

            this.frameInterp.set(1);
            utils.checkFloatEps(this.emitter.time, 1, 0.0001);
            utils.checkFloatEps(this.effect.time, 1, 0.0001);
            utils.checkPosRotEps(this.emitter, this.validPosition, this.validRotation, 0.0001);

            this.frameInterp.end();
            utils.checkFloatEps(this.emitter.time, 1, 0.0001);
            utils.checkFloatEps(this.effect.time, 1, 0.0001);
            utils.checkPosRotEps(this.emitter, this.validPosition, this.validRotation, 0.0001);
        });

    });
});