'use strict';

import * as math from './Math'
import { FrameInterpolator } from './FrameInterpolator';

export class Emitter {
	constructor(effect, particlesPool, model) {
		var thisEmitter = this;
		this.effect = effect;
		this.particlesPool = particlesPool;
		this.model = model;

		this.position = [];
		this.prevPosition = [];
		this.rotation = [];
		this.prevRotation = [];

		this.activeParticles = [];
		this.inactiveParticles = [];

		this.generator = null;
		this.terminator = null;
		//this.attachedEmitterImpls = [];
		this.velocity = [];

		this.frameInterp = new FrameInterpolator(this);

		this.model.initEmitter(this);

		/*for (var partIndex = 0; partIndex < this.maxParticles; ++partIndex) {
			var particle = new Particle();

			for (var emitterIndex = 0; emitterIndex < this.attachedEmitterImpls.length; ++emitterIndex) {
				var attachedEmitterImpl = this.attachedEmitterImpls[emitterIndex];
				particle.attachEmitter(attachedEmitterImpl.impl, attachedEmitterImpl.props);
			}

			this.inactiveParticles.push(particle);
		}*/
	}

	initiate(position, rotation) {
		this._release();

		math.copyv3(this.position, position ? position : [0, 0, 0]);
		math.copyv3(this.prevPosition, this.position);
		math.copyq(this.rotation, rotation ? rotation : [0, 0, 0, 1]);
		math.copyq(this.prevRotation, this.rotation);

		this.time = 0.0;
		this.prevPositionTime = 0.0;
		this.active = true;
		this.paused = false;
		this.generatorsPaused = false;
		math.setv3(this.velocity, 0, 0, 0);

		this.generator.initiate();
	}
	
	update(dt, position, rotation) {

		this.prevPositionTime = this.time;

		if (position) {
			math.copyv3(this.prevPosition, this.position);
			if (dt > 0.0001) {
				math.subv3(this.velocity, position, this.prevPosition);
				math.divv3scalar(this.velocity, this.velocity, dt);
			}
			else {
				math.setv3(this.velocity, 0, 0, 0);
			}
		}
		else {
			math.setv3(this.velocity, 0, 0, 0);
		}

		if (rotation)
		{
			math.copyq(this.prevRotation, this.rotation);
		}

		if (this.paused) return;

		var particlesShot;

		if (this.active && !this.generatorsPaused) {
			this.frameInterp.begin(dt, position, rotation);
			particlesShot = this.generator.update(dt, position, rotation);
			this.frameInterp.end();
		}
		else {
			if (position)
				math.copyv3(this.position, position);

			if (rotation)
				math.copyq(this.rotation, rotation);

			particlesShot = 0;
			this.time += dt;
		}

		for (var partIndex = particlesShot; partIndex < this.activeParticles.length;) {
			var particle = this.activeParticles[partIndex];

			if (!particle.waitingForDelete) {
				particle.update(dt);

				if (this.terminator.checkParticle(this.activeParticles[partIndex])) {
					particle.onTerminated();

					if (this._killParticleIfReady(partIndex))
						continue;
				}
			}
			else {
				particle.updateAttachedEmitters(dt);

				if (this._killParticleIfReady(partIndex))
					continue;
			}

			++partIndex;
		}
	};

	createGeneratorEmitterInterface() {
		return {
			initGenerator: function(generator) { this.model.initGenerator(generator); },
			updateGenerator: function(dt, generator) { this.model.updateGenerator(dt, emitter, generator); },
			shootParticle: function() { return this.particlesPool.aquireParticle(); },
			disactivateEmitter: function() { this.active = false; }
		}
	}

	//draw(context, camera) {
	//	this.construct.draw(context, camera);
	//}

	//fillGeometryBuffers(cameraRight, cameraUp, cameraDir, renderBuffer) {
	//	this.construct.fillGeometryBuffers(cameraRight, cameraUp, cameraDir, renderBuffer);
	//}

	resetPosition(position, rotation) {
		this.prevPositionTime = this.time;

		if (position) {
			math.copyv3(this.prevPosition, this.position);
			math.copyv3(this.position, position);
		}

		if (rotation) {
			math.copyq(this.prevRotation, this.rotation);
			math.copyq(this.rotation, rotation);
		}
	}

	//attachEmitter(emitterImpl, emitterProps) {
	//	this.attachedEmitterImpls.push({ impl: emitterImpl, props: emitterProps });
	//}

	getNumParticles() {
		return this.activeParticles.length;
	}

	_killParticleIfReady(index) {
		var particle = this.activeParticles[index];
		var ready = true;

		for (var emitterIndex = 0; emitterIndex < particle.attachedEmitters.length; ++emitterIndex) {
			var emitter = particle.attachedEmitter(emitterIndex);

			if (emitter.activated() || emitter.activeParticles.length > 0) {
				ready = false;
				break;
			}
		}

		if (ready) {
			this.activeParticles.splice(index, 1);
			this.particlesPool.releaseParticle(particle);
			return true;
		}

		return false;
	}

	_release() {
		while (this.activeParticles.length > 0) {
			let particle = this.activeParticles.pop();
			for (let i = 0; i < particle.attachedEmitters.length; ++i) {
				particle.attachedEmitter(i)._release();
			}
			this.particlesPool.releaseParticle(particle);
		}
	}

	
}
