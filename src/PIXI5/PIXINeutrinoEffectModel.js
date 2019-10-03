class PIXINeutrinoEffectModel extends PIXI.utils.EventEmitter 
{

	constructor(context, loader, resource) 
	{
		super();

		this.ctx = context;

		let evalScript = "(function(ctx) {\n" + resource.data + 
                "\nreturn new NeutrinoEffect(ctx);\n})(context.neutrino);";
		this.effectModel = eval(evalScript);

		this.texturesRemap = null;
		this.textures = [];
		this.textureImageDescs = [];

		let numTextures = this.effectModel.textures.length;
		this._numTexturesToLoadLeft = numTextures;

		for (let imageIndex = 0; imageIndex < numTextures; ++imageIndex) 
		{
			let texturePath = this.effectModel.textures[imageIndex];
			let texture = null;
			
			if (this.ctx.options.trimmedExtensionsLookupFirst) 
			{
				let trimmedTexturePath = texturePath.replace(/\.[^/.]+$/, ""); // https://stackoverflow.com/a/4250408
				texture = PIXI.utils.TextureCache[trimmedTexturePath];
			}

			if (!texture)
				texture = PIXI.utils.TextureCache[texturePath];

			if (texture)
			{
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
			else
			{
				loader.add(this.ctx.options.texturesBasePath + texturePath, 
					{ parentResource: resource }, 
					function (self, imageIndex) 
					{
						return function (resource) 
						{
							self._onTextureLoaded(imageIndex, resource.texture);
						}
					} (this, imageIndex));
			}			
		}
	}

	ready() 
	{
		return this._numTexturesToLoadLeft === 0;
	}

	_onTextureLoaded(index, texture) 
	{
		this.textures[index] = texture;

		this._numTexturesToLoadLeft--;

		if (this.ctx.canvasRenderer)
		{
			let image = texture.baseTexture.resource.source;
			this.textureImageDescs[index] = new this.ctx.neutrino.ImageDesc(image, texture.orig.x, texture.orig.y,
				texture.orig.width, texture.orig.height);
		}

		if (this._numTexturesToLoadLeft === 0) 
		{
			if (!this.ctx.canvasRenderer)
			{
				this._initTexturesRemapIfNeeded();
			}

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