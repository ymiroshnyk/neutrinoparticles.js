class PIXINeutrinoContext
{
    constructor(options)
    {
        this.options = Object.assign({
            effectsBasePath: "",
            texturesBasePath: "",
            trimmedExtensionsLookupFirst: true
        }, options);

        PIXI.Renderer.registerPlugin('neutrino', PIXINeutrinoPlugin);

        this.neutrino = new NeutrinoParticles();

        this._noiseInitialized = false;
        this._noiseGenerator = null;
    }

    initializeNoise(path, success, fail) 
    {
        if (this._noiseInitialized)
        {
            if (success) success();
            return;
        }

        this.neutrino.initializeNoise(path, 
            function() 
            { 
                this._noiseInitialized = true; 
                if (success) success(); 
            }, 
            fail);
    }
    
    generateNoise()
    {
        if (this._noiseInitialized)
            return;

        let noiseGenerator = new this.neutrino.NoiseGenerator();
        while (!noiseGenerator.step()) { // approx. 5,000 steps
            // you can use 'noiseGenerator.progress' to get generating progress from 0.0 to 1.0
        }

        this._noiseInitialized = true;
    }
    
    generateNoiseStep()
    {
        if (this._noiseInitialized)
        {
            return { done: true, progress: 1.0 };
        }

        if (!this._noiseGenerator)
            this._noiseGenerator = new this.neutrino.NoiseGenerator();

        const result = this._noiseGenerator.step();
        const _progress = this._noiseGenerator.progress;

        if (result)
        {
            this._noiseInitialized = true;
            this._noiseGenerator = null;
        }

        return { done: result, progress: _progress };
    }

    loadEffect(path, success, fail) 
    {
		this.neutrino.loadEffect(path, success, fail);
	}
}