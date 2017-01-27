class WebGLNeutrinoContext {
	constructor(gl) {
		this.gl = gl;
		this.neutrino = new NeutrinoParticles();
		this.materials = new WebGLNeutrinoMaterials(this);
	}

	initializeNoise(path, success, fail) {
		this.neutrino.initializeNoise(path, success, fail);
	}

	loadEffect(path, success, fail) {
		this.neutrino.loadEffect(path, success, fail);
	}
}