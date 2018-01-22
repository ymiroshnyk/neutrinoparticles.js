"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PhaserNeutrinoContext = function () {
  function PhaserNeutrinoContext(renderer) {
    var effectsBasePath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var texturesBasePath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

    _classCallCheck(this, PhaserNeutrinoContext);

    this.renderer = renderer;
    this.neutrino = new NeutrinoParticles();
    this.effectsBasePath = effectsBasePath;
    this.texturesBasePath = texturesBasePath;
    this.trimmedExtensionLookupFirst = true;

    if (renderer.type === Phaser.PIXI.WEBGL_RENDERER) {
      this.materials = new PhaserNeutrinoMaterials(renderer);
    }
  }

  _createClass(PhaserNeutrinoContext, [{
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

  return PhaserNeutrinoContext;
}();

var PhaserNeutrinoEffect = function (_Phaser$Group) {
  _inherits(PhaserNeutrinoEffect, _Phaser$Group);

  function PhaserNeutrinoEffect(effectModel, position, game, rotation, scale) {
    _classCallCheck(this, PhaserNeutrinoEffect);

    var _this = _possibleConstructorReturn(this, (PhaserNeutrinoEffect.__proto__ || Object.getPrototypeOf(PhaserNeutrinoEffect)).call(this, game, null));

    _this._renderCanvas = _this.renderCanvas;
    _this._renderWebGL = _this.renderWebGL;

    _this.ctx = effectModel.ctx;
    _this.effectModel = effectModel;
    _this.effect = null;
    _this.position.set(position[0], position[1]);
    _this.positionZ = position[2];

    _this.onReady = new Phaser.Signal();

    if (rotation) _this.rotation = rotation;

    if (scale) {
      _this.scale.x = scale[0];
      _this.scale.y = scale[1];
      _this.scaleZ = scale[2];
    } else {
      _this.scaleZ = 1;
    }

    if (effectModel.isReady) {
      _this._onEffectReady();
    } else {
      effectModel.onReady.addOnce(function () {
        this._onEffectReady();
      }, _this);
    }
    return _this;
  }

  _createClass(PhaserNeutrinoEffect, [{
    key: "updateParticles",
    value: function updateParticles(dt) {
      if (this.effect !== null) {
        this.effect.update(dt, [this.position.x / this.scale.x, this.position.y / this.scale.y, this.positionZ / this.scaleZ], this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.rotation % 360));
      }
    }
  }, {
    key: "renderCanvas",
    value: function renderCanvas(renderer) {
      if (this.isReady) {
        renderer.context.setTransform(this.scale.x, 0, 0, this.scale.y, 0, 0);
        this.effect.draw(renderer.context);
      }
    }
  }, {
    key: "renderWebGL",
    value: function renderWebGL(renderer) {
      if (!this.isReady) return;

      var gl = renderer.gl;

      /*
      renderer.setObjectRenderer(renderer.emptyRenderer);
      renderer.bindVao(null);
      renderer.state.resetAttributes();
       renderer.state.push();
      renderer.state.setState(renderer.state.defaultState);*/

      // hack! the only way to discard current shader for futher engine rendering
      //renderer._activeShader = null;

      //---- example from pixi.js filterManager ------------
      // update projection
      // now restore the regular shader..
      // this.renderSession.shaderManager.setShader(this.defaultShader);
      //gl.uniform2f(this.defaultShader.projectionVector, filterArea.width/2, -filterArea.height/2);
      //gl.uniform2f(this.defaultShader.offsetVector, -filterArea.x, -filterArea.y);
      // -----------------------------------

      var renderSession = game.renderer.renderSession;
      renderSession.spriteBatch.stop();
      var projection = renderSession.projection;
      var offset = renderSession.offset;
      //gl.uniform2f(defaultShader.projectionVector, projection.x, -projection.y);
      //gl.uniform2f(defaultShader.offsetVector, -offset.x, -offset.y);

      // - _activeRenderTarget doesn't exist in this version of pixi
      // var target = renderer._activeRenderTarget;
      //console.log('projectionVector', defaultShader.projectionVector, 'offsetVector', defaultShader.offsetVector)
      //projectionMatrix doesn't exist in this version of pixi

      /* Matrix.ToArray
      array[0] = this.a; > x scale
      array[1] = this.c; > x skew
      array[2] = this.tx;
      array[3] = this.b; > y skew
      array[4] = this.d; > y scale
      array[5] = this.ty;
      array[6] = 0;
      array[7] = 0;
      array[8] = 1;
       */
      //const projectionMatrix = [0.0025, 0, 0, 0, -0.0033333334140479565, 0, -1, 1, 1];//[1, 0, 0, 1, 0, 0, 0, 0, 1];

      //test values copied from pixi version
      // const projectionMatrix = [0.0025, 0, 0, 0, -0.0033333334140479565, 0, -1, 1, 1];
      //TODO - set transform and scale values appropriately on projectionMatrix


      // this.ctx.materials.setup(target.projectionMatrix.toArray(true), [this.scale.x, this.scale.y]);
      this.ctx.materials.setup([projection.x, projection.y], [offset.x, offset.y], [this.scale.x, this.scale.y]);

      this.effect.fillGeometryBuffers([1, 0, 0], [0, -1, 0], [0, 0, -1]);

      this.renderBuffers.updateGlBuffers();
      this.renderBuffers.bind();

      for (var renderCallIdx = 0; renderCallIdx < this.renderBuffers.numRenderCalls; ++renderCallIdx) {
        var renderCall = this.renderBuffers.renderCalls[renderCallIdx];
        var texIndex = this.effect.model.renderStyles[renderCall.renderStyleIndex].textureIndices[0];

        // - renderer.bindTexture doesn't exist in this version of pixi
        // renderer.bindTexture(this.effectModel.textures[texIndex], 0, true);

        //ref to pixi texture
        var texture = this.effectModel.textures[texIndex];
        //game.renderer.updateTexture(texture);//, 0, true);

        //instance of https://developer.mozilla.org/en-US/docs/Web/API/WebGLTexture
        var glTexture = texture.baseTexture._glTextures[0]; //game.renderer.glContextId];

        gl.activeTexture(gl.TEXTURE0); //TODO - correct the value passed in here
        gl.bindTexture(gl.TEXTURE_2D, glTexture.texture);

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

      //renderer.state.pop();
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

      if (this.effectModel.ctx.renderer.type === Phaser.PIXI.CANVAS_RENDERER) {
        this.effect = this.effectModel.effectModel.createCanvas2DInstance(position, rotation);
        this.effect.textureDescs = this.effectModel.textureImageDescs;
      } else {
        this.renderBuffers = new PhaserNeutrinoRenderBuffers(this.ctx);
        this.effect = this.effectModel.effectModel.createWGLInstance(position, rotation, this.renderBuffers);
        this.effect.texturesRemap = this.effectModel.texturesRemap;
      }
      this.onReady.dispatch();
    }
  }, {
    key: "isReady",
    get: function get() {
      return this.effect !== null;
    }
  }]);

  return PhaserNeutrinoEffect;
}(Phaser.Group);

var PhaserNeutrinoEffectModel = function () {
  function PhaserNeutrinoEffectModel(context, effectPath) {
    _classCallCheck(this, PhaserNeutrinoEffectModel);

    this.ctx = context;
    this.effectPath = effectPath;
    this.effectModel = null;
    this.numTexturesToLoadLeft = -1;
    this.texturesRemap = null;

    this.onReady = new Phaser.Signal();

    var pixiNeutrinoEffect = this;
    this.ctx.neutrino.loadEffect(this.ctx.effectsBasePath + effectPath, function (effectModel) {
      pixiNeutrinoEffect._onEffectLoaded(effectModel);
    });
  }

  _createClass(PhaserNeutrinoEffectModel, [{
    key: "_getNewTexture",
    value: function _getNewTexture(id) {
      if (this.ctx.trimmedExtensionLookupFirst) id = id.replace(/\.[^/.]+$/, "");
      //TODO - see if theres a better way of accessing this image data...
      var imageData = game.cache._cache.image[id];
      var baseTexture = imageData.base;
      return new Phaser.PIXI.Texture(baseTexture, imageData.frame);
    }
  }, {
    key: "_onEffectLoaded",
    value: function _onEffectLoaded(effectModel) {
      var _this2 = this;

      this.effectModel = effectModel;
      this.textures = [];
      this.textureImageDescs = [];
      var numTextures = effectModel.textures.length;
      this.numTexturesToLoadLeft = numTextures;

      for (var imageIndex = 0; imageIndex < numTextures; ++imageIndex) {
        var texturePath = effectModel.textures[imageIndex];
        var texture = this._getNewTexture(texturePath);

        if (!texture)
          //TODO - fix this for Phaser
          texture = PIXI.Texture.fromImage(this.ctx.texturesBasePath + texturePath);

        if (texture.baseTexture.hasLoaded) {
          this._onTextureLoaded(imageIndex, texture);
        } else {
          (function () {
            var callback = function (self, imageIndex, texture) {
              texture.off('update', callback);
              return function () {
                self._onTextureLoaded(imageIndex, texture);
              };
            }(_this2, imageIndex, texture);

            texture.on('update', callback);
          })();
        }
      }
    }
  }, {
    key: "_onTextureLoaded",
    value: function _onTextureLoaded(index, texture) {
      this.textures[index] = texture;

      this.numTexturesToLoadLeft--;

      if (this.ctx.renderer.type === Phaser.PIXI.CANVAS_RENDERER) {
        var image = texture.baseTexture.source;
        //TODO - texture.orig doesn't exist in this version of pixi...
        this.textureImageDescs[index] = new this.ctx.neutrino.ImageDesc(image, texture.orig.x, texture.orig.y, texture.orig.width, texture.orig.height);
      }

      if (this.numTexturesToLoadLeft === 0) {

        if (this.ctx.renderer.type === Phaser.PIXI.WEBGL_RENDERER) {
          this._initTexturesRemapIfNeeded();
        }
        //this.emit('ready', this);
        this.onReady.dispatch();
      }
    }
  }, {
    key: "_initTexturesRemapIfNeeded",
    value: function _initTexturesRemapIfNeeded() {
      var remapNeeded = false;

      for (var texIdx = 0; texIdx < this.textures.length; ++texIdx) {
        var texture = this.textures[texIdx];
        //checks if its an atlas subtexture
        if (texture.orig && (texture.orig.x !== 0 || texture.orig.y !== 0 || texture.orig.width !== texture.baseTexture.realWidth || texture.orig.height !== texture.baseTexture.realHeight)) {
          remapNeeded = true;
          break;
        }
      }

      this.texturesRemap = [];
      if (remapNeeded) {
        var n = this.textures.length;
        for (var _texIdx = 0; _texIdx < n; ++_texIdx) {
          var _texture = this.textures[_texIdx];

          this.texturesRemap[_texIdx] = new this.ctx.neutrino.SubRect(_texture.orig.x / _texture.baseTexture.realWidth, 1.0 - (_texture.orig.y + _texture.orig.height) / _texture.baseTexture.realHeight, _texture.orig.width / _texture.baseTexture.realWidth, _texture.orig.height / _texture.baseTexture.realHeight);
        }
      }
    }
  }, {
    key: "isReady",
    get: function get() {
      return this.numTexturesToLoadLeft === 0;
    }
  }]);

  return PhaserNeutrinoEffectModel;
}();

var PhaserNeutrinoShader = function PhaserNeutrinoShader(program) {
  _classCallCheck(this, PhaserNeutrinoShader);

  this.program = program;
  this._UID = PIXI._UID++;
  this.attributes = [program.vertexPositionAttribute, program.colorAttribute, program.textureCoordAttribute];
};

var PhaserNeutrinoMaterials = function () {
  function PhaserNeutrinoMaterials(renderer) {
    _classCallCheck(this, PhaserNeutrinoMaterials);

    this.gl = renderer.gl;

    var vertexShaderSource = "\
			attribute vec3 aVertexPosition;\
			attribute vec4 aColor; \
			attribute vec2 aTextureCoord;\
			\
			uniform vec2 projectionVector;\
      uniform vec2 offsetVector; \
			uniform vec2 scale;\
			\
			varying vec4 vColor;\
			varying vec2 vTextureCoord;\
      \
      const vec2 center = vec2(0, 0); \
			\
			void main(void) {\
        gl_Position = vec4(((aVertexPosition.xy * scale + offsetVector) / projectionVector) + center , 0.0, 1.0); \
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

    this.shaderProgram.shader = new PhaserNeutrinoShader(this.shaderProgram);
    this.shaderProgramMultiply.shader = new PhaserNeutrinoShader(this.shaderProgramMultiply);
    renderer.shaderManager.setShader(this.shaderProgram.shader);

    this.pMatrix = null;
    this.currentProgram = null;
  }

  _createClass(PhaserNeutrinoMaterials, [{
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
    value: function setup(projectionVector, offsetVector, scale) {
      this.projectionVector = projectionVector.slice();
      this.offsetVector = offsetVector.slice();
      this.scale = scale.slice();
      this.currentProgram = null;
    }
  }, {
    key: "switchToNormal",
    value: function switchToNormal(renderer) {
      this._setProgram(renderer, this.shaderProgram);
      renderer.blendModeManager.setBlendMode(0);
    }
  }, {
    key: "switchToAdd",
    value: function switchToAdd(renderer) {
      this._setProgram(renderer, this.shaderProgram);
      renderer.blendModeManager.setBlendMode(1);
    }
  }, {
    key: "switchToMultiply",
    value: function switchToMultiply(renderer) {
      this._setProgram(renderer, this.shaderProgramMultiply);
      renderer.blendModeManager.setBlendMode(2);
    }
  }, {
    key: "_setProgram",
    value: function _setProgram(renderer, program) {
      var gl = this.gl;

      if (program !== this.currentProgram) {
        renderer.shaderManager.setShader(program.shader);

        // console.log('_setProgram',program.pMatrixUniform, this.pMatrix)
        gl.uniform2fv(program.projectionVectorUniform, this.projectionVector);
        gl.uniform2fv(program.offsetVectorUniform, this.offsetVector);
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

      shaderProgram.projectionVectorUniform = gl.getUniformLocation(shaderProgram, "projectionVector");
      shaderProgram.offsetVectorUniform = gl.getUniformLocation(shaderProgram, "offsetVector");
      shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
      shaderProgram.scaleUniform = gl.getUniformLocation(shaderProgram, "scale");

      return shaderProgram;
    }
  }]);

  return PhaserNeutrinoMaterials;
}();

var PhaserNeutrinoRenderBuffers = function () {
  function PhaserNeutrinoRenderBuffers(context, geometryBuffers) {
    _classCallCheck(this, PhaserNeutrinoRenderBuffers);

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

  _createClass(PhaserNeutrinoRenderBuffers, [{
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

  return PhaserNeutrinoRenderBuffers;
}();
//# sourceMappingURL=neutrinoparticles.phaser.js.map
