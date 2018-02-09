
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
    this._setDefaults();
    Object.assign(this, config);

    this.effectName = this.effect.substr(0, this.effect.lastIndexOf('.')) || this.effect;

    this.outputPath = this._setOutputPath();

    this.preload = this._preload.bind(this);
    this.create = this._create.bind(this);
    this.update = this._update.bind(this);

    this._currentTime = 0;
    this.screenGrabs = [];

    const type = this.webgl? Phaser.WEBGL : Phaser.CANVAS;

    game = new Phaser.Game({
      width: 800,
      height: 600,
      renderer: type,
      preserveDrawingBuffer: true,
      state: {
        preload: this.preload,
        create: this.create,
        update: this.update
      }
    });
  }

  _setOutputPath(){
    return __dirname + '/output/';
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
    }, 250);
  }

  _complete(){
    // console.log('!!!COMPLETE!!!')
    // console.log(this.screenGrabs)

    if(this.isReferencePass){
      this._writeImagesToDisk(this.screenGrabs);
    } else {
      //load the reference images then compare them
      const loader = new ImageLoader(this.screenGrabs, this.outputPath, ()=> {
        console.log('all images loaded')
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
    console.log('passed:', didPass)
    console.log(screenGrabs)

    const results = screenGrabs.map(grab=>{
      const r = grab.result;
      return {
        name: grab.name,
        passed: r.passed,
        error: r.error,
        difference: r.percentageDifference
      }
    });

    ipc.send('test-result', { didPass: didPass, results: results });
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
      const filePath = this.outputPath + grab.name;
      // console.log('filePath:', filePath)
      fs.writeFile(filePath, grab.data, err => {
        console.log('write', filePath, err)
        //TODO - after the last one, close down the app
        if(++counter === screenGrabs.length){
          ipc.send('reference_complete');
        };
      })
    });
  }

  /**
   *
   * @param data
   * @returns {string}
   * @private
   */
  _getFileName(data){
    // Reference file names consist all necessary values to identify it and use in comparison:
    // effect_name-wgl0-time0.00-turb0-pos0;0;0-rot0.png
    const delimiter = '-';
    let name = this.effectName+delimiter;
    name += 'wgl' + this.webgl+delimiter;
    name += 'time' + data.time+delimiter;
    name += 'turb' + this.turbulance+delimiter;
    name += 'pos' + data.position+delimiter;
    name += 'rot' + data.rotation;
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

    const roundedTime = Math.round(this._currentTime * 1000) / 1000;

    const grab = {
      data: new Buffer(dataUrl.split(",")[1], 'base64'),
      image: this._imageFromDataUrl(dataUrl),
      time: roundedTime,//this._currentTime,
      rotation: this.testEffect.rotation,
      //TODO - store the position
      position: 0
    };
    grab.name = this._getFileName(grab);
    return grab;
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
    image.src = this.folderPath + grab.name;
  }

  _imageLoaded(grab){
    //console.log('image loaded', grab.name)
    this.counter--;
    if(this.counter === 0){
      this.callback();
    }
  }

}

