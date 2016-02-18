"use strict"

var canvas = document.getElementById('myCanvas');

 var gl;
function initGL(canvas) {
	try {
		gl = canvas.getContext("webgl", { premultipliedAlpha: false, alpha: false });
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
	} catch (e) {
	}
	if (!gl) {
		alert("Could not initialise WebGL, sorry :-(");
	}
}

var mvMatrix = mat4.create();
var pMatrix = mat4.create();

initGL(canvas);

gl.clearColor(0.5, 0.5, 0.5, 1.0);
gl.enable(gl.DEPTH_TEST);
	
var neutrino = new NeutrinoParticles();
var neutrinoWGL = new NeutrinoParticlesWGL(gl);

/*
neutrino.initializeNoise(
	"/neutrino/" // path to directory where "neutrinoparticles.noise.bin" is
	, callback // function to call when noise binary is loaded and ready to use in effects
	);
*/

var effectModel = new NeutrinoPart_3boom_stars(neutrino);

var effect = effectModel.createWGLInstance(
	[0, 0, 0] // position of the effect
	);

var effectWGL = new neutrinoWGL.Renderer(effect);

var onImagesLoaded = null;

// load all images/textures
var loadImages = function () {
	// list of textures used by the effects is in effect.model.textures
    var imagesToLoad = effect.model.textures.length;

    // result map of (image path -> image description)
    var images = [];

    for (var imageIndex = 0; imageIndex < effect.model.textures.length; ++imageIndex) {
        var image = new Image();

		//test texture remapping (for textures atlases)
        //effect.texturesRemap[imageIndex] = new neutrino.SubRect(0, 0, 0.5, 0.5);

        image.onload = (function () {
            var savedImageIndex = imageIndex;
            var savedImage = image;

            return function () {
                // assign image description to image path
                images[savedImageIndex] = savedImage;

                if (--imagesToLoad == 0) {
                    effectWGL.createTexturesFromImages(images);
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
		effectWGL.update(
			elapsedTime > 1.0 ? 1.0 : elapsedTime, // time from previous frame in seconds
			[0, 0, 0] // new position of the effect
			);

		effectWGL.prepareGeometry([1, 0, 0]/*cameraRight*/, [0, -1, 0]/*cameraUp*/, [0, 0, -1]/*cameraDir*/);
		
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
		
		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, mvMatrix, [-gl.viewportWidth / 2, -gl.viewportHeight / 2, -cameraZ]);

		effectWGL.render(pMatrix, mvMatrix);
	};
	
	updateFrame();
}

loadImages();