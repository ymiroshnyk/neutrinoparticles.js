var game, createDemo = (function(){
  let testEffect, lastUpdateTime = 0, effectScript, effectPosition, effectScale = null, rotateEffect = false, restartEffect = false;

  const result = {testEffect: null};

  function createDemo(_effectScript,
                      _assets,
                      _effectPosition,
                      _effectScale,
                      _rotateEffect,
                      _restartEffect){

    effectScript = _effectScript;
    effectPosition = _effectPosition || [0, 0, 0];
    effectScale = _effectScale || null;
    rotateEffect = _rotateEffect || false;
    restartEffect = _restartEffect || false;

    function preload() {

      //  You can fill the preloader with as many assets as your game requires

      //  Here we are loading an image. The first parameter is the unique
      //  string by which we'll identify the image later in our code.

      //  The second parameter is the URL of the image (relative)
      game.load.image('einstein', './assets/ra_einstein.png');
      game.load.image('phaser-logo', './assets/phaser-logo-small.png');

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
    //Phaser.WEBGL
    //Phaser.CANVAS
    game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create, update: update });

    return result;
  }

  function create() {

    createBgSprite();

    initParticles();

    addLogo();

  }

  function createBgSprite(){
    const s = game.add.sprite(80, 0, 'einstein');
    s.rotation = 0.14;
    return s;
  }

  
/*
  // Desired interface for NP in Phaser:
  game.neutrino.init({
    effects: "export_js/", // "" by default
    textures: "textures/" // "" by default
  });

  game.neutrino.generateTurbulance(); // to generate turbulance texture
  game.neturino.loadTurbulance("path_to_noise_texture"); // to load turbulance texture

  model = game.neutrino.loadModel("path_to_effect_file");

  effect = game.add.neutrino(model, { 
    position: [400, 300, 0], // [0, 0, 0] by default
    rotation: 45, // 0 by default
    scale: [1, 1] // [1, 1] by default
  });

*/

  function initParticles(){

    game.neutrino.init();

    game.neutrino.generateTurbulance();

    const model = game.neutrino.loadModel(effectScript);

    //(effectModel, position, game, rotation, scale)
    // testEffect = new PhaserNeutrinoEffect(
    //   model,
    //   effectPosition,
    //   game,
    //   0,
    //   effectScale
    // );

    testEffect = game.make.neutrino(model, {
      position: effectPosition,
      scale: effectScale,
      rotation: 0
    });

    console.log('testEffect',testEffect)

    result.testEffect = testEffect;

    function startAnimate(){
      console.log('start demo')
      lastUpdateTime = Date.now();
      //now add the PhaserNeutrinoEffect (testEffect) to the game
      game.stage.addChild(testEffect);
    }

    if (testEffect.isReady) {
      startAnimate();
    } else {
      testEffect.onReady.addOnce(startAnimate);
    }

  }

  function update(){
    if(lastUpdateTime > 0){
      let currentTime = Date.now();
      let elapsedSeconds = (currentTime - lastUpdateTime) / 1000;
      lastUpdateTime = currentTime;
      if(rotateEffect) testEffect.rotation += elapsedSeconds * 45.0;
      testEffect.updateParticles(elapsedSeconds);
      // if number of particles in the effect is zero (suppose it finished) - restart it
      if (restartEffect && testEffect.getNumParticles() < 1) {
       testEffect.restart(null, null); // restart effect at the same position
     }
    }
  }

  function addLogo(){
    const baseX = 400;
    const sprite = game.add.sprite(baseX, 300, 'phaser-logo');
    sprite.anchor.set(0.5);
    //make the logo jiggle about
    let time = Date.now();
    let timeCount = 0;
    sprite.update = function(){
      const oldTime = time;
      time = Date.now();
      timeCount += (time - oldTime) * 0.01;
      sprite.rotation = Math.sin(timeCount) * 0.25;
      sprite.x = baseX + (Math.cos(timeCount / 4) * 60);
    }
  }

  return createDemo;
})();