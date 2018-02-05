
var game;

class ImageComparison {


  /**
   *
   * @param config
       effect - effect file name. It will be taken from /test/Phaser/effects/ folder.
       webgl - WebGL renderer is used if equal to 1, and Canvas - otherwise.
       time_interval - taking canvas shots time interval (and comparison as well).
       intervals - number of time intervals to process.
       turbulance - 'none' means no turbulance, 'gen' - generate turbulance before processing, 'load' - load turbulance texture from file.
       startpos - starting position of effect (time = 0).
       endpos - ending position of effect (time = time_interval * intervals).
       startrot - starting rotation of effect in degrees (time = 0).
       endrot - ending rotation of effect in degrees (time = time_interval * intervals).
       reference_pass - if 1 - reference pass is turned on. No comparison is making.
   */
  constructor(config){
    this._setDefaults();
    Object.assign(this, config);

    this.preload = this._preload.bind(this);
    this.create = this._create.bind(this);
    this.update = this._update.bind(this);

    this._currentTime = 0;
    this.screenGrabs = [];

    const type = this.webgl? Phaser.WEBGL : Phaser.CANVAS;
    game = new Phaser.Game(800, 600, type, 'phaser-example', { preload: this.preload,
                                                                create: this.create,
                                                                update: this.update,
                                                                preserveDrawingBuffer: true });


  }

  _preload() {

    const _assets = this._getAssets(this.effect);

    //particle textures
    _assets.forEach(assetData => {
      switch(assetData.type){
        case 'atlas':
          game.load.atlas(assetData.id, assetData.path, assetData.dataPath, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
          break;
        case 'image':
          game.load.image(assetData.id, assetData.path);
          break
      }
    })
  }

  _create(){
    //now all loaded

    //always call init first
    game.neutrino.init({
      effects: 'effects/'
    });

    game.neutrino.generateTurbulance();

    //create the effect model
    const model = game.neutrino.loadModel(this.effect);

    //create the display object
    this.testEffect = game.add.neutrino(model,
      {
        position: this.startpos,
        scale: this._getScale(this.effect),
        rotation: 0
      });
    if (this.testEffect.isReady) {
      this._start();
    } else {
      this.testEffect.onReady.addOnce(() => this._start());
    }
  }

  _start(){
    this.iterations = this.intervals;

    this._advance();

  }

  _advance(){
    this.testEffect.updateParticles(this.time_interval);
    this.testEffect.rotation += this.rotationPerInterval;
    this._currentTime += this.time_interval;
    setTimeout(e => {
      this.screenGrabs.push(this._screenGrab());
      if(--this.iterations > 0){
        this._advance();
      } else {
        this._complete();
      }
    }, 100);
  }

  _complete(){
    console.log('!!!COMPLETE!!!')
    console.log(this.screenGrabs)
  }


  _screenGrab(){
    return {
      image: this._screenGrabImage(),
      time: this._currentTime,
      rotation: this.testEffect.rotation,
      //TODO - store the time, rotation, position
      position: 0
    }
  }

  _screenGrabImage(){
    const image = new Image();
    image.src = game.canvas.toDataURL("image/png");
    return image;
  }

  _getScale(effect){
    return null;//[1, 1, 1];
  }

  _getAssets(effect){
    switch(effect){
      case 'water_stream.js':
        return [{type: 'image', id:'fluid2', path:'./textures/fluid2.png'}];
      case 'stars.js':
        return [{type: 'atlas', id:'atlas1', path:'./textures/atlas.png', dataPath: 'textures/atlas.json'}];
    }
  }

  _update(){ }

  _setDefaults(){
    this.effect = 'water_stream.js';
    this.webgl = 1;
    this.time_interval = 0.0166;//secs
    this.intervals = 10;
    this.turbulance = 'none';
    this.startpos = [400, 300, 0];
    this.endpos = [400, 300, 0];
    this.startrot = 0;
    this.endrot = 0;
    this.reference_pass = 0;

  }

  get isReferencePass(){
    return this.reference_pass === 1;
  }

  get rotationPerInterval(){
    if(this.endrot === this.startrot){
      return 0;
    } else {
      // const totalSecs = this.time_interval * this.intervals;
      const totalRotation = this.endrot - this.startrot;
      return totalRotation / this.intervals;
    }
  }


}

