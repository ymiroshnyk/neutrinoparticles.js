class PhaserNeutrinoContext {

  constructor(renderer, effectsBasePath = "", texturesBasePath = "") {
    this.renderer = renderer;
    this.neutrino = new NeutrinoParticles();
    this.effectsBasePath = effectsBasePath;
    this.texturesBasePath = texturesBasePath;
    this.trimmedExtensionLookupFirst = true;

    if (renderer.type === Phaser.PIXI.WEBGL_RENDERER) {
      this.materials = new PhaserNeutrinoMaterials(renderer);
    }
  }

  initializeNoise(path, success, fail) {
    this.neutrino.initializeNoise(path, success, fail);
  }

  loadEffect(path, success, fail) {
    this.neutrino.loadEffect(path, success, fail);
  }
}