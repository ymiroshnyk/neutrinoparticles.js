class WebGLNeutrinoEffectModel {
	constructor(wglNeutrinoContext, effectModel, textureDescs) {
		this.ctx = wglNeutrinoContext;
		this.gl = wglNeutrinoContext.gl;
		this.effectModel = effectModel;
		this.textureDescs = textureDescs;
		this.textures = [];

		this._createGLTexturesFromTextureDescs();
	}

	_createGLTexturesFromTextureDescs() {
		for (var imageIndex = 0; imageIndex < this.textureDescs.length; ++imageIndex) {
			var texture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.textureDescs[imageIndex].image);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			this.textures[imageIndex] = texture;
		}

		gl.bindTexture(gl.TEXTURE_2D, null);
	}
}