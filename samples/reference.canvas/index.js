"use strict"

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var neutrino = new NeutrinoParticles();

/*
neutrino.initializeNoise(
	"/neutrinoparticles.js/dist/" // path to directory where "neutrinoparticles.noise.bin" is
	, callback // function to call when noise binary is loaded and ready to use in effects
	);
*/
/*var camera = new neutrino.Camera3D(
	[800, 600],  // size of screen area
	60 // horizontal angle in degrees
	);
*/

var onEffectLoaded = null;
var effectModel = null;

var loadEffect = function() {
	neutrino.loadEffect(
		"export_js/water_stream.js", 	// path to effect file
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

var effect = null;
var animate = null;

var position = [400, 300, 0];
var rotation = 0;

onTexturesLoaded = function(textureDescs) {
	effect = effectModel.createCanvas2DInstance(
		position, 										// position of the effect
		neutrino.axisangle2quat_([0, 0, 1], rotation)	// rotation from angle
		);
		
	// send image descriptions to the effect
	effect.textureDescs = textureDescs; 

	animate();
}

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
	rotation += elapsedTime * 45.0;

	// update the effect
	effect.update(
		elapsedTime > 1.0 ? 1.0 : elapsedTime, 			// time from previous frame in seconds
		position, 										// new position of the effect
		neutrino.axisangle2quat_([0, 0, 1], rotation)	// new rotation of the effect
		);
	
	// clear background
	context.fillStyle = "grey";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	// draw the effect
	effect.draw(
		context
		/*, camera*/);
		
	requestAnimationFrame(animate);
};

loadEffect();