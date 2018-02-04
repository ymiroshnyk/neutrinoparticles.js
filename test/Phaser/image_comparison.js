
class ImageComparison{


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
  }

  _setDefaults(){
    this.effect = '';
    this.webgl = 1;
    this.time_interval = 0.0166;//secs
    this.intervals = 10;
    this.turbulance = 'none';
    this.startpos = 0;
    this.endpos = 200;
    this.startrot = 0;
    this.endrot = 0;
    this.reference_pass = 0;

  }



}

