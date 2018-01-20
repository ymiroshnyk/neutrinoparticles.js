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
    }
    else
      this.scaleZ = 1;

    if (effectModel.ready()) {
      this._onEffectReady();
    } else {
      effectModel.onReady.addOnce(function () {
        this._onEffectReady();
      }, this);
    }
  }

  ready() {
    return this.effect !== null;
  }

  updateParticles(dt) {
    if (this.effect !== null) {
      this.effect.update(dt, [this.position.x / this.scale.x, this.position.y / this.scale.y, this.positionZ / this.scaleZ],
        this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.rotation % 360));
    }
  }

  renderCanvas(renderer) {
    if (!this.ready())
      return;

    renderer.context.setTransform(this.scale.x, 0, 0, this.scale.y, 0, 0);
    this.effect.draw(renderer.context);
  };

  renderWebGL(renderer) {
    if (!this.ready())
      return;

    var gl = renderer.gl;

    /*
    renderer.setObjectRenderer(renderer.emptyRenderer);
    renderer.bindVao(null);
    renderer.state.resetAttributes();

    renderer.state.push();
    renderer.state.setState(renderer.state.defaultState);*/

    // hack! the only way to discard current shader for futher engine rendering
    //renderer._activeShader = null;

    //---- from pixi.js filterManager ------------
    // update projection
    // now restore the regular shader..
    // this.renderSession.shaderManager.setShader(this.defaultShader);
    //gl.uniform2f(this.defaultShader.projectionVector, filterArea.width/2, -filterArea.height/2);
    //gl.uniform2f(this.defaultShader.offsetVector, -filterArea.x, -filterArea.y);
    // -----------------------------------
    const defaultShader = game.renderer.shaderManager.defaultShader;
    game.renderer.shaderManager.setShader(defaultShader);

    const renderSession = game.renderer.renderSession;
    const projection = renderSession.projection,
      offset = renderSession.offset;
    gl.uniform2f(defaultShader.projectionVector, projection.x, -projection.y);
    gl.uniform2f(defaultShader.offsetVector, -offset.x, -offset.y);

    // - _activeRenderTarget doesn't exist in this version of pixi
    // var target = renderer._activeRenderTarget;
    //console.log('projectionVector', defaultShader.projectionVector, 'offsetVector', defaultShader.offsetVector)
    //projectionMatrix doesn't exist in this version of pixi

    /* Matrix.ToArray
    array[0] = this.a; > x scale
    array[1] = this.c; > x skew
    array[2] = this.tx;
    array[3] = this.b; > y skew
    array[4] = this.d; > y scale
    array[5] = this.ty;
    array[6] = 0;
    array[7] = 0;
    array[8] = 1;
     */
    const projectionMatrix = [1, 0, 0, 1, 0, 0, 0, 0, 1];
    // const projectionMatrix = [0.0025, 0, 0, 0, -0.0033333334140479565, 0, -1, 1, 1];
    //TODO - set transform and scale values appropriately on projectionMatrix


    // this.ctx.materials.setup(target.projectionMatrix.toArray(true), [this.scale.x, this.scale.y]);
    this.ctx.materials.setup(projectionMatrix, [this.scale.x, this.scale.y]);

    this.effect.fillGeometryBuffers([1, 0, 0], [0, -1, 0], [0, 0, -1]);

    this.renderBuffers.updateGlBuffers();
    this.renderBuffers.bind();

    for (let renderCallIdx = 0; renderCallIdx < this.renderBuffers.numRenderCalls; ++renderCallIdx) {
      const renderCall = this.renderBuffers.renderCalls[renderCallIdx];
      const texIndex = this.effect.model.renderStyles[renderCall.renderStyleIndex].textureIndices[0];

      // - bindTexture doesn't exist in this version of pixi
      //try updateTexture instead
      // renderer.bindTexture(this.effectModel.textures[texIndex], 0, true);
      game.renderer.updateTexture(this.effectModel.textures[texIndex]);//, 0, true);

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
    console.log('Effect ready')
    var position = [this.position.x / this.scale.x, this.position.y / this.scale.y, this.positionZ / this.scaleZ];
    var rotation = this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.rotation % 360);

    if (this.effectModel.ctx.renderer.type === Phaser.PIXI.CANVAS_RENDERER) {
      this.effect = this.effectModel.effectModel.createCanvas2DInstance(position, rotation);
      this.effect.textureDescs = this.effectModel.textureImageDescs;
    } else {
      this.renderBuffers = new PhaserNeutrinoRenderBuffers(this.ctx);
      this.effect = this.effectModel.effectModel.createWGLInstance(position, rotation, this.renderBuffers);
      this.effect.texturesRemap = this.effectModel.texturesRemap;
    }

    //this.emit('ready', this);
    this.onReady.dispatch();
  }
}