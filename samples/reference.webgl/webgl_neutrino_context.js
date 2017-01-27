class WebGLNeutrinoContext {
	constructor(gl) {
		this.gl = gl;
		this.neutrino = new NeutrinoParticles();
		this.materials = new WebGLNeutrinoMaterials(this);
	}
}