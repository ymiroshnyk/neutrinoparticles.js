# neutrinoparticles.js

This library allows you to load and simulate particle effects exported from [NeutrinoParticles Editor](https://neutrinoparticles.com/).

You can render effects using either Canvas or WebGL.

The library is designed to be integrated in any engine/framework, and there are samples showing how to use it in clean HTML5 environment. 

Currently available integrations:
* [PIXI official plugin](dist-PIXI) ([http://www.pixijs.com/](http://www.pixijs.com/))

Below you can find information on how to use neutrinoparticles.js in clean environment, so all effects and textures will be loaded using standard features of HTML5.

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

onTexturesLoaded = function(textureDescs) {
	effect = effectModel.createCanvas2DInstance(
		[0, 0, 0] 	// position of the effect
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

	// update the effect
	effect.update(
		elapsedTime > 1.0 ? 1.0 : elapsedTime, 	// time from previous frame in seconds
		[0, 0, 0] 								// new position of the effect
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
		[0, 0, 0]		// starting position of the effect
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

## Using turbulence in the effects

The turbulence inside effects (block Noise) requires additional load of pretty heavy file with precomputed turbulence 3D texture. The size of this file is 768Kb - consider this if your project has strict download requirements.

To load that file and initialize turbulence, you need to make following call at the start of application.

```javascript
neutrino.initializeNoise(
	"/neutrinoparticles.js/dist/",	// path to directory where "neutrinoparticles.noise.bin" is
	function() {},					// noise successfully loaded and ready to use callback
	function() {					// load fail callback
		alert("Can't load noise file"); 
	} 
);
```

Until the turbulance initialized all effects will be simulated without it. So you might want to wait for success callback.

## Instant effect position change (jump)

When you moving your effect by changing it's position, the library thinks that effect is moved to new position linearly. In this case effects which generate particles dependenly on went distance will form trail of particles to the new position.

If you want to jump to the new position and avoid such trails, you need to reset effect's position.
```javascript
effect.resetPosition(
    [x, y, z] // new effect's position
    );
```

## Changing emitter's properties

Particle emitters in the NeutrinoParticles Editor have "Emitter's property" blocks (on top of emitter scene). These blocks allow to pass parameters from parent to attached emitters (like particle color, size etc.). Also these blocks are exposed by the neutrinoparticles.js in the effect instances and you can programmatically change these properties in standalone emitters (not attached to particles). So, you can easily change effect's color or anything you planned while creating the effect.

If you want to change property of a single emitter, you can access it directly from effect.
```javascript
effect._EmitterName._PropertyName = 10; //[10, 20] or [10, 20, 30] for vectors
```

If you want to change property with given name for all stanalone emitters, you can use next call.
```javascript
effect.setPropertyInAllEmitters("PropertyName", 10); //[10, 20] or [10, 20, 30] for vectors
```



