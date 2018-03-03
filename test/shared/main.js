const electron = require('electron');
const colors = require('colors');
const glob = require("glob")
// Module to control application life.
const app = electron.app;
const ipcMain = electron.ipcMain;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path');
const url = require('url');

class Logger {

  constructor(verbose = false){ this.verbose = verbose; }

  log(...msg){ console.log(...msg); }

  logIfVerbose(...msg){ if(this.verbose) console.log(...msg); }

}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, holderWindow;

const settings = getSettings();

const logger = new Logger(settings.verbose === 1);

const _testQueue = getTestQueue(settings);

function getTestQueue(){
  //parse query strings

  const effectsDir = path.join(parentFolder(__dirname), 'shared', 'effects');
  const config = { cwd: effectsDir, ignore: [], nodir: true}
  //allow glob for settings.effect
  let files;
  //allow exclusions
  if(settings.effect.indexOf('!') === 0){
    config.ignore.push(settings.effect.substr(1));
    files = glob.sync('*.js',config)
  } else {
    files = glob.sync(settings.effect,config)
  }
  logger.logIfVerbose(settings.args);
  logger.logIfVerbose('effectsDir:',effectsDir)
  logger.logIfVerbose('effect:',settings.effect)
  logger.logIfVerbose('files:',files)
  
  return files.map(effect => Object.assign({}, settings, {effect}));
}

function parentFolder(targetPath){
  return path.dirname(targetPath);
}

function next(){
    mainWindow.close();
    setTimeout(e => {
        activateTest();
    }, 500);
    // if(_testQueue.length === 0) mainWindow.close();
}

function activateTest(){
  if(_testQueue.length > 0){
    createTestWindow();
  } else {
    shutdown();
  }
}

function start(){
  holderWindow = createHolderWindow();

  ipcMain.on('test-result', (event, data) => {
    logOutput(data);
    next();
  });

  ipcMain.on('fetch-settings', (event, data) => {
    const config = _testQueue.shift();
    if(config.reference_pass === 1){
      logger.log(('Creating reference for: ' + config.effect).green.underline.bold)
    } else {
      logger.log(('TESTING EFFECT: ' + config.effect).green.underline.bold)
    }
    logger.logIfVerbose('settings: ',config)

    mainWindow.webContents.send('settings', config);
  });

  ipcMain.on('reference_complete', (event, data) => {
    const msg = 'Reference Pass Completed for ' + data.effect + '\n';
    logger.log(msg.green.underline.bold);
    next();
  });

  ipcMain.on('error', (event, data) => {
    logger.log('ERROR!'.red.underline.bold)
    logger.log(data);
    shutdown();
  });

  if(_testQueue.length > 0){
    activateTest();
  } else {
    logger.log('ERROR! tests not found'.red.underline.bold)
  }
}

function createHolderWindow () {
  const holder = new BrowserWindow({width: 10, height: 10});
    holder.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        holderWindow = null
    });
    return holder;
}

function createTestWindow () {

  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: getTestPath(settings.test),//path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

}

function getTestPath(testDir){
  return path.join(parentFolder(__dirname), testDir ,'index.html');
}

function logOutput(data){
  data.results.forEach(result => {
    let msg = `* ${result.name} difference: ${result.difference} passed: ${result.passed}`;
    if(result.passed){
      logger.logIfVerbose(msg.green);
    } else {
      if(result.error){
        msg = `* ${result.name} error: ${result.error} passed: ${result.passed}`;
      }
      logger.log(msg.red);
    }
  });
  if(data.didPass){
    logger.log(('TEST PASSED! for ' + data.effect + '\n').green.underline.bold)
  } else {
    logger.log('TEST FAILED!'.red.underline.bold)
  }
}

function shutdown(){
  logger.log('shutdown');
  if(mainWindow) mainWindow.close();
  if(holderWindow) holderWindow.close();
  app.quit();
}

function getSettings(){

  const settings = {
    effect: '**/*',
    webgl: 1,
    time_interval: 0.1,//secs
    intervals: 10,
    atlas: null,
    turbulance: 'none',
    startpos: [400, 300, 0],
    endpos: [400, 300, 0],
    startscale: [1,1,1],
    endscale: [1,1,1],
    startrot: 0,
    endrot: 0,
    verbose: 0,
    reference_pass: 0
  };

  const args = process.argv.slice(2);
  //logger.log('args:',args)
  //the first 2 args are to be ignored
  if(args.length > 0){

    // print process.argv
    args.forEach(function (val, index, array) {
      const nvp = val.split('=');
      if(nvp.length > 0){
        const name = nvp[0];
        const value = _parse(nvp[1]);
        settings[name] = value;
      }
    })
  }
  //for logging:
  settings.args = args;
  return settings;
}

function _parse(value){
  let output;
  try {
    output = JSON.parse(value);
  } catch(e){
    output = value;
  }
  return output;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', start)

// Quit when all windows are closed.
// app.on('window-all-closed', function () {
//   // On OS X it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

// app.on('activate', function () {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (mainWindow === null) {
//     createWindow()
//   }
// })

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
