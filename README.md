# neutrinoparticles.js

This library allows you to load and simulate particle effects exported from [NeutrinoParticles Editor](https://neutrinoparticles.com/).

You can render effects using either Canvas or WebGL.

The library is designed to be integrated in any engine/framework, and there are samples showing how to use it in clean HTML5 environment. 

Currently available integrations:
* [PIXI official plugin](https://github.com/ymiroshnyk/neutrinoparticles.js/tree/PIXI/dist-PIXI) ([http://www.pixijs.com/](http://www.pixijs.com/))

Below you can find information on how to use neutrinoparticles.js in clean environment, so all effects and textures will be loaded using standard features of HTML5.

## Introduction

NeutrinoParticles Editor exports effects to generic .js file, which contains effect's properties and algorithms of particles' behavior.

neutrinoparticles.js library contains all the code shared between effects (like mathematics and some algorithms). Also, the library has handy loader for effects.

Exported effect file has no textures inside it, but only their file names. All images loading you will need to handle on application side. Usually, for that you will use capabilities of the framework/engine where you integrating this library.

Effect is divided into two parts: model and instance. Model is described in exported from the editor .js file. So, first, you load effect's model, then textures described in it, and then you create as many instances of the effect as you want to. Each instance has own position and life time and will be simulated independently.

After instances are created all you need is to call update() and render() for them on each frame.

## Steps to use on generic HTML5 with Canvas

_You can find this source code in /samples/simplest/ of the repository._

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

