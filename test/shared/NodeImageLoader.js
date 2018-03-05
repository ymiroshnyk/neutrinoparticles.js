
var fs = require('fs'),
  PNG = require('pngjs').PNG;

class NodeImageLoader {

  constructor(screenGrabs, folderPath, callback){
    this.counter = screenGrabs.length;
    this.folderPath = folderPath;
    this.callback = callback;

    //consider loading in series...?
    screenGrabs.forEach(grab => {
      this._loadImage(grab);
    });

  }

  _loadImage(grab){
    try {
      grab.comparison = fs.readFileSync(this._getPath(grab));
    } catch(e){
      grab.comparison = null;
    }
    this._imageLoaded();
  }

  _imageLoaded(){
    this.counter--;
    if(this.counter === 0){
      this.callback();
    }
  }

  _getPath(grab){
    //Must include subfolder!
    let targetFolder;
    if(grab.subfolder){
      targetFolder = this.folderPath + grab.subfolder;
    } else {
      targetFolder = this.folderPath;
    }
    return targetFolder + grab.name;
  }

}

module.exports = NodeImageLoader;