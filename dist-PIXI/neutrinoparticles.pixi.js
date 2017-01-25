class PIXINeutrinoMaterials {

	constructor(gl) {
		this.gl = gl;

		var vertexShaderSource = "\
			attribute vec3 aVertexPosition; \
			attribute vec4 aColor; \
			attribute vec2 aTextureCoord; \
			\
			uniform mat3 projectionMatrix; \
			\
			varying vec4 vColor; \
			varying vec2 vTextureCoord; \
			\
			void main(void) { \
				gl_Position = vec4((projectionMatrix * vec3(aVertexPosition.xy, 1.0)).xy, 0, 1); \
				vColor = vec4(aColor.rgb * aColor.a, aColor.a); \
				vTextureCoord = vec2(aTextureCoord.x, 1.0 - aTextureCoord.y); \
			}";

		var fragmentShaderSource = "\
			precision mediump float; \
			\
			varying vec4 vColor; \
			varying vec2 vTextureCoord; \
			\
			uniform sampler2D uSampler; \
			\
			void main(void) { \
				gl_FragColor = vColor * texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)); \
			}";

		var fragmentShaderMultiplySource = "\
			precision mediump float; \
			\
			varying vec4 vColor; \
			varying vec2 vTextureCoord; \
			\
			uniform sampler2D uSampler; \
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

	shutdown() {
	}

	positionAttribLocation() {
		return this.shaderProgram.vertexPositionAttribute;
	}

	colorAttribLocation() {
		return this.shaderProgram.colorAttribute;
	}

	texAttribLocation(index) {
		return this.shaderProgram.textureCoordAttribute[index];
	}

	setup(pMatrix) {
		var gl = this.gl;

		this.pMatrix = pMatrix;
		this.currentProgram = null;
	}

	switchToNormal(renderer) {
		var gl = this.gl;

		this._setProgram(this.shaderProgram);
		renderer.state.setBlendMode(0);
	}

	switchToAdd(renderer) {
		var gl = this.gl;

		this._setProgram(this.shaderProgram);
		renderer.state.setBlendMode(1);
	}

	switchToMultiply(renderer) {
		var gl = this.gl;

		this._setProgram(this.shaderProgramMultiply);
		renderer.state.setBlendMode(2);
	}

	_setProgram(program) {
		var gl = this.gl;

		if (program != this.currentProgram) {
			gl.useProgram(program);
			gl.uniformMatrix3fv(program.pMatrixUniform, false, this.pMatrix);
			gl.uniform1i(program.samplerUniform, 0);

			this.currentProgram = program;
		}
	}

	_makeShaderProgram(vertexShaderSource, fragmentShaderSource) {
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
		gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

		shaderProgram.colorAttribute = gl.getAttribLocation(shaderProgram, "aColor");
		gl.enableVertexAttribArray(shaderProgram.colorAttribute);

		shaderProgram.textureCoordAttribute = [gl.getAttribLocation(shaderProgram, "aTextureCoord")];
		gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute[0]);

		shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "projectionMatrix");
		shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");

		return shaderProgram;
	}
}

class PIXINeutrinoContext {

	constructor(renderer) {
		var gl = renderer.gl;
		
		this.renderer = renderer;
		this.neutrino = new NeutrinoParticles();
		this.effectsBasePath = "";
		this.texturesBasePath = "";

		if (!(renderer instanceof PIXI.CanvasRenderer)) {
			this.neutrinoWGL = new NeutrinoParticlesWGL(gl);
			this.materials = new PIXINeutrinoMaterials(gl);
		}
	}
}

class PIXINeutrinoEffectModel extends PIXI.DisplayObject {

	constructor(context, effectPath) {
		super();

		this.ctx = context;
		this.effectPath = effectPath;
		this.effectModel = null;
		this.numTexturesToLoadLeft = -1;

		var pixiNeutrinoEffect = this;
		this.ctx.neutrino.loadEffect(this.ctx.effectsBasePath + effectPath, function (effectModel) {
			pixiNeutrinoEffect._onEffectLoaded(effectModel);
		});
	}



	ready() {
		return this.numTexturesToLoadLeft === 0;
	}

	_onEffectLoaded(effectModel) {
		this.effectModel = effectModel;
		this.textures = [];
		this.textureImageDescs = [];
		this.numTexturesToLoadLeft = effectModel.textures.length;

		for (var imageIndex = 0; imageIndex < this.numTexturesToLoadLeft; ++imageIndex) {
			var texture = PIXI.Texture.fromImage(this.ctx.texturesBasePath + effectModel.textures[imageIndex]);

			if (texture.baseTexture.hasLoaded) {
				this._onTextureLoaded(imageIndex, texture);
			} else {
				texture.once('update', function (self, imageIndex, texture) {
					return function () {
						self._onTextureLoaded(imageIndex, texture);
					}
				} (this, imageIndex, texture));
			}

		}
	}

	_onTextureLoaded(index, texture) {
		this.textures[index] = texture;

		var image = texture.baseTexture.source;
		this.numTexturesToLoadLeft--;

		if (this.ctx.renderer instanceof PIXI.CanvasRenderer) {
			this.textureImageDescs[index] = new this.ctx.neutrino.ImageDesc(image, 0, 0, image.width, image.height);
		} else {
			this.textureImageDescs[index] = image;
		}

		if (this.numTexturesToLoadLeft === 0) {
			this.emit('ready', this);
		}
	}
}

class PIXINeutrinoEffect extends PIXI.Container {

	constructor(effectModel, position) {
		super();

		this.ctx = effectModel.ctx;
		this.effectModel = effectModel;
		this.effect = null;
		this.position.set(position[0], position[1]);
		this.positionZ = position[2];

		if (effectModel.ready()) {
			_onEffectReady();
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
			this.effect.update(dt, [this.position.x, this.position.y, this.positionZ]);
		}
	}

	renderCanvas(renderer) {
		if (!this.ready())
			return;

		renderer.context.setTransform(1, 0, 0, 1, 0, 0);

		// другие объекты смещают контекст. нужно ставить соответственно позиции контейнера
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
		
		// hack! the only way to discard current shader for future engine rendering
		renderer._activeShader = null;

		var target = renderer._activeRenderTarget;

		this.effect.fillGeometryBuffers([1, 0, 0], [0, -1, 0], [0, 0, -1]);
		
		this.ctx.materials.setup(target.projectionMatrix.array);

		// shader programs have the same attributes configuration, so we can set them once and then just change programs
		this.buffers.setup(this.effect.geometryBuffers);

		this.effect.geometryBuffers.renderCalls.forEach(function (renderCall) {
			var texIndex = this.effect.model.renderStyles[renderCall.renderStyleIndex].textureIndices[0];

			renderer.bindTexture(this.effectModel.textures[texIndex], 0, true);

			var materialIndex = this.effect.model.renderStyles[renderCall.renderStyleIndex].materialIndex;
			switch (this.effect.model.materials[materialIndex]) {
				default: this.ctx.materials.switchToNormal(renderer); break;
				case 1: this.ctx.materials.switchToAdd(renderer); break;
				case 2: this.ctx.materials.switchToMultiply(renderer); break;
			}

			gl.drawElements(gl.TRIANGLES, renderCall.numIndices, gl.UNSIGNED_SHORT, renderCall.startIndex * 2);
		}, this);

		renderer.state.pop();
	}

	_onEffectReady() {
		var position = [this.position.x, this.position.y, this.positionZ];

		if (this.effectModel.ctx.renderer instanceof PIXI.CanvasRenderer) {
			this.effect = this.effectModel.effectModel.createCanvas2DInstance(position);
			this.effect.textureDescs = this.effectModel.textureImageDescs;
		} else {
			this.effect = this.effectModel.effectModel.createWGLInstance(position);
			this.buffers = new this.ctx.neutrinoWGL.RenderBuffers(this.effect.geometryBuffers);
		}

		this.emit('ready', this);
	}
}