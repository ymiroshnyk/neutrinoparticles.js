class PIXINeutrinoContext {

	constructor(renderer) {
		var gl = renderer.gl;
		
		this.renderer = renderer;
		this.neutrino = new NeutrinoParticles();
		this.effectsBasePath = "";
		this.texturesBasePath = "";
		this.trimmedExtensionLookupFirst = true;

		if (!(renderer instanceof PIXI.CanvasRenderer)) {
			this.materials = new PIXINeutrinoMaterials(this);
			this.renderBuffers = new PIXINeutrinoRenderBuffers(this);
			
			let indices = [];
			let maxNumVertices = 65536; 
			let maxNumParticles = maxNumVertices / 4;
			let maxNumIndices = maxNumParticles * 6;

			for (let particleIdx = 0; particleIdx < maxNumParticles; ++particleIdx) {
				let startVer = particleIdx * 4;
				let startIdx = particleIdx * 6;
				indices[startIdx + 0] = startVer + 0;
				indices[startIdx + 1] = startVer + 3;
				indices[startIdx + 2] = startVer + 1;
				indices[startIdx + 3] = startVer + 1;
				indices[startIdx + 4] = startVer + 3;
				indices[startIdx + 5] = startVer + 2;
			}

			this.renderBuffers.initialize(65536, [2], indices, maxNumParticles);
		}
	}

	initializeNoise(path, success, fail) {
		this.neutrino.initializeNoise(path, success, fail);
	}

	loadEffect(path, success, fail) {
		this.neutrino.loadEffect(path, success, fail);
	}
}
