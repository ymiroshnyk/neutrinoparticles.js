
const fs = require('fs');
const ipc = require('electron').ipcRenderer;

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
    this._grabDelay = 250;
    this._setDefaults();
    Object.assign(this, config);

    this._validate();

    this.outputPath = this._setOutputPath();

    this.preload = this._preload.bind(this);
    this.create = this._create.bind(this);

    this._currentTime = 0;
    this.screenGrabs = [];

    this.effectName = this.effect.substr(0, this.effect.lastIndexOf('.')) || this.effect;

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

  _validate(){
    //allow passing in 1 rather than [1, 1, 1]
    this.startscale = this._validateArray(this.startscale);
    this.endscale = this._validateArray(this.endscale);
    //only accept proper position values
    if(!Array.isArray(this.startpos)){
      throw new Error('Invalid start position - must be a 3 item numeric array, eg [0, 0, 0]');
    }
    if(!Array.isArray(this.endpos)){
      throw new Error('Invalid end position - must be a 3 item numeric array, eg [0, 0, 0]');
    }
    if(isNaN(this.startrot)){
      throw new Error('Invalid start rotation - must be a number');
    }
    if(isNaN(this.endrot)){
      throw new Error('Invalid start rotation - must be a number');
    }
    if(isNaN(this.time_interval)){
      throw new Error('Invalid time_interval - must be a number');
    }
    if(isNaN(this.intervals)){
      throw new Error('Invalid intervals - must be a number');
    }
  }

  /**
   *
   * @param list
   * @returns {*}
   * @private
   */
  _validateArray(list){
    if(!Array.isArray(list)){
      if(!isNaN(list)){
        return [list, list, list];
      }
      return [1, 1, 1];
    } else {
      return list;
    }
  }

  /**
   *
   * wgl - WebGl is turned on
   * turb - turbulance is turned off (1 - generated, 2 - loaded)
   * time - current time
   * pos - current position
   * rot - current rotation
   * scale - current scale
   * @private
   */
  _setDefaults(){
    this.effect = 'water_stream.js';
    this.webgl = 1;
    this.time_interval = 0.1;//secs
    this.intervals = 10;
    this.turbulance = 0;//'none';
    this.startpos = [400, 300, 0];
    this.endpos = [400, 300, 0];
    this.startrot = 0;
    this.endrot = 0;
    this.startscale = [1, 1, 1];
    this.endscale = [1, 1, 1];
    this.reference_pass = 0;
  }

  /**
   * creates output folder if not present
   * @returns {string}
   * @private
   */
  _setOutputPath(){
    const outputPath = __dirname + '/output/';
    //create that folder if it does not exist
    if(!fs.existsSync(outputPath)){
      fs.mkdirSync(outputPath);
    }
    return outputPath;
  }

  _preload() {
    //atlases get preloaded
    if(this.atlas){
      if(Array.isArray(this.atlas)){
          this.atlas.forEach(p => this._loadAtlas(p));
      } else {
        this._loadAtlas(this.atlas);
      }
    }
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

  /**
   *
   * @param filePath
   * @returns {*}
   * @private
   */
  _stripFileExtension(filePath){
    let p = filePath;
    const pathEnd = filePath.substr(-5);
    if(pathEnd.indexOf('.') > -1){
      const index = filePath.lastIndexOf('.');
      p = filePath.substr(0, index);
    }
    return p;
  }

  _create(){

    //always call init first
    game.neutrino.init({
      effects: 'effects/'
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

  _start(){
    this.screenGrabs.push(this._screenGrab());
    this.iterations = --this.intervals;
    this._advance();
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

  _complete(){
    if(this.isReferencePass){
      this._writeImagesToDisk(this.screenGrabs);
    } else {
      //load the reference images then compare them
      const loader = new ImageLoader(this.screenGrabs, this.outputPath, ()=> {
        this._compareImages();
      });
    }
  }

  _compareImages(){
    new CompareQueue(this.screenGrabs, this.outputPath, ()=> {
      this._result(this.screenGrabs)
    });
  }

  _result(screenGrabs){

    const didPass = this._checkPassed(screenGrabs)
    // console.log('passed:', didPass)
    // console.log(screenGrabs)

    const results = screenGrabs.map(grab=>{
      const r = grab.result;
      return {
        name: grab.name,
        passed: r.passed,
        error: r.error,
        difference: r.percentageDifference
      }
    });

    ipc.send('test-result', { didPass: didPass, results: results , effect: this.effectName});
  }

  /**
   *
   * @param screenGrabs
   * @returns {boolean}
   * @private
   */
  _checkPassed(screenGrabs){
    let passed = true;
    screenGrabs.forEach(grab => {
      if(!grab.result.passed){
        passed = false;
      }
    });
    return passed;
  }

  /**
   *
   * @param screenGrabs
   * @private
   */
  _writeImagesToDisk(screenGrabs){

    let counter = 0;

    screenGrabs.forEach(grab => {
      let filePath, targetFolder;

      if(grab.subfolder){
          targetFolder = this.outputPath + grab.subfolder;
      } else {
          targetFolder = this.outputPath;
      }
      filePath = targetFolder + grab.name;
      // console.log('filePath',filePath);

      //create folder if needed
      if(!fs.existsSync(targetFolder)){
        fs.mkdirSync(targetFolder);
      }
      //console.log('filePath:', filePath)
      fs.writeFile(filePath, grab.data, err => {
        console.log('write', filePath, err)
        // - error handling!
        if(err){
          ipc.send('error', err)
        } else {
          // - after the last one, close down the app
          if(++counter === screenGrabs.length){
            ipc.send('reference_complete', {effect: this.effect});
          };
        }

      })
    });
  }

  /**
   *
   * @param effectName
   * @returns {*}
   * @private
   */
  _getSubfolder(effectName){
    const index = effectName.lastIndexOf('/');
    if(index > -1){
      return effectName.substr(0, index + 1);
    } else {
      return null;
    }
  }

  /**
   *
   * @param data
   * @returns {string}
   * @private
   */
  _createFileName(data){
    // Reference file names consist all necessary values to identify it and use in comparison:
    // effect_name-wgl0-time0.00-turb0-pos0;0;0-rot0.png
    const delimiter = '-';

    //crop off any sub folder path
    const effectName = this.effectName.substr(this.effectName.lastIndexOf('/') + 1);

    let name = effectName+delimiter;
    name += 'wgl' + this.webgl+delimiter;
    name += 'time' + this._getTimeString(data.time)+delimiter;
    name += 'turb' + this.turbulance+delimiter;
    name += 'pos' + this._roundArray(data.position)+delimiter;
    name += 'rot' + this._round(data.rotation)+delimiter;
    name += 'scale' + this._roundArray(data.scale);
    name += '.png';
    return name;
  }

  /**
   *
   * @returns {{data: *, time: (number|*), rotation, position: number}}
   * @private
   */
  _screenGrab(){
    const dataUrl = game.canvas.toDataURL("image/png");

    // const roundedTime = Math.round(this._currentTime * 1000) / 1000;

    const grab = {
      data: new Buffer(dataUrl.split(",")[1], 'base64'),
      image: this._imageFromDataUrl(dataUrl),
      time: this._currentTime,
      rotation: this.testEffect.rotation,
      position: this._getPosition(this.testEffect),
      scale: this._getScale(this.testEffect),
      subfolder: this._getSubfolder(this.effectName)
    };
    grab.name = this._createFileName(grab);
    return grab;
  }

  _roundArray(list){
    return list.map(v => this._round(v));
  }

  _round(value){
    return Math.round(value * 100) / 100;
  }

  _getTimeString(input) {
      const value = this._round(input).toString();
      if (value.indexOf('.') === -1) {
        return value + '.0';
      } else {
        return value;
      }
  }


  _getPosition(target){
    return [
      target.position.x,
      target.position.y,
      target.positionZ,
    ]
  }

  _getScale(target){
    return [
      target.scale.x,
      target.scale.y,
      target.scaleZ,
    ]
  }

  /**
   *
   * @param dataUrl
   * @returns {*}
   * @private
   */
  _imageFromDataUrl(dataUrl){
      const image = new Image();
      image.src = dataUrl;
      return image;
  }

  _getStep(a, b){
    return (b - a) / this.intervals;
  }

  get isReferencePass(){
    return this.reference_pass === 1;
  }

  get scalePerInterval(){
    return [
      this._getStep(this.startscale[0], this.endscale[0]),
      this._getStep(this.startscale[1], this.endscale[1]),
      this._getStep(this.startscale[2], this.endscale[2])
    ]
  }

  get positionPerInterval(){
    return [
      this._getStep(this.startpos[0], this.endpos[0]),
      this._getStep(this.startpos[1], this.endpos[1]),
      this._getStep(this.startpos[2], this.endpos[2])
    ]
  }

  get rotationPerInterval(){
    return this._getStep(this.startrot, this.endrot);
  }

}

class CompareQueue {
  constructor(screenGrabs, folderPath, callback){
    this.screenGrabs = screenGrabs;
    this.folderPath = folderPath;
    this.callback = callback;
    this._current = -1;

    this._next();
  }

  _next(){
    this._current++;
    if(this._current < this.screenGrabs.length){
      this._test(this.screenGrabs[this._current])
    } else {
      //complete
      this.callback();
    }
  }

  /**
   *
   * @param grab
   * @private
   */
  _test(grab){

    if(!grab.comparison){
      grab.result = {
        passed: false,
        error: 'Reference image not found'
      }
      this._next();
    } else {

      const rembrandt = new Rembrandt({
        // `imageA` and `imageB` can be either Strings (file path on node.js,
        // public url on Browsers) or Buffers
        imageA: grab.image,
        imageB: grab.comparison,//fs.readFileSync('/path/to/imageB'),

        // Needs to be one of Rembrandt.THRESHOLD_PERCENT or Rembrandt.THRESHOLD_PIXELS
        thresholdType: Rembrandt.THRESHOLD_PERCENT,

        // The maximum threshold (0...1 for THRESHOLD_PERCENT, pixel count for THRESHOLD_PIXELS
        maxThreshold: 0.01,

        // Maximum color delta (0...255):
        maxDelta: 20,

        // Maximum surrounding pixel offset
        maxOffset: 0,

        renderComposition: false, // Should Rembrandt render a composition image?
        compositionMaskColor: Rembrandt.Color.RED // Color of unmatched pixels
      });

      const _self = this;

      // Run the comparison
      rembrandt.compare()
        .then(function (result) {
          console.log(grab.name, 'Passed:', result.passed)
          console.log('Pixel Difference:', result.differences, 'Percentage Difference', result.percentageDifference, '%')
          //console.log('Composition image buffer:', result.compositionImage)

          //TODO - proceed on to the next image
          grab.result = result;
          _self._next();

          // Note that `compositionImage` is an Image when Rembrandt.js is run in the browser environment
        })
        .catch((e) => {
          console.error(e)
          grab.result = e;
          _self._next();
        })

    }
  }
}

class ImageLoader {

  constructor(screenGrabs, folderPath, callback){
    this.counter = screenGrabs.length;
    this.folderPath = folderPath;
    this.callback = callback;
    this.onImageLoaded = this._imageLoaded.bind(this);
    screenGrabs.forEach(grab => {
      this._loadImage(grab);
    });
  }

  _loadImage(grab){
    const image = new Image();
    image.onload = event => {
      this.onImageLoaded(grab);
    };
    image.onerror = event => {
      grab.comparison = null;
      this.onImageLoaded(grab);
    };
    grab.comparison = image;
    //Must include subfolder!
    let targetFolder;
    if(grab.subfolder){
        targetFolder = this.folderPath + grab.subfolder;
    } else {
        targetFolder = this.folderPath;
    }
    image.src = targetFolder + grab.name;
  }

  _imageLoaded(grab){
    //console.log('image loaded', grab.name)
    this.counter--;
    if(this.counter === 0){
      this.callback();
    }
  }

}

