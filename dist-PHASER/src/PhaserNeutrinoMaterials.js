class PhaserNeutrinoMaterials {

  constructor(gl) {
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

  setup(pMatrix, scale) {
    // console.log('PIXINeutrinoMaterials setup', pMatrix)
    // var gl = this.gl;

    this.pMatrix = pMatrix;
    this.scale = scale.slice();
    this.currentProgram = null;
  }

  switchToNormal(renderer) {
    this._setProgram(this.shaderProgram);
    renderer.blendModeManager.setBlendMode(0);
  }

  switchToAdd(renderer) {
    this._setProgram(this.shaderProgram);
    renderer.blendModeManager.setBlendMode(1);
  }

  switchToMultiply(renderer) {
    this._setProgram(this.shaderProgramMultiply);
    renderer.blendModeManager.setBlendMode(2);
  }

  _setProgram(program) {
    var gl = this.gl;

    if (program !== this.currentProgram) {
      gl.useProgram(program);
      // console.log('_setProgram',program.pMatrixUniform, this.pMatrix)
      gl.uniformMatrix3fv(program.pMatrixUniform, false, this.pMatrix);
      gl.uniform1i(program.samplerUniform, 0);
      gl.uniform2f(program.scaleUniform, this.scale[0], this.scale[1]);

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
    shaderProgram.colorAttribute = gl.getAttribLocation(shaderProgram, "aColor");
    shaderProgram.textureCoordAttribute = [gl.getAttribLocation(shaderProgram, "aTextureCoord")];

    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
    shaderProgram.scaleUniform = gl.getUniformLocation(shaderProgram, "scale");

    return shaderProgram;
  }
}