'use strict';

import { EmitterInterpState } from './EmitterInterpState'
import { EmitterStateInterpolator } from './EmitterStateInterpolator';

import * as math from './Math'

export class Emitter {
	constructor(particlesPool, model, frameInterp) {

		if (!particlesPool)
			throw Error("Particles pool is invalid.");

		if (!model)
			throw Error("Emitter model is invalid.");

		if (!frameInterp)
			throw Error("Frame interpolator is invalid.");

		this._particlesPool = particlesPool;
		this._model = model;
		this._frameInterp = frameInterp;
		this._effectTimeOnStart = 0;

		this._activeParticles = [];

		this._generators = [];
		this._terminators = [];

		//this._prevPositionTime = 0.0;
		this._active = false;
		this._paused = false;
		this._generatorsPaused = false;

		if (this._model.initEmitter)
			this._model.initEmitter(this);

		this._interpState = new EmitterInterpState();
		this._interpStatePrev = new EmitterInterpState();
		this._interpStateNext = new EmitterInterpState();
		this._stateIntepolator = new EmitterStateInterpolator();

		/*
		if (this._model.createInterpState) {
			this._interpState.user = this._model.createInterpState();
			this._interpStatePrev.user = this._model.createInterpState();
			this._interpStateNext.user = this._model.createInterpState();
		}
		*/
	}

	addGeneratorModel(GeneratorClass, generatorModel) {
		this._generators.push(new GeneratorClass(this, generatorModel));
	}

	addTerminatorModel(TerminatorClass, terminatorModel) {
		this._terminators.push(new TerminatorClass(this, terminatorModel));
	}

	get generators() {
		return this._generators;
	}

	get terminators() {
		return this._terminators;
	}

	initiate(options) {
		const { position, rotation, paused, generatorsPaused, effectTime } = Object.assign({
			position: [0, 0, 0],
			rotation: [0, 0, 0, 1],
			paused: false,
			generatorsPaused: false,
			effectTime: 0
		}, options)

		math.copyv3(this._interpState.position, position);
		math.copyq(this._interpState.rotation, rotation);
		math.setv3(this._interpState.velocity, 0, 0, 0);
		this._interpState.time = 0.0;
		
		this._effectTimeOnStart = effectTime;
		this._active = true;
		this._paused = paused;
		this._generatorsPaused = generatorsPaused;

		this._generators.forEach(function(generator) {
			generator.initiate();
		});

		this._terminators.forEach(function(terminator) {
			terminator.initiate();
		});

		if (!paused)
			this.update(0);
	}
	
	release()
	{
		while (this._activeParticles.length > 0) 
		{
			const particle = this._activeParticles.pop();

			particle.attachedEmitters.forEach((emitter) => {
				emitter._release();
			})

			this._particlesPool.releaseParticle(particle);
		}
	}

	get interpState() {
		return this._interpState;
	}

	get position() {
		return this._interpState.position;
	}

	get rotation() {
		return this._interpState.rotation;
	}

	get velocity() {
		return this._interpState.velocity;
	}

	get time() {
		return this._interpState.time;
	}

	get effectTime() {
		return this._effectTimeOnStart + this.time;
	}

	get paused() {
		return this._paused;
	}

	get active() {
		return this._active;
	}

	get generatorsPaused() {
		return this._generatorsPaused;
	}

	update(dt, position, rotation) {
		// Swap prev & current
		{ 
			const prev = this._interpStatePrev; 
			this._interpStatePrev = this._interpState; 
			this._interpState = prev; 
		}

		const prev = this._interpStatePrev;
		const next = this._paused ? this._interpState : this._interpStateNext;

		// Calculate next position/velocity
		if (position) {
			math.copyv3(next.position, position);

			if (dt < 0.00001) {
				math.setv3(next.velocity, 0, 0, 0);
			} else {
				math.subv3(next.velocity, position, prev.position);
				math.divv3scalar(next.velocity, next.velocity, dt);
			}
		}
		else {
			math.copyv3(next.position, prev.position);
			math.setv3(next.velocity, 0, 0, 0);
		}

		// Copy next rotation
		math.copyq(next.rotation, rotation || prev.rotation);
		
		// Set next time
		next.time = prev.time + dt;

		if (this._paused)
			return;
		
		// Prev and next states are ready for simulation

		let particlesShot = 0;

		this._stateIntepolator.begin(prev, next, this._interpState);

		if (this._active && !this._generatorsPaused) {
			this._generators.forEach((generator) => {
				particlesShot += generator.update(dt, this._stateInterpolator);
			})
		}

		this._stateIntepolator.end();

		for (let partIndex = particlesShot; partIndex < this._activeParticles.length;) {
			const particle = this._activeParticles[partIndex];

			if (!particle.waitingForDelete) {
				particle.update(dt);

				let terminate = false;
				for (let termIndex = 0; termIndex < this._terminators.length; ++termIndex) {
					if (this._terminators[termIndex].checkParticle(this._activeParticles[partIndex])) {
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
		const particle = this._particlesPool.aquireParticle();

		if (!particle)
			return null;

		this._activeParticles.unshift(particle);

		if (firstInBurst) {
			this._model.initParticle(particle, this);
		} else {
			this._model.burstInitParticle(particle, this);
		}

		this._model.updateParticle(particle, simulateTime, this);

		return particle;
	}

	disactivate() {
		this._active = false;
	}

	//draw(context, camera) {
	//	this.construct.draw(context, camera);
	//}

	//fillGeometryBuffers(cameraRight, cameraUp, cameraDir, renderBuffer) {
	//	this.construct.fillGeometryBuffers(cameraRight, cameraUp, cameraDir, renderBuffer);
	//}

	resetPosition(position, rotation) {
		//this._prevPositionTime = this.time;

		if (position) {
			math.copyv3(this._prevPosition, this.position);
			math.copyv3(this.position, position);
		}

		if (rotation) {
			math.copyq(this._prevRotation, this.rotation);
			math.copyq(this.rotation, rotation);
		}
	}

	//attachEmitter(emitterImpl, emitterProps) {
	//	this.attachedEmitterImpls.push({ impl: emitterImpl, props: emitterProps });
	//}

	getNumParticles() {
		return this._activeParticles.length;
	}

	_killParticleIfReady(index) {
		var particle = this._activeParticles[index];
		var ready = true;

		for (var emitterIndex = 0; emitterIndex < particle.attachedEmitters.length; ++emitterIndex) {
			var emitter = particle.attachedEmitter(emitterIndex);

			if (emitter.activated() || emitter.activeParticles.length > 0) {
				ready = false;
				break;
			}
		}

		if (ready) {
			this._activeParticles.splice(index, 1);
			this._particlesPool.releaseParticle(particle);
			return true;
		}

		return false;
	}

}
