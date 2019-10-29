this.noise = null;
	this.noiseSize = 0;

	this.initializeNoise = function(path, onloadcallback, onfailcallback) {
		
		if (!path) {
			alert("path should be defined");
		}
		
		if (this.noise != null) {
			onloadcallback();
			return;
		}

		if (path == null || path == undefined)
			path = this.defaultPath;

		var request = new XMLHttpRequest();
		request.open("GET", path + "neutrinoparticles.noise.bin", true);
		request.responseType = "arraybuffer";
		request.ctx = this;
		request.onreadystatechange = function () {
			if (request.readyState == 4) {
				if ((request.status >= 200 && request.status < 300) || request.status == 304) {
					var noise = request.response;
					var ctx = request.ctx;

					var view = new DataView(noise, 0, 4);
					var planeSize = view.getUint32(0, true);
					var planesAtSide = Math.sqrt(planeSize);
					var viewSideSize = planeSize * planesAtSide;
				
					ctx.noise = [];
					ctx.noiseSize = planeSize;

					for (var planeIndex = 0; planeIndex < planeSize; ++planeIndex) {
						ctx.noise[planeIndex] = new DataView(noise,
							4/*size*/ + 3 * planeSize * planeSize * planeIndex);
					}

					if (onloadcallback)
						onloadcallback();
				} else {
					if (onfailcallback)
						onfailcallback();
				}					
			}
		}
		
		request.send();
	}

	this.NoiseGenerator = function () {
		
		var catmullRom_ = function (p0, p1, p2, p3, t) {
			return 0.5 * ((2.0 * p1) + (-p0 + p2) * t + (2.0 * p0 - 5.0 * p1 + 4.0 * p2 - p3) * t * t +
			(-p0 + 3.0 * p1 - 3.0 * p2 + p3) * (t * t * t));
		}

		var catmullRomv3_ = function (p0, p1, p2, p3, t) {
			return [
				catmullRom_(p0[0], p1[0], p2[0], p3[0], t),
				catmullRom_(p0[1], p1[1], p2[1], p3[1], t),
				catmullRom_(p0[2], p1[2], p2[2], p3[2], t)
				];
		}

		var clamp_ = function (a, from, to) {
			return (a < from) ? from : ((a > to) ? to : a);
		}
			
		var imageSize = 64;
		var image = [];
		var tempBuffer = [];
		var tausGenerator = new ctx.taus88(120); // 120 - hardcoded starting seed
		var rand = function () { return tausGenerator.rand(); };
		var amp = 0.7; // hardcoded amplitude of perlin noise
		var fadeDegree = 1.2; // hardcoded fade degree of each octave
		var prevStep = imageSize;

		var step, size, octSize, octSize2, octMaskSize, octPixels, octZ, octY; // mix step variables

		var numMixStepIterations = 0;
		var mixStepIteration = 0;

		for (var i = prevStep >>> 1; i > 0; i >>>= 1) {
			var _octSize = Math.floor(imageSize / i);
			numMixStepIterations += _octSize * _octSize;
		}

		var States = {
			INITIAL_FILL: 0,
			MIX_STEP_INIT: 1,
			MIX_STEP_PROCESS: 2,
			SCALING: 3,
			DATA_VIEWS: 4,
			FINISHED: 5
		};

		var Progress = {
			INIT: 0.01,
			MIX: 0.9,
			SCALING: 0.95,
			DATA_VIEWS: 1.0
		}

		var state = States.INITIAL_FILL;

		this.progress = 0.0;

		var initialFill = function () {
			for (var z = 0; z < imageSize; ++z) {
				var imageZ = image[z] = [];

				for (var y = 0; y < imageSize; ++y) {
					var imageZY = imageZ[y] = [];

					for (var x = 0; x < imageSize; ++x) {
						var imageZYX = imageZY[x] = [0.0, 0.0, 0.0];
					}
				}
			}

			state = States.MIX_STEP_INIT;
			this.progress = Progress.INIT;
		}

		var mixStepInit = function () {

			step = prevStep >>> 1;
			size = imageSize;
			octSize = Math.floor(size / step);
			octSize2 = octSize * octSize;
			octMaskSize = Math.max(octSize - 1, 1);
			octPixels = octSize * octSize * octSize;
			octZ = 0;
			octY = 0;

			for (var i = 0; i < octPixels; ++i) {
				tempBuffer[i] = [];
				// order is inverted to satisfy c++ obsolete order
				tempBuffer[i][2] = rand() * 2.0 - 1.0;
				tempBuffer[i][1] = rand() * 2.0 - 1.0;
				tempBuffer[i][0] = rand() * 2.0 - 1.0;
			}

			state = States.MIX_STEP_PROCESS;
		}

		var mixStepProcess = function() {
			for (var octX = 0; octX < octSize; ++octX) {
				var octZ0 = ((octZ - 1) >>> 0) & octMaskSize;
				var octZ1 = ((octZ) >>> 0) & octMaskSize;
				var octZ2 = ((octZ + 1) >>> 0) & octMaskSize;
				var octZ3 = ((octZ + 2) >>> 0) & octMaskSize;

				var octY0 = ((octY - 1) >>> 0) & octMaskSize;
				var octY1 = ((octY) >>> 0) & octMaskSize;
				var octY2 = ((octY + 1) >>> 0) & octMaskSize;
				var octY3 = ((octY + 2) >>> 0) & octMaskSize;

				var octX0 = ((octX - 1) >>> 0) & octMaskSize;
				var octX1 = ((octX) >>> 0) & octMaskSize;
				var octX2 = ((octX + 1) >>> 0) & octMaskSize;
				var octX3 = ((octX + 2) >>> 0) & octMaskSize;

				var values = //zyx
				[
					[
						[
							tempBuffer[octZ0 * octSize2 + octY0 * octSize + octX0],
							tempBuffer[octZ0 * octSize2 + octY0 * octSize + octX1],
							tempBuffer[octZ0 * octSize2 + octY0 * octSize + octX2],
							tempBuffer[octZ0 * octSize2 + octY0 * octSize + octX3]
						],
						[
							tempBuffer[octZ0 * octSize2 + octY1 * octSize + octX0],
							tempBuffer[octZ0 * octSize2 + octY1 * octSize + octX1],
							tempBuffer[octZ0 * octSize2 + octY1 * octSize + octX2],
							tempBuffer[octZ0 * octSize2 + octY1 * octSize + octX3]
						],
						[
							tempBuffer[octZ0 * octSize2 + octY2 * octSize + octX0],
							tempBuffer[octZ0 * octSize2 + octY2 * octSize + octX1],
							tempBuffer[octZ0 * octSize2 + octY2 * octSize + octX2],
							tempBuffer[octZ0 * octSize2 + octY2 * octSize + octX3]
						],
						[
							tempBuffer[octZ0 * octSize2 + octY3 * octSize + octX0],
							tempBuffer[octZ0 * octSize2 + octY3 * octSize + octX1],
							tempBuffer[octZ0 * octSize2 + octY3 * octSize + octX2],
							tempBuffer[octZ0 * octSize2 + octY3 * octSize + octX3]
						]
					],

					[
						[
							tempBuffer[octZ1 * octSize2 + octY0 * octSize + octX0],
							tempBuffer[octZ1 * octSize2 + octY0 * octSize + octX1],
							tempBuffer[octZ1 * octSize2 + octY0 * octSize + octX2],
							tempBuffer[octZ1 * octSize2 + octY0 * octSize + octX3]
						],
						[
							tempBuffer[octZ1 * octSize2 + octY1 * octSize + octX0],
							tempBuffer[octZ1 * octSize2 + octY1 * octSize + octX1],
							tempBuffer[octZ1 * octSize2 + octY1 * octSize + octX2],
							tempBuffer[octZ1 * octSize2 + octY1 * octSize + octX3]
						],
						[
							tempBuffer[octZ1 * octSize2 + octY2 * octSize + octX0],
							tempBuffer[octZ1 * octSize2 + octY2 * octSize + octX1],
							tempBuffer[octZ1 * octSize2 + octY2 * octSize + octX2],
							tempBuffer[octZ1 * octSize2 + octY2 * octSize + octX3]
						],
						[
							tempBuffer[octZ1 * octSize2 + octY3 * octSize + octX0],
							tempBuffer[octZ1 * octSize2 + octY3 * octSize + octX1],
							tempBuffer[octZ1 * octSize2 + octY3 * octSize + octX2],
							tempBuffer[octZ1 * octSize2 + octY3 * octSize + octX3]
						]
					],

					[
						[
							tempBuffer[octZ2 * octSize2 + octY0 * octSize + octX0],
							tempBuffer[octZ2 * octSize2 + octY0 * octSize + octX1],
							tempBuffer[octZ2 * octSize2 + octY0 * octSize + octX2],
							tempBuffer[octZ2 * octSize2 + octY0 * octSize + octX3]
						],
						[
							tempBuffer[octZ2 * octSize2 + octY1 * octSize + octX0],
							tempBuffer[octZ2 * octSize2 + octY1 * octSize + octX1],
							tempBuffer[octZ2 * octSize2 + octY1 * octSize + octX2],
							tempBuffer[octZ2 * octSize2 + octY1 * octSize + octX3]
						],
						[
							tempBuffer[octZ2 * octSize2 + octY2 * octSize + octX0],
							tempBuffer[octZ2 * octSize2 + octY2 * octSize + octX1],
							tempBuffer[octZ2 * octSize2 + octY2 * octSize + octX2],
							tempBuffer[octZ2 * octSize2 + octY2 * octSize + octX3]
						],
						[
							tempBuffer[octZ2 * octSize2 + octY3 * octSize + octX0],
							tempBuffer[octZ2 * octSize2 + octY3 * octSize + octX1],
							tempBuffer[octZ2 * octSize2 + octY3 * octSize + octX2],
							tempBuffer[octZ2 * octSize2 + octY3 * octSize + octX3]
						]
					],

					[
						[
							tempBuffer[octZ3 * octSize2 + octY0 * octSize + octX0],
							tempBuffer[octZ3 * octSize2 + octY0 * octSize + octX1],
							tempBuffer[octZ3 * octSize2 + octY0 * octSize + octX2],
							tempBuffer[octZ3 * octSize2 + octY0 * octSize + octX3]
						],
						[
							tempBuffer[octZ3 * octSize2 + octY1 * octSize + octX0],
							tempBuffer[octZ3 * octSize2 + octY1 * octSize + octX1],
							tempBuffer[octZ3 * octSize2 + octY1 * octSize + octX2],
							tempBuffer[octZ3 * octSize2 + octY1 * octSize + octX3]
						],
						[
							tempBuffer[octZ3 * octSize2 + octY2 * octSize + octX0],
							tempBuffer[octZ3 * octSize2 + octY2 * octSize + octX1],
							tempBuffer[octZ3 * octSize2 + octY2 * octSize + octX2],
							tempBuffer[octZ3 * octSize2 + octY2 * octSize + octX3]
						],
						[
							tempBuffer[octZ3 * octSize2 + octY3 * octSize + octX0],
							tempBuffer[octZ3 * octSize2 + octY3 * octSize + octX1],
							tempBuffer[octZ3 * octSize2 + octY3 * octSize + octX2],
							tempBuffer[octZ3 * octSize2 + octY3 * octSize + octX3]
						]
					]
				];

				for (var inZ = 0; inZ < step; ++inZ) {
					var interpZ = inZ / step;
					var imageZ = octZ * step + inZ;

					var valuesP = //yx
					[
						[
							catmullRomv3_(values[0][0][0], values[1][0][0], values[2][0][0], values[3][0][0], interpZ),
							catmullRomv3_(values[0][0][1], values[1][0][1], values[2][0][1], values[3][0][1], interpZ),
							catmullRomv3_(values[0][0][2], values[1][0][2], values[2][0][2], values[3][0][2], interpZ),
							catmullRomv3_(values[0][0][3], values[1][0][3], values[2][0][3], values[3][0][3], interpZ)
						],
						[
							catmullRomv3_(values[0][1][0], values[1][1][0], values[2][1][0], values[3][1][0], interpZ),
							catmullRomv3_(values[0][1][1], values[1][1][1], values[2][1][1], values[3][1][1], interpZ),
							catmullRomv3_(values[0][1][2], values[1][1][2], values[2][1][2], values[3][1][2], interpZ),
							catmullRomv3_(values[0][1][3], values[1][1][3], values[2][1][3], values[3][1][3], interpZ)
						],
						[
							catmullRomv3_(values[0][2][0], values[1][2][0], values[2][2][0], values[3][2][0], interpZ),
							catmullRomv3_(values[0][2][1], values[1][2][1], values[2][2][1], values[3][2][1], interpZ),
							catmullRomv3_(values[0][2][2], values[1][2][2], values[2][2][2], values[3][2][2], interpZ),
							catmullRomv3_(values[0][2][3], values[1][2][3], values[2][2][3], values[3][2][3], interpZ)
						],
						[
							catmullRomv3_(values[0][2][0], values[1][3][0], values[2][3][0], values[3][3][0], interpZ),
							catmullRomv3_(values[0][2][1], values[1][3][1], values[2][3][1], values[3][3][1], interpZ),
							catmullRomv3_(values[0][2][2], values[1][3][2], values[2][3][2], values[3][3][2], interpZ),
							catmullRomv3_(values[0][2][3], values[1][3][3], values[2][3][3], values[3][3][3], interpZ)
						]
					];

					for (var inY = 0; inY < step; ++inY) {
						var interpY = inY / step;
						var imageY = octY * step + inY;

						var value0 = catmullRomv3_(valuesP[0][0], valuesP[1][0], valuesP[2][0],
							valuesP[3][0], interpY);
						var value1 = catmullRomv3_(valuesP[0][1], valuesP[1][1], valuesP[2][1],
							valuesP[3][1], interpY);
						var value2 = catmullRomv3_(valuesP[0][2], valuesP[1][2], valuesP[2][2],
							valuesP[3][2], interpY);
						var value3 = catmullRomv3_(valuesP[0][3], valuesP[1][3], valuesP[2][3],
							valuesP[3][3], interpY);

						for (var inX = 0; inX < step; ++inX) {
							var interpX = inX / step;
							var imageX = octX * step + inX;

							var octResult = catmullRomv3_(value0, value1, value2, value3, interpX);
							var result = ctx.addv3_(ctx.mulv3scalar_(octResult, amp), image[imageZ][imageY][imageX]);
							var clampedResult = [
								clamp_(result[0], -1.0, 1.0),
								clamp_(result[1], -1.0, 1.0),
								clamp_(result[2], -1.0, 1.0)
							];

							image[imageZ][imageY][imageX] = clampedResult;
						}
					}
				}
			}

			mixStepIteration++;
			this.progress = Progress.INIT + (Progress.MIX - Progress.INIT) * (mixStepIteration / numMixStepIterations);

			octY++;
			if (octY >= octSize) {
				octY = 0;
				octZ++;
				if (octZ >= octSize) {
					octZ = 0;

					prevStep = step;
					amp = Math.pow(amp, fadeDegree);
					
					if (prevStep <= 1) {
						state = States.SCALING;
						this.progress = Progress.MIX;
					} else {
						state = States.MIX_STEP_INIT;
					}
				}
			}
		}

		// hardcoded scaling of the image to make it more symethric
		var scaling = function() {
			var low = [-1.0, -1.0, -1.0];
			var high = [0.5, 0.7, 1.0];

			for (var z = 0; z < imageSize; ++z) {
				var imageZ = image[z];

				for (var y = 0; y < imageSize; ++y) {
					var imageZY = imageZ[y];

					for (var x = 0; x < imageSize; ++x) {
						var imageZYX = imageZY[x];
						imageZYX[0] = ctx.lerp_(low[0], high[0], imageZYX[0] * 0.5 + 0.5);
						imageZYX[1] = ctx.lerp_(low[1], high[1], imageZYX[1] * 0.5 + 0.5);
						imageZYX[2] = ctx.lerp_(low[2], high[2], imageZYX[2] * 0.5 + 0.5);
					}
				}
			}

			state = States.DATA_VIEWS;
			this.progress = Progress.SCALING;
		}

		// filling noise DataViews
		var dataViews = function() {
			ctx.noiseSize = imageSize;
			ctx.noise = [];

			for (var z = 0; z < imageSize; ++z) {
				var imageZ = image[z];
			
				var plane = new ArrayBuffer(imageSize * imageSize * 3);
				var view = new DataView(plane);
			
				for (var y = 0; y < imageSize; ++y) {
					var imageZY = imageZ[y];

					for (var x = 0; x < imageSize; ++x) {
						var imageZYX = imageZY[x];

						var rgbOffset = (y * imageSize + x) *  3;
						view.setUint8(rgbOffset + 0,
							Math.floor(clamp_(256.0 * (imageZYX[0] * 0.5 + 0.5) - 0.5, 0.0, 255.0)));
						view.setUint8(rgbOffset + 1,
							Math.floor(clamp_(256.0 * (imageZYX[1] * 0.5 + 0.5) - 0.5, 0.0, 255.0)));
						view.setUint8(rgbOffset + 2,
							Math.floor(clamp_(256.0 * (imageZYX[2] * 0.5 + 0.5) - 0.5, 0.0, 255.0)));
					}
				}

				ctx.noise[z] = view;
			}

			state = States.FINISHED;
			this.progress = Progress.DATA_VIEWS;
		}

		this.step = function() {
			switch (state) {
				case States.INITIAL_FILL: initialFill.call(this); break;
				case States.MIX_STEP_INIT: mixStepInit.call(this); break;
				case States.MIX_STEP_PROCESS: mixStepProcess.call(this); break;
				case States.SCALING: scaling.call(this); break;
				case States.DATA_VIEWS: dataViews.call(this); break;
			}

			return state == States.FINISHED;
		}
	}