class PIXINeutrinoEffectModel extends PIXI.DisplayObject {

	constructor(context, effectPath) {
		super();

		this.ctx = context;
		this.effectPath = effectPath;
		this.effectModel = null;
		this.numTexturesToLoadLeft = -1;
		this.texturesRemap = null;

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
		var numTextures = effectModel.textures.length;
		this.numTexturesToLoadLeft = numTextures;

		for (var imageIndex = 0; imageIndex < numTextures; ++imageIndex) {
			var texturePath = effectModel.textures[imageIndex];
			var texture = null;
			
			if (this.ctx.trimmedExtensionLookupFirst) {
				var trimmedTexturePath = texturePath.replace(/\.[^/.]+$/, ""); // https://stackoverflow.com/a/4250408
				texture = PIXI.utils.TextureCache[trimmedTexturePath];
			}

			if (!texture)
				texture = PIXI.utils.TextureCache[texturePath];

			if (!texture)
				texture = PIXI.Texture.fromImage(this.ctx.texturesBasePath + texturePath);

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

		this.numTexturesToLoadLeft--;

		if (this.ctx.renderer instanceof PIXI.CanvasRenderer) {
			var image = texture.baseTexture.source;
			this.textureImageDescs[index] = new this.ctx.neutrino.ImageDesc(image, texture.orig.x, texture.orig.y,
				texture.orig.width, texture.orig.height);
		} else {
		}

		if (this.numTexturesToLoadLeft === 0) {

			if (this.ctx.renderer instanceof PIXI.CanvasRenderer) {

			} else {
				this._initTexturesRemapIfNeeded();
			}

			this.emit('ready', this);
		}
	}

	_initTexturesRemapIfNeeded() {
		var remapNeeded = false;

		for (var texIdx = 0; texIdx < this.textures.length; ++texIdx) {
			var texture = this.textures[texIdx];

			if (texture.orig.x != 0 || texture.orig.y != 0
				|| texture.orig.width != texture.baseTexture.realWidth
				|| texture.orig.height != texture.baseTexture.realHeight) {
				remapNeeded = true;
				break;
			}
		}

		this.texturesRemap = [];
		if (remapNeeded) {
			for (var texIdx = 0; texIdx < this.textures.length; ++texIdx) {
				var texture = this.textures[texIdx];

				this.texturesRemap[texIdx] = new this.ctx.neutrino.SubRect(
					texture.orig.x / texture.baseTexture.realWidth,
					1.0 - (texture.orig.y + texture.orig.height) / texture.baseTexture.realHeight,
					texture.orig.width / texture.baseTexture.realWidth,
					texture.orig.height / texture.baseTexture.realHeight
					);
			}
		}
	}
}
