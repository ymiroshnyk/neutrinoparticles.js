"use strict"

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
	
var wglNeutrino = new WebGLNeutrinoContext(gl);
var neutrino = wglNeutrino.neutrino;

/*
wglNeutrino.initializeNoise(
	"/neutrinoparticles.js/dist/",	// path to directory where "neutrinoparticles.noise.bin" is
	function() {},					// noise successfully loaded and ready to use callback
	function() {					// load fail callback
		alert("Can't load noise file"); 
	} 
);
*/

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

