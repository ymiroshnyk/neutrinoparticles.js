class PhaserNeutrinoEffect extends Phaser.Group {

  constructor(effectModel, position, game, rotation, scale) {
    super(game, null);

    this._renderCanvas = this.renderCanvas;
    this._renderWebGL = this.renderWebGL;

    this.ctx = effectModel.ctx;
    this.effectModel = effectModel;
    this.effect = null;
    this.position.set(position[0], position[1]);
    this.positionZ = position[2];

    this.onReady = new Phaser.Signal();

    if (rotation)
      this.rotation = rotation;

    if (scale) {
      this.scale.x = scale[0];
      this.scale.y = scale[1];
      this.scaleZ = scale[2];
    } else {
      this.scaleZ = 1;
    }

    if (effectModel.isReady) {
      this._onEffectReady();
    } else {
      effectModel.onReady.addOnce(function () {
        this._onEffectReady();
      }, this);
    }
  }

  get isReady(){
    return this.effect !== null;
  }

  updateParticles(dt) {
    if (this.effect !== null) {
      this.effect.update(dt, [this.position.x / this.scale.x, this.position.y / this.scale.y, this.positionZ / this.scaleZ],
        this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.rotation % 360));
    }
  }

  renderCanvas(renderer) {
    if (this.isReady) {
      renderer.context.setTransform(this.scale.x, 0, 0, this.scale.y, 0, 0);
      this.effect.draw(renderer.context);
    }
  };

  renderWebGL(renderer) {
    if (!this.isReady) return;

    const gl = renderer.gl;

    const renderSession = game.renderer.renderSession;
    renderSession.spriteBatch.stop();
    const projection = renderSession.projection;
    const offset = renderSession.offset;

    this.ctx.materials.setup([projection.x, projection.y], [offset.x, offset.y], [this.scale.x, this.scale.y]);

    this.effect.fillGeometryBuffers([1, 0, 0], [0, -1, 0], [0, 0, -1]);

    this.renderBuffers.updateGlBuffers();
    this.renderBuffers.bind();

    for (let renderCallIdx = 0; renderCallIdx < this.renderBuffers.numRenderCalls; ++renderCallIdx) {
      const renderCall = this.renderBuffers.renderCalls[renderCallIdx];
      const texIndex = this.effect.model.renderStyles[renderCall.renderStyleIndex].textureIndices[0];

      // - renderer.bindTexture doesn't exist in this version of pixi
      // renderer.bindTexture(this.effectModel.textures[texIndex], 0, true);

      //ref to pixi texture
      const texture = this.effectModel.textures[texIndex];
      //game.renderer.updateTexture(texture);//, 0, true);

      //instance of https://developer.mozilla.org/en-US/docs/Web/API/WebGLTexture
      const glTexture = texture.baseTexture._glTextures[0];//game.renderer.glContextId];

      gl.activeTexture(gl.TEXTURE0);//TODO - correct the value passed in here
      gl.bindTexture(gl.TEXTURE_2D, glTexture.texture);

      const materialIndex = this.effect.model.renderStyles[renderCall.renderStyleIndex].materialIndex;
      switch (this.effect.model.materials[materialIndex]) {
        default: this.ctx.materials.switchToNormal(renderer); break;
        case 1: this.ctx.materials.switchToAdd(renderer); break;
        case 2: this.ctx.materials.switchToMultiply(renderer); break;
      }

      gl.drawElements(gl.TRIANGLES, renderCall.numIndices, gl.UNSIGNED_SHORT, renderCall.startIndex * 2);
    }

    //renderer.state.pop();

  }

  restart(position, rotation) {
    if (position) {
      this.position.x = position[0];
      this.position.y = position[1];
      this.positionZ = position[2];
    }

    if (rotation) {
      this.rotation = rotation;
    }

    this.effect.restart([this.position.x / this.scale.x, this.position.y / this.scale.y, this.positionZ / this.scaleZ],
      rotation ? this.ctx.neutrino.axisangle2quat_([0, 0, 1], rotation % 360) : null);
  }

  resetPosition(position, rotation) {
    if (position) {
      this.position.x = position[0];
      this.position.y = position[1];
      this.positionZ = position[2];
    }

    if (rotation) {
      this.rotation = rotation;
    }

    this.effect.resetPosition([this.position.x / this.scale.x, this.position.y / this.scale.y, this.positionZ / this.scaleZ],
      rotation ? this.ctx.neutrino.axisangle2quat_([0, 0, 1], rotation % 360) : null);
  }

  setPropertyInAllEmitters(name, value) {
    this.effect.setPropertyInAllEmitters(name, value);
  }

  getNumParticles() {
    return this.effect.getNumParticles();
  }

  _onEffectReady() {
    
    const position = [this.position.x / this.scale.x, this.position.y / this.scale.y, this.positionZ / this.scaleZ];
    const rotation = this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.rotation % 360);

    if (this.effectModel.ctx.renderer.type === Phaser.PIXI.CANVAS_RENDERER) {
      this.effect = this.effectModel.effectModel.createCanvas2DInstance(position, rotation);
      this.effect.textureDescs = this.effectModel.textureImageDescs;
    } else {
      this.renderBuffers = new PhaserNeutrinoRenderBuffers(this.ctx);
      this.effect = this.effectModel.effectModel.createWGLInstance(position, rotation, this.renderBuffers);
      this.effect.texturesRemap = this.effectModel.texturesRemap;
    }

    //get phaser to create webgl texture
    //TODO - support more than one texture
    const texture = this.effectModel.textures[0];
    game.renderer.updateTexture(texture.baseTexture);

    this.onReady.dispatch();
  }
}