(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Rembrandt"] = factory();
	else
		root["Rembrandt"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This file is part of Rembrandt.js
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2016 PhotoEditorSDK.com
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under MIT license (https://opensource.org/licenses/MIT)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _fs = __webpack_require__(1);

	var _fs2 = _interopRequireDefault(_fs);

	var _utils = __webpack_require__(2);

	var _utils2 = _interopRequireDefault(_utils);

	var _promise = __webpack_require__(3);

	var _promise2 = _interopRequireDefault(_promise);

	var _constants = __webpack_require__(4);

	var _constants2 = _interopRequireDefault(_constants);

	var _image = __webpack_require__(5);

	var _image2 = _interopRequireDefault(_image);

	var _color = __webpack_require__(6);

	var _color2 = _interopRequireDefault(_color);

	var _imageComparator = __webpack_require__(7);

	var _imageComparator2 = _interopRequireDefault(_imageComparator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// if (true) {
	//   global.Buffer = function () {};
	// }

	var Rembrandt = function () {
	  function Rembrandt(options) {
	    _classCallCheck(this, Rembrandt);

	    this._imageA = null;
	    this._imageB = null;

	    this._options = _utils2.default.defaults(options, {
	      imageA: null,
	      imageB: null,
	      thresholdType: Rembrandt.THRESHOLD_PERCENT,
	      maxThreshold: 0.01,
	      maxDelta: 20,
	      renderComposition: false,
	      compositionMaskColor: _color2.default.RED,
	      maxOffset: 0
	    });

	    this._validateOptions();
	  }

	  // -------------------------------------------------------------------------- PUBLIC API

	  /**
	   * Compares the input images
	   * @return {Promise}
	   */


	  _createClass(Rembrandt, [{
	    key: 'compare',
	    value: function compare() {
        this._imageA = _image2.default.fromImage(this._options.imageA);
        this._imageB = _image2.default.fromImage(this._options.imageB);
	      var _this = this;
        var comparator = new _imageComparator2.default(_this._imageA, _this._imageB, _this._options);
        return comparator.compare();
	      // return this._loadImages().then(function () {
	      //   var comparator = new _imageComparator2.default(_this._imageA, _this._imageB, _this._options);
	      //   return comparator.compare();
	      // });
	    }

	    // -------------------------------------------------------------------------- STATIC PUBLIC API

	    /**
	     * Creates an image
	     * @param  {Number} width
	     * @param  {Number} height
	     * @return {Rembrandt.Image}
	     */

	  }, {
	    key: '_validateOptions',


	    // -------------------------------------------------------------------------- PRIVATE API

	    /**
	     * Validates the options
	     * @private
	     */
	    value: function _validateOptions() {
	      var _this2 = this;

	      // Image options validation
	      var checkImageValid = function checkImageValid(optionName) {
	        var image = _this2._options[optionName];
	        // if (!(typeof image === 'string' || Buffer.isBuffer(image) || image instanceof _image2.default)) {
	        //   throw new Error('Option `' + optionName + '` must either be a String, Buffer or Rembrandt.Image.');
	        // }
	      };
	      checkImageValid('imageA');
	      checkImageValid('imageB');

	      var _options = this._options;
	      var thresholdType = _options.thresholdType;
	      var threshold = _options.threshold;
	      var maxDelta = _options.maxDelta;

	      // Threshold type validation

	      var validThresholdTypes = [Rembrandt.THRESHOLD_PERCENT, Rembrandt.THRESHOLD_PIXELS];
	      if (validThresholdTypes.indexOf(thresholdType) === -1) {
	        throw new Error('`thresholdType` must be either Rembrandt.THRESHOLD_PERCENT or Rembrandt.THRESHOLD_PIXELS');
	      }

	      // Threshold validation
	      if (thresholdType === Rembrandt.THRESHOLD_PERCENT && threshold < 0 || threshold > 1) {
	        throw new Error('`threshold` must be between 0 and 1');
	      }

	      // Delta validation
	      if (maxDelta < 0 || maxDelta > 255) {
	        throw new Error('`maxDelta` must be between 0 and 255');
	      }
	    }

	    /**
	     * Loads the images
	     * @private
	     */

	  }, {
	    key: '_loadImages',
	    value: function _loadImages() {
	      var _this3 = this;

	      return this._loadImage(this._options.imageA).then(function (imageA) {
	        _this3._imageA = imageA;
	        return _this3._loadImage(_this3._options.imageB);
	      }).then(function (imageB) {
	        _this3._imageB = imageB;
	      });
	    }

	    /**
	     * Loads the given image
	     * @param  {String|Buffer} image
	     * @return {Buffer}
	     * @private
	     */

	  }, {
	    key: '_loadImage',
	    value: function _loadImage(image) {
	      return new _promise2.default(function (resolve, reject) {
	        if (image instanceof _image2.default) {
	          return resolve(image);
	        }

	        if (image instanceof Buffer) {
	          return resolve(_image2.default.fromBuffer(image));
	        }

	        if (true) {
	          (function () {
	            var browserImage = _utils2.default.createImage();
	            browserImage.addEventListener('load', function () {
	              resolve(_image2.default.fromImage(browserImage));
	            });
	            browserImage.crossOrigin = 'Anonymous';
	            browserImage.src = image;
	          })();
	        }
	      });
	    }
	  }], [{
	    key: 'createImage',
	    value: function createImage(width, height) {
	      return new _image2.default(width, height);
	    }
	  }]);

	  return Rembrandt;
	}();

	Rembrandt.Image = _image2.default;
	Rembrandt.Color = _color2.default;

	Rembrandt.version = __webpack_require__(9).version;

	// Copy constants to Rembrandt object
	for (var key in _constants2.default) {
	  Rembrandt[key] = _constants2.default[key];
	}

	module.exports = Rembrandt;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This file is part of Rembrandt.js
	 * Copyright (c) 2016 PhotoEditorSDK.com
	 * Licensed under MIT license (https://opensource.org/licenses/MIT)
	 */

	var Utils = function () {
	  function Utils() {
	    _classCallCheck(this, Utils);
	  }

	  _createClass(Utils, null, [{
	    key: 'defaults',

	    /**
	     * Assigns own enumerable properties of source object(s) to the destination
	     * object for all destination properties that resolve to undefined. Once a
	     * property is set, additional values of the same property are ignored.
	     * @param  {Object} object
	     * @param  {Object} ...sources
	     * @return {Object}
	     */
	    value: function defaults(object) {
	      // Shallow clone
	      var newObject = {};
	      for (var key in object) {
	        newObject[key] = object[key];
	      }

	      // Clone sources

	      for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        sources[_key - 1] = arguments[_key];
	      }

	      for (var i = 0; i < sources.length; i++) {
	        var source = sources[i];
	        for (var _key2 in source) {
	          if (typeof newObject[_key2] === 'undefined') {
	            newObject[_key2] = source[_key2];
	          }
	        }
	      }

	      return newObject;
	    }

	    /**
	     * Creates a canvas with the given dimensions
	     * @param  {Number} width
	     * @param  {Number} height
	     * @return {Canvas}
	     */

	  }, {
	    key: 'createCanvas',
	    value: function createCanvas(width, height) {
	      var canvas = void 0;
	      if (true) {
	        canvas = document.createElement('canvas');
	      }
	      canvas.width = width;
	      canvas.height = height;

	      return canvas;
	    }

	    /**
	     * Creates a new image
	     * @return {Image}
	     */

	  }, {
	    key: 'createImage',
	    value: function createImage() {
	      var image = void 0;
	      if (true) {
	        image = new window.Image();
	      }
	      return image;
	    }
	  }]);

	  return Utils;
	}();

	exports.default = Utils;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/* eslint-disable */
	/*!
	 * Native Promise Only
	 * v0.8.0-a (c) Kyle Simpson
	 * MIT License: http://getify.mit-license.org
	 * @license
	 */
	/* istanbul ignore next */
	(function UMD(name, context, definition) {
	  // special form of UMD for polyfilling across evironments
	  context[name] = context[name] || definition();
	  if (typeof module != "undefined" && module.exports) {
	    module.exports = context[name];
	  } else if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function $AMD$() {
	      return context[name];
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	})("Promise", typeof global != "undefined" ? global : undefined, function DEF() {
	  /*jshint validthis:true */
	  "use strict";

	  var builtInProp,
	      cycle,
	      scheduling_queue,
	      ToString = Object.prototype.toString,
	      timer = typeof setImmediate != "undefined" ? function timer(fn) {
	    return setImmediate(fn);
	  } : setTimeout;

	  // dammit, IE8.
	  try {
	    Object.defineProperty({}, "x", {});
	    builtInProp = function builtInProp(obj, name, val, config) {
	      return Object.defineProperty(obj, name, {
	        value: val,
	        writable: true,
	        configurable: config !== false
	      });
	    };
	  } catch (err) {
	    builtInProp = function builtInProp(obj, name, val) {
	      obj[name] = val;
	      return obj;
	    };
	  }

	  // Note: using a queue instead of array for efficiency
	  scheduling_queue = function Queue() {
	    var first, last, item;

	    function Item(fn, self) {
	      this.fn = fn;
	      this.self = self;
	      this.next = void 0;
	    }

	    return {
	      add: function add(fn, self) {
	        item = new Item(fn, self);
	        if (last) {
	          last.next = item;
	        } else {
	          first = item;
	        }
	        last = item;
	        item = void 0;
	      },
	      drain: function drain() {
	        var f = first;
	        first = last = cycle = void 0;

	        while (f) {
	          f.fn.call(f.self);
	          f = f.next;
	        }
	      }
	    };
	  }();

	  function schedule(fn, self) {
	    scheduling_queue.add(fn, self);
	    if (!cycle) {
	      cycle = timer(scheduling_queue.drain);
	    }
	  }

	  // promise duck typing
	  function isThenable(o) {
	    var _then,
	        o_type = typeof o === "undefined" ? "undefined" : _typeof(o);

	    if (o != null && (o_type == "object" || o_type == "function")) {
	      _then = o.then;
	    }
	    return typeof _then == "function" ? _then : false;
	  }

	  function notify() {
	    for (var i = 0; i < this.chain.length; i++) {
	      notifyIsolated(this, this.state === 1 ? this.chain[i].success : this.chain[i].failure, this.chain[i]);
	    }
	    this.chain.length = 0;
	  }

	  // NOTE: This is a separate function to isolate
	  // the `try..catch` so that other code can be
	  // optimized better
	  function notifyIsolated(self, cb, chain) {
	    var ret, _then;
	    try {
	      if (cb === false) {
	        chain.reject(self.msg);
	      } else {
	        if (cb === true) {
	          ret = self.msg;
	        } else {
	          ret = cb.call(void 0, self.msg);
	        }

	        if (ret === chain.promise) {
	          chain.reject(TypeError("Promise-chain cycle"));
	        } else if (_then = isThenable(ret)) {
	          _then.call(ret, chain.resolve, chain.reject);
	        } else {
	          chain.resolve(ret);
	        }
	      }
	    } catch (err) {
	      chain.reject(err);
	    }
	  }

	  function resolve(msg) {
	    var _then,
	        self = this;

	    // already triggered?
	    if (self.triggered) {
	      return;
	    }

	    self.triggered = true;

	    // unwrap
	    if (self.def) {
	      self = self.def;
	    }

	    try {
	      if (_then = isThenable(msg)) {
	        schedule(function () {
	          var def_wrapper = new MakeDefWrapper(self);
	          try {
	            _then.call(msg, function $resolve$() {
	              resolve.apply(def_wrapper, arguments);
	            }, function $reject$() {
	              reject.apply(def_wrapper, arguments);
	            });
	          } catch (err) {
	            reject.call(def_wrapper, err);
	          }
	        });
	      } else {
	        self.msg = msg;
	        self.state = 1;
	        if (self.chain.length > 0) {
	          schedule(notify, self);
	        }
	      }
	    } catch (err) {
	      reject.call(new MakeDefWrapper(self), err);
	    }
	  }

	  function reject(msg) {
	    var self = this;

	    // already triggered?
	    if (self.triggered) {
	      return;
	    }

	    self.triggered = true;

	    // unwrap
	    if (self.def) {
	      self = self.def;
	    }

	    self.msg = msg;
	    self.state = 2;
	    if (self.chain.length > 0) {
	      schedule(notify, self);
	    }
	  }

	  function iteratePromises(Constructor, arr, resolver, rejecter) {
	    for (var idx = 0; idx < arr.length; idx++) {
	      (function IIFE(idx) {
	        Constructor.resolve(arr[idx]).then(function $resolver$(msg) {
	          resolver(idx, msg);
	        }, rejecter);
	      })(idx);
	    }
	  }

	  function MakeDefWrapper(self) {
	    this.def = self;
	    this.triggered = false;
	  }

	  function MakeDef(self) {
	    this.promise = self;
	    this.state = 0;
	    this.triggered = false;
	    this.chain = [];
	    this.msg = void 0;
	  }

	  function Promise(executor) {
	    if (typeof executor != "function") {
	      throw TypeError("Not a function");
	    }

	    if (this.__NPO__ !== 0) {
	      throw TypeError("Not a promise");
	    }

	    // instance shadowing the inherited "brand"
	    // to signal an already "initialized" promise
	    this.__NPO__ = 1;

	    var def = new MakeDef(this);

	    this["then"] = function then(success, failure) {
	      var o = {
	        success: typeof success == "function" ? success : true,
	        failure: typeof failure == "function" ? failure : false
	      };
	      // Note: `then(..)` itself can be borrowed to be used against
	      // a different promise constructor for making the chained promise,
	      // by substituting a different `this` binding.
	      o.promise = new this.constructor(function extractChain(resolve, reject) {
	        if (typeof resolve != "function" || typeof reject != "function") {
	          throw TypeError("Not a function");
	        }

	        o.resolve = resolve;
	        o.reject = reject;
	      });
	      def.chain.push(o);

	      if (def.state !== 0) {
	        schedule(notify, def);
	      }

	      return o.promise;
	    };
	    this["catch"] = function $catch$(failure) {
	      return this.then(void 0, failure);
	    };

	    try {
	      executor.call(void 0, function publicResolve(msg) {
	        resolve.call(def, msg);
	      }, function publicReject(msg) {
	        reject.call(def, msg);
	      });
	    } catch (err) {
	      reject.call(def, err);
	    }
	  }

	  var PromisePrototype = builtInProp({}, "constructor", Promise,
	  /*configurable=*/false);

	  // Note: Android 4 cannot use `Object.defineProperty(..)` here
	  Promise.prototype = PromisePrototype;

	  // built-in "brand" to signal an "uninitialized" promise
	  builtInProp(PromisePrototype, "__NPO__", 0,
	  /*configurable=*/false);

	  builtInProp(Promise, "resolve", function Promise$resolve(msg) {
	    var Constructor = this;

	    // spec mandated checks
	    // note: best "isPromise" check that's practical for now
	    if (msg && (typeof msg === "undefined" ? "undefined" : _typeof(msg)) == "object" && msg.__NPO__ === 1) {
	      return msg;
	    }

	    return new Constructor(function executor(resolve, reject) {
	      if (typeof resolve != "function" || typeof reject != "function") {
	        throw TypeError("Not a function");
	      }

	      resolve(msg);
	    });
	  });

	  builtInProp(Promise, "reject", function Promise$reject(msg) {
	    return new this(function executor(resolve, reject) {
	      if (typeof resolve != "function" || typeof reject != "function") {
	        throw TypeError("Not a function");
	      }

	      reject(msg);
	    });
	  });

	  builtInProp(Promise, "all", function Promise$all(arr) {
	    var Constructor = this;

	    // spec mandated checks
	    if (ToString.call(arr) != "[object Array]") {
	      return Constructor.reject(TypeError("Not an array"));
	    }
	    if (arr.length === 0) {
	      return Constructor.resolve([]);
	    }

	    return new Constructor(function executor(resolve, reject) {
	      if (typeof resolve != "function" || typeof reject != "function") {
	        throw TypeError("Not a function");
	      }

	      var len = arr.length,
	          msgs = Array(len),
	          count = 0;

	      iteratePromises(Constructor, arr, function resolver(idx, msg) {
	        msgs[idx] = msg;
	        if (++count === len) {
	          resolve(msgs);
	        }
	      }, reject);
	    });
	  });

	  builtInProp(Promise, "race", function Promise$race(arr) {
	    var Constructor = this;

	    // spec mandated checks
	    if (ToString.call(arr) != "[object Array]") {
	      return Constructor.reject(TypeError("Not an array"));
	    }

	    return new Constructor(function executor(resolve, reject) {
	      if (typeof resolve != "function" || typeof reject != "function") {
	        throw TypeError("Not a function");
	      }

	      iteratePromises(Constructor, arr, function resolver(idx, msg) {
	        resolve(msg);
	      }, reject);
	    });
	  });

	  return Promise;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * This file is part of Rembrandt.js
	 * Copyright (c) 2016 PhotoEditorSDK.com
	 * Licensed under MIT license (https://opensource.org/licenses/MIT)
	 */

	exports.default = {
	  THRESHOLD_PERCENT: 0,
	  THRESHOLD_PIXELS: 1
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This file is part of Rembrandt.js
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2016 PhotoEditorSDK.com
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under MIT license (https://opensource.org/licenses/MIT)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _utils = __webpack_require__(2);

	var _utils2 = _interopRequireDefault(_utils);

	var _color = __webpack_require__(6);

	var _color2 = _interopRequireDefault(_color);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RembrandtImage = function () {
	  function RembrandtImage(width, height) {
	    var image = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	    _classCallCheck(this, RembrandtImage);

	    this.width = width;
	    this.height = height;

	    this._canvas = _utils2.default.createCanvas(width, height);

	    this._context = this._canvas.getContext('2d');

	    this._image = image;
	    if (image) {
	      this._drawImage(this._image);
	    } else {
	      this._imageData = this._context.createImageData(width, height);
	    }
	  }

	  // -------------------------------------------------------------------------- PUBLIC API

	  /**
	   * Sets the given pixel to the given color
	   * @param {Number} x
	   * @param {Number} y
	   * @param {Rembrandt.Color} color
	   */


	  _createClass(RembrandtImage, [{
	    key: 'setColorAt',
	    value: function setColorAt(x, y, color) {
	      var index = (y * this.width + x) * 4;
	      this._imageData.data[index] = color.r * 255 | 0;
	      this._imageData.data[index + 1] = color.g * 255 | 0;
	      this._imageData.data[index + 2] = color.b * 255 | 0;
	      this._imageData.data[index + 3] = color.a * 255 | 0;
	    }

	    /**
	     * Returns the color at the given pixel position
	     * @param  {Number} x
	     * @param  {Number} y
	     * @return {Rembrandt.Colors}
	     */

	  }, {
	    key: 'getColorAt',
	    value: function getColorAt(x, y) {
	      var index = (this.width * y + x) * 4;
	      var r = this._imageData.data[index] / 255;
	      var g = this._imageData.data[index + 1] / 255;
	      var b = this._imageData.data[index + 2] / 255;
	      var a = this._imageData.data[index + 3] / 255;
	      return new _color2.default(r, g, b, a);
	    }

	    /**
	     * Returns this image's image data
	     * @return {Canvas.ImageData}
	     */

	  }, {
	    key: 'getImageData',
	    value: function getImageData() {
	      return this._imageData;
	    }

	    /**
	     * Sets the given image data
	     * @param {Canvas.ImageData} imageData
	     */

	  }, {
	    key: 'setImageData',
	    value: function setImageData(imageData) {
	      this._imageData.data.set(imageData.data);
	    }

	    /**
	     * Clones this image
	     * @return {Rembrandt.Image}
	     */

	  }, {
	    key: 'clone',
	    value: function clone() {
	      var image = new RembrandtImage(this.width, this.height);
	      image.setImageData(this._imageData);
	      return image;
	    }

	    /**
	     * Persists the image data onto the canvas
	     */

	  }, {
	    key: 'persist',
	    value: function persist() {
	      this._context.putImageData(this._imageData, 0, 0);
	    }

	    /**
	     * Returns this image as a buffer
	     * @return {Buffer}
	     */

	  }, {
	    key: 'toBuffer',
	    value: function toBuffer() {
	      this.persist();
	      return this._canvas.toBuffer();
	    }

	    // -------------------------------------------------------------------------- PRIVATE API

	    /**
	     * Draws the given Canvas.Image into this image
	     * @param  {Canvas.Image} image
	     * @private
	     */

	  }, {
	    key: '_drawImage',
	    value: function _drawImage(image) {
	      this._context.drawImage(image, 0, 0);
	      this._imageData = this._context.getImageData(0, 0, this.width, this.height);
	    }

	    // -------------------------------------------------------------------------- STATIC PUBLIC API

	    /**
	     * Creates an image from the given Buffer
	     * @param  {Buffer} buf
	     * @return {Rembrandt.Image}
	     */

	  }, {
	    key: 'canvas',


	    // -------------------------------------------------------------------------- GETTERS

	    /** @return {Canvas} */
	    get: function get() {
	      return this._canvas;
	    }
	    /** @return {Canvas.ImageData} */

	  }, {
	    key: 'imageData',
	    get: function get() {
	      return this._imageData;
	    }
	  }], [{
	    key: 'fromBuffer',
	    value: function fromBuffer(buf) {
	      var image = _utils2.default.createImage();
	      image.src = buf;

	      return new RembrandtImage(image.width, image.height, image);
	    }

	    /**
	     * Creates a RembrandtImage from the given image
	     * @param  {Image} image
	     * @return {Rembrandt.Image}
	     */

	  }, {
	    key: 'fromImage',
	    value: function fromImage(image) {
	      return new RembrandtImage(image.width, image.height, image);
	    }
	  }]);

	  return RembrandtImage;
	}();

	exports.default = RembrandtImage;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * This file is part of Rembrandt.js
	 * Copyright (c) 2016 PhotoEditorSDK.com
	 * Licensed under MIT license (https://opensource.org/licenses/MIT)
	 */

	/**
	 * Represents a color
	 * @class
	 * @memberof Rembrandt
	 */
	var Color = function () {
	  /**
	   * Creates a color
	   * @param  {Number} r
	   * @param  {Number} g
	   * @param  {Number} b
	   * @param  {Number} [a = 1]
	   */
	  function Color(r, g, b) {
	    var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1.0;

	    _classCallCheck(this, Color);

	    this.r = r;
	    this.g = g;
	    this.b = b;
	    this.a = a;
	  }

	  /**
	   * Returns a clone of the current color
	   * @return {Rembrandt.Color}
	   */


	  _createClass(Color, [{
	    key: "clone",
	    value: function clone() {
	      return new Color(this.r, this.g, this.b, this.a);
	    }

	    /**
	     * Checks if this color equals the given one
	     * @param  {Rembrandt.Color} color
	     * @return {Boolean}
	     */

	  }, {
	    key: "equals",
	    value: function equals(color) {
	      return this.r === color.r && this.g === color.g && this.b === color.b && this.a === color.a;
	    }

	    /**
	     * Returns the string representation of this color
	     * @returns {String}
	     */

	  }, {
	    key: "toString",
	    value: function toString() {
	      return "Color(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";
	    }

	    /**
	     * @type {Rembrandt.Color}
	     */

	  }], [{
	    key: "TRANSPARENT",
	    get: function get() {
	      return new Color(0, 0, 0, 0);
	    }

	    /**
	     * @type {Rembrandt.Color}
	     */

	  }, {
	    key: "WHITE",
	    get: function get() {
	      return new Color(1, 1, 1, 1);
	    }

	    /**
	     * @type {Rembrandt.Color}
	     */

	  }, {
	    key: "BLACK",
	    get: function get() {
	      return new Color(0, 0, 0, 1);
	    }

	    /**
	     * @type {Rembrandt.Color}
	     */

	  }, {
	    key: "RED",
	    get: function get() {
	      return new Color(1, 0, 0, 1);
	    }
	  }]);

	  return Color;
	}();

	exports.default = Color;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This file is part of Rembrandt.js
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2016 PhotoEditorSDK.com
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under MIT license (https://opensource.org/licenses/MIT)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _utils = __webpack_require__(2);

	var _utils2 = _interopRequireDefault(_utils);

	var _promise = __webpack_require__(3);

	var _promise2 = _interopRequireDefault(_promise);

	var _constants = __webpack_require__(4);

	var _constants2 = _interopRequireDefault(_constants);

	var _image = __webpack_require__(5);

	var _image2 = _interopRequireDefault(_image);

	var _color = __webpack_require__(6);

	var _color2 = _interopRequireDefault(_color);

	var _compositionImage = __webpack_require__(8);

	var _compositionImage2 = _interopRequireDefault(_compositionImage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ImageComparator = function () {
	  function ImageComparator(imageA, imageB) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    _classCallCheck(this, ImageComparator);

	    this._imageA = imageA;
	    this._imageB = imageB;

	    this._prepareImages();

	    this._options = _utils2.default.defaults(options, {
	      maxDelta: 20,
	      thresholdType: _constants2.default.THRESHOLD_PERCENT,
	      maxThreshold: 0.01,
	      renderComposition: false,
	      compositionMaskColor: _color2.default.RED,
	      maxOffset: 0
	    });

	    if (this._options.renderComposition) {
	      this._compositionImage = new _compositionImage2.default(this._imageA, this._imageB);
	    }
	  }

	  // -------------------------------------------------------------------------- PUBLIC API

	  /**
	   * Compares the two images
	   * @return {Promise}
	   */


	  _createClass(ImageComparator, [{
	    key: 'compare',
	    value: function compare() {
	      var _this = this;

	      return new _promise2.default(function (resolve, reject) {
	        var width = Math.min(_this._imageA.width, _this._imageB.width);
	        var height = Math.min(_this._imageA.height, _this._imageB.height);

	        var differences = 0;
	        var x = void 0,
	            y = void 0;
	        for (x = 0; x < width; x++) {
	          for (y = 0; y < height; y++) {
	            var passes = _this._comparePosition(x, y);
	            if (!passes) {
	              if (_this._options.renderComposition) {
	                _this._compositionImage.setColorAt(x, y, _this._options.compositionMaskColor);
	              }
	              differences++;
	            }
	          }
	        }

	        // Calculate threshold for differences
	        var threshold = differences;

	        // Calculate percentage difference
	        var totalPixels = width * height;
	        var percentageDifference = differences / totalPixels;
	        if (_this._options.thresholdType === _constants2.default.THRESHOLD_PERCENT) {
	          threshold = percentageDifference;
	        }

	        // Check if threshold is exceeded
	        var passed = threshold <= _this._options.maxThreshold;

	        // Render composition if needed
	        if (_this._options.renderComposition) {
	          _this._compositionImage.render().then(function (image) {
	            resolve({ differences: differences, percentageDifference: percentageDifference, threshold: threshold, passed: passed, compositionImage: image });
	          });
	        } else {
	          resolve({ differences: differences, percentageDifference: percentageDifference, threshold: threshold, passed: passed });
	        }
	      });
	    }

	    // -------------------------------------------------------------------------- PRIVATE API

	    /**
	     * Makes sure the two images have the same dimensions
	     * @private
	     */

	  }, {
	    key: '_prepareImages',
	    value: function _prepareImages() {
	      var maxWidth = Math.max(this._imageA.width, this._imageB.width);
	      var maxHeight = Math.max(this._imageB.height, this._imageB.height);

	      this._imageA = this._ensureImageDimensions(this._imageA, maxWidth, maxHeight);
	      this._imageB = this._ensureImageDimensions(this._imageB, maxWidth, maxHeight);
	    }

	    /**
	     * Makes sure the given image has the given dimensions. If it does,
	     * it returns the same image. If not, it returns a new image with
	     * the correct dimensions
	     * @param  {Image} image
	     * @param  {Number} width
	     * @param  {Number} height
	     * @return {Image}
	     * @private
	     */

	  }, {
	    key: '_ensureImageDimensions',
	    value: function _ensureImageDimensions(image, width, height) {
	      if (image.width === width && image.height === image.height) {
	        return image;
	      }

	      image.persist();

	      var newImage = new _image2.default(width, height, image.canvas);
	      return newImage;
	    }

	    /**
	     * Calculates the distance between the given colors
	     * @param  {Rembrandt.Color} colorA
	     * @param  {Rembrandt.Color} colorB
	     * @return {Number}
	     * @private
	     */

	  }, {
	    key: '_calculateColorDelta',
	    value: function _calculateColorDelta(colorA, colorB) {
	      var total = 0;
	      total += Math.pow(colorA.r - colorB.r, 2);
	      total += Math.pow(colorA.g - colorB.g, 2);
	      total += Math.pow(colorA.b - colorB.b, 2);
	      total += Math.pow(colorA.a - colorB.a, 2);
	      return Math.sqrt(total * 255);
	    }

	    /**
	     * Compares the given pixel position
	     * @param  {Number} x
	     * @param  {Number} y
	     * @return {Boolean}
	     * @private
	     */

	  }, {
	    key: '_comparePosition',
	    value: function _comparePosition(x, y) {
	      var _options = this._options;
	      var maxDelta = _options.maxDelta;
	      var maxOffset = _options.maxOffset;

	      var colorA = this._imageA.getColorAt(x, y);
	      var colorB = this._imageB.getColorAt(x, y);

	      // Default delta check
	      var delta = this._calculateColorDelta(colorA, colorB);
	      if (delta < maxDelta) return true;

	      // Check surrounding pixels
	      if (maxOffset === 0) return false;

	      var _imageA = this._imageA;
	      var width = _imageA.width;
	      var height = _imageA.height;

	      var lowestX = Math.max(0, x - maxOffset);
	      var highestX = Math.min(width - 1, x + maxOffset);
	      var lowestY = Math.max(0, y - maxOffset);
	      var highestY = Math.min(height - 1, y + maxOffset);

	      var currentX = void 0,
	          currentY = void 0;
	      for (currentX = lowestX; currentX <= highestX; currentX++) {
	        for (currentY = lowestY; currentY <= highestY; currentY++) {
	          if (currentX === x || currentY === y) continue;

	          var newColorA = this._imageA.getColorAt(currentX, currentY);
	          var newDeltaA = this._calculateColorDelta(colorA, newColorA);

	          var newColorB = this._imageB.getColorAt(currentX, currentY);
	          var newDeltaB = this._calculateColorDelta(colorA, newColorB);

	          if (Math.abs(newDeltaB - newDeltaA) < maxDelta && newDeltaA > maxDelta) {
	            return true;
	          }
	        }
	      }

	      return false;
	    }
	  }]);

	  return ImageComparator;
	}();

	exports.default = ImageComparator;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _promise = __webpack_require__(3);

	var _promise2 = _interopRequireDefault(_promise);

	var _utils = __webpack_require__(2);

	var _utils2 = _interopRequireDefault(_utils);

	var _image = __webpack_require__(5);

	var _image2 = _interopRequireDefault(_image);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This file is part of Rembrandt.js
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016 PhotoEditorSDK.com
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under MIT license (https://opensource.org/licenses/MIT)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var CompositionImage = function (_Image) {
	  _inherits(CompositionImage, _Image);

	  function CompositionImage(imageA, imageB) {
	    _classCallCheck(this, CompositionImage);

	    imageA.persist();
	    imageB.persist();

	    var _this = _possibleConstructorReturn(this, (CompositionImage.__proto__ || Object.getPrototypeOf(CompositionImage)).call(this, imageA.width, imageA.height, imageA.canvas));

	    _this._imageA = imageA;
	    _this._imageB = imageB;
	    return _this;
	  }

	  /**
	   * Renders the two input images and the output image onto the canvas, returns a buffer
	   * @return {Promise}
	   */


	  _createClass(CompositionImage, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return new _promise2.default(function (resolve, reject) {
	        // Prepare canvas
	        _this2._canvas.width = _this2._imageA.width * 3;

	        // Draw input images
	        _this2._context.drawImage(_this2._imageA.canvas, 0, 0);
	        _this2._context.drawImage(_this2._imageB.canvas, _this2._imageA.width * 2, 0);

	        // Draw composition image
	        _this2._context.putImageData(_this2._imageData, _this2._imageA.width, 0);

	        if (true) {
	          (function () {
	            var image = _utils2.default.createImage();
	            image.addEventListener('load', function () {
	              resolve(image);
	            });
	            image.src = _this2._canvas.toDataURL('image/png');
	          })();
	        }
	      });
	    }
	  }]);

	  return CompositionImage;
	}(_image2.default);

	exports.default = CompositionImage;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
		"name": "rembrandt",
		"version": "0.0.9",
		"description": "Client- and server-side image comparison library",
		"main": "build/node.js",
		"repository": {
			"url": "git://github.com/imgly/rembrandt.git",
			"type": "git"
		},
		"scripts": {
			"test": "node_modules/.bin/mocha --require test/support test/*.test.js",
			"build": "node_modules/.bin/webpack"
		},
		"author": "PhotoEditorSDK.com <contact@photoeditorsdk.com>",
		"license": "MIT",
		"dependencies": {
			"canvas": "^1.6.0"
		},
		"devDependencies": {
			"babel-core": "^6.17.0",
			"babel-loader": "^6.2.5",
			"babel-preset-es2015": "^6.16.0",
			"babel-register": "^6.16.3",
			"chai": "^3.5.0",
			"chai-as-promised": "^6.0.0",
			"json-loader": "^0.5.4",
			"mocha": "^3.1.2",
			"preprocess-loader": "^0.2.0",
			"should": "^11.1.1",
			"standard-loader": "^5.0.0",
			"webpack": "^1.13.2"
		}
	};

/***/ }
/******/ ])
});
;