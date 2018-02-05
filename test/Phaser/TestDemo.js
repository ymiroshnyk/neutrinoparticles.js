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
    effectPosition = _effectPosition || [400, 300, 0];
    effectScale = _effectScale || null;
    rotateEffect = _rotateEffect || false;
    restartEffect = _restartEffect || false;

    function preload() {

      //load some background assets for test purposes
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

    //Phaser.CANVAS // //Phaser.WEBGL
    game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create, update: update, preserveDrawingBuffer: true });

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

  function initParticles(){

    //always call init first
    game.neutrino.init({
      effects: 'effects/'
    });

    game.neutrino.generateTurbulance();

    //create the effect model
    const model = game.neutrino.loadModel(effectScript);

    //create the display object
    testEffect = game.add.neutrino(model,
      {
        position: effectPosition,
        scale: effectScale,
        rotation: 0
      });

    //add to result object in order to be externally accessible
    result.testEffect = testEffect;

    if (testEffect.isReady) {
      lastUpdateTime = Date.now();
    } else {
      testEffect.onReady.addOnce(() => lastUpdateTime = Date.now());
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
    //make the logo jiggle about just for fun
    /*let time = Date.now();
    let timeCount = 0;
    sprite.update = function(){
      const oldTime = time;
      time = Date.now();
      timeCount += (time - oldTime) * 0.01;
      sprite.rotation = Math.sin(timeCount) * 0.25;
      sprite.x = baseX + (Math.cos(timeCount / 4) * 60);
    }*/
  }

  return createDemo;
})();