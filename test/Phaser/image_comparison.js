
const fs = require('fs');
const ipc = require('electron').ipcRenderer;

var game;

class ImageComparison extends TestBase{

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
    super(config);

    const type = this.webgl? Phaser.WEBGL : Phaser.CANVAS;

    game = new Phaser.Game({
      width: 800,
      height: 600,
      renderer: type,
      antialias: true,
      preserveDrawingBuffer: true,
      state: {
        preload: this.preload,
        create: this.create
      }
    });
  }

  /**
   *
   * @param atlasPath
   * @private
   */
  _loadAtlas(atlasPath){
    console.log('_loadAtlas', atlasPath)
    //strip off file extension if present
    const atlas = this._stripFileExtension(atlasPath)
    const imagePath = atlas + '.png';
    const dataPath = atlas + '.json';
    game.load.atlas(this.atlas, imagePath, dataPath, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
  }

  _create(){

    //effect path is one folder up
    const effectsBasePath = '../shared/effects/';
    const texturePath = '../shared/textures/';

    //always call init first
    game.neutrino.init({
      effects: effectsBasePath,
      textures: texturePath
    });

    // - only generate turbulence if specified in arguments!
    if(this.turbulance === 1 || this.turbulance === '1'){
        game.neutrino.generateTurbulance();
    }
    // else if(this.turbulance === 'load'){
    //   //TODO will need to wait for load to complete, also pass in a path etc
    //     game.neutrino.loadTurbulance();
    // }

    //create the effect model
    const model = game.neutrino.loadModel(this.effect);

    //create the display object
    this.testEffect = game.add.neutrino(model,
      {
        position: this.startpos,
        scale: this.startscale,
        rotation: 0
      });
    if (this.testEffect.isReady) {
      this._start();
    } else {
      this.testEffect.onReady.addOnce(() => this._start());
    }
  }

  _advance(){
    this.testEffect.updateParticles(this.time_interval);
    //rotate
    this.testEffect.rotation += this.rotationPerInterval;
    //scale
    const scalePerInterval = this.scalePerInterval;
    this.testEffect.scale.x += scalePerInterval[0];
    this.testEffect.scale.y += scalePerInterval[1];
    this.testEffect.scaleZ += scalePerInterval[2];
    //translate
    const positionPerInterval = this.positionPerInterval;
    this.testEffect.position.x += positionPerInterval[0];
    this.testEffect.position.y += positionPerInterval[1];
    this.testEffect.positionZ += positionPerInterval[2];
    //
    this._currentTime += this.time_interval;
    setTimeout(e => {
      this.screenGrabs.push(this._screenGrab());
      if(--this.iterations > 0){
        this._advance();
      } else {
        this._complete();
      }
    }, this._grabDelay);
  }

  /**
   *
   * @returns {{data: *, time: (number|*), rotation, position: number}}
   * @private
   */
  _screenGrab(){
    const dataUrl = game.canvas.toDataURL("image/png");

    return this._createGrabData(dataUrl);
  }


}

