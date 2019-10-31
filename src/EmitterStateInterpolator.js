import * as math from './Math'

export class EmitterStateInterpolator
{
	constructor() {
		this._from = null;
		this._to = null;
		this._current = null;

		this._position = false;
		this._rotation = false;
		this._velocity = false;
		this._time = false;
	}

	begin(from, to, current) {
		if (math.equalv3_(from.position, to.position)) {
			math.copyv3(current.position, to.position);
            this._position = false;
		} else {
			this._position = true;
		}

		if (math.equalq_(from.rotation, to.rotation)) {
			math.copyq(current.rotation, to.rotation);
			this._rotation = false;
		} else {
			this._rotation = true;
		}
		
		if (math.equalv3_(from.velocity, to.velocity)) {
			math.copyv3(current.velocity, to.velocity);
			this._velocity = false;
		} else {
			this._velocity = true;
		}

		if (from.time === to.time) {
			current.time = to.time;
			this._time = false;
		} else {
			this._time = true;
		}

		this._from = from;
		this._to = to;
		this._current = current;
	}

	end() {
		if (this._position) {
			math.copyv3(this._current.position, this._to.position);
		}

		if (this._rotation) {
			math.copyq(this._current.rotation, this._to.rotation);
		}

		if (this._velocity) {
			math.copyv3(this._current.velocity, this._to.velocity);
		}

		this._current.time = this._to.time;
	}

	set(interp) {
        if (this._position) {
			math.lerpv3(this._current.position, this._from.position, this._to.position, interp);
		}

        if (this._rotation) {
			math.slerpq(this._current.rotation, this._from.rotation, this._to.rotation, interp);
		}

		if (this._velocity) {
			math.lerpv3(this._current.velocity, this._from.velocity, this._to.velocity, interp);
		}

		if (this._time) {
			this._current.time = math.lerp_(this._from.time, this._to.time, interp);
		}
    }
    
    get state() {
        return this._current;
	}
	
	get stateFrom() {
		return this._from;
	}

	get stateTo() {
		return this._to;
	}

	get positionChanging() { 
		return this._position;
	}
}

