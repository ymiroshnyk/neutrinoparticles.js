var ConstructWGL = function (system, emitter) {

		this.system = system;
		this.emitter = emitter;

		if (this.emitter.model.constructors.length > 0)
			this.model = this.emitter.model.constructors[0];
		else
			this.model = null;

		this.vertex = [
			{ /**/position: [0.0, 0.0, 0.0], /**/color: [0, 0, 0, 0], /**/texCoords: [[0.0, 0.0]] },
			{ /**/position: [0.0, 0.0, 0.0], /**/color: [0, 0, 0, 0], /**/texCoords: [[0.0, 0.0]] },
			{ /**/position: [0.0, 0.0, 0.0], /**/color: [0, 0, 0, 0], /**/texCoords: [[0.0, 0.0]] },
			{ /**/position: [0.0, 0.0, 0.0], /**/color: [0, 0, 0, 0], /**/texCoords: [[0.0, 0.0]] }];
	}

	ConstructWGL.prototype = {
		fillParticleGeometry: function (particle, cameraRight, cameraUp, cameraDir, renderBuffer) {
			particle.fillAttachedEmittersGeometry(-1, cameraRight, cameraUp, cameraDir, renderBuffer);

			if (this.model) {

				if (!particle.waitingForDelete) {

					var v0 = this.vertex[0];
					var v1 = this.vertex[1];
					var v2 = this.vertex[2];
					var v3 = this.vertex[3];

					var axisX = [], axisY = [];

					if (this.model.rotationType == 0) {
						var a = ctx.deg2rad_(particle.angle);
						var s = Math.sin(a);
						var c = Math.cos(a);

						axisX[0] = cameraRight[0] * c + cameraUp[0] * s;
						axisX[1] = cameraRight[1] * c + cameraUp[1] * s;
						axisX[2] = cameraRight[2] * c + cameraUp[2] * s;

						axisY[0] = -cameraRight[0] * s + cameraUp[0] * c;
						axisY[1] = -cameraRight[1] * s + cameraUp[1] * c;
						axisY[2] = -cameraRight[2] * s + cameraUp[2] * c;
					}
					else {
						var q = particle.rotation;
						var z2 = 2.0 * q[2] * q[2];
						var xy = 2.0 * q[0] * q[1];
						var wz = 2.0 * q[3] * q[2];

						axisX[0] = 1.0 - 2.0 * q[1] * q[1] - z2;
						axisX[1] = xy + wz;
						axisX[2] = 2.0 * q[0] * q[2] - 2.0 * q[3] * q[1];

						axisY[0] = xy - wz;
						axisY[1] = 1.0 - 2.0 * q[0] * q[0] - z2;
						axisY[2] = 2.0 * q[1] * q[2] + 2.0 * q[3] * q[0];
					}

					var lowX = [], highX = [], lowY = [], highY = [];
					ctx.mulv3scalar(lowX, axisX, -particle.size[0] * particle.origin[0]);
					ctx.mulv3scalar(highX, axisX, particle.size[0] * (1.0 - particle.origin[0]));
					ctx.mulv3scalar(lowY, axisY, -particle.size[1] * particle.origin[1]);
					ctx.mulv3scalar(highY, axisY, particle.size[1] * (1.0 - particle.origin[1]));

					ctx.addv3(v0./**/position, lowX, lowY);
					ctx.addv3(v0./**/position, v0./**/position, particle.position);
					ctx.addv3(v1./**/position, lowX, highY);
					ctx.addv3(v1./**/position, v1./**/position, particle.position);
					ctx.addv3(v2./**/position, highX, highY);
					ctx.addv3(v2./**/position, v2./**/position, particle.position);
					ctx.addv3(v3./**/position, highX, lowY);
					ctx.addv3(v3./**/position, v3./**/position, particle.position);

					{
						var rgb = ctx.mulv3scalar_(particle.color, 255);
						v0./**/color = v1./**/color = v2./**/color = v3./**/color = [rgb[0], rgb[1], rgb[2], particle.alpha * 255];
					}

					{
						var gridX = Math.floor(particle.gridIndex % this.model.gridWidth);
						var gridY = Math.floor(particle.gridIndex / this.model.gridWidth);

						var left, right, top, bottom;

						var texRemap = this.system.texturesRemap[this.system./**/model.renderStyles[this.model.renderStyleIndex].textureIndices[0]];
						if (texRemap) {
							var cellWidth = texRemap.width / this.model.gridWidth;
							var cellHeight = texRemap.height / this.model.gridHeight;

							var left = texRemap.x + gridX * cellWidth;
							var right = left + cellWidth;
							var top = (texRemap.y + texRemap.height - gridY * cellHeight);
							var bottom = top - cellHeight;
						} else {
							var cellWidth = 1.0 / this.model.gridWidth;
							var cellHeight = 1.0 / this.model.gridHeight;

							var left = gridX * cellWidth;
							var right = left + cellWidth;
							var top = (1.0 - gridY * cellHeight);
							var bottom = top - cellHeight;
						}

						v0./**/texCoords[0] = [left, bottom];
						v1./**/texCoords[0] = [left, top];
						v2./**/texCoords[0] = [right, top];
						v3./**/texCoords[0] = [right, bottom];
					}

					renderBuffer.pushVertex(v0);
					renderBuffer.pushVertex(v1);
					renderBuffer.pushVertex(v2);
					renderBuffer.pushVertex(v3);

					if (!renderBuffer.__lastRenderCall) {
						renderBuffer.__lastRenderCall = new ctx.RenderCall(0, 6, this.model.renderStyleIndex);
					} else {
						var lastRenderCall = renderBuffer.__lastRenderCall;

						if (lastRenderCall.renderStyleIndex == this.model.renderStyleIndex) {
							lastRenderCall.numIndices += 6;
						} else {
							renderBuffer.pushRenderCall(lastRenderCall);
							renderBuffer.__lastRenderCall = new ctx.RenderCall(
								lastRenderCall.startIndex + lastRenderCall.numIndices,
								6, this.model.renderStyleIndex);
						}
					}
				}
			}

			particle.fillAttachedEmittersGeometry(1, cameraRight, cameraUp, cameraDir, renderBuffer);
		},

		fillGeometryBuffers: function (cameraRight, cameraUp, cameraDir, renderBuffer) {
			switch (this.emitter.sorting) {
				case 0:
					for (var partIndex = 0; partIndex < this.emitter.activeParticles.length; ++partIndex) {
						this.fillParticleGeometry(this.emitter.activeParticles[partIndex], cameraRight, cameraUp, cameraDir, renderBuffer);
					}
					break;

				case 1:
					for (var partIndex = this.emitter.activeParticles.length; partIndex-- > 0;) {
						this.fillParticleGeometry(this.emitter.activeParticles[partIndex], cameraRight, cameraUp, cameraDir, renderBuffer);
					}
					break;

				case 2:
					this.emitter.activeParticles.forEach(function (particle) {
						particle.depth = ctx.dotv3_(cameraDir, particle.position);
					});

					this.emitter.activeParticles.sort(function (a, b) {
						if (a.depth < b.depth)
							return 1;
						if (a.depth > b.depth)
							return -1;
						return 0;
					});

					this.emitter.activeParticles.forEach(function (particle) {
						this.fillParticleGeometry(particle, cameraRight, cameraUp, cameraDir, renderBuffer);
					}, this);
					break;
			}
		}
	}