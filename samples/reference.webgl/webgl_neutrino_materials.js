class WebGLNeutrinoMaterials {

	constructor(wglNeutrinoContext) {
		this.ctx = wglNeutrinoContext;
		this.gl = wglNeutrinoContext.gl;

		this.pMatrix = null;
		this.mvMatrix = null;
		this.currentProgram = null;

		var vertexShaderSource = "\
			attribute vec3 aVertexPosition; \
			attribute vec4 aColor; \
			attribute vec2 aTextureCoord; \
			\
			uniform mat4 uMVMatrix; \
			uniform mat4 uPMatrix; \
			\
			varying vec4 vColor; \
			varying vec2 vTextureCoord; \
			\
			void main(void) { \
				gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0); \
				vColor = aColor; \
				vTextureCoord = aTextureCoord; \
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

	setup(pMatrix, mvMatrix) {
		var gl = this.gl;

		gl.enable(gl.BLEND);
		gl.disable(gl.DEPTH_TEST);

		this.pMatrix = pMatrix;
		this.mvMatrix = mvMatrix;
		this.currentProgram = null;
	}

	switchToNormal() {
		var gl = this.gl;

		this._setProgram(this.shaderProgram);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	}

	switchToAdd() {
		var gl = this.gl;

		this._setProgram(this.shaderProgram);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
	}

	switchToMultiply() {
		var gl = this.gl;

		this._setProgram(this.shaderProgramMultiply);
		gl.blendFunc(gl.ZERO, gl.SRC_COLOR);
	}

	_setProgram(program) {
		var gl = this.gl;

		if (program != this.currentProgram) {
			gl.useProgram(program);
			gl.uniformMatrix4fv(program.pMatrixUniform, false, this.pMatrix);
			gl.uniformMatrix4fv(program.mvMatrixUniform, false, this.mvMatrix);
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

		shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
		shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
		shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");

		return shaderProgram;
	}

	
}