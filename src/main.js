"use strict"

export function Context() {
	var ctx = this;

	this.equalv3_ = function(a, b) {
		return a[0] == b[0] && a[1] == b[1] && a[2] == b[2];
	}

	this.equalq_ = function(a, b) {
		return a[0] == b[0] && a[1] == b[1] && a[2] == b[2] && a[3] == b[3];
	}

	this.a = function (r, a, b) {
		r[0] = a[0] + b[0];
		r[1] = a[1] + b[1];
	}

	this.b = function (a, b) {
		return [a[0] + b[0], a[1] + b[1]];
	}

	this.y = function (r, a, s) {
	    r[0] = a[0] + s;
	    r[1] = a[1] + s;
	}

	this.z = function (a, s) {
	    return [a[0] + s, a[1] + s];
	}

	this.c = function (r, a, b) {
		r[0] = a[0] + b[0];
		r[1] = a[1] + b[1];
		r[2] = a[2] + b[2];
	}

	this.d = function (a, b) {
		return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
	}

	this.C = function (r, a, s) {
	    r[0] = a[0] + s;
	    r[1] = a[1] + s;
	    r[2] = a[2] + s;
	}

	this.D = function (a, s) {
	    return [a[0] + s, a[1] + s, a[2] + s];
	}

	this.addq = function (r, a, b) {
		r[0] = a[0] + b[0];
		r[1] = a[1] + b[1];
		r[2] = a[2] + b[2];
		r[3] = a[3] + b[3];
	}

	this.addq_ = function (a, b) {
		return [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]];
	}

	this.e = function (r, a, b) {
		r[0] = a[0] - b[0];
		r[1] = a[1] - b[1];
	}

	this.f = function (a, b) {
		return [a[0] - b[0], a[1] - b[1]];
	}

	this.A = function (r, a, s) {
	    r[0] = a[0] - s;
	    r[1] = a[1] - s;
	}

	this.B = function (a, s) {
	    return [a[0] - s, a[1] - s];
	}

	this.nf = function (r, s, a) {
	    r[0] = s - a[0];
	    r[1] = s - a[1];
	}

	this.of = function (s, a) {
	    return [s - a[0], s - a[1]];
	}

	this.g = function (r, a, b) {
		r[0] = a[0] - b[0];
		r[1] = a[1] - b[1];
		r[2] = a[2] - b[2];
	}

	this.h = function (a, b) {
		return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
	}

	this.E = function (r, a, s) {
	    r[0] = a[0] - s;
	    r[1] = a[1] - s;
	    r[2] = a[2] - s;
	}

	this.F = function (a, s) {
	    return [a[0] - s, a[1] - s, a[2] - s];
	}

	this.rf = function (r, s, a) {
	    r[0] = s - a[0];
	    r[1] = s - a[1];
	    r[2] = s - a[2];
	}

	this.sf = function (s, a) {
	    return [s - a[0], s - a[1], s - a[2]];
	}

	this.i = function (r, a, b) {
		r[0] = a[0] * b[0];
		r[1] = a[1] * b[1];
	}

	this.j = function (a, b) {
		return [a[0] * b[0], a[1] * b[1]];
	}

	this.k = function (r, a, b) {
		r[0] = a[0] * b[0];
		r[1] = a[1] * b[1];
		r[2] = a[2] * b[2];
	}

	this.l = function (a, b) {
		return [a[0] * b[0], a[1] * b[1], a[2] * b[2]];
	}

	this.m = function (r, a, b) {
		r[0] = a[0] / b[0];
		r[1] = a[1] / b[1];
	}

	this.n = function (a, b) {
		return [a[0] / b[0], a[1] / b[1]];
	}

	this.o = function (r, a, b) {
		r[0] = a[0] / b[0];
		r[1] = a[1] / b[1];
		r[2] = a[2] / b[2];
	}

	this.p = function (a, b) {
		return [a[0] / b[0], a[1] / b[1], a[2] / b[2]];
	}

	this.H = function(a, b) {
		return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
	}

	this.dotq_ = function(a, b) {
		return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
	}

	this.q = function (r, a, s) {
		r[0] = a[0] * s;
		r[1] = a[1] * s;
	}

	this.r = function (a, s) {
		return [a[0] * s, a[1] * s];
	}

	this.s = function (r, a, s) {
		r[0] = a[0] / s;
		r[1] = a[1] / s;
	}

	this.t = function (a, s) {
		return [a[0] / s, a[1] / s];
	}

	this.u = function (r, a, s) {
		r[0] = a[0] * s;
		r[1] = a[1] * s;
		r[2] = a[2] * s;
	}

	this.v = function (a, s) {
		return [a[0] * s, a[1] * s, a[2] * s];
	}

	this.w = function (r, a, s) {
		r[0] = a[0] / s;
		r[1] = a[1] / s;
		r[2] = a[2] / s;
	}

	this.x = function (a, s) {
		return [a[0] / s, a[1] / s, a[2] / s];
	}

	this.y = function (r, a, s) {
		r[0] = a[0] + s;
		r[1] = a[1] + s;
	}

	this.z = function (a, s) {
		return [a[0] + s, a[1] + s];
	}

	this.A = function (r, a, s) {
		r[0] = a[0] - s;
		r[1] = a[1] - s;
	}

	this.B = function (a, s) {
		return [a[0] - s, a[1] - s];
	}

	this.G = function (a, b) {
		return a[0] * b[0] + a[1] * b[1];
	}

	this.H = function (a, b) {
		return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
	}

	this.I = function (r, a, b) {
		var ax = a[0], ay = a[1], az = a[2];
		var bx = b[0], by = b[1], bz = b[2];

		r[0] = ay * bz - az * by;
		r[1] = az * bx - ax * bz;
		r[2] = ax * by - ay * bx;
	}

	this.J = function (a, b) {
		var ax = a[0], ay = a[1], az = a[2];
		var bx = b[0], by = b[1], bz = b[2];

		return [ay * bz - az * by,
			az * bx - ax * bz,
			ax * by - ay * bx];
	}

	this.K = function (a) {
		return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
	}

	this.L = function (a) {
		return a[0] * a[0] + a[1] * a[1];
	}

	this.M = function (r, a) {
		ctx.q(r, a, 1.0 / ctx.K(a));
	}

	this.N = function (a) {
		return ctx.r(a, 1.0 / ctx.K(a));
	}

	this.O = function (a) {
		return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
	}

	this.P = function (a) {
		return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
	}

	this.Q = function (r, a) {
		ctx.u(r, a, 1.0 / ctx.O(a));
	}

	this.R = function (a) {
		return ctx.v(a, 1.0 / ctx.O(a));
	}

	this.S = function (r, a) {
		r[0] = a[0];
		r[1] = a[1];
	}

	this.T = function (r, a) {
		r[0] = a[0];
		r[1] = a[1];
		r[2] = a[2];
	}

	this.U = function (r, a) {
		r[0] = a[0];
		r[1] = a[1];
		r[2] = a[2];
		r[3] = a[3];
	}

	this.V = function (r, x, y) {
		r[0] = x;
		r[1] = y;
	}

	this.W = function (r, x, y, z) {
		r[0] = x;
		r[1] = y;
		r[2] = z;
	}

	this.X = function (a, b, i) {
		return a + (b - a) * i;
	}

	this.Y = function (r, a, b, i) {
		r[0] = a[0] + (b[0] - a[0]) * i;
		r[1] = a[1] + (b[1] - a[1]) * i;
	}

	this.Z = function (a, b, i) {
		return [a[0] + (b[0] - a[0]) * i,
			a[1] + (b[1] - a[1]) * i];
	}

	this.ab = function (r, a, b, i) {
		r[0] = a[0] + (b[0] - a[0]) * i;
		r[1] = a[1] + (b[1] - a[1]) * i;
		r[2] = a[2] + (b[2] - a[2]) * i;
	}

	this.bb = function (a, b, i) {
		return [a[0] + (b[0] - a[0]) * i,
			a[1] + (b[1] - a[1]) * i,
			a[2] + (b[2] - a[2]) * i];
	}

	this.slerpq = function(r, x, y, a) {
		var cosTheta = ctx.dotq_(x, y);

		var z = [];

		if (cosTheta < 0) {
			ctx.negq(z, y);
			cosTheta = -cosTheta;
		}
		else {
			ctx.U(z, y);
		}

		if ((1.0 - cosTheta) < Number.EPSILON) {
			r[0] = ctx.X(x[0], y[0], a);
			r[1] = ctx.X(x[1], y[1], a);
			r[2] = ctx.X(x[2], y[2], a);
			r[3] = ctx.X(x[3], y[3], a);
		}
		else {
			var Md = ctx.acos_(cosTheta);

			ctx.mulqscalar(r, ctx.addq_(ctx.mulqscalar_(x, ctx.sin_((1.0 - a) * Md)), ctx.mulqscalar_(z, ctx.sin_(a * Md))),
				1.0 / ctx.sin_(Md));
		}
	}

	this.slerpq_ = function(x, y, a) {
		var r = [];
		slerpq(r, x, y, a);
		return r;
	}

	//trigonometry

	this.acos_ = function(a) {
		return Math.acos(a);
	}

	this.sin_ = function(a) {
		return Math.sin(a);
	}

	this.cos_ = function(a) {
		return Math.cos(a);
	}

	// random

	this.taus88 = function(seed)
	{
		if (!seed)
			seed = 0;

		var value0, value1, value2;

		this.seed = function(s0) {
			s0 &= 0xFFFFFFFF;

			value0 = s0 < 2 ? s0 + 2 : s0;
			value1 = s0 < 8 ? s0 + 8 : s0;
			value2 = s0 < 16 ? s0 + 16 : s0;
		}

		this.rand = function() {
			var b = (((value0 << 13) ^ value0) & 0xFFFFFFFF) >>> 19;
			value0 = (((value0 & 0xFFFFFFFE) << 12) ^ b) >>> 0;

			b = (((value1 << 2) ^ value1) & 0xFFFFFFFF) >>> 25;
			value1 = (((value1 & 0xFFFFFFF8) << 4) ^ b) >>> 0;

			b = (((value2 << 3) ^ value2) & 0xFFFFFFFF) >>> 11;
			value2 = (((value2 & 0xFFFFFFF0) << 17) ^ b) >>> 0;

			var engine = ((value0 ^ value1) ^ value2) >>> 0;
			return engine / 4294967296.0;
		}

		this.seed(seed);
	}

	this.cb = function (r, radius) {
		this.randv2gen(r, radius, function () { return Math.random(); });
	}

	this.randv2gen = function (r, radius, gen) {
		var Md = gen() * Math.PI * 2.0;
		r[0] = radius * ctx.cos_(Md);
		r[1] = radius * ctx.sin_(Md);
	}

	this.db = function (r, radius) {
		this.randv3gen(r, radius, function () { return Math.random(); });
	}

	this.randv3gen = function (r, radius, gen) {
		var theta = gen() * Math.PI * 2.0;
		var z = -1.0 + gen() * 2.0;
		var sqrtInvZ2 = radius * Math.sqrt(1.0 - z * z);
		r[0] = sqrtInvZ2 * ctx.cos_(theta);
		r[1] = sqrtInvZ2 * ctx.sin_(theta);
		r[2] = radius * z;
	}

	this.yb = function(r, x, y, Nd, gen) {
		var dispx = x + gen() * Nd[0];
		var dispy = y + gen() * Nd[1];
		ctx.V(r, dispx, dispy);
	}

	this.eb = function (r, a) {
		ctx.V(-a[0], -a[1]);
	}

	this.fb = function (a) {
		return [-a[0], -a[1]];
	}

	this.gb = function (r, a) {
		ctx.W(-a[0], -a[1], -a[2]);
	}

	this.hb = function (a) {
		return [-a[0], -a[1], -a[2]];
	}

	this.negq = function (r, a) {
		r[0] = -a[0];
		r[1] = -a[1];
		r[2] = -a[2];
		r[3] = -a[3];
	}

	this.negq_ = function(a) {
		return [-a[0], -a[1], -a[2], -a[3]];
	}

	this.ib = function (degrees) {
		return degrees / 180.0 * Math.PI;
	}

	this.jb = function (radians) {
		return radians / Math.PI * 180.0;
	}

	this.Ae = function(value) {
		return value < 0 ? -1 : 1;
	}

	this.ob = function (x, y, z, q) {
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

	this.pb = function (q, x, y, z) {
		var tr = x[0] + y[1] + z[2]

		if (tr > 0) {
			var S = Math.sqrt(tr+1.0) * 2;
			q[3] = 0.25 * S;
			q[0] = (y[2] - z[1]) / S;
			q[1] = (z[0] - x[2]) / S;
			q[2] = (x[1] - y[0]) / S;
		} else if ((x[0] > y[1])&(x[0] > z[2])) {
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

	this./**/axes2quat = this.pb;

	this.qb = function (q, x, a) {
		var ha = ctx.ib(a) * 0.5, s = Math.sin(ha);
		q[0] = x[0] * s;
		q[1] = x[1] * s;
		q[2] = x[2] * s;
		q[3] = Math.cos(ha);
	}

	this./**/axisangle2quat = this.qb;

	this.axisangle2quat_ = function (x, a) {
		var ha = ctx.ib(a) * 0.5, s = Math.sin(ha);
		return [x[0] * s, x[1] * s, x[2] * s, ctx.cos_(ha)];
	}

	this./**/axisangle2quat_ = this.axisangle2quat_;

	this.rb = function (r, v, q) {
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

	this.sb = function (r, a, b) {
		var qax = a[0], qay = a[1], qaz = a[2], qaw = a[3];
		var qbx = b[0], qby = b[1], qbz = b[2], qbw = b[3];

		r[0] = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
		r[1] = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
		r[2] = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
		r[3] = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
	}

	this.mulqscalar = function (r, a, s) {
		r[0] = a[0] * s;
		r[1] = a[1] * s;
		r[2] = a[2] * s;
		r[3] = a[3] * s;
	}

	this.mulqscalar_ = function (a, s) {
		return [a[0] * s, a[1] * s, a[2] * s, a[3] * s];
	}

	this.tb = function (r, Hf, degree, scale, v) {
		var rad = ctx.ib(degree);
		var cos = Math.cos(rad) * scale;
		var sin = Math.sin(rad) * scale;
		r[0] = Hf[0] + cos * v[0] - sin * v[1];
		r[1] = Hf[1] + sin * v[0] + cos * v[1];
	}

	this.ub = function (r, Hf, degree, scale, v) {
		var rad = ctx.ib(degree);
		var cos = Math.cos(rad) / scale;
		var sin = Math.sin(rad) / scale;

		r[0] = cos * v[0] + sin * v[1] - Hf[0] * cos - Hf[1] * sin;
		r[1] = cos * v[1] - sin * v[0] + Hf[0] * sin - Hf[1] * cos;
	}

	this.vb = function (val) {
		if (val < 0)
			return Math.floor(ctx.yd - 1 + val % ctx.yd);
		else
			return Math.floor(val % ctx.yd);
	}

	function colorCompToHex_(c) {
		return c < 16 ? "0" + c.toString(16) : c.toString(16);
	}

	this.ff = function(rgb) {
		return "#"
			+ colorCompToHex_(Math.floor(rgb[0] * 255))
			+ colorCompToHex_(Math.floor(rgb[1] * 255))
			+ colorCompToHex_(Math.floor(rgb[2] * 255));
	}

	this.tf = function(vf, xf, yf, a, b, zf) {
		let ca = ctx.f(a, vf);
		let cb = ctx.f(b, vf);

		let wf = ctx.r(xf, yf);

		if ((ca[0] < -wf[0] && cb[0] < -wf[0])
			|| (ca[0] > wf[0] && cb[0] > wf[0])
			|| (ca[1] < -wf[1] && cb[1] < -wf[1])
			|| (ca[1] > wf[1] && cb[1] > wf[1]))
		{
			return false;
		}

		if (ca[0] <= wf[0] && ca[0] >= -wf[0] && ca[1] <= wf[1] && ca[1] >= -wf[1])
			return true;

		if (zf < 0.000001)
			return false;

		if (cb[0] <= wf[0] && cb[0] >= -wf[0] && cb[1] <= wf[1] && cb[1] >= -wf[1])
			return true;

		let Af = ctx.f(b, a); ctx.s(Af, Af, zf);
		let Bf = [-Af[1], Af[0]];
		let Cf = Math.abs(ctx.G(Bf, cb));

		if (Math.abs(ctx.G(Bf, wf)) >= Cf) {
			let Df = [-xf[1], xf[0]];
			if (ctx.G(Df, ca) * ctx.G(Df, cb) <= 0.0) {
				return true;
			}
		} else if (Math.abs(ctx.G(Bf, [wf[0], -wf[1]])) >= Cf) {
			let Df = [xf[1], xf[0]];
			if (ctx.G(Df, ca) * ctx.G(Df, cb) <= 0.0) {
				return true;
			}
		}

		return false;
	}

	this.uf = function(vf, xf, yf, a, b, zf, Ef) {
		let ca = ctx.f(a, vf);
		let cb = ctx.f(b, vf);

		let wf = ctx.r(xf, yf);

		if (zf < 0.000001)
			return false;

		if ((ca[0] < -wf[0] && cb[0] < -wf[0])
			|| (ca[0] > wf[0] && cb[0] > wf[0])
			|| (ca[1] < -wf[1] && cb[1] < -wf[1])
			|| (ca[1] > wf[1] && cb[1] > wf[1]))
		{
			return false;
		}

		let Af = ctx.f(b, a); ctx.s(Af, Af, zf);
		let Bf = [-Af[1], Af[0]];
		let Cf = Math.abs(ctx.G(Bf, cb));

		if (Ef) {
			if (Math.abs(ctx.G(Bf, wf)) >= Cf) {
				let Df = [-xf[1], xf[0]];
				if (ctx.G(Df, ca) * ctx.G(Df, cb) <= 0.0) {
					return true;
				}
			}
		} else {
			if (Math.abs(ctx.G(Bf, [wf[0], -wf[1]])) >= Cf) {
				let Df = [xf[1], xf[0]];
				if (ctx.G(Df, ca) * ctx.G(Df, cb) <= 0.0) {
					return true;
				}
			}
		}

		return false;
	}

	this.wb = function (r, x, y, z) {
		var rgbDisp = 3 * (y * ctx.yd + x);
		var view = ctx.zd[z];

		r[0] = view.getUint8(rgbDisp);
		r[1] = view.getUint8(rgbDisp + 1);
		r[2] = view.getUint8(rgbDisp + 2);
	}

	this.xb = function (r, Hf) {
		if (ctx.zd == null) {
			ctx.W(r, 128, 128, 128);
			return;
		}

		var scaledPosX = Hf[0] * ctx.yd;
		var scaledPosY = Hf[1] * ctx.yd;
		var scaledPosZ = Hf[2] * ctx.yd;

		var floorX = Math.floor(scaledPosX);
		var floorY = Math.floor(scaledPosY);
		var floorZ = Math.floor(scaledPosZ);

		var fracX = scaledPosX - floorX;
		var fracY = scaledPosY - floorY;
		var fracZ = scaledPosZ - floorZ;

		var noiseX = ctx.vb(floorX);
		var noiseX1 = ctx.vb(floorX + 1);
		var noiseY = ctx.vb(floorY);
		var noiseY1 = ctx.vb(floorY + 1);
		var noiseZ = ctx.vb(floorZ);
		var noiseZ1 = ctx.vb(floorZ + 1);

		var value000 = [], value001 = [], value010 = [], value011 = [],
			value100 = [], value101 = [], value110 = [], value111 = [];

		ctx.wb(value000, noiseX, noiseY, noiseZ);
		ctx.wb(value001, noiseX, noiseY, noiseZ1);
		ctx.wb(value010, noiseX, noiseY1, noiseZ);
		ctx.wb(value011, noiseX, noiseY1, noiseZ1);
		ctx.wb(value100, noiseX1, noiseY, noiseZ);
		ctx.wb(value101, noiseX1, noiseY, noiseZ1);
		ctx.wb(value110, noiseX1, noiseY1, noiseZ);
		ctx.wb(value111, noiseX1, noiseY1, noiseZ1);

		var value00 = [], value01 = [], value10 = [], value11 = [];
		ctx.ab(value00, value000, value001, fracZ);
		ctx.ab(value01, value010, value011, fracZ);
		ctx.ab(value10, value100, value101, fracZ);
		ctx.ab(value11, value110, value111, fracZ);

		var value0 = [], value1 = [];
		ctx.ab(value0, value00, value01, fracY);
		ctx.ab(value1, value10, value11, fracY);

		ctx.ab(r, value0, value1, fracX);
	}

	this.ImageDesc = function(image, x, y, width, height) {
		this.image = image;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	this.RenderCall = function (startIndex, numIndices, renderStyleIndex) {
	    this.startIndex = startIndex;
	    this.numIndices = numIndices;
	    this.renderStyleIndex = renderStyleIndex;
	}

	this.SubRect = function (x, y, width, height) {
	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	}

	this.Camera2D = function () {
	}

	this.Camera2D.prototype.tb = function (Hf, Nd) {
	    return true;
	}

	this.Camera3D = function (/**/screenSize, /**/horizAngle) {
	    this.Qd = ctx.r(/**/screenSize, 0.5);
	    this.z = -(/**/screenSize[0] * 0.5) / Math.tan(ctx.ib(/**/horizAngle * 0.5));
	}

	this.Camera3D.prototype./**/transform = function (/**/pos, /**/size) {
	    if (/**/pos[2] < this.z)
	        return false;

	    var scale = -this.z / (/**/pos[2] - this.z);
	    ctx.a(/**/pos, ctx.r(ctx.f(/**/pos, this.Qd), scale), this.Qd);
	    ctx.q(/**/size, /**/size, scale);

	    return true;
	}

	this.zd = null;
	this.yd = 0;

	this.initializeNoise = function(path, onloadcallback, onfailcallback) {

		if (!path) {
			alert("path should be defined");
		}

		if (this.zd != null) {
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
					var zd = request.response;
					var ctx = request.ctx;

					var view = new DataView(zd, 0, 4);
					var planeSize = view.getUint32(0, true);
					var planesAtSide = Math.sqrt(planeSize);
					var viewSideSize = planeSize * planesAtSide;

					ctx.zd = [];
					ctx.yd = planeSize;

					for (var planeIndex = 0; planeIndex < planeSize; ++planeIndex) {
						ctx.zd[planeIndex] = new DataView(zd,
							4/*Nd*/ + 3 * planeSize * planeSize * planeIndex);
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
		var amp = 0.7; // hardcoded amplitude of perlin zd
		var fadeDegree = 1.2; // hardcoded fade degree of each octave
		var prevStep = imageSize;

		var step, Nd, octSize, octSize2, octMaskSize, octPixels, octZ, octY; // mix step variables

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
			Nd = imageSize;
			octSize = Math.floor(Nd / step);
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
							var result = ctx.d(ctx.v(octResult, amp), image[imageZ][imageY][imageX]);
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
						imageZYX[0] = ctx.X(low[0], high[0], imageZYX[0] * 0.5 + 0.5);
						imageZYX[1] = ctx.X(low[1], high[1], imageZYX[1] * 0.5 + 0.5);
						imageZYX[2] = ctx.X(low[2], high[2], imageZYX[2] * 0.5 + 0.5);
					}
				}
			}

			state = States.DATA_VIEWS;
			this.progress = Progress.SCALING;
		}

		// filling zd DataViews
		var dataViews = function() {
			ctx.yd = imageSize;
			ctx.zd = [];

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

				ctx.zd[z] = view;
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

	this.cf = document.createElement('canvas');
	this.cf.width = 0;
	this.cf.height = 0;
	this.bf = this.cf.getContext('2d');

	this.af = function(minWidth, minHeight) {
		if (this.cf.width < minWidth || this.cf.height < minHeight) {
			this.cf.width = minWidth;
			this.cf.height = minHeight;
			this.bf = this.cf.getContext('2d');
		}
	}

	this.effects = [];

	this.loadEffect = function(effectFilePath, onSuccessFunc, onFailFunc) {

		if (this.effects[effectFilePath] != undefined) {

			var effectModel = this.effects[effectFilePath];

			if (effectModel instanceof Array) {
				effectModel[effectModel.length] = [onSuccessFunc, onFailFunc];
				return;
			}

			onSuccessFunc(effectModel);
			return;
		}

		this.effects[effectFilePath] = [[onSuccessFunc, onFailFunc]];

		var request = new XMLHttpRequest();
		request.open("GET", effectFilePath, true);
		request.responseType = "text";
		request.ctx = this;
		request.onreadystatechange = function () {
			if (request.readyState == 4) {
				var callbacks = this.ctx.effects[effectFilePath];

				if ((request.status >= 200 && request.status < 300) || request.status == 304) {

					var evalText = "(function(ctx) {\n" +
						request.responseText +
						"\nreturn new NeutrinoEffect(ctx);\n})(this.ctx);";
					var effectModel = eval(evalText);
					this.ctx.effects[effectFilePath] = effectModel;

					callbacks.forEach(function(callback) {
						callback[0](effectModel);
					});

				} else {
					callbacks.forEach(function(callback) {
						callback[1]();
					});
				}
			}
		}

		request.send();
	}

	this.removeEffect = function(effectFilePath) {
		delete this.effects[effectFilePath];
	}
}
