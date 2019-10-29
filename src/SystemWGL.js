var SystemWGL = function () {
		this._init = function (model, position, rotation, renderBuffer) {
			SystemWGL.prototype._init.call(this, model, position, rotation, ConstructWGL);

			this.texturesRemap = [];

			var indices = [];

			{
				var verDisp;
				for (var partIndex = 0; partIndex < this./**/model.totalParticles; ++partIndex) {
					verDisp = partIndex * 4;
					indices.push(verDisp + 0, verDisp + 3, verDisp + 1, verDisp + 1, verDisp + 3, verDisp + 2);
				}
			}

			this.renderBuffer = renderBuffer;
			this.renderBuffer.initialize(this./**/model.totalParticles * 4, [2], indices, this./**/model.totalParticles);
			this.renderBuffer.__numIndices = 0;
		}
	}

	SystemWGL.prototype = new System();

	SystemWGL.prototype./**/fillGeometryBuffers = function (/**/cameraRight, /**/cameraUp, /**/cameraDir) {
		this.renderBuffer.cleanup();
		this.renderBuffer.__lastRenderCall = null;

		this.activeEmitters.forEach(function (emitter) {
			emitter.fillGeometryBuffers(/**/cameraRight, /**/cameraUp, /**/cameraDir, this.renderBuffer);
		}, this);

		if (this.renderBuffer.__lastRenderCall)
			this.renderBuffer.pushRenderCall(this.renderBuffer.__lastRenderCall);
	}