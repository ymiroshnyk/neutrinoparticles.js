(function (root, factory) {
    var resolved = [],
        required = ["require","exports","module"],
        i, len = required.length;

    if (typeof define === "function" && define.amd) {
        define("PIXINeutrinoContext",["require","exports","module"], factory);
    } else if (typeof exports === "object") {
        for (i = 0; i < len; i += 1) {
            resolved.push(require(required[i]));
        }

        module.exports = factory.apply({}, resolved);
    } else {
        for (i = 0; i < len; i += 1) {
            resolved.push(root[required[i]]);
        }

        root["PIXINeutrinoContext"] = factory.apply({}, resolved);
    }
}(this, function (require,exports,module) {
    
    return "use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
			this.materials = new PIXINeutrinoMaterials(this);
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
    
}));
(function (root, factory) {
    var resolved = [],
        required = ["require","exports","module"],
        i, len = required.length;

    if (typeof define === "function" && define.amd) {
        define("PIXINeutrinoEffect",["require","exports","module"], factory);
    } else if (typeof exports === "object") {
        for (i = 0; i < len; i += 1) {
            resolved.push(require(required[i]));
        }

        module.exports = factory.apply({}, resolved);
    } else {
        for (i = 0; i < len; i += 1) {
            resolved.push(root[required[i]]);
        }

        root["PIXINeutrinoEffect"] = factory.apply({}, resolved);
    }
}(this, function (require,exports,module) {
    
    return 'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PIXINeutrinoEffect = function (_PIXI$Container) {
	_inherits(PIXINeutrinoEffect, _PIXI$Container);

	function PIXINeutrinoEffect(effectModel, position, rotation, scale, baseParent) {
		_classCallCheck(this, PIXINeutrinoEffect);

		var _this = _possibleConstructorReturn(this, (PIXINeutrinoEffect.__proto__ || Object.getPrototypeOf(PIXINeutrinoEffect)).call(this));

		_this.ctx = effectModel.ctx;
		_this.effectModel = effectModel;
		_this.effect = null;
		_this.baseParent = baseParent;

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
		}

		_this._updateWorldTransform();
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

			if (this.effect != null) {
				this.effect.update(dt, this._scaledPosition(), this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.worldRotationDegree));
			}
		}
	}, {
		key: 'renderCanvas',
		value: function renderCanvas(renderer) {
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
		key: 'renderWebGL',
		value: function renderWebGL(renderer) {
			if (!this.ready()) return;

			renderer.setObjectRenderer(renderer.emptyRenderer);

			if (this.baseParent) {
				var sx = this.worldScale.x;
				var sy = this.worldScale.y;
				var m = this.baseParent.worldTransform;
				this.ctx.materials.setup([m.a * sx, m.b * sy, 0, m.c * sx, m.d * sy, 0, m.tx * sx, m.ty * sy, 1]);
			} else {
				this.ctx.materials.setup([this.worldScale.x, 0, 0, 0, this.worldScale.y, 0, 0, 0, 1]);
			}

			this.effect.fillGeometryBuffers([1, 0, 0], [0, -1, 0], [0, 0, -1]);

			this.renderBuffers.updateGlBuffers();
			this.renderBuffers.bind();

			for (var renderCallIdx = 0; renderCallIdx < this.renderBuffers.numRenderCalls; ++renderCallIdx) {
				var renderCall = this.renderBuffers.renderCalls[renderCallIdx];
				var texIndex = this.effect.model.renderStyles[renderCall.renderStyleIndex].textureIndices[0];

				var texture = this.effectModel.textures[texIndex];
				renderer.bindTexture(texture, 0, true);

				var premultiplied = texture.baseTexture.premultipliedAlpha;
				var materialIndex = this.effect.model.renderStyles[renderCall.renderStyleIndex].materialIndex;
				switch (this.effect.model.materials[materialIndex]) {
					default:
						this.ctx.materials.switchToNormal(premultiplied);break;
					case 1:
						this.ctx.materials.switchToAdd(premultiplied);break;
					case 2:
						this.ctx.materials.switchToMultiply(premultiplied);break;
				}

				this.renderBuffers.draw(renderCall.numIndices, renderCall.startIndex);
			}
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
		key: '_onEffectReady',
		value: function _onEffectReady() {
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
	}]);

	return PIXINeutrinoEffect;
}(PIXI.Container);
    
}));
(function (root, factory) {
    var resolved = [],
        required = ["require","exports","module"],
        i, len = required.length;

    if (typeof define === "function" && define.amd) {
        define("PIXINeutrinoEffectModel",["require","exports","module"], factory);
    } else if (typeof exports === "object") {
        for (i = 0; i < len; i += 1) {
            resolved.push(require(required[i]));
        }

        module.exports = factory.apply({}, resolved);
    } else {
        for (i = 0; i < len; i += 1) {
            resolved.push(root[required[i]]);
        }

        root["PIXINeutrinoEffectModel"] = factory.apply({}, resolved);
    }
}(this, function (require,exports,module) {
    
    return 'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
		key: 'ready',
		value: function ready() {
			return this.numTexturesToLoadLeft === 0;
		}
	}, {
		key: '_onEffectLoaded',
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
		key: '_onTextureLoaded',
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
    
}));
(function (root, factory) {
    var resolved = [],
        required = ["require","exports","module"],
        i, len = required.length;

    if (typeof define === "function" && define.amd) {
        define("PIXINeutrinoMaterials",["require","exports","module"], factory);
    } else if (typeof exports === "object") {
        for (i = 0; i < len; i += 1) {
            resolved.push(require(required[i]));
        }

        module.exports = factory.apply({}, resolved);
    } else {
        for (i = 0; i < len; i += 1) {
            resolved.push(root[required[i]]);
        }

        root["PIXINeutrinoMaterials"] = factory.apply({}, resolved);
    }
}(this, function (require,exports,module) {
    
    return "use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PIXINeutrinoMaterials = function () {
	function PIXINeutrinoMaterials(ctx) {
		_classCallCheck(this, PIXINeutrinoMaterials);

		this.ctx = ctx;
		this.renderer = ctx.renderer;
		var gl = this.renderer.gl;

		var vertexShaderSource = "\
/* NeutrinoParticles Vertex Shader */ \n\
attribute vec3 aVertexPosition;\n\
attribute vec4 aColor; \n\
attribute vec2 aTextureCoord;\n\
\n\
uniform mat3 projectionMatrix;\n\
uniform mat3 worldMatrix;\n\
\n\
varying vec4 vColor;\n\
varying vec2 vTextureCoord;\n\
\n\
void main(void) {\n\
	gl_Position = vec4((projectionMatrix * worldMatrix * vec3(aVertexPosition.xy, 1)).xy, 0, 1);\n\
	vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n\
	vTextureCoord = vec2(aTextureCoord.x, 1.0 - aTextureCoord.y);\n\
}";

		var fragmentShaderSource = "\
/* NeutrinoParticles Fragment Shader (Normal, Add materials) */ \n\
precision mediump float;\n\
\n\
varying vec4 vColor;\n\
varying vec2 vTextureCoord;\n\
\n\
uniform sampler2D uSampler;\n\
\n\
void main(void) {\n\
	gl_FragColor = vColor * texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n\
}";

		var fragmentShaderMultiplySource = "\
/* NeutrinoParticles Fragment Shader (Multiply material) */ \n\
precision mediump float;\n\
\n\
varying vec4 vColor;\n\
varying vec2 vTextureCoord;\n\
\n\
uniform sampler2D uSampler;\n\
\n\
void main(void)\n\
{\n\
	vec4 texel = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n\
	vec3 rgb = vColor.rgb * texel.rgb;\n\
	float alpha = vColor.a * texel.a;\n\
	gl_FragColor = vec4(mix(vec3(1, 1, 1), rgb, alpha), 1);\n\
}";

		this.shader = new PIXI.Shader(gl, vertexShaderSource, fragmentShaderSource);
		this.shaderMultiply = new PIXI.Shader(gl, vertexShaderSource, fragmentShaderSource);
		this.currentShader = null;
	}

	_createClass(PIXINeutrinoMaterials, [{
		key: "shutdown",
		value: function shutdown() {}
	}, {
		key: "positionAttrib",
		value: function positionAttrib() {
			return this.shader.attributes.aVertexPosition;
		}
	}, {
		key: "colorAttrib",
		value: function colorAttrib() {
			return this.shader.attributes.aColor;
		}
	}, {
		key: "texAttrib",
		value: function texAttrib(index) {
			return this.shader.attributes.aTextureCoord;
		}
	}, {
		key: "setup",
		value: function setup(worldMatrixArray) {
			this.worldMatrix = worldMatrixArray;
			this.currentShader = null;
		}
	}, {
		key: "switchToNormal",
		value: function switchToNormal(premultiplied) {
			this._setShader(this.shader);
			this.renderer.state.setBlendMode(PIXI.utils.correctBlendMode(0, premultiplied));
		}
	}, {
		key: "switchToAdd",
		value: function switchToAdd(premultiplied) {
			this._setShader(this.shader);
			this.renderer.state.setBlendMode(PIXI.utils.correctBlendMode(1, premultiplied));
		}
	}, {
		key: "switchToMultiply",
		value: function switchToMultiply(premultiplied) {
			this._setShader(this.shaderMultiply);
			this.renderer.state.setBlendMode(PIXI.utils.correctBlendMode(2, premultiplied));
		}
	}, {
		key: "_setShader",
		value: function _setShader(shader) {
			if (this.currentShader != shader) {
				this.renderer.bindShader(shader);
				shader.uniforms.uSampler = 0;
				shader.uniforms.worldMatrix = this.worldMatrix;

				this.currentShader = shader;
			}
		}
	}]);

	return PIXINeutrinoMaterials;
}();
    
}));
(function (root, factory) {
    var resolved = [],
        required = ["require","exports","module"],
        i, len = required.length;

    if (typeof define === "function" && define.amd) {
        define("PIXINeutrinoRenderBuffers",["require","exports","module"], factory);
    } else if (typeof exports === "object") {
        for (i = 0; i < len; i += 1) {
            resolved.push(require(required[i]));
        }

        module.exports = factory.apply({}, resolved);
    } else {
        for (i = 0; i < len; i += 1) {
            resolved.push(root[required[i]]);
        }

        root["PIXINeutrinoRenderBuffers"] = factory.apply({}, resolved);
    }
}(this, function (require,exports,module) {
    
    return "use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

			// set null vao to prevent overriding of it's buffers to next ones
			this.ctx.renderer.bindVao(null);

			this.positionBuffer = PIXI.glCore.GLBuffer.createVertexBuffer(gl, this.positions, gl.DYNAMIC_DRAW);

			this.colorBuffer = PIXI.glCore.GLBuffer.createVertexBuffer(gl, this.colors, gl.DYNAMIC_DRAW);

			this.texBuffers = [];
			for (var texIndex = 0; texIndex < this.texCoords.length; ++texIndex) {
				var buffer = PIXI.glCore.GLBuffer.createVertexBuffer(gl, this.texCoords[texIndex], gl.DYNAMIC_DRAW);
				this.texBuffers.push(buffer);
			}

			this.indicesBuffer = PIXI.glCore.GLBuffer.createIndexBuffer(gl, this.indices, gl.STATIC_DRAW);

			var materials = this.ctx.materials;

			this.vao = this.ctx.renderer.createVao().addIndex(this.indicesBuffer).addAttribute(this.positionBuffer, materials.positionAttrib(), gl.FLOAT, false, 0, 0).addAttribute(this.colorBuffer, materials.colorAttrib(), gl.UNSIGNED_BYTE, true, 0, 0);

			for (var texIndex = 0; texIndex < this.texCoords.length; ++texIndex) {
				this.vao.addAttribute(this.texBuffers[texIndex], materials.texAttrib(texIndex), gl.FLOAT, false, 0, 0);
			}
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

			if (this.numVertices > 0) {
				this.positionBuffer.upload(new Float32Array(this.positions.buffer, 0, this.numVertices * 3), 0);
				this.colorBuffer.upload(new Int32Array(this.colors.buffer, 0, this.numVertices), 0);

				this.texBuffers.forEach(function (buffer, index) {
					buffer.upload(new Float32Array(this.texCoords[index].buffer, 0, this.numVertices * this.texCoords[index].numComponents), 0);
				}, this);
			}
		}
	}, {
		key: "bind",
		value: function bind() {
			this.ctx.renderer.bindVao(this.vao);
		}
	}, {
		key: "draw",
		value: function draw(size, start) {
			var gl = this.gl;

			this.vao.draw(gl.TRIANGLES, size, start);
		}
	}, {
		key: "shutdown",
		value: function shutdown() {
			this.positionBuffer.destroy();
			this.colorBuffer.destroy();

			this.texBuffers.forEach(function (buffer) {
				buffer.destroy();
			}, this);
		}
	}]);

	return PIXINeutrinoRenderBuffers;
}();
    
}));