class PIXINeutrinoEffect extends PIXI.Container
{
    constructor(effectModel, position, rotation, scale, baseParent)
    {
        super();

		this.ctx = effectModel.ctx;
		this.pluginName = 'neutrino';
		this.effectModel = effectModel;
		this.effect = null;
		this.baseParent = baseParent;
		this._renderBuffersDirty = true;
		this._renderElements = [];
		
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

		if (scale) 
		{
			this.scale.x = scale[0];
			this.scale.y = scale[1];
			this.scaleZ = scale[2];
		}
		else
			this.scaleZ = 1;

		if (effectModel.ready()) 
		{
			this._onEffectReady();
		} else 
		{
			effectModel.once('ready', function () 
			{
				this._onEffectReady();
			}, this);

			this._updateWorldTransform();
		}
    }

	ready() 
	{
		return this.effect != null;
	}

	update(dt) 
	{
		this._updateWorldTransform();
		
		if (this.effect == null)
			return;

		this.effect.update(dt, this._scaledPosition(),
			this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.worldRotationDegree));

		this._renderBuffersDirty = true;
	}

	restart(position, rotation) 
	{
		if (position) 
		{
			this.position.x = position[0];
			this.position.y = position[1];
			this.positionZ = position[2];
		}

		if (rotation) 
		{
			this.rotation = rotation;
		}

		this._updateWorldTransform();

		if (this.effect == null)
			return;

		this.effect.restart(this._scaledPosition(),
			rotation ? this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.worldRotationDegree) 
			: null);
	}

	resetPosition(position, rotation) 
	{
		if (position) 
		{
			this.position.x = position[0];
			this.position.y = position[1];
			this.positionZ = position[2];
		}

		if (rotation) 
		{
			this.rotation = rotation;
		}

		this._updateWorldTransform();

		if (this.effect == null)
			return;

		this.effect.resetPosition(this._scaledPosition(),
			rotation ? this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.worldRotationDegree) : null);
	}

	setPropertyInAllEmitters(name, value) 
	{
		this.effect.setPropertyInAllEmitters(name, value);
	}

	getNumParticles() 
	{
		return this.effect.getNumParticles();
	}

	_render(renderer)
    {
        if (!this.ready())
			return;
			
		this._updateRenderElements();
            
		renderer.batch.setObjectRenderer(renderer.plugins[this.pluginName]);

		for (let i = 0; i < this._renderElements.length; ++i)
		{
			renderer.plugins[this.pluginName].render(this._renderElements[i]);
		}
    }

	_scaledPosition() 
	{
		return [this.worldPosition.x / this.worldScale.x, this.worldPosition.y / 
			this.worldScale.y, this.positionZ / this.scaleZ];
	}

	_updateWorldTransform() 
	{
		var localPosition = new PIXI.Point(0, 0);
		var localXAxis = new PIXI.Point(1, 0);
		var localYAxis = new PIXI.Point(0, 1);

		var worldXAxis, worldYAxis;

		if (this.baseParent)
		{
			this.worldPosition = this.baseParent.toLocal(localPosition, this);
			worldXAxis = this.baseParent.toLocal(localXAxis, this);
			worldYAxis = this.baseParent.toLocal(localYAxis, this);
		} else 
		{
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

	_calcWorldRotation(obj) 
	{
		if (obj.parent && obj.parent != this.baseParent)
			return obj.rotation + this._calcWorldRotation(obj.parent);
		else
			return obj.rotation;
	}

	_updateRenderElements()
	{
		if (!this._renderBuffersDirty)
			return;

		this.effect.fillGeometryBuffers([1, 0, 0], [0, -1, 0], [0, 0, -1]);
		this._renderBuffersDirty = false;

		const rb = this.renderBuffers;
		this._renderElements.length = rb.renderCalls.length;

		for (let i = 0; i < rb.renderCalls.length; ++i)
		{
			const rc = rb.renderCalls[i];
			const element = {};

			const textureIndex = this.effect.model.renderStyles[
				rc.renderStyleIndex].textureIndices[0];

			element._texture = 	this.effectModel.textures[textureIndex];

			const startVertexIndex8 = rc.startVertexIndex * 8;
			const numVertices2 = rc.numVertices * 2;

			element.vertexData = new Float32Array(rb.positions.buffer,
				startVertexIndex8, numVertices2);
			element.colors = new Uint32Array(rb.colors.buffer,
				rc.startVertexIndex * 4, rc.numVertices)
			element.uvs = new Float32Array(rb.texCoords.buffer,
				startVertexIndex8, numVertices2);
			element.indices = new Uint16Array(rb.indices.buffer,
				rc.startIndex * 2, rc.numIndices);

			const materialIndex = this.effect.model.renderStyles[rc.renderStyleIndex].materialIndex;
			switch (this.effect.model.materials[materialIndex]) 
			{
				default: element.blendMode = PIXI.BLEND_MODES.NORMAL; break;
				case 1: element.blendMode = PIXI.BLEND_MODES.ADD; break;
				case 2: element.blendMode = PIXI.BLEND_MODES.MULTIPLY; break;
			}

			//element.worldAlpha = 1;

			this._renderElements[i] = element;
		}
	}

	_onEffectReady() 
	{
		this._updateWorldTransform();

		var position = this._scaledPosition();
		var rotation = this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.worldRotationDegree);

		// TODO: rename to "geometryBuffers"
		this.renderBuffers = new PIXINeutrinoRenderBuffers();
		this.effect = this.effectModel.effectModel.createWGLInstance(position, rotation, this.renderBuffers);
		this.effect.texturesRemap = this.effectModel.texturesRemap;
		this._updateRenderElements();

		this.emit('ready', this);
	}
}
