'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function equalv3_(a, b) {
  return a[0] == b[0] && a[1] == b[1] && a[2] == b[2];
}

function equalv3eps_(a, b, eps) {
  return Math.abs(a[0] - b[0]) <= eps &&
  Math.abs(a[1] - b[1]) <= eps &&
  Math.abs(a[2] - b[2]) <= eps;
}

function equalq_(a, b) {
  return a[0] == b[0] && a[1] == b[1] && a[2] == b[2] && a[3] == b[3];
}

function equalqeps_(a, b, eps) {
  return Math.abs(a[0] - b[0]) <= eps &&
  Math.abs(a[1] - b[1]) <= eps &&
  Math.abs(a[2] - b[2]) <= eps &&
  Math.abs(a[3] - b[3]) <= eps;
}

function addv2(r, a, b) {
  r[0] = a[0] + b[0];
  r[1] = a[1] + b[1];
}

function addv2_(a, b) {
  return [a[0] + b[0], a[1] + b[1]];
}

function addv2scalar(r, a, s) {
  r[0] = a[0] + s;
  r[1] = a[1] + s;
}

function addv2scalar_(a, s) {
  return [a[0] + s, a[1] + s];
}

function addv3(r, a, b) {
  r[0] = a[0] + b[0];
  r[1] = a[1] + b[1];
  r[2] = a[2] + b[2];
}

function addv3_(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function addv3scalar(r, a, s) {
  r[0] = a[0] + s;
  r[1] = a[1] + s;
  r[2] = a[2] + s;
}

function addv3scalar_(a, s) {
  return [a[0] + s, a[1] + s, a[2] + s];
}

function addq(r, a, b) {
  r[0] = a[0] + b[0];
  r[1] = a[1] + b[1];
  r[2] = a[2] + b[2];
  r[3] = a[3] + b[3];
}

function addq_(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]];
}

function subv2(r, a, b) {
  r[0] = a[0] - b[0];
  r[1] = a[1] - b[1];
}

function subv2_(a, b) {
  return [a[0] - b[0], a[1] - b[1]];
}

function subv2scalar(r, a, s) {
  r[0] = a[0] - s;
  r[1] = a[1] - s;
}

function subv2scalar_(a, s) {
  return [a[0] - s, a[1] - s];
}

function subscalarv2(r, s, a) {
  r[0] = s - a[0];
  r[1] = s - a[1];
}

function subscalarv2_(s, a) {
  return [s - a[0], s - a[1]];
}

function subv3(r, a, b) {
  r[0] = a[0] - b[0];
  r[1] = a[1] - b[1];
  r[2] = a[2] - b[2];
}

function subv3_(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function subv3scalar(r, a, s) {
  r[0] = a[0] - s;
  r[1] = a[1] - s;
  r[2] = a[2] - s;
}

function subv3scalar_(a, s) {
  return [a[0] - s, a[1] - s, a[2] - s];
}

function subscalarv3(r, s, a) {
  r[0] = s - a[0];
  r[1] = s - a[1];
  r[2] = s - a[2];
}

function subscalarv3_(s, a) {
  return [s - a[0], s - a[1], s - a[2]];
}

function mulv2(r, a, b) {
  r[0] = a[0] * b[0];
  r[1] = a[1] * b[1];
}

function mulv2_(a, b) {
  return [a[0] * b[0], a[1] * b[1]];
}

function mulv3(r, a, b) {
  r[0] = a[0] * b[0];
  r[1] = a[1] * b[1];
  r[2] = a[2] * b[2];
}

function mulv3_(a, b) {
  return [a[0] * b[0], a[1] * b[1], a[2] * b[2]];
}

function divv2(r, a, b) {
  r[0] = a[0] / b[0];
  r[1] = a[1] / b[1];
}

function divv2_(a, b) {
  return [a[0] / b[0], a[1] / b[1]];
}

function divv3(r, a, b) {
  r[0] = a[0] / b[0];
  r[1] = a[1] / b[1];
  r[2] = a[2] / b[2];
}

function divv3_(a, b) {
  return [a[0] / b[0], a[1] / b[1], a[2] / b[2]];
}

function dotv3_(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function dotq_(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

function mulv2scalar(r, a, s) {
  r[0] = a[0] * s;
  r[1] = a[1] * s;
}

function mulv2scalar_(a, s) {
  return [a[0] * s, a[1] * s];
}

function divv2scalar(r, a, s) {
  r[0] = a[0] / s;
  r[1] = a[1] / s;
}

function divv2scalar_(a, s) {
  return [a[0] / s, a[1] / s];
}

function mulv3scalar(r, a, s) {
  r[0] = a[0] * s;
  r[1] = a[1] * s;
  r[2] = a[2] * s;
}

function mulv3scalar_(a, s) {
  return [a[0] * s, a[1] * s, a[2] * s];
}

function divv3scalar(r, a, s) {
  r[0] = a[0] / s;
  r[1] = a[1] / s;
  r[2] = a[2] / s;
}

function divv3scalar_(a, s) {
  return [a[0] / s, a[1] / s, a[2] / s];
}

function dotv2_(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

function crossv3(r, a, b) {
  var ax = a[0],ay = a[1],az = a[2];
  var bx = b[0],by = b[1],bz = b[2];

  r[0] = ay * bz - az * by;
  r[1] = az * bx - ax * bz;
  r[2] = ax * by - ay * bx;
}

function crossv3_(a, b) {
  var ax = a[0],ay = a[1],az = a[2];
  var bx = b[0],by = b[1],bz = b[2];

  return [ay * bz - az * by,
  az * bx - ax * bz,
  ax * by - ay * bx];
}

function lengthv2_(a) {
  return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
}

function lengthv2sq_(a) {
  return a[0] * a[0] + a[1] * a[1];
}

function normalizev2(r, a) {
  mulv2scalar(r, a, 1.0 / lengthv2_(a));
}

function normalizev2_(a) {
  return mulv2scalar_(a, 1.0 / lengthv2_(a));
}

function lengthv3_(a) {
  return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
}

function lengthv3sq_(a) {
  return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
}

function normalizev3(r, a) {
  mulv3scalar(r, a, 1.0 / lengthv3_(a));
}

function normalizev3_(a) {
  return mulv3scalar_(a, 1.0 / lengthv3_(a));
}

function copyv2(r, a) {
  r[0] = a[0];
  r[1] = a[1];
}

function copyv3(r, a) {
  r[0] = a[0];
  r[1] = a[1];
  r[2] = a[2];
}

function copyq(r, a) {
  r[0] = a[0];
  r[1] = a[1];
  r[2] = a[2];
  r[3] = a[3];
}

function setv2(r, x, y) {
  r[0] = x;
  r[1] = y;
}

function setv3(r, x, y, z) {
  r[0] = x;
  r[1] = y;
  r[2] = z;
}

function lerp_(a, b, i) {
  return a + (b - a) * i;
}

function lerpv2(r, a, b, i) {
  r[0] = a[0] + (b[0] - a[0]) * i;
  r[1] = a[1] + (b[1] - a[1]) * i;
}

function lerpv2_(a, b, i) {
  return [a[0] + (b[0] - a[0]) * i,
  a[1] + (b[1] - a[1]) * i];
}

function lerpv3(r, a, b, i) {
  r[0] = a[0] + (b[0] - a[0]) * i;
  r[1] = a[1] + (b[1] - a[1]) * i;
  r[2] = a[2] + (b[2] - a[2]) * i;
}

function lerpv3_(a, b, i) {
  return [a[0] + (b[0] - a[0]) * i,
  a[1] + (b[1] - a[1]) * i,
  a[2] + (b[2] - a[2]) * i];
}

function slerpq(r, x, y, a) {
  var cosTheta = dotq_(x, y);

  var z = [];

  if (cosTheta < 0) {
    negq(z, y);
    cosTheta = -cosTheta;
  } else
  {
    copyq(z, y);
  }

  if (1.0 - cosTheta < Number.EPSILON) {
    r[0] = lerp_(x[0], y[0], a);
    r[1] = lerp_(x[1], y[1], a);
    r[2] = lerp_(x[2], y[2], a);
    r[3] = lerp_(x[3], y[3], a);
  } else
  {
    var angle = acos_(cosTheta);

    mulqscalar(r, addq_(mulqscalar_(x, sin_((1.0 - a) * angle)), mulqscalar_(z, sin_(a * angle))),
    1.0 / sin_(angle));
  }
}

function slerpq_(x, y, a) {
  var r = [];
  slerpq(r, x, y, a);
  return r;
}

//trigonometry

function acos_(a) {
  return Math.acos(a);
}

function sin_(a) {
  return Math.sin(a);
}

function cos_(a) {
  return Math.cos(a);
}

function negv2(r, a) {
  setv2(r, -a[0], -a[1]);
}

function negv2_(a) {
  return [-a[0], -a[1]];
}

function negv3(r, a) {
  setv3(r, -a[0], -a[1], -a[2]);
}

function negv3_(a) {
  return [-a[0], -a[1], -a[2]];
}

function negq(r, a) {
  r[0] = -a[0];
  r[1] = -a[1];
  r[2] = -a[2];
  r[3] = -a[3];
}

function negq_(a) {
  return [-a[0], -a[1], -a[2], -a[3]];
}

function deg2rad_(degrees) {
  return degrees / 180.0 * Math.PI;
}

function rad2deg_(radians) {
  return radians / Math.PI * 180.0;
}

function sign_(value) {
  return value < 0 ? -1 : 1;
}

function quat2axes(x, y, z, q) {
  var x2 = 2.0 * q[0] * q[0];
  var y2 = 2.0 * q[1] * q[1];
  var z2 = 2.0 * q[2] * q[2];
  var xy = 2.0 * q[0] * q[1];
  var xz = 2.0 * q[0] * q[2];
  var yz = 2.0 * q[1] * q[2];
  var wz = 2.0 * q[3] * q[2];
  var wy = 2.0 * q[3] * q[1];
  var wx = 2.0 * q[3] * q[0];

  x[0] = 1.0 - y2 - z2;
  x[1] = xy + wz;
  x[2] = xz - wy;

  y[0] = xy - wz;
  y[1] = 1.0 - x2 - z2;
  y[2] = yz + wx;

  z[0] = xz + wy;
  z[1] = yz - wx;
  z[2] = 1.0 - x2 - y2;
}

function axes2quat(q, x, y, z) {
  var tr = x[0] + y[1] + z[2];

  if (tr > 0) {
    var S = Math.sqrt(tr + 1.0) * 2;
    q[3] = 0.25 * S;
    q[0] = (y[2] - z[1]) / S;
    q[1] = (z[0] - x[2]) / S;
    q[2] = (x[1] - y[0]) / S;
  } else if (x[0] > y[1] & x[0] > z[2]) {
    var S = Math.sqrt(1.0 + x[0] - y[1] - z[2]) * 2;
    q[3] = (y[2] - z[1]) / S;
    q[0] = 0.25 * S;
    q[1] = (x[1] + y[0]) / S;
    q[2] = (z[0] + x[2]) / S;
  } else if (y[1] > z[2]) {
    var S = Math.sqrt(1.0 + y[1] - x[0] - z[2]) * 2;
    q[3] = (z[0] - x[2]) / S;
    q[0] = (x[1] + y[0]) / S;
    q[1] = 0.25 * S;
    q[2] = (y[2] + z[1]) / S;
  } else {
    var S = Math.sqrt(1.0 + z[2] - x[0] - y[1]) * 2;
    q[3] = (x[1] - y[0]) / S;
    q[0] = (z[0] + x[2]) / S;
    q[1] = (y[2] + z[1]) / S;
    q[2] = 0.25 * S;
  }
}

function axisangle2quat(q, x, a) {
  var ha = deg2rad_(a) * 0.5,s = Math.sin(ha);
  q[0] = x[0] * s;
  q[1] = x[1] * s;
  q[2] = x[2] * s;
  q[3] = Math.cos(ha);
}

function axisangle2quat_(x, a) {
  var ha = deg2rad_(a) * 0.5,s = Math.sin(ha);
  return [x[0] * s, x[1] * s, x[2] * s, cos_(ha)];
}

function applyv3quat(r, v, q) {
  var x = v[0];
  var y = v[1];
  var z = v[2];

  var qx = q[0];
  var qy = q[1];
  var qz = q[2];
  var qw = q[3];

  var ix = qw * x + qy * z - qz * y;
  var iy = qw * y + qz * x - qx * z;
  var iz = qw * z + qx * y - qy * x;
  var iw = -qx * x - qy * y - qz * z;

  r[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  r[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  r[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
}

function mulq(r, a, b) {
  var qax = a[0],qay = a[1],qaz = a[2],qaw = a[3];
  var qbx = b[0],qby = b[1],qbz = b[2],qbw = b[3];

  r[0] = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
  r[1] = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
  r[2] = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
  r[3] = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
}

function mulqscalar(r, a, s) {
  r[0] = a[0] * s;
  r[1] = a[1] * s;
  r[2] = a[2] * s;
  r[3] = a[3] * s;
}

function mulqscalar_(a, s) {
  return [a[0] * s, a[1] * s, a[2] * s, a[3] * s];
}

function transform(r, pos, degree, scale, v) {
  var rad = deg2rad_(degree);
  var cos = Math.cos(rad) * scale;
  var sin = Math.sin(rad) * scale;
  r[0] = pos[0] + cos * v[0] - sin * v[1];
  r[1] = pos[1] + sin * v[0] + cos * v[1];
}

function invtransform(r, pos, degree, scale, v) {
  var rad = deg2rad_(degree);
  var cos = Math.cos(rad) / scale;
  var sin = Math.sin(rad) / scale;

  r[0] = cos * v[0] + sin * v[1] - pos[0] * cos - pos[1] * sin;
  r[1] = cos * v[1] - sin * v[0] + pos[0] * sin - pos[1] * cos;
}

var _Math = /*#__PURE__*/Object.freeze({
	__proto__: null,
	equalv3_: equalv3_,
	equalv3eps_: equalv3eps_,
	equalq_: equalq_,
	equalqeps_: equalqeps_,
	addv2: addv2,
	addv2_: addv2_,
	addv2scalar: addv2scalar,
	addv2scalar_: addv2scalar_,
	addv3: addv3,
	addv3_: addv3_,
	addv3scalar: addv3scalar,
	addv3scalar_: addv3scalar_,
	addq: addq,
	addq_: addq_,
	subv2: subv2,
	subv2_: subv2_,
	subv2scalar: subv2scalar,
	subv2scalar_: subv2scalar_,
	subscalarv2: subscalarv2,
	subscalarv2_: subscalarv2_,
	subv3: subv3,
	subv3_: subv3_,
	subv3scalar: subv3scalar,
	subv3scalar_: subv3scalar_,
	subscalarv3: subscalarv3,
	subscalarv3_: subscalarv3_,
	mulv2: mulv2,
	mulv2_: mulv2_,
	mulv3: mulv3,
	mulv3_: mulv3_,
	divv2: divv2,
	divv2_: divv2_,
	divv3: divv3,
	divv3_: divv3_,
	dotv3_: dotv3_,
	dotq_: dotq_,
	mulv2scalar: mulv2scalar,
	mulv2scalar_: mulv2scalar_,
	divv2scalar: divv2scalar,
	divv2scalar_: divv2scalar_,
	mulv3scalar: mulv3scalar,
	mulv3scalar_: mulv3scalar_,
	divv3scalar: divv3scalar,
	divv3scalar_: divv3scalar_,
	dotv2_: dotv2_,
	crossv3: crossv3,
	crossv3_: crossv3_,
	lengthv2_: lengthv2_,
	lengthv2sq_: lengthv2sq_,
	normalizev2: normalizev2,
	normalizev2_: normalizev2_,
	lengthv3_: lengthv3_,
	lengthv3sq_: lengthv3sq_,
	normalizev3: normalizev3,
	normalizev3_: normalizev3_,
	copyv2: copyv2,
	copyv3: copyv3,
	copyq: copyq,
	setv2: setv2,
	setv3: setv3,
	lerp_: lerp_,
	lerpv2: lerpv2,
	lerpv2_: lerpv2_,
	lerpv3: lerpv3,
	lerpv3_: lerpv3_,
	slerpq: slerpq,
	slerpq_: slerpq_,
	acos_: acos_,
	sin_: sin_,
	cos_: cos_,
	negv2: negv2,
	negv2_: negv2_,
	negv3: negv3,
	negv3_: negv3_,
	negq: negq,
	negq_: negq_,
	deg2rad_: deg2rad_,
	rad2deg_: rad2deg_,
	sign_: sign_,
	quat2axes: quat2axes,
	axes2quat: axes2quat,
	axisangle2quat: axisangle2quat,
	axisangle2quat_: axisangle2quat_,
	applyv3quat: applyv3quat,
	mulq: mulq,
	mulqscalar: mulqscalar,
	mulqscalar_: mulqscalar_,
	transform: transform,
	invtransform: invtransform
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

var FrameInterpolator = /*#__PURE__*/function () {
  function FrameInterpolator(emitter) {_classCallCheck(this, FrameInterpolator);
    this.effect = emitter.effect;
    this.emitter = emitter;
    this.position = false;
    this.startEmitterPosition = [];
    this.endEmitterPosition = [];
    this.rotation = false;
    this.startEmitterRotation = [];
    this.endEmitterRotation = [];
  }

  // only for effect
  _createClass(FrameInterpolator, [{ key: "begin", value: function begin(dt, endPosition, endRotation) {
      this.startEffectTime = this.effect.time;
      this.startEmitterTime = this.emitter.time;

      this.endEffectTime = this.startEffectTime + dt;
      this.endEmitterTime = this.startEmitterTime + dt;


      if (endPosition) {
        this.position = true;
        copyv3(this.startEmitterPosition, this.emitter.position);
        copyv3(this.endEmitterPosition, endPosition);
      }

      if (endRotation) {
        this.rotation = true;
        copyq(this.startEmitterRotation, this.emitter.rotation);
        copyq(this.endEmitterRotation, endRotation);
      }
    } }, { key: "set", value: function set(

    interp) {
      this.effect.time = lerp_(this.startEffectTime, this.endEffectTime, interp);
      this.emitter.time = lerp_(this.startEmitterTime, this.endEmitterTime, interp);

      if (this.position)
      lerpv3(this.emitter.position, this.startEmitterPosition, this.endEmitterPosition, interp);

      if (this.rotation)
      slerpq(this.emitter.rotation, this.startEmitterRotation, this.endEmitterRotation, interp);
    }

    // only for effect
  }, { key: "end", value: function end() {
      this.effect.time = this.endEffectTime;
      this.emitter.time = this.endEmitterTime;

      if (this.position)
      copyv3(this.emitter.position, this.endEmitterPosition);

      if (this.rotation)
      copyq(this.emitter.rotation, this.endEmitterRotation);
    } }, { key: "emitterTime", get: function get()

    {
      return this.emitter.time;
    } }, { key: "positionDisplaceLength", get: function get()

    {
      return this.position ? lengthv3_(ctx.subv3_(this.endEmitterPosition,
      this.startEmitterPosition)) : 0;
    } }]);return FrameInterpolator;}();

var Generator = /*#__PURE__*/function () {
  function Generator(emitter) {_classCallCheck(this, Generator);
    this.emitter = emitter;
  }_createClass(Generator, [{ key: "initiate", value: function initiate()

    {
      this.burstPos = 0;
      this.burstCount = 1;
    } }, { key: "burstParticles", value: function burstParticles(

    frameTimeToSimulate) {
      var particlesShot = 0;

      var intBurstCount = Math.max(Math.trunc(this.burstCount), 0);

      for (var partIndex = 0; partIndex < intBurstCount; ++partIndex) {
        if (intBurstCount == 1)
        this.burstPos = 0;else

        this.burstPos = partIndex / (intBurstCount - 1);

        var particle = this.emitter.shootParticle(partIndex == 0, frameTimeToSimulate);

        if (!particle)
        break;

        ++particlesShot;
      }

      return particlesShot;
    } }]);return Generator;}();


exports.Generator = Generator;

var GeneratorPeriodic = /*#__PURE__*/function (_Generator) {_inherits(GeneratorPeriodic, _Generator);

  function GeneratorPeriodic(emitter, model) {var _this;_classCallCheck(this, GeneratorPeriodic);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(GeneratorPeriodic).call(this, emitter));

    _this.model = model;
    _this.emitter = emitter;
    _this.initiate();return _this;
  }_createClass(GeneratorPeriodic, [{ key: "initiate", value: function initiate()

    {
      _get(_getPrototypeOf(GeneratorPeriodic.prototype), "initiate", this).call(this);

      this.startPhase = 1;
      this.fixedTime = null;
      this.fixedShots = null;
      this.burstSize = 1;
      this.rate = 0;
      //this.spentParticle;
      //this.shotsMade

      if (this.model.init) {
        this.model.init(this);
      }

      this.spentParticle = this.startPhase;
      this.shotsMade = 0;
    } }, { key: "update", value: function update(

    dt, frameInterp) {
      if (this.model.update) {
        this.model.update(this, dt);
      }

      if (this.rate < 0.0001)
      return;

      var frameTimeLeft = dt;
      var particlesShot = 0;
      var shotsToMake = this.spentParticle + dt * this.rate;

      while (shotsToMake >= 1.0) {
        var spentTime = (1.0 - this.spentParticle) / this.rate;
        frameTimeLeft -= spentTime;

        if (dt > 0.0001)
        frameInterp.set(1 - frameTimeLeft / dt);else

        frameInterp.set(0);

        if (this.fixedTime != null && frameInterp.emitterTime > this.fixedTime) {
          this.emitter.disactivate();
          break;
        }

        particlesShot += this.burstParticles(frameTimeLeft);

        this.spentParticle = 0.0;
        shotsToMake -= 1.0;

        if (this.fixedShots != null && ++this.shotsMade >= this.fixedShots) {
          this.emitter.disactivate();
          break;
        }
      }

      this.spentParticle = shotsToMake;

      return particlesShot;
    } }]);return GeneratorPeriodic;}(Generator);

var GeneratorDist = /*#__PURE__*/function (_Generator) {_inherits(GeneratorDist, _Generator);
  function GeneratorDist(emitter, model) {var _this;_classCallCheck(this, GeneratorDist);
    _this = _possibleConstructorReturn(this, _getPrototypeOf(GeneratorDist).call(this, emitter));
    _this.model = model;

    _this.initiate();return _this;
  }_createClass(GeneratorDist, [{ key: "initiate", value: function initiate()

    {
      _get(_getPrototypeOf(GeneratorDist.prototype), "initiate", this).call(this);

      this.startPhase = 1;
      this.burstSize = 1;
      this.segment = 0;

      if (this.model.init) {
        this.model.init(this);
      }

      this.spentSegment = this.startPhase;
    } }, { key: "update", value: function update(

    dt, frameInterp) {
      if (this.model.update) {
        this.model.update(this, dt);
      }

      var distFromPrevFrame = frameInterp.positionDisplaceLength;
      var particlesShot = 0;

      if (this.segment < 0.0001)
      return;

      var spentSegmentsFromPrevFrame = distFromPrevFrame / this.segment;
      var shotsToMake = this.spentSegment + spentSegmentsFromPrevFrame;

      var framePosition = spentSegmentsFromPrevFrame < 0.001 ?
      1.0 - this.spentSegment : (1.0 - this.spentSegment) / spentSegmentsFromPrevFrame;

      while (shotsToMake >= 1.0) {
        frameInterp.set(framePosition);

        particlesShot += this.burstParticles(dt * (1.0 - framePosition));

        framePosition += 1.0 / spentSegmentsFromPrevFrame;
        shotsToMake -= 1.0;
      }

      this.spentSegment = shotsToMake;

      return particlesShot;
    } }]);return GeneratorDist;}(Generator);

var TerminatorCondit = /*#__PURE__*/function () {
  function TerminatorCondit(emitter, model) {_classCallCheck(this, TerminatorCondit);
    this.emitter = emitter;
    this.model = model;
  }_createClass(TerminatorCondit, [{ key: "initiate", value: function initiate()

    {
      if (this.model.init) {
        this.model.init(this);
      }
    } }, { key: "update", value: function update(

    dt) {
      if (this.modelupdate) {
        this.model.update(this, dt);
      }
    } }, { key: "checkParticle", value: function checkParticle(

    particle) {
      return this.model.checkParticle(this, particle);
    } }]);return TerminatorCondit;}();

var EmitterParticlesPool = /*#__PURE__*/function () {
  function EmitterParticlesPool(maxParticlesCount, createParticle) {_classCallCheck(this, EmitterParticlesPool);
    this.maxParticlesCount = maxParticlesCount;
    this.createParticle = createParticle;
    this.numParticles = 0;
    this.inactiveParticles = [];
  }_createClass(EmitterParticlesPool, [{ key: "aquireParticle", value: function aquireParticle()

    {
      if (this.numParticles >= this.maxParticlesCount)
      return null;

      ++this.numParticles;

      if (this.inactiveParticles.length > 0)
      return this.inactiveParticles.pop();else

      return this.createParticle();
    } }, { key: "releaseParticle", value: function releaseParticle(

    particle) {
      this.inactiveParticles.push(particle);
      //assert.equal(this.numParticles > 0, true, "Released particle which wasn't aquired.");

      --this.numParticles;
    } }]);return EmitterParticlesPool;}();

var Emitter = /*#__PURE__*/function () {
  function Emitter(effect, particlesPool, model) {_classCallCheck(this, Emitter);
    this.effect = effect;
    this.particlesPool = particlesPool;
    this.model = model;

    this.position = [];
    this.prevPosition = [];
    this.rotation = [];
    this.prevRotation = [];

    this.activeParticles = [];
    this.inactiveParticles = [];

    this.generators = [];
    this.terminators = [];
    //this.attachedEmitterImpls = [];
    this.velocity = [];

    this.generatorsPaused = false;

    this.frameInterp = new FrameInterpolator(this);

    this.model.initEmitter(this);

    /*for (var partIndex = 0; partIndex < this.maxParticles; ++partIndex) {
                                  	var particle = new Particle();
                                  		for (var emitterIndex = 0; emitterIndex < this.attachedEmitterImpls.length; ++emitterIndex) {
                                  		var attachedEmitterImpl = this.attachedEmitterImpls[emitterIndex];
                                  		particle.attachEmitter(attachedEmitterImpl.impl, attachedEmitterImpl.props);
                                  	}
                                  		this.inactiveParticles.push(particle);
                                  }*/


  }_createClass(Emitter, [{ key: "addGeneratorModel", value: function addGeneratorModel(

    GeneratorClass, generatorModel) {
      this.generators.push(new GeneratorClass(this, generatorModel));
    } }, { key: "addTerminatorModel", value: function addTerminatorModel(

    TerminatorClass, terminatorModel) {
      this.terminators.push(new TerminatorClass(this, terminatorModel));
    } }, { key: "initiate", value: function initiate(

    position, rotation, options) {
      this._release();

      copyv3(this.position, position ? position : [0, 0, 0]);
      copyv3(this.prevPosition, this.position);
      copyq(this.rotation, rotation ? rotation : [0, 0, 0, 1]);
      copyq(this.prevRotation, this.rotation);

      this.time = 0.0;
      this.prevPositionTime = 0.0;
      this.active = true;
      this.paused = false;
      this.generatorsPaused = false;
      setv3(this.velocity, 0, 0, 0);

      if (options) {
        Object.assign(this, options);
      }

      this.generators.forEach(function (generator) {
        generator.initiate();
      });

      this.terminators.forEach(function (terminator) {
        terminator.initiate();
      });

      this.update(0);
    } }, { key: "update", value: function update(

    dt, position, rotation) {

      this.prevPositionTime = this.time;

      if (position) {
        copyv3(this.prevPosition, this.position);
        if (dt > 0.0001) {
          subv3(this.velocity, position, this.prevPosition);
          divv3scalar(this.velocity, this.velocity, dt);
        } else
        {
          setv3(this.velocity, 0, 0, 0);
        }
      } else
      {
        setv3(this.velocity, 0, 0, 0);
      }

      if (rotation)
      {
        copyq(this.prevRotation, this.rotation);
      }

      if (this.paused) return;

      var particlesShot;

      if (this.active && !this.generatorsPaused) {
        var frameInterp = this.frameInterp;
        frameInterp.begin(dt, position, rotation);
        this.generators.forEach(function (generator) {
          particlesShot += generator.update(dt, frameInterp);
        });
        frameInterp.end();
      } else
      {
        if (position)
        copyv3(this.position, position);

        if (rotation)
        copyq(this.rotation, rotation);

        particlesShot = 0;
        this.time += dt;
      }

      for (var partIndex = particlesShot; partIndex < this.activeParticles.length;) {
        var particle = this.activeParticles[partIndex];

        if (!particle.waitingForDelete) {
          particle.update(dt);

          var terminate = false;
          for (var termIndex = 0; termIndex < this.terminators.length; ++termIndex) {
            if (this.terminators[termIndex].checkParticle(this.activeParticles[partIndex])) {
              terminate = true;
              break;
            }
          }

          if (terminate) {
            particle.onTerminated();

            if (this._killParticleIfReady(partIndex))
            continue;
          }
        } else
        {
          particle.updateAttachedEmitters(dt);

          if (this._killParticleIfReady(partIndex))
          continue;
        }

        ++partIndex;
      }
    } }, { key: "shootParticle", value: function shootParticle(

    firstInBurst, simulateTime) {
      var particle = this.particlesPool.aquireParticle();

      if (!particle)
      return null;

      this.activeParticles.unshift(particle);

      if (firstInBurst) {
        this.model.initParticle(this, particle);
      } else {
        this.model.burstInitParticle(this, particle);
      }

      this.model.updateParticle(this, particle, simulateTime);

      return particle;
    } }, { key: "disactivate", value: function disactivate()

    {
      this.active = false;
    }

    //draw(context, camera) {
    //	this.construct.draw(context, camera);
    //}

    //fillGeometryBuffers(cameraRight, cameraUp, cameraDir, renderBuffer) {
    //	this.construct.fillGeometryBuffers(cameraRight, cameraUp, cameraDir, renderBuffer);
    //}
  }, { key: "resetPosition", value: function resetPosition(
    position, rotation) {
      this.prevPositionTime = this.time;

      if (position) {
        copyv3(this.prevPosition, this.position);
        copyv3(this.position, position);
      }

      if (rotation) {
        copyq(this.prevRotation, this.rotation);
        copyq(this.rotation, rotation);
      }
    }

    //attachEmitter(emitterImpl, emitterProps) {
    //	this.attachedEmitterImpls.push({ impl: emitterImpl, props: emitterProps });
    //}
  }, { key: "getNumParticles", value: function getNumParticles()
    {
      return this.activeParticles.length;
    } }, { key: "_killParticleIfReady", value: function _killParticleIfReady(

    index) {
      var particle = this.activeParticles[index];
      var ready = true;

      for (var emitterIndex = 0; emitterIndex < particle.attachedEmitters.length; ++emitterIndex) {
        var emitter = particle.attachedEmitter(emitterIndex);

        if (emitter.activated() || emitter.activeParticles.length > 0) {
          ready = false;
          break;
        }
      }

      if (ready) {
        this.activeParticles.splice(index, 1);
        this.particlesPool.releaseParticle(particle);
        return true;
      }

      return false;
    } }, { key: "_release", value: function _release()

    {
      while (this.activeParticles.length > 0) {
        var particle = this.activeParticles.pop();
        for (var i = 0; i < particle.attachedEmitters.length; ++i) {
          particle.attachedEmitter(i)._release();
        }
        this.particlesPool.releaseParticle(particle);
      }
    } }]);return Emitter;}();

var Effect = /*#__PURE__*/function () {
  function Effect(effectModel, position, rotation) {_classCallCheck(this, Effect);
    this.model = effectModel;

    this.position = [];
    this.rotation = [];
    this.emitters = [];
    //this.frameTimeSpent = 0.0;
    //this.time = 0.0;
    //this.frameTime = 0.0; // from IMPL
    //this.presimTime = 0.0; // from IMPL

    this._initiate(position, rotation);

    this.model.initSystemProps(this); //IMPL

    this._zeroUpdate();
  }_createClass(Effect, [{ key: "addEmitter", value: function addEmitter(

    emitter) {
      emitter.initiate(this.position, this.rotation);
      this.emitters.push(emitter);
    } }, { key: "restart", value: function restart(

    position, rotation) {

      this._initiate(position ? position : this.position, rotation ? rotation : this.rotation);

      for (var i = 0; i < this.emitters.length; ++i) {
        this.emitters[i].restart(this.position, this.rotation);
      }

      this._zeroUpdate();
    } }, { key: "update", value: function update(

    dt, position, rotation) {
      var updatedTime = 0.0;
      var framePosition = this.position.slice();
      var frameRotation = this.rotation.slice();

      if (position && equalv3_(position, this.position))
      position = null;

      if (rotation && equalq_(rotation, this.rotation))
      rotation = null;

      while (dt - updatedTime + this.frameTimeSpent >= this.frameTime) {
        var timeBeforeFrame = this.time;
        updatedTime += this.frameTime - this.frameTimeSpent;
        var locationInterp = updatedTime / dt;

        if (position)
        lerpv3(framePosition, this.position, position, locationInterp);

        if (rotation)
        slerpq(frameRotation, this.rotation, rotation, locationInterp);

        for (var i = 0; i < this.emitters.length; ++i) {
          this.emitters[i].update(this.frameTime, framePosition, frameRotation);

          this.time = timeBeforeFrame;
        }

        this.frameTimeSpent = 0.0;
        this.time = timeBeforeFrame + this.frameTime;
      }

      if (position)
      copyv3(this.position, position);

      if (rotation)
      copyq(this.rotation, rotation);

      this.frameTimeSpent += dt - updatedTime;
    } }, { key: "resetPosition", value: function resetPosition(

    position, rotation) {
      if (position)
      copyv3(this.position, position);

      if (rotation)
      copyq(this.rotation, rotation);

      for (var i = 0; i < this.emitters.length; ++i) {
        this.emitters[i].resetPosition(this.position, this.rotation);
      }
    }
    /*
      	setPropertyInAllEmitters(name, value) {
      		var propName = "_".concat(name);
      
      		if (value instanceof Array) {
      			if (value.length == 2) {
      				for (var i = 0; i < this.emitters.length; ++i) {
      					math.copyv2(this.emitters[i][propName], value);
      				}
      			}
      			else {
      				for (var i = 0; i < this.emitters.length; ++i) {
      					math.copyv3(this.emitters[i][propName], value);
      				}
      			}
      		}
      		else {
      			for (var i = 0; i < this.emitters.length; ++i) {
      				this.emitters[i][propName] = value;
      			}
      		}
      	}
      
      	pauseAllEmitters() {
      		for (var i = 0; i < this.emitters.length; ++i) {
      			this.emitters[i].pause();
      		}
      	}
      
      	unpauseAllEmitters() {
      		for (var i = 0; i < this.emitters.length; ++i) {
      			this.emitters[i].unpause();
      		}
      	}
      
      	areAllEmittersPaused() {
      		for (var i = 0; i < this.emitters.length; ++i) {
      			if (!this.emitters[i].paused())
      				return false;
      		}
      		return true;
      	}
      
      	pauseGeneratorsInAllEmitters() {
      		for (var i = 0; i < this.emitters.length; ++i) {
      			this.emitters[i].pauseGenerators();
      		}
      	}
      
      	unpauseGeneratorsInAllEmitters() {
      		for (var i = 0; i < this.emitters.length; ++i) {
      			this.emitters[i].unpauseGenerators();
      		}
      	}
      
      	areGeneratorsInAllEmittersPaused() {
      		for (var i = 0; i < this.emitters.length; ++i) {
      			if (!this.emitters[i].generatorsPaused())
      				return false;
      		}
      		return true;
      	}
      */ }, { key: "getNumParticles", value: function getNumParticles()
    {
      var numParticles = 0;

      for (var i = 0; i < this.emitters.length; ++i) {
        numParticles += this.emitters[i].getNumParticles();
      }

      return numParticles;
    } }, { key: "_initiate", value: function _initiate(

    position, rotation) {
      this.frameTimeSpent = 0.0;
      this.time = 0.0;

      copyv3(this.position, position ? position : [0, 0, 0]);
      copyq(this.rotation, rotation ? rotation : [0, 0, 0, 1]);
    } }, { key: "_zeroUpdate", value: function _zeroUpdate()

    {
      for (var i = 0; i < this.emitters.length; ++i) {
        this.emitters[i].update(0, this.position, this.rotation);
      }

      this.update(this.presimTime, this.position, this.rotation);
    } }]);return Effect;}();

exports.Effect = Effect;
exports.Emitter = Emitter;
exports.EmitterParticlesPool = EmitterParticlesPool;
exports.FrameInterpolator = FrameInterpolator;
exports.Generator = Generator;
exports.GeneratorDist = GeneratorDist;
exports.GeneratorPeriodic = GeneratorPeriodic;
exports.TerminatorCondit = TerminatorCondit;
exports.math = _Math;
//# sourceMappingURL=neutrinoparticles.cjs.js.map
