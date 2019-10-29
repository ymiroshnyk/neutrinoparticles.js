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

		this.generators = [];
		this.terminators = [];
		//this.attachedEmitterImpls = [];
		this.velocity = [];

		this.generatorsPaused = false;

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

	addGeneratorModel(GeneratorClass, generatorModel) {
		this.generators.push(new GeneratorClass(this, generatorModel));
	}

	addTerminatorModel(TerminatorClass, terminatorModel) {
		this.terminators.push(new TerminatorClass(this, terminatorModel));
	}

	initiate(position, rotation, options) {
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

		if (options) {
			Object.assign(this, options);
		}

		this.generators.forEach(function(generator) {
			generator.initiate();
		});

		this.terminators.forEach(function(terminator) {
			terminator.initiate();
		});

		this.update(0);
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
			let frameInterp = this.frameInterp;
			frameInterp.begin(dt, position, rotation);
			this.generators.forEach(function(generator) {
				particlesShot += generator.update(dt, frameInterp);
			})
			frameInterp.end();
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

				let terminate = false;
				for (let termIndex = 0; termIndex < this.terminators.length; ++termIndex) {
					if (this.terminators[termIndex].checkParticle(this.activeParticles[partIndex])) {
						terminate = true;
						break;
					}
				}

				if (terminate) {
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

	shootParticle(firstInBurst, simulateTime) {
		let particle = this.particlesPool.aquireParticle();

		if (!particle)
			return null;

		this.activeParticles.unshift(particle);

		if (firstInBurst) {
			this.model.initParticle(this, particle);
		} else {
			this.model.burstInitParticle(this, particle);
		}

		this.model.updateParticle(this, particle, simulateTime);

		return particle;
	}

	disactivate() {
		this.active = false;
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
