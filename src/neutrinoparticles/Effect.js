'use strict';

import * as math from './Math'

export class Effect {
	constructor(effectModel, position, rotation) {
		this.model = effectModel;

		this.position = [];
		this.rotation = [];
		this.emitters = [];
		//this.frameTimeSpent = 0.0;
		//this.time = 0.0;
		//this.frameTime = 0.0; // from IMPL
		//this.presimTime = 0.0; // from IMPL

		this._initiate(position, rotation);
		
		this.model.initSystemProps(this); //IMPL
		
		this._zeroUpdate();
	}

	addEmitter(emitter) {
		emitter.initiate(this.position, this.rotation);
		this.emitters.push(emitter);
	}

	restart(position, rotation) {

		this._initiate(position ? position : this.position, rotation ? rotation : this.rotation);

		for (var i = 0; i < this.emitters.length; ++i) {
			this.emitters[i].restart(this.position, this.rotation);
		}

		this._zeroUpdate();
	}

	update(dt, position, rotation) {
		var updatedTime = 0.0;
		var framePosition = this.position.slice();
		var frameRotation = this.rotation.slice();

		if (position && math.equalv3_(position, this.position))
			position = null;

		if (rotation && math.equalq_(rotation, this.rotation))
			rotation = null;

		while ((dt - updatedTime) + this.frameTimeSpent >= this.frameTime) {
			var timeBeforeFrame = this.time;
			updatedTime += this.frameTime - this.frameTimeSpent;
			var locationInterp = updatedTime / dt

			if (position)
				math.lerpv3(framePosition, this.position, position, locationInterp);

			if (rotation)
				math.slerpq(frameRotation, this.rotation, rotation, locationInterp);

			for (var i = 0; i < this.emitters.length; ++i) {
				this.emitters[i].update(this.frameTime, framePosition, frameRotation);

				this.time = timeBeforeFrame;
			}
			
			this.frameTimeSpent = 0.0;
			this.time = timeBeforeFrame + this.frameTime;
		}

		if (position)
			math.copyv3(this.position, position);

		if (rotation)
			math.copyq(this.rotation, rotation);

		this.frameTimeSpent += dt - updatedTime;
	}

	resetPosition(position, rotation) {
		if (position)
			math.copyv3(this.position, position);

		if (rotation)
			math.copyq(this.rotation, rotation);

		for (var i = 0; i < this.emitters.length; ++i) {
			this.emitters[i].resetPosition(this.position, this.rotation);
		}
	}
/*
	setPropertyInAllEmitters(name, value) {
		var propName = "_".concat(name);

		if (value instanceof Array) {
			if (value.length == 2) {
				for (var i = 0; i < this.emitters.length; ++i) {
					math.copyv2(this.emitters[i][propName], value);
				}
			}
			else {
				for (var i = 0; i < this.emitters.length; ++i) {
					math.copyv3(this.emitters[i][propName], value);
				}
			}
		}
		else {
			for (var i = 0; i < this.emitters.length; ++i) {
				this.emitters[i][propName] = value;
			}
		}
	}

	pauseAllEmitters() {
		for (var i = 0; i < this.emitters.length; ++i) {
			this.emitters[i].pause();
		}
	}

	unpauseAllEmitters() {
		for (var i = 0; i < this.emitters.length; ++i) {
			this.emitters[i].unpause();
		}
	}

	areAllEmittersPaused() {
		for (var i = 0; i < this.emitters.length; ++i) {
			if (!this.emitters[i].paused())
				return false;
		}
		return true;
	}

	pauseGeneratorsInAllEmitters() {
		for (var i = 0; i < this.emitters.length; ++i) {
			this.emitters[i].pauseGenerators();
		}
	}

	unpauseGeneratorsInAllEmitters() {
		for (var i = 0; i < this.emitters.length; ++i) {
			this.emitters[i].unpauseGenerators();
		}
	}

	areGeneratorsInAllEmittersPaused() {
		for (var i = 0; i < this.emitters.length; ++i) {
			if (!this.emitters[i].generatorsPaused())
				return false;
		}
		return true;
	}
*/
	getNumParticles() {
		var numParticles = 0;
		
		for (var i = 0; i < this.emitters.length; ++i) {
			numParticles += this.emitters[i].getNumParticles();
		}
		
		return numParticles;
	}

	_initiate(position, rotation) {
		this.frameTimeSpent = 0.0;
		this.time = 0.0;

		math.copyv3(this.position, position ? position : [0, 0, 0]);
		math.copyq(this.rotation, rotation ? rotation : [0, 0, 0, 1]);
	}

	_zeroUpdate() {
		for (var i = 0; i < this.emitters.length; ++i) {
			this.emitters[i].update(0, this.position, this.rotation);
		}

		this.update(this.presimTime, this.position, this.rotation);
	}
}
