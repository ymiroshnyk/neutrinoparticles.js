class PIXINeutrinoMaterials {

	constructor(ctx) {
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

	shutdown() {
	}

	positionAttrib() {
		return this.shader.attributes.aVertexPosition;
	}

	colorAttrib() {
		return this.shader.attributes.aColor;
	}

	texAttrib(index) {
		return this.shader.attributes.aTextureCoord;
	}

	setup(worldMatrixArray) {
		this.worldMatrix = worldMatrixArray;
		this.currentShader = null;
	}

	switchToNormal(premultiplied) {
		this._setShader(this.shader);
		this.renderer.state.setBlendMode(PIXI.utils.correctBlendMode(0, premultiplied));
	}

	switchToAdd(premultiplied) {
		this._setShader(this.shader);
		this.renderer.state.setBlendMode(PIXI.utils.correctBlendMode(1, premultiplied));
	}

	switchToMultiply(premultiplied) {
		this._setShader(this.shaderMultiply);
		this.renderer.state.setBlendMode(PIXI.utils.correctBlendMode(2, premultiplied));
	}

	_setShader(shader) {
		if (this.currentShader != shader)
		{
			this.renderer.bindShader(shader);
			shader.uniforms.uSampler = 0;
			shader.uniforms.worldMatrix = this.worldMatrix;

			this.currentShader = shader;
		}
	}
}
