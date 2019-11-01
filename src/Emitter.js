'use strict';

import { EmitterInterpState } from './EmitterInterpState'
import { EmitterStateInterpolator } from './EmitterStateInterpolator';

import * as math from './Math'

export class Emitter {
	constructor(particlesPool, model) {

		if (!particlesPool)
			throw Error("Particles pool is invalid.");

		if (!model)
			throw Error("Emitter model is invalid.");

		this._particlesPool = particlesPool;
		this._model = model;
		this._effectTimeOnStart = 0;

		this._activeParticles = [];

		this._generators = [];

		//this._prevPositionTime = 0.0;
		this._paused = false;
		this._generatorsPaused = false;

		if (this._model.initEmitter)
			this._model.initEmitter(this);

		this._interpState = new EmitterInterpState();
		this._interpStatePrev = new EmitterInterpState();
		this._interpStateNext = new EmitterInterpState();
		this._stateInterpolator = new EmitterStateInterpolator();

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

	get generators() {
		return this._generators;
	}

	initiate(options) {
		const { position, rotation, velocity, paused, generatorsPaused, effectTime } = Object.assign({
			position: [0, 0, 0],
			rotation: [0, 0, 0, 1],
			velocity: [0, 0, 0],
			paused: false,
			generatorsPaused: false,
			effectTime: 0
		}, options)

		math.copyv3(this._interpState.position, position);
		math.copyq(this._interpState.rotation, rotation);
		math.copyv3(this._interpState.velocity, velocity);
		this._interpState.time = 0.0;
		
		this._effectTimeOnStart = effectTime;
		this._paused = paused;
		this._generatorsPaused = generatorsPaused;

		this._generators.forEach(function(generator) {
			generator.initiate();
		});

		if (!paused)
			this.update(0);
	}
	
	release()
	{
		while (this._activeParticles.length > 0) 
		{
			const particle = this._activeParticles.pop();

			if (particle.attachedEmitters) {
				particle.attachedEmitters.forEach((emitter) => {
					emitter.release();
				})
			}

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

	pause() {
		this._paused = true;
	}

	unpause() {
		if (this._paused) {
			this._paused = false;
			this.update(0);
		}
	}

	get generatorsPaused() {
		return this._generatorsPaused;
	}

	pauseGenerators() {
		this._generatorsPaused = true;
	}

	unpauseGenerators() {
		this._generatorsPaused = false;
	}

	get particlesCount() {
		return this._activeParticles.length;
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
			
			if (dt < 0.00001) {
				math.copyv3(next.velocity, prev.velocity);
			} else {
				math.setv3(next.velocity, 0, 0, 0);
			}
		}

		// Copy next rotation
		math.copyq(next.rotation, rotation || prev.rotation);

		// Set next time
		next.time = prev.time + dt;

		if (this._paused)
			return;
		
		// Prev and next states are ready for simulation

		let particlesShot = 0;

		this._stateInterpolator.begin(prev, next, this._interpState);

		if (!this._generatorsPaused) {
			this._generators.forEach((generator) => {
				particlesShot += generator.update(dt, this._stateInterpolator);
			})
		}

		this._stateInterpolator.end();

		for (let partIndex = particlesShot; partIndex < this._activeParticles.length;) {
			const particle = this._activeParticles[partIndex];

			if (!this._updateParticle(particle, dt)) {
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

		if (firstInBurst) {
			this._model.initParticle(particle, this);
		} else {
			this._model.burstInitParticle(particle, this);
		}

		if (this._updateAliveParticle(particle, simulateTime)) {
			this._activeParticles.unshift(particle);
			return particle;
		} else {
			this._particlesPool.releaseParticle(particle);
			return null;
		}
	}

	resetLocation(options) {
		const { position, rotation, velocity } = options || {};

		if (position) {
			math.copyv3(this._interpState.position, position);
		}

		if (rotation) {
			math.copyq(this._interpState.rotation, rotation);
		}

		if (velocity) {
			math.copyv3(this._interpState.velocity, velocity);
		} else {
			math.setv3(this._interpState.velocity, 0, 0, 0);
		}
	}

	_updateParticle(particle, dt) {
		if (particle._waitingForDelete) {
			this._updateWaitingForDeleteParticle(particle, dt);
			return false;
		}

		return this._updateAliveParticle(particle, dt);
	}

	_updateAliveParticle(particle, dt) {
		const waitingForDelete = !this._model.updateParticle(particle, dt, this);

		this._updateAttachedEmitters(particle, dt);

		if (waitingForDelete) {
			particle._waitingForDelete = true;
			this._model.onParticleTerminated(particle);
			return false;
		}
		return true;
	}

	_updateWaitingForDeleteParticle(particle, dt) {
		this._updateAttachedEmitters(particle, dt);
	}

	_updateAttachedEmitters(particle, dt) {
		if (particle.attachedEmitters) {
			particle.attachedEmitters.forEach((emitter) => {
				emitter.update(dt, particle.position, particle.rotation);
			});
		}
	}

	_killParticleIfReady(index) {
		const particle = this._activeParticles[index];
		
		let ready = true;

		if (particle.attachedEmitters) {
			for (let emitterIndex = 0; emitterIndex < particle.attachedEmitters.length; ++emitterIndex) {
				const emitter = particle.attachedEmitters[emitterIndex];

				if (emitter.particlesCount > 0) {
					ready = false;
					break;
				}
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
