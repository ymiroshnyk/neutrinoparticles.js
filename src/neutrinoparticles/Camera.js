'use strict'

import * as math from './Math'


export class Camera2D {
	transform(pos, size) {
		return true;
	}
}

export class Camera3D extends Camera2D {
	constructor(screenSize, horizontalAngle) {
		super()
		this.screenPos = math.mulv2scalar_(screenSize, 0.5);
	    this.z = -(screenSize[0] * 0.5) / Math.tan(math.deg2rad_(horizontalAngle * 0.5));
	}

	transform(pos, size) {
		if (pos[2] < this.z)
			return false;

		let scale = -this.z / (pos[2] - this.z);
		math.addv2(pos, math.mulv2scalar_(math.subv2_(pos, this.screenPos), scale), this.screenPos);
		math.mulv2scalar(size, size, scale);

		return true;
	}
}
