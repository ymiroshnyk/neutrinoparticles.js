# neutrinoparticles.js

The library allows you to load and simulate particle effects exported from [NeutrinoParticles Editor](https://neutrinoparticles.com/).

This is basically a core library which can update particle effect and give you instructions on how to render this effect.

Samples have reference renderers for Canvas and WebGL. You can use them as is or base on them to write your own renderer for desired framework or engine.

## Renderer for PIXI.js
[neutrinoparticles.pixi](https://gitlab.com/neutrinoparticles/neutrinoparticles.pixi.js) provides a fully functional plugin for [PIXI.js](https://www.pixijs.com/) v4 or v5.

## Installation

## Introduction

NeutrinoParticles Editor exports effects to generic .js file, which contains effect's properties and algorithms of particles' behavior.

neutrinoparticles.js library contains all the code shared between effects (like mathematics and some algorithms). Also, the library has handy loader for effects.

Exported effect file has no textures inside it, but only their file names. All images loading you will need to handle on application side. Usually, for that you will use capabilities of the framework/engine where you integrating this library.

Effect is divided into two parts: model and instance. Model is described in exported from the editor .js file. So, first, you load effect's model, then textures described in it, and then you create as many instances of the effect as you want to. Each instance has own position and life time and will be simulated independently.

After instances are created all you need is to call update() and render() for them on each frame.

## Steps to use on generic HTML5 with Canvas

_You can find this source code in /samples/reference.canvas/ of the repository._

Start from creating canvas and including main library script.

```javascript
<canvas id="myCanvas" width="800" height="600" />
<script type="text/javascript" src="/neutrinoparticles.js/dist/neutrinoparticles.js"></script>
```

Then get canvas objects for future rendering and create NeutrinoParticles context. This context will be shared between all effects. Create it only once.

```javascript
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var neutrino = new NeutrinoParticles();
```

Load effect.
```javascript
var onEffectLoaded = null;
var effectModel = null;

var loadEffect = function() {
	neutrino.loadEffect(
		"export/3boom_stars.js", 		// path to effect file
		function(_effectModel) { 		// on effect loaded successfully callback
			effectModel = _effectModel;
			onEffectLoaded();
		},
		function() {} 					// on effect load failed callback
		);
}
```

After effect is loaded, you need to load all neccessary textures and make an array of texture descriptions. This array might be used to specify textures inside texture atlases, but in this simple case all textures are described as standalone.

```javascript
var onTexturesLoaded = null;

onEffectLoaded = function() {
	var textureNames = effectModel.textures;
	var texturesLeft = textureNames.length;

	var textureDescs = [];

	for (var imageIndex = 0; imageIndex < textureNames.length; ++imageIndex) {
		var image = new Image();

		image.onload = (function (imageIndex, image) {
			return function () {
				textureDescs[imageIndex] = new neutrino.ImageDesc(
					image, 			// image
					0, 				// X displace inside image
					0, 				// Y displace inside image
					image.width, 	// width of sub-image to use
					image.height 	// height of sub-image to use
					);

				if (--texturesLeft == 0) {
					onTexturesLoaded(textureDescs);
				};
			};
		})(imageIndex, image);

		image.src = 'textures/' + textureNames[imageIndex];
	}
}
```

Now we are ready to create effect instance and pass textures' descriptions to it.
```javascript
var effect = null;
var animate = null;

var position = [400, 300, 0];
var rotationAngle = 0;

onTexturesLoaded = function(textureDescs) {
	effect = effectModel.createCanvas2DInstance(
		position, 											// position of the effect
		neutrino.axisangle2quat_([0, 0, 1], rotationAngle)	// rotation from angle (pass null if identity rotation)
		);

	// send image descriptions to the effect
	effect.textureDescs = textureDescs;

	animate();
}
```

And when everything is loaded and created it is time for animation loop.
```javascript
var lastFrameTime = null;

animate = function () {
	// calcule time from previous frame
	if (lastFrameTime == null) {
	  lastFrameTime = Date.now();
	}

	var currentTime = Date.now();
	var elapsedTime = (currentTime - lastFrameTime) / 1000;
	lastFrameTime = currentTime;

	// changing rotation angle
	rotationAngle += elapsedTime * 45.0;

	// update the effect
	effect.update(
		elapsedTime > 1.0 ? 1.0 : elapsedTime, 			// time from previous frame in seconds
		position, 										// new position of the effect (pass null if position is not changed)
		neutrino.axisangle2quat_([0, 0, 1], rotationAngle)	// new rotation of the effect (pass null if rotation is not changed)
		);

	// clear background
	context.fillStyle = "grey";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// draw the effect
	effect.draw(context);

	requestAnimationFrame(animate);
};

loadEffect();
```

### Using 3D camera emulation

On Canvas renderer you also can use 3D camera's perspective effect emulation. It will change position and size of particles dependently on their Z coordinate to make effect very similar to WebGL perspective projection. This emulation works really fast and looks pretty good.

To use it, create 3D camera.
```javascript
var camera = new neutrino.Camera3D(
    [800, 600],		// size of screen area
    60				// horizontal angle in degrees
    );
```

And pass it to the draw call.
```javascript
// draw the effect
effect.draw(context, camera);
```

You can write your own camera with desired functionality. All you need is to create class with transform(...) method with such signature:
```javascript
transform(worldPosition, size) {
	// ...
	pos[0] = transformedScreenX;
	pos[1] = transformedScreenY;
	size[0] = transformedWidth;
	size[1] = transformedHeight;
}
```
Where
* worldPosition - array with particle's position [x, y, z]
* size - array with particle's size [width, height]

This method should modify position and size passed in, and write back tranformed values like shown above.

## Steps to use on generic HTML5 with WebGL

_You can find this source code in /samples/reference.webgl/ of the repository._

WebGL renderer is much more complex than Canvas one. It becomes a new layer on top of NeutrinoParticles objects.
In fact, such renderer requires deep integration and a lot of code modifications to be a solid part of your framework/engine.

Below, you can find information about reference implementation of WebGL renderer. It uses only clean HTML5 features and it doesn't have textures manager, so all textures are loaded in the same way as Canvas sample does above. This reference code intended to show you all neccessary steps to render NeutrinoParticles effects using WebGL to help you to integrate such effects into your rendering framework/engine.

The renderer is split into several classes:
* **WebGLNeutrinoContext** - context for all WebGL effects. Holds NeutrinoParticles context. Single object.
* **WebGLNeutrinoMaterials** - implements shaders and WebGL state changes for different particles materials.
* **WebGLNeutrinoRenderBuffers** - manages WebGL rendering buffers: creates, fills and activates them.
* **WebGLNeutrinoEffectModel** - holds effect model, loaded by NeutrinoParticles.loadEffect(), creates GL textures for all passed textures/images.
* **WebGLNeutrinoEffect** - holds render buffers for the model it was created from, holds effect instance created by createWGLInstance(), updates and renders the effect.

First of all we need to get WebGL context from our canvas.

```javascript
var canvas = document.getElementById('myCanvas');

var gl;
{
	try {
		gl = canvas.getContext("webgl", { premultipliedAlpha: false, alpha: false });
	} catch (e) {
	}

	if (!gl) {
		gl = canvas.getContext("experimental-webgl", { premultipliedAlpha: false, alpha: false });
	}

	if (!gl) {
		alert("Could not initialise WebGL, sorry :-(");
	}

	gl.viewportWidth = canvas.width;
	gl.viewportHeight = canvas.height;
}
```

Next step - create WebGLNeutrinoContext.

```javascript
var wglNeutrino = new WebGLNeutrinoContext(gl);
var neutrino = wglNeutrino.neutrino;
```

Then, load effect's model.
```javascript
var onEffectLoaded = null;
var effectModel = null;

var loadEffect = function() {
	neutrino.loadEffect(
		"export/3boom_stars.js", 		// path to effect file
		function(_effectModel) { 		// on effect loaded successfully callback
			effectModel = _effectModel;
			onEffectLoaded();
		},
		function() {} 					// on effect load failed callback
		);
}
```

Load all textures and prepare texture descriptions array.
Here we use the same texture loading mechanism as Canvas render above has. It is done to simplify WebGL-dependent code and touch only WebGL-related points inside renderer classes.

```javascript
var onTexturesLoaded = null;

onEffectLoaded = function() {
	var textureNames = effectModel.textures;
	var texturesLeft = textureNames.length;

	var textureDescs = [];

	for (var imageIndex = 0; imageIndex < textureNames.length; ++imageIndex) {
		var image = new Image();

		image.onload = (function (imageIndex, image) {
			return function () {
				textureDescs[imageIndex] = new neutrino.ImageDesc(
					image, 			// image
					0, 				// X displace inside image
					0, 				// Y displace inside image
					image.width, 	// width of sub-image to use
					image.height 	// height of sub-image to use
					);

				if (--texturesLeft == 0) {
					onTexturesLoaded(textureDescs);
				};
			};
		})(imageIndex, image);

		image.src = 'textures/' + textureNames[imageIndex];
	}
}
```

At this point everything was mostly the same as Canvas render has.

The next step is to create WebGL wraps for effect model and effect instance.

```javascript
var wglEffectModel = null;
var wglEffect = null;
var animate = null;

onTexturesLoaded = function(textureDescs) {
	wglEffectModel = new WebGLNeutrinoEffectModel(wglNeutrino, effectModel, textureDescs);
	wglEffect = new WebGLNeutrinoEffect(
		wglEffectModel,
		[400, 300, 0],		// starting position of the effect
		0					// starting rotation angle of the effect in degrees
		);

	animate();
}
```

Now, everything is ready to update and render. So, next is creating camera matrices and update/render loop.

```javascript
gl.clearColor(0.5, 0.5, 0.5, 1.0);

var modelViewMatrix = mat4.create();
var projectionMatrix = mat4.create();

mat4.ortho(projectionMatrix, 0, gl.viewportWidth, gl.viewportHeight, 0, -1000, 1000);
mat4.identity(modelViewMatrix);

var lastFrameTime = null;		

animate = function () {
	// time from previous frame calculations
	if (lastFrameTime == null) {
		lastFrameTime = Date.now();
	}

	var currentTime = Date.now();
	var elapsedTime = (currentTime - lastFrameTime) / 1000;
	lastFrameTime = currentTime;

	wglEffect.update(elapsedTime > 1.0 ? 1.0 : elapsedTime);

	// clear viewport with background color (grey)
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// fill geometry buffers with geometry of the effect and render it
	wglEffect.render(
		[1, 0, 0],		//cameraRight
		[0, -1, 0],		//cameraUp
		[0, 0, -1],		//cameraDir
		projectionMatrix,
		modelViewMatrix);

	requestAnimationFrame(animate);
}

loadEffect();
```

That's it. Now you better investigate the source codes of WebGLNeutrino* classes. They are pretty lightweight and self-explanatory.

Before you start integration to your application, I would advice you to think about these:
* How to use your texture manager to load textures, if you have one. You also might want to use texture atlases.
* Do you have shaders manager? Is it possible to use it too? Is it neccessary?
* How will you save/restore WebGL state before and after effect rendering (like blending function, enabled depth test and so on)?
* You probably have own rendering geometry buffers, is it possible to use them? Is it neccessary?

So, cosider as deep integration as you can, but don't forget about performance. Provided WebGLNeutrinoRenderBuffers is pretty good optimized and doesn't have exceeding copying of data.

## Rotation

As you can see from the code above, effect accepts position and rotation on it's creation and update. Position vector is represented by an array [x, y, z] and rotation quaternion by an array [x, y, z, w].

You can form rotation quaternion by yourself, or you can use neutrino function which makes quaternion from axis and rotation angle around this axis:
```javascript
	neutrino.axisangle2quat_(
		[x, y, z],		// rotation axis
		angle			// rotation angle in degrees
		);
```

This rotation might be used by the effect if this effect was made with rotation applying turned on (it is on by default in the Editor).

## Using turbulence in the effects

To use turbulence inside effects (block Noise) you have two options: to generate turbulence texture or to download it. You will need to initialize it before any update calls of the effects.

Noise generating is iterative process and you can divide it at many calls (probably on different update frames if you want to render some progress bar etc.):

```javascript
var noiseGenerator = new neutrino.NoiseGenerator();
while (!noiseGenerator.step()) { // approx. 5,000 steps
	// you can use 'noiseGenerator.progress' to get generating progress from 0.0 to 1.0
}
```
In sample above, all generating steps are done in one loop. It is a simplest way and it will lock script execution until finished.

If you want to spread it to different update frames, you might want to limit maximum execution time on each frame:
```javascript
var startTime = Date.now();      
var finished;
do {
	finished = noiseGenerator.step();

	if (Date.now() - startTime > 30) // generating will take up to 30 msec
		break;

} while (!finished);

// check if finished
```

If you generate noise, you don't need to distribute neutrinoparticles.noise.bin file with precomputed noise texture. But as alternative, you can distribute and download it instead of generating:
```javascript
neutrino.initializeNoise(
	"/neutrinoparticles.js/dist/",	// path to directory where "neutrinoparticles.noise.bin" is
	function() {},					// noise successfully loaded and ready to use callback
	function() {					// load fail callback
		alert("Can't load noise file");
	}
);
```
The size of this file is 768Kb - consider this if your project has strict download requirements.

Until the turbulance initialized all effects will be simulated without it. So you might want to wait for success callback or finished generating.

## Restart effect

You may want to completely restart your effect:

```javascript
effect.restart(
	[x, y, z], // new position (optional)
	[x, y, z, w] // new rotation (optional)
```

## Instant effect position change (jump)

When you moving your effect by changing it's position, the library thinks that effect is moved to new position linearly. In this case effects which generate particles dependenly on passed distance will form trail of particles to the new position.

If you want to jump to the new position and avoid such trails, you need to reset effect's position.
```javascript
effect.resetPosition(
    [x, y, z], // new effect's position (pass null if you don't want to reset position)
	[x, y, z, w] // new effect's rotation quaternion (pass null if you don't want to reset rotation)
    );
```

## Number of particles

You may want to request number of alive particles (for example to find out if effect was finished). Next function will return total number of particles in all standalone (topmost) emitters:

```javascript
var numParticles = effect.getNumParticles();
```

## Changing emitter's properties

Particle emitters in the NeutrinoParticles Editor have "Emitter's property" blocks (on top of emitter scheme). These blocks allow to pass parameters from parent to attached emitters (like particle color, size etc.). Also these blocks are exposed by the neutrinoparticles.js in the effect instances and you can programmatically change these properties in standalone emitters (not attached to particles). So, you can easily change effect's color or anything you planned while creating the effect.

If you want to change property of a single emitter, you can access it directly from effect.
```javascript
effect._EmitterName._PropertyName = 10; //[10, 20] or [10, 20, 30] for vectors
```

If you want to change property with given name for all stanalone emitters, you can use next call.
```javascript
effect.setPropertyInAllEmitters("PropertyName", 10); //[10, 20] or [10, 20, 30] for vectors
```
