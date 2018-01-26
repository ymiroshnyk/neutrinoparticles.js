
class PhaserNeutrino {

  constructor(){

  }

  init(config){
    const effects = (config && config.effects) || "export_js/";
    const textures = (config && config.textures) || "textures/";
    //TODO instantiate a PhaserNeutrinoContext
    this.neutrinoContext = new PhaserNeutrinoContext(game.renderer, effects, textures);
    return this.neutrinoContext;
  }

  generateTurbulance(){
    if(!this.neutrinoContext) {
      console.warn('PhaserNeutrino - call init first');
      return;
    }
    const noiseGenerator = new this.neutrinoContext.neutrino.NoiseGenerator();
    while (!noiseGenerator.step()) { // approx. 5,000 steps
      // you can use 'noiseGenerator.progress' to get generating progress from 0.0 to 1.0
    }
  }

  loadTurbulance(){
    //TODO -
  }

  loadModel(effectScript){
    if(!this.neutrinoContext) {
      console.warn('PhaserNeutrino - call init first');
      return;
    }
    return new PhaserNeutrinoEffectModel(this.neutrinoContext, effectScript)
  }

  createEffect(model, props, game){
    let {position, scale, rotation} = props;
    if(!position) position = [0, 0, 0];
    if(!scale) scale = [1, 1];
    if(!rotation) rotation = 0;

    //(effectModel, position, game, rotation, scale)
    return new PhaserNeutrinoEffect(
      model,
      position,
      game,
      rotation,
      scale
    );
  }

}

Phaser.Game.prototype.neutrino = new PhaserNeutrino();

//game.add.neutrino();
Phaser.GameObjectFactory.prototype.neutrino = function (model, props) {
  return Phaser.Game.prototype.neutrino.createEffect(model, props, this.game);
};

//game.make.neutrino();
Phaser.GameObjectCreator.prototype.neutrino = function (model, props) {
  return Phaser.Game.prototype.neutrino.createEffect(model, props, this.game);
};