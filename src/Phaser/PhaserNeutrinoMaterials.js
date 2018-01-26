class PhaserNeutrinoShader {
  constructor(program) {
    this.program = program;
    this._UID = PIXI._UID++;
    this.attributes = [program.vertexPositionAttribute, program.colorAttribute, program.textureCoordAttribute];
  }
}

class PhaserNeutrinoMaterials {

  constructor(renderer) {
    this.gl = renderer.gl;

    var vertexShaderSource = "\
/* NeutrinoParticles Vertex Shader */ \n\
\n\
attribute vec3 aVertexPosition;\n\
attribute vec2 aTextureCoord;\n\
attribute vec4 aColor; \n\
\n\
uniform vec2 projectionVector;\n\
uniform vec2 offsetVector; \n\
uniform vec2 scale;\n\
\n\
varying vec4 vColor;\n\
varying vec2 vTextureCoord;\n\
\n\
const vec2 center = vec2(-1.0, 1.0); \n\
\n\
void main(void) {\n\
gl_Position = vec4(((aVertexPosition.xy * scale + offsetVector) / projectionVector) + center , 0.0, 1.0); \n\
	vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n\
	vTextureCoord = vec2(aTextureCoord.x, 1.0 - aTextureCoord.y);\n\
}";

    var fragmentShaderSource = "\
/* NeutrinoParticles Fragment Shader (Normal, Add materials) */ \n\
\n\
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
\n\
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

    this.shaderProgram = this._makeShaderProgram(vertexShaderSource, fragmentShaderSource);
    this.shaderProgramMultiply = this._makeShaderProgram(vertexShaderSource, fragmentShaderMultiplySource);

    this.shaderProgram.shader = new PhaserNeutrinoShader(this.shaderProgram);
    this.shaderProgramMultiply.shader = new PhaserNeutrinoShader(this.shaderProgramMultiply);
    renderer.shaderManager.setShader(this.shaderProgram.shader);

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

  setup(projectionVector, offsetVector, scale) {
    this.projectionVector = projectionVector.slice();
    this.offsetVector = offsetVector.slice();
    this.scale = scale.slice();
    this.currentProgram = null;
  }

  switchToNormal(renderer) {
    this._setProgram(renderer, this.shaderProgram);
    renderer.blendModeManager.setBlendMode(0);
  }

  switchToAdd(renderer) {
    this._setProgram(renderer, this.shaderProgram);
    renderer.blendModeManager.setBlendMode(1);
  }

  switchToMultiply(renderer) {
    this._setProgram(renderer, this.shaderProgramMultiply);
    renderer.blendModeManager.setBlendMode(2);
  }

  _setProgram(renderer, program) {
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

    shaderProgram.projectionVectorUniform = gl.getUniformLocation(shaderProgram, "projectionVector");
    shaderProgram.offsetVectorUniform = gl.getUniformLocation(shaderProgram, "offsetVector");
    shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
    shaderProgram.scaleUniform = gl.getUniformLocation(shaderProgram, "scale");

    return shaderProgram;
  }
}