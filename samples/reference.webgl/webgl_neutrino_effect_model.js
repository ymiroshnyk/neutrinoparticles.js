class WebGLNeutrinoEffectModel {
	constructor(wglNeutrinoContext, effectModel, textureDescs) {
		this.ctx = wglNeutrinoContext;
		this.gl = wglNeutrinoContext.gl;
		this.effectModel = effectModel;
		this.textureDescs = textureDescs;
		this.textures = [];
		this.texturesRemap = null;

		this._initTexturesRemapIfNeeded();
		this._createGLTexturesFromTextureDescs();
	}

	_initTexturesRemapIfNeeded() {
		var remapNeeded = false;

		for (var texIdx = 0; texIdx < this.textureDescs.length; ++texIdx) {
			var desc = this.textureDescs[texIdx];

			if (desc.x != 0 || desc.y != 0 || desc.width != desc.image.width || desc.height != desc.image.height) {
				remapNeeded = true;
				break;
			}
		}

		this.texturesRemap = [];
		if (remapNeeded) {
			for (var texIdx = 0; texIdx < this.textureDescs.length; ++texIdx) {
				var desc = this.textureDescs[texIdx];

				this.texturesRemap[texIdx] = new this.ctx.neutrino.SubRect(
					desc.x / desc.image.width,
					desc.y / desc.image.height,
					desc.width / desc.image.width,
					desc.height / desc.image.height
					);
			}
		}
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