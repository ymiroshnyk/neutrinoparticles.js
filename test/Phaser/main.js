const electron = require('electron');
const colors = require('colors');
// Module to control application life.
const app = electron.app
const ipcMain = electron.ipcMain
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {

  const settings = getSettings();

  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
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

  ipcMain.on('test-result', (event, data) => {
    logOutput(data)
    shutdown();
  })

  ipcMain.on('fetch-settings', (event, data) => {
    mainWindow.webContents.send('settings', settings);
  })

  ipcMain.on('reference_complete', (event, data) => {
    console.log('Reference Pass Completed'.green.underline.bold)
    shutdown();
  })
}

function logOutput(data){
  if(data.didPass){
    console.log('TEST PASSED!'.green.underline.bold)
  } else {
    console.log('TEST FAILED!'.red.underline.bold)
  }
  data.results.forEach(result => {
    let msg = `* ${result.name} difference: ${result.difference} passed: ${result.passed}`;
    if(result.passed){
      console.log(msg.green);
    } else {
      if(result.error){
        msg = `* ${result.name} error: ${result.error} passed: ${result.passed}`;
      }
      console.log(msg.red);
    }
  });
}

function shutdown(){
  mainWindow.close();
  app.quit();
}

function getSettings(){

  const settings = {
    effect: 'water_stream.js',
    webgl: 1,
    time_interval: 0.1,//secs
    intervals: 10,
    turbulance: 'none',
    startpos: [400, 300, 0],
    endpos: [400, 300, 0],
    startscale: [1,1,1],
    endscale: [1,1,1],
    startrot: 0,
    endrot: 0,
    reference_pass: 0
  };

  const args = process.argv.slice(2);
  console.log('args:',args)
  //the first 2 args are to be ignored
  if(args.length > 0){

    // print process.argv
    args.forEach(function (val, index, array) {
      const nvp = val.split('=');
      if(nvp.length > 0){
        const name = nvp[0];
        const value = JSON.parse(nvp[1]);
        settings[name] = value;
      }
    })
  }
  return settings;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
