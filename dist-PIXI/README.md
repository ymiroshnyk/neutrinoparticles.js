# Neutrino Particles for PIXI

### Somehow add neccessary includes
```javascript
<script src="/neutrinoparticles.js/dist/neutrinoparticles.js"></script>
<script src="/neutrinoparticles.js/dist/neutrinoparticles.webgl.js"></script>
<script src="/neutrinoparticles.js/dist-PIXI/neutrinoparticles.pixi.js"></script>
```

### Create PIXINeutrinoContext object
```javascript
var neutrinoContext = new PIXINeutrinoContext(renderer);
neutrinoContext.effectsBasePath = "export_js/";
neutrinoContext.texturesBasePath = "textures/";
```

### Create PIXINeutrinoEffectModel object
```javascript
var testModel = new PIXINeutrinoEffectModel(neutrinoContext, "Frame_stars.js");
```

### Create PIXINeutrinoEffect object
```javascript
var testEffect = new PIXINeutrinoEffect(testModel, [0, 0, 0]);
```

### (optional) Wait for effect is loaded
```javascript
if (testEffect.ready()) {
    doSomething();
} else {
    testEffect.once('ready', doSomething);
}
```

### Add effect to the scene
`
stage.addChild(testEffect);
```


