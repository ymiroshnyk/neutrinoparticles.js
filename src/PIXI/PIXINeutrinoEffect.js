class PIXINeutrinoEffect extends PIXI.Container {

	constructor(effectModel, position, rotation, scale) {
		super();

		this.ctx = effectModel.ctx;
		this.effectModel = effectModel;
		this.effect = null;
		this.position.set(position[0], position[1]);
		this.positionZ = position[2];

		if (rotation)
			this.rotation = rotation;

		if (scale) {
			this.scale.x = scale[0];
			this.scale.y = scale[1];
			this.scaleZ = scale[2];
		}
		else
			this.scaleZ = 1;

		if (effectModel.ready()) {
			this._onEffectReady();
		} else {
			effectModel.once('ready', function () {
				this._onEffectReady();
			}, this);
		}
	}

	ready() {
		return this.effect != null;
	}

	update(dt) {
		if (this.effect != null) {
			this.effect.update(dt, [this.position.x / this.scale.x, this.position.y / this.scale.y, this.positionZ / this.scaleZ],
				this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.rotation % 360));
		}
	}

	renderCanvas(renderer) {
		if (!this.ready())
			return;

		renderer.context.setTransform(this.scale.x, 0, 0, this.scale.y, 0, 0);
		this.effect.draw(renderer.context);
	};

	renderWebGL(renderer) {
		if (!this.ready())
			return;

		var gl = renderer.gl;

		renderer.setObjectRenderer(renderer.emptyRenderer);
		renderer.bindVao(null);
		renderer.state.resetAttributes();

		renderer.state.push();
		renderer.state.setState(renderer.state.defaultState);
		
		// hack! the only way to discard current shader for futher engine rendering
		renderer._activeShader = null;

		var target = renderer._activeRenderTarget;

		this.ctx.materials.setup(target.projectionMatrix.toArray(true), [this.scale.x, this.scale.y]);

		this.effect.fillGeometryBuffers([1, 0, 0], [0, -1, 0], [0, 0, -1]);

		this.renderBuffers.updateGlBuffers();
		this.renderBuffers.bind();

		for (var renderCallIdx = 0; renderCallIdx < this.renderBuffers.numRenderCalls; ++renderCallIdx) {
			var renderCall = this.renderBuffers.renderCalls[renderCallIdx];
			var texIndex = this.effect.model.renderStyles[renderCall.renderStyleIndex].textureIndices[0];

			renderer.bindTexture(this.effectModel.textures[texIndex], 0, true);

			var materialIndex = this.effect.model.renderStyles[renderCall.renderStyleIndex].materialIndex;
			switch (this.effect.model.materials[materialIndex]) {
				default: this.ctx.materials.switchToNormal(renderer); break;
				case 1: this.ctx.materials.switchToAdd(renderer); break;
				case 2: this.ctx.materials.switchToMultiply(renderer); break;
			}

			gl.drawElements(gl.TRIANGLES, renderCall.numIndices, gl.UNSIGNED_SHORT, renderCall.startIndex * 2);
		}

		renderer.state.pop();
	}

	restart(position, rotation) {
		if (position) {
			this.position.x = position[0];
			this.position.y = position[1];
			this.positionZ = position[2];
		}

		if (rotation) {
			this.rotation = rotation;
		}

		this.effect.restart([this.position.x / this.scale.x, this.position.y / this.scale.y, this.positionZ / this.scaleZ],
			rotation ? this.ctx.neutrino.axisangle2quat_([0, 0, 1], rotation % 360) : null);
	}

	resetPosition(position, rotation) {
		if (position) {
			this.position.x = position[0];
			this.position.y = position[1];
			this.positionZ = position[2];
		}

		if (rotation) {
			this.rotation = rotation;
		}

		this.effect.resetPosition([this.position.x / this.scale.x, this.position.y / this.scale.y, this.positionZ / this.scaleZ],
			rotation ? this.ctx.neutrino.axisangle2quat_([0, 0, 1], rotation % 360) : null);
	}

	setPropertyInAllEmitters(name, value) {
		this.effect.setPropertyInAllEmitters(name, value);
	}

	getNumParticles() {
		return this.effect.getNumParticles();
	}

	_onEffectReady() {
		var position = [this.position.x / this.scale.x, this.position.y / this.scale.y, this.positionZ / this.scaleZ];
		var rotation = this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.rotation % 360);

		if (this.effectModel.ctx.renderer instanceof PIXI.CanvasRenderer) {
			this.effect = this.effectModel.effectModel.createCanvas2DInstance(position, rotation);
			this.effect.textureDescs = this.effectModel.textureImageDescs;
		} else {
			this.renderBuffers = new PIXINeutrinoRenderBuffers(this.ctx);
			this.effect = this.effectModel.effectModel.createWGLInstance(position, rotation, this.renderBuffers);
			this.effect.texturesRemap = this.effectModel.texturesRemap;
		}

		this.emit('ready', this);
	}
}
