
const pixelmatch = require('pixelmatch');

class CompareQueue {
  constructor(screenGrabs, folderPath, callback){
    this.screenGrabs = screenGrabs;
    this.folderPath = folderPath;
    this.callback = callback;
    this._current = -1;
    this.threshold = 0;

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

      const numDiffPixels = pixelmatch(grab.data, grab.comparison, null, grab.image.width, grab.image.height, {threshold: this.threshold});

      //test
      // const filePath = this.folderPath + 'test_' + grab.name;
      // fs.writeFile(filePath, grab.comparison);

      // - proceed on to the next image
      grab.result = {
        difference: numDiffPixels,
        passed: numDiffPixels === this.threshold
      };

      this._next();

    }
  }
}

module.exports = CompareQueue;