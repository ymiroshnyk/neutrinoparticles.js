var game, createDemo = (function(){
  let testEffect, lastUpdateTime = 0, effectScript, effectPosition, effectScale, rotateEffect = false, restartEffect = false;

  function createDemo(_effectScript,
                      _assets,
                      _effectPosition,
                      _effectScale,
                      _rotateEffect,
                      _restartEffect){

    effectScript = _effectScript;
    effectPosition = _effectPosition;
    rotateEffect = _rotateEffect || false;
    restartEffect = _restartEffect || false;
    effectScale = _effectScale || null;

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

    game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create, update: update });

  }

  function create() {

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    const s = game.add.sprite(80, 0, 'einstein');
    s.rotation = 0.14;

    initParticles();

    addLogo();

  }

  function initParticles(){

    const neutrinoContext = new PhaserNeutrinoContext(game.renderer, "export_js/", "textures/");

    const noiseGenerator = new neutrinoContext.neutrino.NoiseGenerator();
    while (!noiseGenerator.step()) { // approx. 5,000 steps
      // you can use 'noiseGenerator.progress' to get generating progress from 0.0 to 1.0
    }
    //(effectModel, position, game, rotation, scale)
    testEffect = new PhaserNeutrinoEffect(
      new PhaserNeutrinoEffectModel(neutrinoContext, effectScript),
      effectPosition,
      game,
      0,
      effectScale
    );

    function startAnimate(){
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