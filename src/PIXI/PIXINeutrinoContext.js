class PIXINeutrinoContext {

	constructor(renderer) {
		var gl = renderer.gl;
		
		this.renderer = renderer;
		this.neutrino = new NeutrinoParticles();
		this.effectsBasePath = "";
		this.texturesBasePath = "";
		this.trimmedExtensionLookupFirst = true;

		if (!(renderer instanceof PIXI.CanvasRenderer)) {
			this.materials = new PIXINeutrinoMaterials(gl);
		}
	}

	initializeNoise(path, success, fail) {
		this.neutrino.initializeNoise(path, success, fail);
	}

	loadEffect(path, success, fail) {
		this.neutrino.loadEffect(path, success, fail);
	}
}
