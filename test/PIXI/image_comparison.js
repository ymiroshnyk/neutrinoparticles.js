
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

    if(this.webgl){
      this.renderer = PIXI.WebGLRenderer(800, 600, { backgroundColor: 0x404040, preserveDrawingBuffer: true });
    } else {
      this.renderer = PIXI.CanvasRenderer(800, 600, { backgroundColor: 0x404040 });
    }
    document.body.appendChild(this.renderer.view);
    this.stage = new PIXI.Container();

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
    // const imagePath = atlas + '.png';
    const dataPath = atlas + '.json';
    PIXI.loader.add(dataPath).load(()=> {
      console.log('atlas loaded')
      //TODO - now continue
    });

    //game.load.atlas(this.atlas, imagePath, dataPath, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
  }

  _create(){

    //effect path is one folder up
    var neutrinoContext = new PIXINeutrinoContext(renderer);
    neutrinoContext.effectsBasePath = "../effects//";
    neutrinoContext.texturesBasePath = "textures/";


    // - only generate turbulence if specified in arguments!
    if(this.turbulance === 1 || this.turbulance === '1'){
      var noiseGenerator = new neutrinoContext.neutrino.NoiseGenerator();
      while (!noiseGenerator.step()) { // approx. 5,000 steps
        // you can use 'noiseGenerator.progress' to get generating progress from 0.0 to 1.0
      }
    }

    //create the effect model
    const model = new PIXINeutrinoEffectModel(neutrinoContext, this.effect);

    //create the display object
    this.testEffect = new PIXINeutrinoEffect(model, this.startpos, this.startrot);
    this.stage.addChild(this.testEffect);

    if (this.testEffect.ready()) {
      this._start();
    } else {
      this.testEffect.testEffect.once('ready',() => this._start());
    }
  }

  _advance(){
    this.testEffect.update(this.time_interval);
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

    // render the root container
    this.renderer.render(this.stage);


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
    const dataUrl = this.renderer.view.toDataURL("image/png");

    return this._createGrabData(dataUrl);
  }


}
