class PIXINeutrinoEffectModel extends PIXI.DisplayObject 
{

	constructor(context, effectPath) 
	{
		super();

		this.ctx = context;
		this.effectPath = effectPath;
		this.effectModel = null;
		this._numTexturesToLoadLeft = -1;
		this.texturesRemap = null;

		let pixiNeutrinoEffect = this;

		this.ctx.neutrino.loadEffect(this.ctx.effectsBasePath + effectPath, function (effectModel)
		{
			pixiNeutrinoEffect._onEffectLoaded(effectModel);
		});
	}

	ready() 
	{
		return this._numTexturesToLoadLeft === 0;
	}

	_onEffectLoaded(effectModel) 
	{
		this.effectModel = effectModel;
		this.textures = [];
		this.textureImageDescs = [];
		let numTextures = effectModel.textures.length;
		this._numTexturesToLoadLeft = numTextures;

		for (let imageIndex = 0; imageIndex < numTextures; ++imageIndex) 
		{
			let texturePath = effectModel.textures[imageIndex];
			let texture = null;
			
			if (this.ctx.trimmedExtensionLookupFirst) 
			{
				let trimmedTexturePath = texturePath.replace(/\.[^/.]+$/, ""); // https://stackoverflow.com/a/4250408
				texture = PIXI.utils.TextureCache[trimmedTexturePath];
			}

			if (!texture)
				texture = PIXI.utils.TextureCache[texturePath];

			if (!texture)
				texture = PIXI.Texture.from(this.ctx.texturesBasePath + texturePath);

			if (texture.baseTexture.valid) 
			{
				this._onTextureLoaded(imageIndex, texture);
			} else 
			{
				texture.once('update', function (self, imageIndex, texture) 
				{
					return function () 
					{
						self._onTextureLoaded(imageIndex, texture);
					}
				} (this, imageIndex, texture));
			}
		}
	}

	_onTextureLoaded(index, texture) 
	{
		this.textures[index] = texture;

		this._numTexturesToLoadLeft--;

		if (this._numTexturesToLoadLeft === 0) 
		{
			this._initTexturesRemapIfNeeded();
			this.emit('ready', this);
		}
	}

	_initTexturesRemapIfNeeded() 
	{
		let remapNeeded = false;

		for (let texIdx = 0; texIdx < this.textures.length; ++texIdx) 
		{
			let texture = this.textures[texIdx];

			if (texture.orig.x != 0 || texture.orig.y != 0
				|| texture.orig.width != texture.baseTexture.realWidth
				|| texture.orig.height != texture.baseTexture.realHeight) 
			{
				remapNeeded = true;
				break;
			}
		}

		this.texturesRemap = [];
		
		if (!remapNeeded) 
			return;

		for (let texIdx = 0; texIdx < this.textures.length; ++texIdx) 
		{
			let texture = this.textures[texIdx];

			this.texturesRemap[texIdx] = new this.ctx.neutrino.SubRect(
				texture.orig.x / texture.baseTexture.realWidth,
				1.0 - (texture.orig.y + texture.orig.height) / texture.baseTexture.realHeight,
				texture.orig.width / texture.baseTexture.realWidth,
				texture.orig.height / texture.baseTexture.realHeight
				);
		}
	}
}