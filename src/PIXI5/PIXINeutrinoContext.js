class PIXINeutrinoContext
{
    constructor(application, options)
    {
        this.options = Object.assign({
            texturesBasePath: "",
            trimmedExtensionsLookupFirst: true
        }, options);

        this.neutrino = new NeutrinoParticles();

        this.canvasRenderer = PIXI.CanvasRenderer ? 
            (application.renderer instanceof PIXI.CanvasRenderer) : false;
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

    get loadOptions()
    {
        return { metadata: { neutrino: this } };
    }
}