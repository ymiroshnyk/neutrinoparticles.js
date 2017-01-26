# Neutrino Particles for PIXI

neutrinoparticles.pixi.js is a plugin library for [PIXI](http://www.pixijs.com/) framework.

**Please, note, that pixi.js has a bug which breaks functionality of this library. You can fix it by your own, like shown in [this diff](https://github.com/ymiroshnyk/neutrinoparticles.js/commit/b38b4213136ec2ff721f31390eefb6383e59b48f#diff-aad682da289e3a4ea9955e101bcea5d5be3d804d).**

### TO DO
* Multiply material for particles doesn't look same as in editor.
* Move from custom shaders and VAOs to PIXI ones.
* Use PIXI's loader for loading effects.

## How to use

_You can find source codes in /samples/PIXI/ directory of the repository._

### Add neccessary includes
```javascript
<script src="/neutrinoparticles.js/dist/neutrinoparticles.js"></script>
<script src="/neutrinoparticles.js/dist/neutrinoparticles.webgl.js"></script>
<script src="/neutrinoparticles.js/dist-PIXI/neutrinoparticles.pixi.js"></script>
```
To work correctly you need to include all scripts above. You can do that in HTML as shown here, or by any other way, like load .js file as text string and call eval().

### Create PIXINeutrinoContext object
```javascript
var neutrinoContext = new PIXINeutrinoContext(renderer);
```
This single object will be used for loading effects. Create it once per renderer.

### (optional) Setup base paths for effects and textures
```javascript
neutrinoContext.effectsBasePath = "export_js/";
neutrinoContext.texturesBasePath = "textures/";
```

### Create PIXINeutrinoEffectModel object

First, you need to load effect's model:

```javascript
var effectModel = new PIXINeutrinoEffectModel(
	neutrinoContext, 
	"Frame_stars.js" // path to effect
	);
```

### Create PIXINeutrinoEffect object

Next, you can create as many instances of the effect as you want to:

```javascript
var effect = new PIXINeutrinoEffect(
	effectModel, 
	[0, 0, 0] // Starting position of effect
	);
```

### (optional) Wait for effect's model is loaded and ready to use

Loading effect's model might be async operation, so you probably will need to wait until it is loaded and all your instances will be ready to render:

```javascript
if (effectModel.ready()) {
    doSomethingWithLoadedEffect();
} else {
    effectModel.once('ready', doSomethingWithLoadedEffect);
}
```
Until that you will not see the effect on the scene.


You can check readyness of the effect on the instance as well:

```javascript
if (effect.ready()) {
    doSomethingWithLoadedEffect();
} else {
    effect.once('ready', doSomethingWithLoadedEffect);
}
```

### Add effect to the scene

Since, instance of the effect is a container, you can add it anywhere in the scene hierarchy:

```javascript
stage.addChild(testEffect);
```

### Update effects each frame

On each frame before rendering, you will need to update all effects:
```javascript
effect.update(
	dt // time since previous frame in seconds
	);
```

For example, you can use next simple animation loop in your application:
```javascript
var lastUpdateTime = null;

function animate() {
	if (lastUpdateTime == null) {
	  lastUpdateTime = Date.now();
	}

	var currentTime = Date.now();
	var elapsedTime = (currentTime - lastUpdateTime) / 1000;
	lastUpdateTime = currentTime;

	effect.update(
		elapsedTime > 1.0 ? 1.0 : elapsedTime // limit frame time with a second
		);

    // render the root container
    renderer.render(stage);

    requestAnimationFrame(animate);
}
```

But usually, application already has animation loop, and you will need to integrate updating of loaded effects to it.



