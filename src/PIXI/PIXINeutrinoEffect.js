class PIXINeutrinoEffect extends PIXI.Container {

	constructor(effectModel, position, rotation, scale, baseParent) {
		super();

		this.ctx = effectModel.ctx;
		this.effectModel = effectModel;
		this.effect = null;
		this.baseParent = baseParent;
		
		if (position)
		{
			this.position.set(position[0], position[1]);
			this.positionZ = position[2];
		}
		else
		{
			this.position.set(0, 0);
			this.positionZ = 0;
		}

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

		this._updateWorldTransform();
	}

	ready() {
		return this.effect != null;
	}

	update(dt) {
		this._updateWorldTransform();
		
		if (this.effect != null) {
			this.effect.update(dt, this._scaledPosition(),
				this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.worldRotationDegree));
		}
	}

	renderCanvas(renderer) {
		if (!this.ready())
			return;

		if (this.baseParent)
		{
			var sx = this.worldScale.x;
			var sy = this.worldScale.y;
			var m = this.baseParent.worldTransform;
			renderer.context.setTransform(m.a * sx, m.b * sy, m.c * sx, m.d * sy, m.tx * sx, 
				m.ty * sy);
		} else {
			renderer.context.setTransform(this.worldScale.x, 0, 0, this.worldScale.y, 0, 0);
		}
		
		this.effect.draw(renderer.context);
	};

	renderWebGL(renderer) {
		if (!this.ready())
			return;

		renderer.setObjectRenderer(renderer.emptyRenderer);

		if (this.baseParent)
		{
			var sx = this.worldScale.x;
			var sy = this.worldScale.y;
			var m = this.baseParent.worldTransform;
			this.ctx.materials.setup([m.a * sx, m.b * sy, 0, m.c * sx, m.d * sy, 0,
				m.tx * sx, m.ty * sy, 1]);
		} else {
			this.ctx.materials.setup([this.worldScale.x, 0, 0, 0, this.worldScale.y, 0, 0, 0, 1]);
		}

		this.effect.fillGeometryBuffers([1, 0, 0], [0, -1, 0], [0, 0, -1]);

		this.renderBuffers.updateGlBuffers();
		this.renderBuffers.bind();

		for (var renderCallIdx = 0; renderCallIdx < this.renderBuffers.numRenderCalls; ++renderCallIdx) {
			var renderCall = this.renderBuffers.renderCalls[renderCallIdx];
			var texIndex = this.effect.model.renderStyles[renderCall.renderStyleIndex].textureIndices[0];

			let texture = this.effectModel.textures[texIndex];
			renderer.bindTexture(texture, 0, true);

			let premultiplied = texture.baseTexture.premultipliedAlpha;
			var materialIndex = this.effect.model.renderStyles[renderCall.renderStyleIndex].materialIndex;
			switch (this.effect.model.materials[materialIndex]) {
				default: this.ctx.materials.switchToNormal(premultiplied); break;
				case 1: this.ctx.materials.switchToAdd(premultiplied); break;
				case 2: this.ctx.materials.switchToMultiply(premultiplied); break;
			}

			this.renderBuffers.draw(renderCall.numIndices, renderCall.startIndex);
		}
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

		this._updateWorldTransform();

		this.effect.restart(this._scaledPosition(),
			rotation ? this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.worldRotationDegree) 
			: null);
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

		this._updateWorldTransform();

		this.effect.resetPosition(this._scaledPosition(),
			rotation ? this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.worldRotationDegree) : null);
	}

	setPropertyInAllEmitters(name, value) {
		this.effect.setPropertyInAllEmitters(name, value);
	}

	getNumParticles() {
		return this.effect.getNumParticles();
	}

	_scaledPosition() {
		return [this.worldPosition.x / this.worldScale.x, this.worldPosition.y / 
			this.worldScale.y, this.positionZ / this.scaleZ];
	}

	_updateWorldTransform() {
		var localPosition = new PIXI.Point(0, 0);
		var localXAxis = new PIXI.Point(1, 0);
		var localYAxis = new PIXI.Point(0, 1);

		var worldXAxis, worldYAxis;

		if (this.baseParent)
		{
			this.worldPosition = this.baseParent.toLocal(localPosition, this);
			worldXAxis = this.baseParent.toLocal(localXAxis, this);
			worldYAxis = this.baseParent.toLocal(localYAxis, this);
		} else {
			this.worldPosition = this.toGlobal(localPosition);
			worldXAxis = this.toGlobal(localXAxis);
			worldYAxis = this.toGlobal(localYAxis);
		}

		worldXAxis.x -= this.worldPosition.x;
		worldXAxis.y -= this.worldPosition.y;
		worldYAxis.x -= this.worldPosition.x;
		worldYAxis.y -= this.worldPosition.y;

		this.worldScale = {
			x: Math.sqrt(worldXAxis.x * worldXAxis.x + worldXAxis.y * worldXAxis.y),
			y: Math.sqrt(worldYAxis.x * worldYAxis.x + worldYAxis.y * worldYAxis.y),
		};

		this.worldRotationDegree = (this._calcWorldRotation(this) / Math.PI * 180) % 360;
	}

	_calcWorldRotation(obj) {
		if (obj.parent && obj.parent != this.baseParent)
			return obj.rotation + this._calcWorldRotation(obj.parent);
		else
			return obj.rotation;
	}

	_onEffectReady() {
		this._updateWorldTransform();

		var position = this._scaledPosition();
		var rotation = this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.worldRotationDegree);

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
