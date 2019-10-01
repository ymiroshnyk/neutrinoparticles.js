class PIXINeutrinoContext
{
    constructor(renderer)
    {
        this.renderer = renderer;
        this.neutrino = new NeutrinoParticles();
        this.effectsBasePath = "";
		this.texturesBasePath = "";
        this.trimmedExtensionLookupFirst = true;
    }

    initializeNoise(path, success, fail) {
		this.neutrino.initializeNoise(path, success, fail);
	}

	loadEffect(path, success, fail) {
		this.neutrino.loadEffect(path, success, fail);
	}
}