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

neutrino.loadEffect("export/3boom_stars.js", function(effectModel) {
	var effect = effectModel.createCanvas2DInstance(
		[0, 0, 0] // position of the effect
		);

	var onImagesLoaded = null;

	var loadImages = function() {
		var imagesToLoad = effect.model.textures.length;

		// result map of (image path -> image description)
		var imageDescs = [];
		
		for (var imageIndex = 0; imageIndex < effect.model.textures.length; ++imageIndex) {
			var image = new Image();
			
			image.onload = (function () {
				var savedImageIndex = imageIndex;
				var savedImage = image;

				return function () {
					// assign image description to image path
					imageDescs[savedImageIndex] = new neutrino.ImageDesc(
						savedImage, // image
						0, // X displace inside image
						0, // Y displace inside image
						savedImage.width, // width of sub-image to use
						savedImage.height // height of sub-image to use
						);
						
					if (--imagesToLoad == 0) {
						effect.textureDescs = imageDescs; // send image descriptions to the effect
						onImagesLoaded();
					};
				};
			})();
			
			image.src = 'textures/' + effect.model.textures[imageIndex];
		};
	}

	onImagesLoaded = function() {
		var lastCalledTime = null;
		
		var updateFrame = function () {
			requestAnimationFrame(updateFrame);

			if (lastCalledTime == null) {
			  lastCalledTime = Date.now();
			}
			
			var currentTime = Date.now();
			var elapsedTime = (currentTime - lastCalledTime) / 1000;
			lastCalledTime = currentTime;

			// update the effect
			effect.update(
				elapsedTime > 1.0 ? 1.0 : elapsedTime, // time from previous frame in seconds
				[0, 0, 0] // new position of the effect
				);
			
			context.fillStyle = "grey";
			context.fillRect(0, 0, canvas.width, canvas.height);
			
			// draw the effect
			effect.draw(
				context // rendering context
				// , camera // camera to use when drawing
				);
		};
		
		updateFrame();
	}

	loadImages();
});
