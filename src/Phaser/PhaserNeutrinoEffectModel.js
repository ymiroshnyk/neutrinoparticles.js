class PhaserNeutrinoEffectModel {

  constructor(context, effectPath) {

    this.ctx = context;
    this.effectPath = effectPath;
    this.effectModel = null;
    this.numTexturesToLoadLeft = -1;
    this.texturesRemap = null;

    this.onReady = new Phaser.Signal();

    var pixiNeutrinoEffect = this;
    this.ctx.neutrino.loadEffect(this.ctx.effectsBasePath + effectPath, function (effectModel) {
      pixiNeutrinoEffect._onEffectLoaded(effectModel);
    });
  }

  get isReady(){
    return this.numTexturesToLoadLeft === 0;
  }

  _getNewTexture(id){
    if (this.ctx.trimmedExtensionLookupFirst) id = id.replace(/\.[^/.]+$/, "");
    //TODO - see if theres a better way of accessing this image data...
    const imageCache = game.cache._cache.image;
    let imageData = imageCache[id];
    if(!imageData){
      let texture = null;
      //have to check each cache entry :(
      //(this is so much easier in pixi.js where all textures go into one cache!)
      Object.keys(imageCache).forEach(name => {
        const data = imageCache[name], fNames = data.frameData._frameNames;
        if(fNames && fNames.hasOwnProperty(id)){
          //this one contains the subtexture we are looking for
          // - get a texture from it
          const frameIndex = fNames[id];
          const frame = data.frameData._frames[frameIndex];
          const rect = new PIXI.Rectangle(frame.x, frame.y, frame.width, frame.height);
          //console.log('frame', frame, 'rect',rect)
          //PIXI.Texture(baseTexture, frame, crop, trim)
          texture = new PIXI.Texture(data.base, rect, rect);
          console.log(texture);
        }
      });

      return texture;
    } else {
      const baseTexture = imageData.base;
      return new Phaser.PIXI.Texture(baseTexture, imageData.frame);
    }

  }

  _onEffectLoaded(effectModel) {
    this.effectModel = effectModel;
    this.textures = [];
    this.textureImageDescs = [];
    const numTextures = effectModel.textures.length;
    this.numTexturesToLoadLeft = numTextures;

    for (let imageIndex = 0; imageIndex < numTextures; ++imageIndex) {
      const texturePath = effectModel.textures[imageIndex];
      let texture = this._getNewTexture(texturePath);

      if (!texture)
      //TODO - fix this for Phaser
        texture = PIXI.Texture.fromImage(this.ctx.texturesBasePath + texturePath);

      if (texture.baseTexture.hasLoaded) {
        this._onTextureLoaded(imageIndex, texture);
      } else {
        const callback = function (self, imageIndex, texture) {
          texture.off('update', callback);
          return function () {
            self._onTextureLoaded(imageIndex, texture);
          }
        } (this, imageIndex, texture);

        texture.on('update', callback);
      }
    }
  }

  _onTextureLoaded(index, texture) {
    this.textures[index] = texture;

    this.numTexturesToLoadLeft--;

    if (this.ctx.renderer.type === Phaser.PIXI.CANVAS_RENDERER) {
      const image = texture.baseTexture.source;
      //TODO - texture.orig doesn't exist in this version of pixi...
      this.textureImageDescs[index] = new this.ctx.neutrino.ImageDesc(image, texture.orig.x, texture.orig.y,
        texture.orig.width, texture.orig.height);
    }

    if (this.numTexturesToLoadLeft === 0) {

      if(this.ctx.renderer.type === Phaser.PIXI.WEBGL_RENDERER){
        this._initTexturesRemapIfNeeded();
      }
      //this.emit('ready', this);
      this.onReady.dispatch();
    }
  }

  _initTexturesRemapIfNeeded() {
    let remapNeeded = false;

    for (var texIdx = 0; texIdx < this.textures.length; ++texIdx) {
      const texture = this.textures[texIdx];
      //checks if its an atlas subtexture
      if (texture.orig && (texture.orig.x !== 0 || texture.orig.y !== 0
          || texture.orig.width !== texture.baseTexture.realWidth
          || texture.orig.height !== texture.baseTexture.realHeight)) {
        remapNeeded = true;
        break;
      }
    }

    this.texturesRemap = [];
    if (remapNeeded) {
      const n = this.textures.length;
      for (let texIdx = 0; texIdx < n; ++texIdx) {
        const texture = this.textures[texIdx];

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