"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PIXINeutrinoMaterials = function () {
	function PIXINeutrinoMaterials(gl) {
		_classCallCheck(this, PIXINeutrinoMaterials);

		this.gl = gl;

		var vertexShaderSource = "\
			attribute vec3 aVertexPosition;\
			attribute vec4 aColor; \
			attribute vec2 aTextureCoord;\
			\
			uniform mat3 projectionMatrix;\
			uniform vec2 scale;\
			\
			varying vec4 vColor;\
			varying vec2 vTextureCoord;\
			\
			void main(void) {\
				gl_Position = vec4((projectionMatrix * vec3(aVertexPosition.xy * scale, 1.0)).xy, 0, 1);\
				vColor = vec4(aColor.rgb * aColor.a, aColor.a);\
				vTextureCoord = vec2(aTextureCoord.x, 1.0 - aTextureCoord.y);\
			}";

		var fragmentShaderSource = "\
			precision mediump float;\
			\
			varying vec4 vColor;\
			varying vec2 vTextureCoord;\
		\
			uniform sampler2D uSampler;\
			\
			void main(void) {\
				gl_FragColor = vColor * texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\
			}";

		var fragmentShaderMultiplySource = "\
			precision mediump float;\
			\
			varying vec4 vColor;\
			varying vec2 vTextureCoord;\
			\
			uniform sampler2D uSampler;\
			\
			void main(void)\
			{\
				vec4 texel = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\
				vec3 rgb = vColor.rgb * texel.rgb;\
				float alpha = vColor.a * texel.a;\
				gl_FragColor = vec4(mix(vec3(1, 1, 1), rgb, alpha), 1);\
			}";

		this.shaderProgram = this._makeShaderProgram(vertexShaderSource, fragmentShaderSource);
		this.shaderProgramMultiply = this._makeShaderProgram(vertexShaderSource, fragmentShaderMultiplySource);

		this.pMatrix = null;
		this.currentProgram = null;
	}

	_createClass(PIXINeutrinoMaterials, [{
		key: "shutdown",
		value: function shutdown() {}
	}, {
		key: "positionAttribLocation",
		value: function positionAttribLocation() {
			return this.shaderProgram.vertexPositionAttribute;
		}
	}, {
		key: "colorAttribLocation",
		value: function colorAttribLocation() {
			return this.shaderProgram.colorAttribute;
		}
	}, {
		key: "texAttribLocation",
		value: function texAttribLocation(index) {
			return this.shaderProgram.textureCoordAttribute[index];
		}
	}, {
		key: "setup",
		value: function setup(pMatrix, scale) {
			var gl = this.gl;

			this.pMatrix = pMatrix;
			this.scale = scale.slice();
			this.currentProgram = null;
		}
	}, {
		key: "switchToNormal",
		value: function switchToNormal(renderer) {
			var gl = this.gl;

			this._setProgram(this.shaderProgram);
			renderer.state.setBlendMode(0);
		}
	}, {
		key: "switchToAdd",
		value: function switchToAdd(renderer) {
			var gl = this.gl;

			this._setProgram(this.shaderProgram);
			renderer.state.setBlendMode(1);
		}
	}, {
		key: "switchToMultiply",
		value: function switchToMultiply(renderer) {
			var gl = this.gl;

			this._setProgram(this.shaderProgramMultiply);
			renderer.state.setBlendMode(2);
		}
	}, {
		key: "_setProgram",
		value: function _setProgram(program) {
			var gl = this.gl;

			if (program != this.currentProgram) {
				gl.useProgram(program);
				gl.uniformMatrix3fv(program.pMatrixUniform, false, this.pMatrix);
				gl.uniform1i(program.samplerUniform, 0);
				gl.uniform2f(program.scaleUniform, this.scale[0], this.scale[1]);

				this.currentProgram = program;
			}
		}
	}, {
		key: "_makeShaderProgram",
		value: function _makeShaderProgram(vertexShaderSource, fragmentShaderSource) {
			var gl = this.gl;

			var vertexShader = gl.createShader(gl.VERTEX_SHADER);
			gl.shaderSource(vertexShader, vertexShaderSource);
			gl.compileShader(vertexShader);

			if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
				alert(gl.getShaderInfoLog(vertexShader));
				return null;
			}

			var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
			gl.shaderSource(fragmentShader, fragmentShaderSource);
			gl.compileShader(fragmentShader);

			if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
				alert(gl.getShaderInfoLog(fragmentShader));
				return null;
			}

			var shaderProgram = gl.createProgram();
			gl.attachShader(shaderProgram, vertexShader);
			gl.attachShader(shaderProgram, fragmentShader);
			gl.linkProgram(shaderProgram);

			if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
				alert("Could not initialise shaders");
			}

			gl.useProgram(shaderProgram);

			shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
			shaderProgram.colorAttribute = gl.getAttribLocation(shaderProgram, "aColor");
			shaderProgram.textureCoordAttribute = [gl.getAttribLocation(shaderProgram, "aTextureCoord")];

			shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "projectionMatrix");
			shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
			shaderProgram.scaleUniform = gl.getUniformLocation(shaderProgram, "scale");

			return shaderProgram;
		}
	}]);

	return PIXINeutrinoMaterials;
}();

var PIXINeutrinoContext = function () {
	function PIXINeutrinoContext(renderer) {
		_classCallCheck(this, PIXINeutrinoContext);

		var gl = renderer.gl;

		this.renderer = renderer;
		this.neutrino = new NeutrinoParticles();
		this.effectsBasePath = "";
		this.texturesBasePath = "";
		this.trimmedExtensionLookupFirst = true;

		if (!(renderer instanceof PIXI.CanvasRenderer)) {
			this.materials = new PIXINeutrinoMaterials(gl);
		}
	}

	_createClass(PIXINeutrinoContext, [{
		key: "initializeNoise",
		value: function initializeNoise(path, success, fail) {
			this.neutrino.initializeNoise(path, success, fail);
		}
	}, {
		key: "loadEffect",
		value: function loadEffect(path, success, fail) {
			this.neutrino.loadEffect(path, success, fail);
		}
	}]);

	return PIXINeutrinoContext;
}();

var PIXINeutrinoRenderBuffers = function () {
	function PIXINeutrinoRenderBuffers(context, geometryBuffers) {
		_classCallCheck(this, PIXINeutrinoRenderBuffers);

		this.ctx = context;
		this.gl = this.ctx.renderer.gl;

		this.positions = null;
		this.colors = null;
		this.texCoords = [];
		this.maxNumVertices = 0;
		this.numVertices = 0;
		this.indices = null;

		this.renderCalls = [];
		this.maxNumRenderCalls = 0;
		this.numRenderCalls = 0;
	}

	_createClass(PIXINeutrinoRenderBuffers, [{
		key: "initialize",
		value: function initialize(maxNumVertices, texChannels, indices, maxNumRenderCalls) {
			var gl = this.gl;

			this.positions = new Float32Array(new ArrayBuffer(4 * maxNumVertices * 3));
			this.colors = new Uint8Array(new ArrayBuffer(4 * maxNumVertices));
			this.texCoords = [];
			for (var texChannel = 0; texChannel < texChannels.length; ++texChannel) {
				this.texCoords[texChannel] = new Float32Array(new ArrayBuffer(4 * maxNumVertices * texChannels[texChannel]));
				this.texCoords[texChannel].numComponents = texChannels[texChannel];
			}
			this.maxNumVertices = maxNumVertices;

			this.indices = new Uint16Array(new ArrayBuffer(2 * indices.length));
			this.indices.set(indices, 0);

			this.maxNumRenderCalls = maxNumRenderCalls;

			this.positionBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, this.positions, gl.DYNAMIC_DRAW);

			this.colorBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.DYNAMIC_DRAW);

			this.texBuffers = [];
			for (var texIndex = 0; texIndex < this.texCoords.length; ++texIndex) {
				var buffer = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
				gl.bufferData(gl.ARRAY_BUFFER, this.texCoords[texIndex], gl.DYNAMIC_DRAW);
				this.texBuffers.push(buffer);
			}

			this.indicesBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
		}
	}, {
		key: "pushVertex",
		value: function pushVertex(vertex) {
			this.positions.set(vertex.position, this.numVertices * 3);
			this.colors.set(vertex.color, this.numVertices * 4);

			for (var texIndex = 0; texIndex < vertex.texCoords.length; ++texIndex) {
				this.texCoords[texIndex].set(vertex.texCoords[texIndex], this.numVertices * this.texCoords[texIndex].numComponents);
			}

			++this.numVertices;
		}
	}, {
		key: "pushRenderCall",
		value: function pushRenderCall(rc) {

			if (this.numRenderCalls >= this.renderCalls.length) this.renderCalls.push(Object.assign({}, rc));else Object.assign(this.renderCalls[this.numRenderCalls], rc);

			++this.numRenderCalls;
		}
	}, {
		key: "cleanup",
		value: function cleanup() {
			this.numVertices = 0;
			this.numRenderCalls = 0;
		}
	}, {
		key: "updateGlBuffers",
		value: function updateGlBuffers() {
			var gl = this.gl;

			gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
			gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.positions, 0, this.numVertices * 3);

			gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
			gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.colors, 0, this.numVertices * 4);

			this.texBuffers.forEach(function (buffer, index) {
				gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
				gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.texCoords[index], 0, this.numVertices * this.texCoords[index].numComponents);
			}, this);
		}
	}, {
		key: "bind",
		value: function bind() {
			var gl = this.gl;
			var materials = this.ctx.materials;

			{
				gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

				gl.enableVertexAttribArray(materials.positionAttribLocation());
				gl.vertexAttribPointer(materials.positionAttribLocation(), 3, gl.FLOAT, false, 0, 0);
			}

			{
				gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);

				gl.enableVertexAttribArray(materials.colorAttribLocation());
				gl.vertexAttribPointer(materials.colorAttribLocation(), 4, gl.UNSIGNED_BYTE, true, 0, 0);
			}

			this.texBuffers.forEach(function (buffer, index) {

				gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

				gl.enableVertexAttribArray(materials.texAttribLocation(index));
				gl.vertexAttribPointer(materials.texAttribLocation(index), this.texCoords[index].numComponents, gl.FLOAT, false, 0, 0);
			}, this);

			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
		}
	}, {
		key: "shutdown",
		value: function shutdown() {
			var gl = this.gl;

			gl.deleteBuffer(this.positionBuffer);
			gl.deleteBuffer(this.colorBuffer);

			this.texBuffers.forEach(function (buffer) {
				gl.deleteBuffer(buffer);
			}, this);
		}
	}]);

	return PIXINeutrinoRenderBuffers;
}();

var PIXINeutrinoEffectModel = function (_PIXI$DisplayObject) {
	_inherits(PIXINeutrinoEffectModel, _PIXI$DisplayObject);

	function PIXINeutrinoEffectModel(context, effectPath) {
		_classCallCheck(this, PIXINeutrinoEffectModel);

		var _this = _possibleConstructorReturn(this, (PIXINeutrinoEffectModel.__proto__ || Object.getPrototypeOf(PIXINeutrinoEffectModel)).call(this));

		_this.ctx = context;
		_this.effectPath = effectPath;
		_this.effectModel = null;
		_this.numTexturesToLoadLeft = -1;
		_this.texturesRemap = null;

		var pixiNeutrinoEffect = _this;
		_this.ctx.neutrino.loadEffect(_this.ctx.effectsBasePath + effectPath, function (effectModel) {
			pixiNeutrinoEffect._onEffectLoaded(effectModel);
		});
		return _this;
	}

	_createClass(PIXINeutrinoEffectModel, [{
		key: "ready",
		value: function ready() {
			return this.numTexturesToLoadLeft === 0;
		}
	}, {
		key: "_onEffectLoaded",
		value: function _onEffectLoaded(effectModel) {
			this.effectModel = effectModel;
			this.textures = [];
			this.textureImageDescs = [];
			var numTextures = effectModel.textures.length;
			this.numTexturesToLoadLeft = numTextures;

			for (var imageIndex = 0; imageIndex < numTextures; ++imageIndex) {
				var texturePath = effectModel.textures[imageIndex];
				var texture = null;

				if (this.ctx.trimmedExtensionLookupFirst) {
					var trimmedTexturePath = texturePath.replace(/\.[^/.]+$/, ""); // https://stackoverflow.com/a/4250408
					texture = PIXI.utils.TextureCache[trimmedTexturePath];
				}

				if (!texture) texture = PIXI.utils.TextureCache[texturePath];

				if (!texture) texture = PIXI.Texture.fromImage(this.ctx.texturesBasePath + texturePath);

				if (texture.baseTexture.hasLoaded) {
					this._onTextureLoaded(imageIndex, texture);
				} else {
					texture.once('update', function (self, imageIndex, texture) {
						return function () {
							self._onTextureLoaded(imageIndex, texture);
						};
					}(this, imageIndex, texture));
				}
			}
		}
	}, {
		key: "_onTextureLoaded",
		value: function _onTextureLoaded(index, texture) {
			this.textures[index] = texture;

			this.numTexturesToLoadLeft--;

			if (this.ctx.renderer instanceof PIXI.CanvasRenderer) {
				var image = texture.baseTexture.source;
				this.textureImageDescs[index] = new this.ctx.neutrino.ImageDesc(image, texture.orig.x, texture.orig.y, texture.orig.width, texture.orig.height);
			} else {}

			if (this.numTexturesToLoadLeft === 0) {

				if (this.ctx.renderer instanceof PIXI.CanvasRenderer) {} else {
					this._initTexturesRemapIfNeeded();
				}

				this.emit('ready', this);
			}
		}
	}, {
		key: "_initTexturesRemapIfNeeded",
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
			if (remapNeeded) {
				for (var texIdx = 0; texIdx < this.textures.length; ++texIdx) {
					var texture = this.textures[texIdx];

					this.texturesRemap[texIdx] = new this.ctx.neutrino.SubRect(texture.orig.x / texture.baseTexture.realWidth, 1.0 - (texture.orig.y + texture.orig.height) / texture.baseTexture.realHeight, texture.orig.width / texture.baseTexture.realWidth, texture.orig.height / texture.baseTexture.realHeight);
				}
			}
		}
	}]);

	return PIXINeutrinoEffectModel;
}(PIXI.DisplayObject);

var PIXINeutrinoEffect = function (_PIXI$Container) {
	_inherits(PIXINeutrinoEffect, _PIXI$Container);

	function PIXINeutrinoEffect(effectModel, position, rotation, scale) {
		_classCallCheck(this, PIXINeutrinoEffect);

		var _this2 = _possibleConstructorReturn(this, (PIXINeutrinoEffect.__proto__ || Object.getPrototypeOf(PIXINeutrinoEffect)).call(this));

		_this2.ctx = effectModel.ctx;
		_this2.effectModel = effectModel;
		_this2.effect = null;
		_this2.position.set(position[0], position[1]);
		_this2.positionZ = position[2];

		if (rotation) _this2.rotation = rotation;

		if (scale) {
			_this2.scale.x = scale[0];
			_this2.scale.y = scale[1];
			_this2.scaleZ = scale[2];
		} else _this2.scaleZ = 1;

		if (effectModel.ready()) {
			_this2._onEffectReady();
		} else {
			effectModel.once('ready', function () {
				this._onEffectReady();
			}, _this2);
		}
		return _this2;
	}

	_createClass(PIXINeutrinoEffect, [{
		key: "ready",
		value: function ready() {
			return this.effect != null;
		}
	}, {
		key: "update",
		value: function update(dt) {
			if (this.effect != null) {
        this.effect.update(dt, [this.position.x / this.scale.x, this.position.y / this.scale.y, this.positionZ / this.scaleZ], this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.rotation % 360));
			}
		}
	}, {
		key: "renderCanvas",
		value: function renderCanvas(renderer) {
			if (!this.ready()) return;

			renderer.context.setTransform(this.scale.x, 0, 0, this.scale.y, 0, 0);
			this.effect.draw(renderer.context);
		}
	}, {
		key: "renderWebGL",
		value: function renderWebGL(renderer) {
			if (!this.ready()) return;

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
					default:
						this.ctx.materials.switchToNormal(renderer);break;
					case 1:
						this.ctx.materials.switchToAdd(renderer);break;
					case 2:
						this.ctx.materials.switchToMultiply(renderer);break;
				}

				gl.drawElements(gl.TRIANGLES, renderCall.numIndices, gl.UNSIGNED_SHORT, renderCall.startIndex * 2);
			}

			renderer.state.pop();
		}
	}, {
		key: "restart",
		value: function restart(position, rotation) {
			if (position) {
				this.position.x = position[0];
				this.position.y = position[1];
				this.positionZ = position[2];
			}

			if (rotation) {
				this.rotation = rotation;
			}

			this.effect.restart([this.position.x / this.scale.x, this.position.y / this.scale.y, this.positionZ / this.scaleZ], rotation ? this.ctx.neutrino.axisangle2quat_([0, 0, 1], rotation % 360) : null);
		}
	}, {
		key: "resetPosition",
		value: function resetPosition(position, rotation) {
			if (position) {
				this.position.x = position[0];
				this.position.y = position[1];
				this.positionZ = position[2];
			}

			if (rotation) {
				this.rotation = rotation;
			}

			this.effect.resetPosition([this.position.x / this.scale.x, this.position.y / this.scale.y, this.positionZ / this.scaleZ], rotation ? this.ctx.neutrino.axisangle2quat_([0, 0, 1], rotation % 360) : null);
		}
	}, {
		key: "setPropertyInAllEmitters",
		value: function setPropertyInAllEmitters(name, value) {
			this.effect.setPropertyInAllEmitters(name, value);
		}
	}, {
		key: "getNumParticles",
		value: function getNumParticles() {
			return this.effect.getNumParticles();
		}
	}, {
		key: "_onEffectReady",
		value: function _onEffectReady() {
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
	}]);

	return PIXINeutrinoEffect;
}(PIXI.Container);