this.clampToNoise = function (val) {
		if (val < 0)
			return Math.floor(ctx.noiseSize - 1 + val % ctx.noiseSize);
		else
			return Math.floor(val % ctx.noiseSize);
	}
	
	this.noisePixel3 = function (r, x, y, z) {
		var rgbDisp = 3 * (y * ctx.noiseSize + x);
		var view = ctx.noise[z];

		r[0] = view.getUint8(rgbDisp);
		r[1] = view.getUint8(rgbDisp + 1);
		r[2] = view.getUint8(rgbDisp + 2);
	}

	this.noisePixelLinear3 = function (r, pos) {
		if (ctx.noise == null) {
			ctx.setv3(r, 128, 128, 128);
			return;
		}

		var scaledPosX = pos[0] * ctx.noiseSize;
		var scaledPosY = pos[1] * ctx.noiseSize;
		var scaledPosZ = pos[2] * ctx.noiseSize;

		var floorX = Math.floor(scaledPosX);
		var floorY = Math.floor(scaledPosY);
		var floorZ = Math.floor(scaledPosZ);

		var fracX = scaledPosX - floorX;
		var fracY = scaledPosY - floorY;
		var fracZ = scaledPosZ - floorZ;

		var noiseX = ctx.clampToNoise(floorX);
		var noiseX1 = ctx.clampToNoise(floorX + 1);
		var noiseY = ctx.clampToNoise(floorY);
		var noiseY1 = ctx.clampToNoise(floorY + 1);
		var noiseZ = ctx.clampToNoise(floorZ);
		var noiseZ1 = ctx.clampToNoise(floorZ + 1);

		var value000 = [], value001 = [], value010 = [], value011 = [],
			value100 = [], value101 = [], value110 = [], value111 = [];

		ctx.noisePixel3(value000, noiseX, noiseY, noiseZ);
		ctx.noisePixel3(value001, noiseX, noiseY, noiseZ1);
		ctx.noisePixel3(value010, noiseX, noiseY1, noiseZ);
		ctx.noisePixel3(value011, noiseX, noiseY1, noiseZ1);
		ctx.noisePixel3(value100, noiseX1, noiseY, noiseZ);
		ctx.noisePixel3(value101, noiseX1, noiseY, noiseZ1);
		ctx.noisePixel3(value110, noiseX1, noiseY1, noiseZ);
		ctx.noisePixel3(value111, noiseX1, noiseY1, noiseZ1);

		var value00 = [], value01 = [], value10 = [], value11 = [];
		ctx.lerpv3(value00, value000, value001, fracZ);
		ctx.lerpv3(value01, value010, value011, fracZ);
		ctx.lerpv3(value10, value100, value101, fracZ);
		ctx.lerpv3(value11, value110, value111, fracZ);

		var value0 = [], value1 = [];
		ctx.lerpv3(value0, value00, value01, fracY);
		ctx.lerpv3(value1, value10, value11, fracY);

		ctx.lerpv3(r, value0, value1, fracX);
	}