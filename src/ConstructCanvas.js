var ConstructCanvas2D = function (system, emitter) {
		this.system = system;
		this.emitter = emitter;

		if (this.emitter.model.constructors.length > 0) {
			this.model = this.emitter.model.constructors[0];

			this.setTransform = [ConstructCanvas2D.prototype.setFacedTransform,
				ConstructCanvas2D.prototype.setFreeTransform][this.model.rotationType];
		}
		else
			this.model = null;
	}

	ConstructCanvas2D.prototype = {
		setFacedTransform: function (context, position, particle) {
			var angleRad = ctx.deg2rad_(particle.angle);
			var cosAngle = Math.cos(angleRad);
			var sinAngle = Math.sin(angleRad);
			var signx = ctx.sign_(particle.size[0]);
			var signy = ctx.sign_(particle.size[1]);
			context./**/transform(signx * cosAngle, signx * sinAngle, signy * -sinAngle, signy * cosAngle, position[0], position[1]);
		},

		setFreeTransform: function (context, position, particle) {
			var q = particle.rotation;
			var z2 = 2.0 * q[2] * q[2];
			var xy = 2.0 * q[0] * q[1];
			var wz = 2.0 * q[3] * q[2];
			var signx = ctx.sign_(particle.size[0]);
			var signy = ctx.sign_(particle.size[1]);
			context./**/transform(
				signx * (1.0 - 2.0 * q[1] * q[1] - z2),
				signx * (xy + wz),
				signy * (wz - xy),
				signy * (2.0 * q[0] * q[0] + z2 - 1.0),
				position[0], position[1]);
		},

		drawParticle: function (context, particle, camera) {
			particle.drawAttachedEmitters(context, -1, camera);

			if (this.model) {

				if (this.textureDesc != null && !particle.waitingForDelete) {

					if (particle.alpha > 0.001) {
						var gridX = Math.floor(particle.gridIndex % this.model.gridWidth);
						var gridY = Math.floor(particle.gridIndex / this.model.gridWidth);

						var position = particle.position.slice();
						var size = particle.size.slice();
						if (!camera || camera./**/transform(position, size)) {

							var sizeX = Math.abs(size[0]);
							var sizeY = Math.abs(size[1]);

							if (sizeX > 0.001 && sizeY > 0.001) {						
								context.save();
								this.setTransform(context, position, particle);
								
								context.translate(-sizeX * particle.origin[0], -sizeY * (1 - particle.origin[1]));
								context.globalAlpha = particle.alpha;

								if (particle.color[0] < 0.999 || particle.color[1] < 0.999 || particle.color[2] < 0.999) {

									var offWidth = sizeX < this.texCellWidth ? sizeX : this.texCellWidth;
									var offHeight = sizeY < this.texCellHeight ? sizeY : this.texCellHeight;

									ctx.adjustOffCanvasSize(offWidth, offHeight);

									ctx.offContext.globalCompositeOperation = "copy";
									ctx.offContext.drawImage(this.textureDesc.image,
										this.textureDesc.x + this.texCellWidth * gridX, this.textureDesc.y + this.texCellHeight * gridY,
										this.texCellWidth, this.texCellHeight,
										0, 0, offWidth, offHeight);

									ctx.offContext.globalCompositeOperation = "multiply";
									ctx.offContext.fillStyle = ctx.colorToHex_(particle.color);
									ctx.offContext.fillRect(0, 0, offWidth, offHeight);

									ctx.offContext.globalCompositeOperation = "destination-atop";
									ctx.offContext.drawImage(this.textureDesc.image,
										this.textureDesc.x + this.texCellWidth * gridX, this.textureDesc.y + this.texCellHeight * gridY,
										this.texCellWidth, this.texCellHeight,
										0, 0, offWidth, offHeight);

									context.drawImage(ctx.offCanvas, 0, 0, offWidth, offHeight, 0, 0, sizeX, sizeY);
								}
								else {
									context.drawImage(this.textureDesc.image,
										this.textureDesc.x + this.texCellWidth * gridX, this.textureDesc.y + this.texCellHeight * gridY,
										this.texCellWidth, this.texCellHeight, 0, 0, sizeX, sizeY);
								}

								context.restore();
							}
						}
					}
				}
			}

			particle.drawAttachedEmitters(context, 1, camera);
		},

		draw: function (context, camera) {
			context.save();

			if (this.model) {
				context.globalCompositeOperation = this.system.materials[this.system./**/model.renderStyles[this.model.renderStyleIndex].materialIndex];
				this.textureDesc = this.system.textureDescs[this.system./**/model.renderStyles[this.model.renderStyleIndex].textureIndices[0]];
			}
			else {
				this.textureDesc = null;
			}

			if (this.textureDesc) {
				this.texCellWidth = this.textureDesc.width / this.model.gridWidth;
				this.texCellHeight = this.textureDesc.height / this.model.gridHeight;
			}

			function compare(a, b) {
				if (a.position[2] < b.position[2])
					return 1;
				if (a.position[2] > b.position[2])
					return -1;
				return 0;
			}

			switch (this.emitter.sorting) {
				case 0:
					for (var partIndex = 0; partIndex < this.emitter.activeParticles.length; ++partIndex) {
						this.drawParticle(context, this.emitter.activeParticles[partIndex], camera);
					}
					break;
				case 1:
					for (var partIndex = this.emitter.activeParticles.length; partIndex-- > 0;) {
						this.drawParticle(context, this.emitter.activeParticles[partIndex], camera);
					}
					break;
				case 2:
					this.emitter.activeParticles.sort(compare);

					for (var partIndex = 0; partIndex < this.emitter.activeParticles.length; ++partIndex) {
						this.drawParticle(context, this.emitter.activeParticles[partIndex], camera);
					}
					break;
			}

			context.restore();
		}
	}