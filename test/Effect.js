'use strict';

import * as Neutrino from '../dist/neutrinoparticles.umd.js';
import * as assert from 'assert';
import * as utils from './TestUtils'

const math = Neutrino.math;

describe('Effect', function()
{
    beforeEach(function() {
        class EmptyEffectModel {
            constructor() {
                this. initSystemPropsCount = 0;
            }

            initSystemProps(effect) { 
                ++this.initSystemPropsCount; 
                effect.frameTime = 1 / 30;
                effect.presimTime = 0;
            }
        };
        this.EmptyEffectModel = EmptyEffectModel;

        class EmptyEmitter {
            constructor() {
                this.initiateCount = 0;
                this.updateCount = 0;
                this.restartCount = 0;
                this.resetPositionCount = 0;
                this.getNumParticlesCount = 0;
            }

            initiate(position, rotation) { 
                ++this.initiateCount; 
                this._setLocation(position, rotation);
            }
            update(dt, position, rotation) { 
                ++this.updateCount; 
                this._setLocation(position, rotation);
            }

            restart(position, rotation) {
                ++this.restartCount;
                this._setLocation(position, rotation);
            }

            resetPosition(position, rotation) {
                ++this.resetPositionCount;
                this._setLocation(position, rotation);
            }

            getNumParticles() {
                ++this.getNumParticlesCount;
                return 1;
            }

            _setLocation(position, rotation) {
                this.position = position.slice();
                this.rotation = rotation.slice();
            }
        };
        this.EmptyEmitter = EmptyEmitter;

        class OneEmitterEffectModel extends EmptyEffectModel {
            constructor(emitter) { 
                super(); 
                this.emitter = emitter;
            }
            initSystemProps(effect) { 
                super.initSystemProps(effect);
                effect.addEmitter(this.emitter);
            }
        }
        this.OneEmitterEffectModel = OneEmitterEffectModel;

        class TwoEmittersEffectModel extends EmptyEffectModel {
            constructor(emitter0, emitter1) { 
                super(); 
                this.emitter0 = emitter0;
                this.emitter1 = emitter1;
            }
            initSystemProps(effect) { 
                super.initSystemProps(effect);
                effect.addEmitter(this.emitter0);
                effect.addEmitter(this.emitter1);
            }
        }
        this.TwoEmittersEffectModel = TwoEmittersEffectModel;

        this.emptyPosition = [0, 0, 0];
        this.emptyRotation = [0, 0, 0, 1];
        this.samplePosition = [1, 2, 3];
        this.sampleRotation = math.axisangle2quat_([0, 1, 0], 45);
    });

    describe('construct', function()
    {
        it('construct without error', function() {
            var effect = new Neutrino.Effect(new this.EmptyEffectModel());
            assert.equal(effect.model.initSystemPropsCount, 1);
            assert.equal(effect.time, 0.0);
            assert.equal(effect.frameTimeSpent, 0.0);
        });

        it('init position and rotation correctly 1', function() {
            var effect = new Neutrino.Effect(new this.EmptyEffectModel());
            utils.checkPosRot(effect, this.emptyPosition, this.emptyRotation);
        });

        it('init position and rotation correctly 2', function() {
            var effect = new Neutrino.Effect(new this.EmptyEffectModel(), null, null);
            utils.checkPosRot(effect, this.emptyPosition, this.emptyRotation);
        });

        it('init position and rotation correctly 3', function() {
            var effect = new Neutrino.Effect(new this.EmptyEffectModel(), 
                this.samplePosition, this.sampleRotation);
            utils.checkPosRot(effect, this.samplePosition, this.sampleRotation);
        });

        it('add emitter correctly', function() {
            var emitter = new this.EmptyEmitter();
            var effect = new Neutrino.Effect(new this.OneEmitterEffectModel(emitter));
            assert.equal(effect.emitters.length, 1);
            assert.equal(effect.emitters[0], emitter);
            assert.equal(emitter.initiateCount, 1);
            assert.equal(emitter.updateCount, 1);
            utils.checkPosRot(emitter, this.emptyPosition, this.emptyRotation);
        });
    });

    describe('restart', function() {
        beforeEach(function() {
            this.emitter = new this.EmptyEmitter();
            this.effect = new Neutrino.Effect(new this.OneEmitterEffectModel(this.emitter));
        });

        it('without parameters', function() {
            this.effect.restart();
            assert.equal(this.emitter.restartCount, 1);
            utils.checkPosRot(this.emitter, this.effect.position, this.effect.rotation);
        });

        it('with parameters', function() {
            this.emitter.updateCount = 0;
            this.effect.restart(this.samplePosition, this.sampleRotation);
            assert.equal(this.emitter.restartCount, 1);
            assert.equal(this.emitter.updateCount, 1);
            utils.checkPosRot(this.emitter, this.samplePosition, this.sampleRotation);
        });
    });

    describe('update', function() {
        beforeEach(function() {
            this.emitter = new this.EmptyEmitter();
            this.effect = new Neutrino.Effect(new this.OneEmitterEffectModel(this.emitter));
        });

        it("time less than frame shouldn't update emitter", function() {
            this.emitter.updateCount = 0;
            this.effect.update(this.effect.frameTime * 0.99);
            assert.equal(this.emitter.updateCount, 0);
        });

        it("frame time update with no move passed", function() {
            this.emitter.updateCount = 0;
            var effectPositionBefore = this.effect.position.slice();
            var effectRotationBefore = this.effect.rotation.slice();
            var emitterPositionBefore = this.emitter.position.slice();
            var emitterRotationBefore = this.emitter.rotation.slice();
            this.effect.update(this.effect.frameTime);
            assert.equal(this.emitter.updateCount, 1);
            utils.checkPosRot(this.effect, effectPositionBefore, effectRotationBefore);
            utils.checkPosRot(this.emitter, emitterPositionBefore, emitterRotationBefore);
        });

        it("frame time update with the same position", function() {
            this.emitter.updateCount = 0;
            var effectPositionBefore = this.effect.position.slice();
            var effectRotationBefore = this.effect.rotation.slice();
            var emitterPositionBefore = this.emitter.position.slice();
            var emitterRotationBefore = this.emitter.rotation.slice();
            this.effect.update(this.effect.frameTime, effectPositionBefore, effectRotationBefore);
            assert.equal(this.emitter.updateCount, 1);
            utils.checkPosRot(this.effect, effectPositionBefore, effectRotationBefore);
            utils.checkPosRot(this.emitter, emitterPositionBefore, emitterRotationBefore);
        });

        it("frame time update with move", function() {
            this.emitter.updateCount = 0;
            var effectPositionAfter = [1, 1, 1];
            var effectRotationAfter = math.axisangle2quat_([0, 1, 0], 90);
            this.effect.update(this.effect.frameTime, effectPositionAfter, effectRotationAfter);
            assert.equal(this.emitter.updateCount, 1);
            utils.checkPosRot(this.effect, effectPositionAfter, effectRotationAfter);
            utils.checkPosRot(this.emitter, effectPositionAfter, effectRotationAfter);
        });

        it("two half frames update with move", function() {
            this.emitter.updateCount = 0;
            var effectPositionAfter = [1, 1, 1];
            var effectRotationAngleAfter = 90;

            for (var i = 0; i < 2; ++i) {
                this.effect.update(this.effect.frameTime / 2, 
                    math.mulv3scalar_(effectPositionAfter, (i + 1) * 0.5), 
                    math.axisangle2quat_([0, 1, 0], (i + 1) * effectRotationAngleAfter * 0.5));
            }

            assert.equal(this.emitter.updateCount, 1);
            utils.checkPosRotEps(this.effect, effectPositionAfter, 
                math.axisangle2quat_([0, 1, 0], effectRotationAngleAfter), 0.0001);
            utils.checkPosRotEps(this.emitter, effectPositionAfter, 
                math.axisangle2quat_([0, 1, 0], effectRotationAngleAfter), 0.0001);
        });

        var scaledFrameTimeUpdateWithMove = function(scale) {
            var truncScale = Math.trunc(scale);
            this.emitter.updateCount = 0;
            var effectPositionBefore = this.effect.position.slice();
            var effectRotationBefore = this.effect.rotation.slice();
            var effectPositionAfter = [scale, scale, scale];
            var effectRotationAfter = math.axisangle2quat_([0, 1, 0], scale);
            this.effect.update(this.effect.frameTime * scale, effectPositionAfter, effectRotationAfter);
            assert.equal(this.emitter.updateCount, truncScale);
            utils.checkPosRotEps(this.effect, effectPositionAfter, effectRotationAfter, 0.0001);
            utils.checkPosRotEps(this.emitter, [truncScale, truncScale, truncScale], 
                math.axisangle2quat_([0, 1, 0], truncScale), 0.0001);
        }

        it("1.5 x frame time update with move", function() {
            scaledFrameTimeUpdateWithMove.call(this, 1.5);
        });

        it("2.5 x frame time update with move", function() {
            scaledFrameTimeUpdateWithMove.call(this, 2.5);
        });

        it("100.1 x frame time update with move", function() {
            scaledFrameTimeUpdateWithMove.call(this, 100.1);
        });
        
    });

    describe('resetPosition', function() {
        beforeEach(function() {
            this.emitter = new this.EmptyEmitter();
            this.effect = new Neutrino.Effect(new this.OneEmitterEffectModel(this.emitter));
        });

        it("with no parameters", function() {
            this.effect.resetPosition();
            assert.equal(this.emitter.resetPositionCount, 1);
            utils.checkPosRot(this.effect, this.emptyPosition, this.emptyRotation);
            utils.checkPosRot(this.emitter, this.emptyPosition, this.emptyRotation);
        });

        it("with null parameters", function() {
            this.effect.resetPosition(null, null);
            assert.equal(this.emitter.resetPositionCount, 1);
            utils.checkPosRot(this.effect, this.emptyPosition, this.emptyRotation);
            utils.checkPosRot(this.emitter, this.emptyPosition, this.emptyRotation);
        });

        it("with parameters", function() {
            this.effect.resetPosition(this.samplePosition, this.sampleRotation);
            assert.equal(this.emitter.resetPositionCount, 1);
            utils.checkPosRot(this.effect, this.samplePosition, this.sampleRotation);
            utils.checkPosRot(this.emitter, this.samplePosition, this.sampleRotation);
        });
    });

    describe('getNumParticles', function() {
        beforeEach(function() {
            this.emitter0 = new this.EmptyEmitter();
            this.emitter1 = new this.EmptyEmitter();
            this.effect = new Neutrino.Effect(new this.TwoEmittersEffectModel(this.emitter0, this.emitter1));
        });

        it("should call getNumParticles from all emitters exactly once and sum results", function() {
            var particlesCount = this.effect.getNumParticles();
            assert.equal(this.emitter0.getNumParticlesCount, 1);
            assert.equal(this.emitter1.getNumParticlesCount, 1);
            assert.equal(particlesCount, this.emitter0.getNumParticles() + this.emitter1.getNumParticles());
        });
    });
});