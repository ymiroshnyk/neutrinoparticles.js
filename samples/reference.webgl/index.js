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
neutrino.initializeNoise(
	"/neutrinoparticles.js/dist/" // path to directory where "neutrinoparticles.noise.bin" is
	, callback // function to call when noise binary is loaded and ready to use in effects
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
	wglEffect = new WebGLNeutrinoEffect(wglEffectModel, [0, 0, 0]);

	animate();
}

gl.clearColor(0.5, 0.5, 0.5, 1.0);

var mvMatrix = mat4.create();
var pMatrix = mat4.create();
		
var lastCalledTime = null;		

animate = function () {
	// time from previous frame calculations
	if (lastCalledTime == null) {
		lastCalledTime = Date.now();
	}

	var currentTime = Date.now();
	var elapsedTime = (currentTime - lastCalledTime) / 1000;
	lastCalledTime = currentTime;

	wglEffect.update(elapsedTime > 1.0 ? 1.0 : elapsedTime);

	// clear viewport with background color (grey)
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// prepare projection matrix with horizontal fov 60 degrees and Y axis looking down (as Canvas2D has)
	var angleX = 60.0 * Math.PI / 180.0;
	var angleY = angleX * gl.viewportHeight / gl.viewportWidth;
	var near = 1.0;
	var far = 10000.0;
	var projX = Math.tan(angleX * 0.5) * near;
	var projY = Math.tan(angleY * 0.5) * near;
	var cameraZ = near * gl.viewportWidth * 0.5 / projX;
	mat4.frustum(pMatrix, -projX, projX, projY, -projY, near, far);

	// modelview matrix will shift camera to the center of the screen
	mat4.identity(mvMatrix);
	mat4.translate(mvMatrix, mvMatrix, [-gl.viewportWidth / 2, -gl.viewportHeight / 2, -cameraZ]);

	// fill geometry buffers with geometry of the effect and render it
	wglEffect.render(
		[1, 0, 0], //cameraRight
		[0, -1, 0], //cameraUp
		[0, 0, -1], //cameraDir
		pMatrix, mvMatrix);

	requestAnimationFrame(animate);
}

loadEffect();

