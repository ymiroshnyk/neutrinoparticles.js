'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PIXINeutrino = function () {
	function PIXINeutrino() {
		_classCallCheck(this, PIXINeutrino);
	}

	_createClass(PIXINeutrino, null, [{
		key: 'registerPlugins',
		value: function registerPlugins() {
			PIXI.Application.registerPlugin(PIXINeutrinoApplicationPlugin);
			PIXI.Renderer.registerPlugin('neutrino', PIXINeutrinoRendererPlugin);
			PIXI.Loader.registerPlugin(PIXINeutrinoLoaderPlugin);
		}
	}]);

	return PIXINeutrino;
}();

var PIXINeutrinoApplicationPlugin = function () {
	function PIXINeutrinoApplicationPlugin() {
		_classCallCheck(this, PIXINeutrinoApplicationPlugin);
	}

	_createClass(PIXINeutrinoApplicationPlugin, null, [{
		key: 'init',
		value: function init(options) {
			this.neutrino = new PIXINeutrinoContext(this, options.neutrino || {});
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			this.neutrino = null;
		}
	}]);

	return PIXINeutrinoApplicationPlugin;
}();

var PIXINeutrinoContext = function () {
	function PIXINeutrinoContext(application, options) {
		_classCallCheck(this, PIXINeutrinoContext);

		this.options = Object.assign({
			texturesBasePath: "",
			trimmedExtensionsLookupFirst: true
		}, options);

		this.neutrino = new NeutrinoParticles();

		this.canvasRenderer = PIXI.CanvasRenderer ? application.renderer instanceof PIXI.CanvasRenderer : false;
		this._noiseInitialized = false;
		this._noiseGenerator = null;
	}

	_createClass(PIXINeutrinoContext, [{
		key: 'initializeNoise',
		value: function initializeNoise(path, success, fail) {
			if (this._noiseInitialized) {
				if (success) success();
				return;
			}

			this.neutrino.initializeNoise(path, function () {
				this._noiseInitialized = true;
				if (success) success();
			}, fail);
		}
	}, {
		key: 'generateNoise',
		value: function generateNoise() {
			if (this._noiseInitialized) return;

			var noiseGenerator = new this.neutrino.NoiseGenerator();
			while (!noiseGenerator.step()) {// approx. 5,000 steps
				// you can use 'noiseGenerator.progress' to get generating progress from 0.0 to 1.0
			}

			this._noiseInitialized = true;
		}
	}, {
		key: 'generateNoiseStep',
		value: function generateNoiseStep() {
			if (this._noiseInitialized) {
				return { done: true, progress: 1.0 };
			}

			if (!this._noiseGenerator) this._noiseGenerator = new this.neutrino.NoiseGenerator();

			var result = this._noiseGenerator.step();
			var _progress = this._noiseGenerator.progress;

			if (result) {
				this._noiseInitialized = true;
				this._noiseGenerator = null;
			}

			return { done: result, progress: _progress };
		}
	}, {
		key: 'loadOptions',
		get: function get() {
			return { metadata: { neutrino: this } };
		}
	}]);

	return PIXINeutrinoContext;
}();

var PIXINeutrinoEffect = function (_PIXI$Container) {
	_inherits(PIXINeutrinoEffect, _PIXI$Container);

	function PIXINeutrinoEffect(effectModel, position, rotation, scale, baseParent) {
		_classCallCheck(this, PIXINeutrinoEffect);

		var _this = _possibleConstructorReturn(this, (PIXINeutrinoEffect.__proto__ || Object.getPrototypeOf(PIXINeutrinoEffect)).call(this));

		_this.ctx = effectModel.ctx;
		_this.effectModel = effectModel;
		_this.effect = null;
		_this.baseParent = baseParent;
		_this._renderElements = [];

		if (position) {
			_this.position.set(position[0], position[1]);
			_this.positionZ = position[2];
		} else {
			_this.position.set(0, 0);
			_this.positionZ = 0;
		}

		if (rotation) _this.rotation = rotation;

		if (scale) {
			_this.scale.x = scale[0];
			_this.scale.y = scale[1];
			_this.scaleZ = scale[2];
		} else _this.scaleZ = 1;

		if (effectModel.ready()) {
			_this._onEffectReady();
		} else {
			effectModel.once('ready', function () {
				this._onEffectReady();
			}, _this);

			_this._updateWorldTransform();
		}
		return _this;
	}

	_createClass(PIXINeutrinoEffect, [{
		key: 'ready',
		value: function ready() {
			return this.effect != null;
		}
	}, {
		key: 'update',
		value: function update(dt) {
			this._updateWorldTransform();

			if (this.effect == null) return;

			this.effect.update(dt, this._scaledPosition(), this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.worldRotationDegree));
		}
	}, {
		key: 'restart',
		value: function restart(position, rotation) {
			if (position) {
				this.position.x = position[0];
				this.position.y = position[1];
				this.positionZ = position[2];
			}

			if (rotation) {
				this.rotation = rotation;
			}

			this._updateWorldTransform();

			if (this.effect == null) return;

			this.effect.restart(this._scaledPosition(), rotation ? this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.worldRotationDegree) : null);
		}
	}, {
		key: 'resetPosition',
		value: function resetPosition(position, rotation) {
			if (position) {
				this.position.x = position[0];
				this.position.y = position[1];
				this.positionZ = position[2];
			}

			if (rotation) {
				this.rotation = rotation;
			}

			this._updateWorldTransform();

			if (this.effect == null) return;

			this.effect.resetPosition(this._scaledPosition(), rotation ? this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.worldRotationDegree) : null);
		}
	}, {
		key: 'setPropertyInAllEmitters',
		value: function setPropertyInAllEmitters(name, value) {
			this.effect.setPropertyInAllEmitters(name, value);
		}
	}, {
		key: 'getNumParticles',
		value: function getNumParticles() {
			return this.effect.getNumParticles();
		}
	}, {
		key: '_render',
		value: function _render(renderer) {
			if (!this.ready()) return;

			this._updateRenderElements();

			renderer.batch.setObjectRenderer(renderer.plugins.neutrino);

			for (var i = 0; i < this._renderElements.length; ++i) {
				renderer.plugins.neutrino.render(this._renderElements[i]);
			}
		}
	}, {
		key: '_renderCanvas',
		value: function _renderCanvas(renderer) {
			if (!this.ready()) return;

			if (this.baseParent) {
				var sx = this.worldScale.x;
				var sy = this.worldScale.y;
				var m = this.baseParent.worldTransform;
				renderer.context.setTransform(m.a * sx, m.b * sy, m.c * sx, m.d * sy, m.tx * sx, m.ty * sy);
			} else {
				renderer.context.setTransform(this.worldScale.x, 0, 0, this.worldScale.y, 0, 0);
			}

			this.effect.draw(renderer.context);
		}
	}, {
		key: '_scaledPosition',
		value: function _scaledPosition() {
			return [this.worldPosition.x / this.worldScale.x, this.worldPosition.y / this.worldScale.y, this.positionZ / this.scaleZ];
		}
	}, {
		key: '_updateWorldTransform',
		value: function _updateWorldTransform() {
			var localPosition = new PIXI.Point(0, 0);
			var localXAxis = new PIXI.Point(1, 0);
			var localYAxis = new PIXI.Point(0, 1);

			var worldXAxis, worldYAxis;

			if (this.baseParent) {
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
				y: Math.sqrt(worldYAxis.x * worldYAxis.x + worldYAxis.y * worldYAxis.y)
			};

			this.worldRotationDegree = this._calcWorldRotation(this) / Math.PI * 180 % 360;
		}
	}, {
		key: '_calcWorldRotation',
		value: function _calcWorldRotation(obj) {
			if (obj.parent && obj.parent != this.baseParent) return obj.rotation + this._calcWorldRotation(obj.parent);else return obj.rotation;
		}
	}, {
		key: '_updateRenderElements',
		value: function _updateRenderElements() {
			var rb = this.renderBuffers;

			if (this.baseParent) {
				var sx = this.worldScale.x;
				var sy = this.worldScale.y;
				var m = this.baseParent.worldTransform;
				rb.worldTransform = [m.a * sx, m.b * sy, m.c * sx, m.d * sy, m.tx * sx, m.ty * sy];
			} else {
				rb.worldTransform = [this.worldScale.x, 0, 0, this.worldScale.y, 0, 0];
			}

			this.effect.fillGeometryBuffers([1, 0, 0], [0, -1, 0], [0, 0, -1]);

			this._renderElements.length = rb.numRenderCalls;

			for (var i = 0; i < rb.numRenderCalls; ++i) {
				var rc = rb.renderCalls[i];
				var element = {};

				var textureIndex = this.effect.model.renderStyles[rc.renderStyleIndex].textureIndices[0];

				element._texture = this.effectModel.textures[textureIndex];

				var startVertexIndex8 = rc.startVertexIndex * 8;
				var numVertices2 = rc.numVertices * 2;

				element.vertexData = new Float32Array(rb.positions.buffer, startVertexIndex8, numVertices2);
				element.colors = new Uint32Array(rb.colors.buffer, rc.startVertexIndex * 4, rc.numVertices);
				element.uvs = new Float32Array(rb.texCoords.buffer, startVertexIndex8, numVertices2);
				element.indices = new Uint16Array(rb.indices.buffer, rc.startIndex * 2, rc.numIndices);

				var materialIndex = this.effect.model.renderStyles[rc.renderStyleIndex].materialIndex;
				switch (this.effect.model.materials[materialIndex]) {
					default:
						element.blendMode = PIXI.BLEND_MODES.NORMAL;break;
					case 1:
						element.blendMode = PIXI.BLEND_MODES.ADD;break;
					case 2:
						element.blendMode = PIXI.BLEND_MODES.MULTIPLY;break;
				}

				//element.worldAlpha = 1;

				this._renderElements[i] = element;
			}
		}
	}, {
		key: '_onEffectReady',
		value: function _onEffectReady() {
			this._updateWorldTransform();

			var position = this._scaledPosition();
			var rotation = this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.worldRotationDegree);

			if (this.effectModel.ctx.canvasRenderer) {
				this.effect = this.effectModel.effectModel.createCanvas2DInstance(position, rotation);
				this.effect.textureDescs = this.effectModel.textureImageDescs;
			} else {
				this.renderBuffers = new PIXINeutrinoRenderBuffers();
				this.effect = this.effectModel.effectModel.createWGLInstance(position, rotation, this.renderBuffers);
				this.effect.texturesRemap = this.effectModel.texturesRemap;
				this._updateRenderElements();
			}

			this.emit('ready', this);
		}
	}]);

	return PIXINeutrinoEffect;
}(PIXI.Container);

var PIXINeutrinoEffectModel = function (_PIXI$utils$EventEmit) {
	_inherits(PIXINeutrinoEffectModel, _PIXI$utils$EventEmit);

	function PIXINeutrinoEffectModel(context, loader, resource) {
		_classCallCheck(this, PIXINeutrinoEffectModel);

		var _this2 = _possibleConstructorReturn(this, (PIXINeutrinoEffectModel.__proto__ || Object.getPrototypeOf(PIXINeutrinoEffectModel)).call(this));

		_this2.ctx = context;

		var evalScript = "(function(ctx) {\n" + resource.data + "\nreturn new NeutrinoEffect(ctx);\n})(context.neutrino);";
		_this2.effectModel = eval(evalScript);

		_this2.texturesRemap = null;
		_this2.textures = [];
		_this2.textureImageDescs = [];

		var numTextures = _this2.effectModel.textures.length;
		_this2._numTexturesToLoadLeft = numTextures;

		for (var imageIndex = 0; imageIndex < numTextures; ++imageIndex) {
			var texturePath = _this2.effectModel.textures[imageIndex];
			var texture = null;

			if (_this2.ctx.options.trimmedExtensionsLookupFirst) {
				var trimmedTexturePath = texturePath.replace(/\.[^/.]+$/, ""); // https://stackoverflow.com/a/4250408
				texture = PIXI.utils.TextureCache[trimmedTexturePath];
			}

			if (!texture) texture = PIXI.utils.TextureCache[texturePath];

			if (texture) {
				if (texture.baseTexture.valid) {
					_this2._onTextureLoaded(imageIndex, texture);
				} else {
					texture.once('update', function (self, imageIndex, texture) {
						return function () {
							self._onTextureLoaded(imageIndex, texture);
						};
					}(_this2, imageIndex, texture));
				}
			} else {
				loader.add(_this2.ctx.options.texturesBasePath + texturePath, { parentResource: resource }, function (self, imageIndex) {
					return function (resource) {
						self._onTextureLoaded(imageIndex, resource.texture);
					};
				}(_this2, imageIndex));
			}
		}
		return _this2;
	}

	_createClass(PIXINeutrinoEffectModel, [{
		key: 'ready',
		value: function ready() {
			return this._numTexturesToLoadLeft === 0;
		}
	}, {
		key: '_onTextureLoaded',
		value: function _onTextureLoaded(index, texture) {
			this.textures[index] = texture;

			this._numTexturesToLoadLeft--;

			if (this.ctx.canvasRenderer) {
				var image = texture.baseTexture.resource.source;
				this.textureImageDescs[index] = new this.ctx.neutrino.ImageDesc(image, texture.orig.x, texture.orig.y, texture.orig.width, texture.orig.height);
			}

			if (this._numTexturesToLoadLeft === 0) {
				if (!this.ctx.canvasRenderer) {
					this._initTexturesRemapIfNeeded();
				}

				this.emit('ready', this);
			}
		}
	}, {
		key: '_initTexturesRemapIfNeeded',
		value: function _initTexturesRemapIfNeeded() {
			var remapNeeded = false;

			for (var texIdx = 0; texIdx < this.textures.length; ++texIdx) {
				var texture = this.textures[texIdx];

				if (texture.orig.x != 0 || texture.orig.y != 0 || texture.orig.width != texture.baseTexture.realWidth || texture.orig.height != texture.baseTexture.realHeight) {
					remapNeeded = true;
					break;
				}
			}

			this.texturesRemap = [];

			if (!remapNeeded) return;

			for (var _texIdx = 0; _texIdx < this.textures.length; ++_texIdx) {
				var _texture = this.textures[_texIdx];

				this.texturesRemap[_texIdx] = new this.ctx.neutrino.SubRect(_texture.orig.x / _texture.baseTexture.realWidth, 1.0 - (_texture.orig.y + _texture.orig.height) / _texture.baseTexture.realHeight, _texture.orig.width / _texture.baseTexture.realWidth, _texture.orig.height / _texture.baseTexture.realHeight);
			}
		}
	}]);

	return PIXINeutrinoEffectModel;
}(PIXI.utils.EventEmitter);

var PIXINeutrinoLoaderPlugin = function () {
	function PIXINeutrinoLoaderPlugin() {
		_classCallCheck(this, PIXINeutrinoLoaderPlugin);
	}

	_createClass(PIXINeutrinoLoaderPlugin, null, [{
		key: 'use',
		value: function use(resource, next) {
			if (resource.extension === 'js' && resource.metadata && resource.metadata.neutrino && resource.data) {
				resource.effectModel = new PIXINeutrinoEffectModel(resource.metadata.neutrino, this, resource);
			}

			next();
		}
	}]);

	return PIXINeutrinoLoaderPlugin;
}();

var PIXINeutrinoRenderBuffers = function () {
	function PIXINeutrinoRenderBuffers() {
		_classCallCheck(this, PIXINeutrinoRenderBuffers);

		this.positions = null;
		this.colors = null;
		this.texCoords = null;
		this.maxNumVertices = 0;
		this.numVertices = 0;
		this.indices = null;
		this.globalIndices = null;

		this.renderCalls = [];
		this.maxNumRenderCalls = 0;
		this.numRenderCalls = 0;
	}

	_createClass(PIXINeutrinoRenderBuffers, [{
		key: 'initialize',
		value: function initialize(maxNumVertices, texChannels, indices, maxNumRenderCalls) {

			// We store only XY components of position.
			this.positions = new Float32Array(new ArrayBuffer(4 * maxNumVertices * 2));
			this.colors = new Uint8Array(new ArrayBuffer(4 * maxNumVertices));
			// We store only first texture channel and only UV of it.
			this.texCoords = new Float32Array(new ArrayBuffer(4 * maxNumVertices * 2));
			this.maxNumVertices = maxNumVertices;

			this.globalIndices = new Uint16Array(new ArrayBuffer(2 * indices.length));
			this.globalIndices.set(indices, 0);
			this.indices = new Uint16Array(new ArrayBuffer(2 * indices.length));

			this.maxNumRenderCalls = maxNumRenderCalls;
		}
	}, {
		key: 'pushVertex',
		value: function pushVertex(vertex) {
			var startIndex2 = this.numVertices * 2;

			// Copy only XY components of the position
			{
				var wt = this.worldTransform;
				var x = vertex.position[0];
				var y = vertex.position[1];

				this.positions[startIndex2] = wt[0] * x + wt[2] * y + wt[4];
				this.positions[startIndex2 + 1] = wt[1] * x + wt[3] * y + wt[5];
			}

			this.colors.set(vertex.color, this.numVertices * 4);

			if (vertex.texCoords.length > 0) {
				// Copy only first channel of texture coordinates.
				// Texture coordinates from Neutrino must be at least 2-dimensional.
				this.texCoords[startIndex2] = vertex.texCoords[0][0];
				this.texCoords[startIndex2 + 1] = 1.0 - vertex.texCoords[0][1];
			} else {
				this.texCoords[startIndex2] = 0.0;
				this.texCoords[startIndex2 + 1] = 0.0;
			}

			++this.numVertices;
		}
	}, {
		key: 'pushRenderCall',
		value: function pushRenderCall(rc) {
			// In case we're out of render calls array (which shouldn't be normally),
			// expand the array.
			if (this.numRenderCalls >= this.renderCalls.length) this.renderCalls.push(Object.assign({}, rc));else Object.assign(this.renderCalls[this.numRenderCalls], rc);

			var thisRenderCall = this.renderCalls[this.numRenderCalls];

			var endIndex = thisRenderCall.startIndex + thisRenderCall.numIndices;

			var startVertexIndex = this.globalIndices[thisRenderCall.startIndex];
			var endVertexIndex = startVertexIndex;

			for (var i = thisRenderCall.startIndex; i < endIndex; ++i) {
				var index = this.globalIndices[i];
				if (index < startVertexIndex) startVertexIndex = index;
				if (index > endVertexIndex) endVertexIndex = index;
			}

			thisRenderCall.startVertexIndex = startVertexIndex;
			thisRenderCall.numVertices = endVertexIndex - startVertexIndex + 1;

			for (var _i = thisRenderCall.startIndex; _i < endIndex; ++_i) {
				this.indices[_i] = this.globalIndices[_i] - startVertexIndex;
			}

			++this.numRenderCalls;
		}
	}, {
		key: 'cleanup',
		value: function cleanup() {
			this.numVertices = 0;
			this.numRenderCalls = 0;
		}
	}]);

	return PIXINeutrinoRenderBuffers;
}();

var PIXINeutrinoRendererPlugin = function (_PIXI$AbstractBatchRe) {
	_inherits(PIXINeutrinoRendererPlugin, _PIXI$AbstractBatchRe);

	function PIXINeutrinoRendererPlugin(renderer) {
		_classCallCheck(this, PIXINeutrinoRendererPlugin);

		var _this3 = _possibleConstructorReturn(this, (PIXINeutrinoRendererPlugin.__proto__ || Object.getPrototypeOf(PIXINeutrinoRendererPlugin)).call(this, renderer));

		_this3.shaderGenerator = new PIXI.BatchShaderGenerator(PIXI.BatchPluginFactory.defaultVertexSrc, PIXI.BatchPluginFactory.defaultFragmentTemplate);

		_this3.geometryClass = PIXI.BatchGeometry;
		_this3.vertexSize = 6;
		return _this3;
	}

	_createClass(PIXINeutrinoRendererPlugin, [{
		key: 'packInterleavedGeometry',
		value: function packInterleavedGeometry(element, attributeBuffer, indexBuffer, aIndex, iIndex) {
			var uint32View = attributeBuffer.uint32View,
			    float32View = attributeBuffer.float32View;


			var packedVertices = aIndex / this.vertexSize;
			var uvs = element.uvs;
			var indicies = element.indices;
			var vertexData = element.vertexData;
			var textureId = element._texture.baseTexture._id;
			var colors = element.colors;

			//const alpha = Math.min(element.worldAlpha, 1.0);
			/*const argb = (alpha < 1.0
     && element._texture.baseTexture.premultiplyAlpha)
       ? premultiplyTint(element._tintRGB, alpha)
       : element._tintRGB + (alpha * 255 << 24);
       */

			var lastSrcColor = 0xFFFFFFFF;
			var lastResultColor = 0xFFFFFFFF;

			var prepareColor = element._texture.baseTexture.premultiplyAlpha ? function (srcColor) // In case of premultiplied texture
			{
				if (srcColor == lastSrcColor) return lastResultColor;

				lastSrcColor = srcColor;

				var shiftedAlpha = srcColor & 0xFF000000;

				if (shiftedAlpha == 0xFF000000) {
					lastResultColor = srcColor;
				} else if (shiftedAlpha == 0) {
					lastResultColor = 0;
				} else {
					var alpha = (shiftedAlpha >>> 24) / 255.0;
					lastResultColor = PIXI.utils.premultiplyTint(srcColor & 0xFFFFFF, alpha);
				}

				return lastResultColor;
			} : function (srcColor) // In case of non-premultiplied texture
			{
				return srcColor;
			};

			// lets not worry about tint! for now..
			for (var i = 0; i < vertexData.length; i += 2) {
				float32View[aIndex++] = vertexData[i];
				float32View[aIndex++] = vertexData[i + 1];
				float32View[aIndex++] = uvs[i];
				float32View[aIndex++] = uvs[i + 1];
				uint32View[aIndex++] = prepareColor(colors[i >>> 1]);
				float32View[aIndex++] = textureId;
			}

			for (var _i2 = 0; _i2 < indicies.length; _i2++) {
				indexBuffer[iIndex++] = packedVertices + indicies[_i2];
			}
		}
	}]);

	return PIXINeutrinoRendererPlugin;
}(PIXI.AbstractBatchRenderer);
//# sourceMappingURL=neutrinoparticles.pixi5.js.map
