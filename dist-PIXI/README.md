# Neutrino Particles for PIXI

neutrinoparticles.pixi.js is a plugin library for [PIXI](http://www.pixijs.com/) framework.

### TO DO
* Multiply material for particles doesn't look same as in editor.
* Move from custom shaders and VAOs to PIXI ones.
* Use PIXI's loader for loading effects.

## How to use

_You can find source codes in /samples/PIXI/ directory of the repository._

### Add neccessary includes
```javascript
<script src="/neutrinoparticles.js/dist/neutrinoparticles.js"></script>
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
	[0, 0, 0],	// Starting position of effect
	0,			// (optional) Starting rotation in degrees
	[1, 1, 1],	// (optional) Starting scale for X, Y and Z axes
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

## Rotation and scale

Since NeutrinoParticles effect is much more complex than PIXI's sprite, it can't inherit any kind of world transformation from parent container. It ignores any of them and uses only local rotation and scale.

When you setup rotation for effect (by passing it in constructor or by changing effect.rotation property), it doesn't rotate geometry according the angle you provided. That rotation is passed inside the effect's logic and if it is made in the Editor in a way when it applies outside rotation, it will start behave as rotated (usualy it changes direction of starting particles velocity or rotates starting position shape). Gravitation or other forces are left unchanged.

Scaling also applied only from local effect.scale property (which is inherited from Container.scale). It is very bad practice to change scale on-the-fly in the update loop. Try to set it up only once on the effect construction.

## Texture atlases (like exported from TexturePacker)

If texture atlas is loaded before Neutrino effect, then textures lookup will go though the already loaded and cached textures from that atlas. No duplicated textures will be loaded.

Please, note, that texture path in the NeutrinoParticles Editor (relatively to textures' root) has to be the same as Sprite ID inside loaded atlas. Usually Sprite ID is formed from texture path placed on the atlas, so you just need to keep the same directories structure for both Texture Packer and Neutrino Editor.

Don't use "Trim sprite names" in texture packer or if you use it you need to remove the extension (.png or .jpg) from the exported .js effect file manually.




