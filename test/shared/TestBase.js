const NodeImageLoader = require('../shared/NodeImageLoader.js');
const CompareQueue = require('../shared/CompareQueue.js');

class TestBase {
  constructor(config) {
    this._grabDelay = 50;
    this._setDefaults();
    Object.assign(this, config);

    this._validate();

    this.outputPath = this._setOutputPath();

    this.preload = this._preload.bind(this);
    this.create = this._create.bind(this);

    this._currentTime = 0;
    this.screenGrabs = [];

    this.effectName = this.effect.substr(0, this.effect.lastIndexOf('.')) || this.effect;

  }

  /**
   *
   * @private
   */
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
    this.effect = '**/*';
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

  /**
   *
   * @returns {boolean}
   * @private
   */
  _preload() {
    const willPreload = !!this.atlas;
    //atlases get preloaded
    if(willPreload){
      if(Array.isArray(this.atlas)){
        this.atlas.forEach(p => this._loadAtlas(p));
      } else {
        this._loadAtlas(this.atlas);
      }
    }
    return willPreload;
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

  _start(){
    this.screenGrabs.push(this._screenGrab());
    this.iterations = --this.intervals;
    this._advance();
  }

  _complete(){
    if(this.isReferencePass){
      this._writeImagesToDisk(this.screenGrabs);
    } else {


      //load the reference images then compare them
      const loader = new NodeImageLoader(this.screenGrabs, this.outputPath, ()=> {
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
        difference: r.difference
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
          }
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
    //TODO - is this windows friendly?!
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

  _createGrabData(dataUrl){
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