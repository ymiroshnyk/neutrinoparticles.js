this.Camera2D = function () {
	}

	this.Camera2D.prototype.transform = function (pos, size) {
	    return true;
	}

	this.Camera3D = function (/**/screenSize, /**/horizAngle) {
	    this.screenPos = ctx.mulv2scalar_(/**/screenSize, 0.5);
	    this.z = -(/**/screenSize[0] * 0.5) / Math.tan(ctx.deg2rad_(/**/horizAngle * 0.5));
	}

	this.Camera3D.prototype./**/transform = function (/**/pos, /**/size) {
	    if (/**/pos[2] < this.z)
	        return false;

	    var scale = -this.z / (/**/pos[2] - this.z);
	    ctx.addv2(/**/pos, ctx.mulv2scalar_(ctx.subv2_(/**/pos, this.screenPos), scale), this.screenPos);
	    ctx.mulv2scalar(/**/size, /**/size, scale);

	    return true;
	}