export function equalv3_(a, b) {
	return a[0] == b[0] && a[1] == b[1] && a[2] == b[2];
}

export function equalv3eps_(a, b, eps) {
	return Math.abs(a[0] - b[0]) <= eps &&
		Math.abs(a[1] - b[1]) <= eps &&
		Math.abs(a[2] - b[2]) <= eps;
}

export function equalq_(a, b) {
	return a[0] == b[0] && a[1] == b[1] && a[2] == b[2] && a[3] == b[3];
}

export function equalqeps_(a, b, eps) {
	return Math.abs(a[0] - b[0]) <= eps &&
		Math.abs(a[1] - b[1]) <= eps &&
		Math.abs(a[2] - b[2]) <= eps &&
		Math.abs(a[3] - b[3]) <= eps;
}

export function addv2 (r, a, b) {
	r[0] = a[0] + b[0];
	r[1] = a[1] + b[1];
}

export function addv2_ (a, b) {
	return [a[0] + b[0], a[1] + b[1]];
}

export function addv2scalar (r, a, s) {
	r[0] = a[0] + s;
	r[1] = a[1] + s;
}

export function addv2scalar_ (a, s) {
	return [a[0] + s, a[1] + s];
}

export function addv3 (r, a, b) {
	r[0] = a[0] + b[0];
	r[1] = a[1] + b[1];
	r[2] = a[2] + b[2];
}

export function addv3_ (a, b) {
	return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

export function addv3scalar (r, a, s) {
	r[0] = a[0] + s;
	r[1] = a[1] + s;
	r[2] = a[2] + s;
}

export function addv3scalar_ (a, s) {
	return [a[0] + s, a[1] + s, a[2] + s];
}

export function addq (r, a, b) {
	r[0] = a[0] + b[0];
	r[1] = a[1] + b[1];
	r[2] = a[2] + b[2];
	r[3] = a[3] + b[3];
}

export function addq_ (a, b) {
	return [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]];
}

export function subv2 (r, a, b) {
	r[0] = a[0] - b[0];
	r[1] = a[1] - b[1];
}

export function subv2_ (a, b) {
	return [a[0] - b[0], a[1] - b[1]];
}

export function subv2scalar (r, a, s) {
	r[0] = a[0] - s;
	r[1] = a[1] - s;
}

export function subv2scalar_ (a, s) {
	return [a[0] - s, a[1] - s];
}

export function subscalarv2 (r, s, a) {
	r[0] = s - a[0];
	r[1] = s - a[1];
}

export function subscalarv2_ (s, a) {
	return [s - a[0], s - a[1]];
}

export function subv3 (r, a, b) {
	r[0] = a[0] - b[0];
	r[1] = a[1] - b[1];
	r[2] = a[2] - b[2];
}

export function subv3_ (a, b) {
	return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

export function subv3scalar (r, a, s) {
	r[0] = a[0] - s;
	r[1] = a[1] - s;
	r[2] = a[2] - s;
}

export function subv3scalar_ (a, s) {
	return [a[0] - s, a[1] - s, a[2] - s];
}

export function subscalarv3 (r, s, a) {
	r[0] = s - a[0];
	r[1] = s - a[1];
	r[2] = s - a[2];
}

export function subscalarv3_ (s, a) {
	return [s - a[0], s - a[1], s - a[2]];
}

export function mulv2 (r, a, b) {
	r[0] = a[0] * b[0];
	r[1] = a[1] * b[1];
}

export function mulv2_ (a, b) {
	return [a[0] * b[0], a[1] * b[1]];
}

export function mulv3 (r, a, b) {
	r[0] = a[0] * b[0];
	r[1] = a[1] * b[1];
	r[2] = a[2] * b[2];
}

export function mulv3_ (a, b) {
	return [a[0] * b[0], a[1] * b[1], a[2] * b[2]];
}

export function divv2 (r, a, b) {
	r[0] = a[0] / b[0];
	r[1] = a[1] / b[1];
}

export function divv2_ (a, b) {
	return [a[0] / b[0], a[1] / b[1]];
}

export function divv3 (r, a, b) {
	r[0] = a[0] / b[0];
	r[1] = a[1] / b[1];
	r[2] = a[2] / b[2];
}

export function divv3_ (a, b) {
	return [a[0] / b[0], a[1] / b[1], a[2] / b[2]];
}

export function dotv3_(a, b) {
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

export function dotq_(a, b) {
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

export function mulv2scalar (r, a, s) {
	r[0] = a[0] * s;
	r[1] = a[1] * s;
}

export function mulv2scalar_ (a, s) {
	return [a[0] * s, a[1] * s];
}

export function divv2scalar (r, a, s) {
	r[0] = a[0] / s;
	r[1] = a[1] / s;
}

export function divv2scalar_ (a, s) {
	return [a[0] / s, a[1] / s];
}

export function mulv3scalar (r, a, s) {
	r[0] = a[0] * s;
	r[1] = a[1] * s;
	r[2] = a[2] * s;
}

export function mulv3scalar_ (a, s) {
	return [a[0] * s, a[1] * s, a[2] * s];
}

export function divv3scalar (r, a, s) {
	r[0] = a[0] / s;
	r[1] = a[1] / s;
	r[2] = a[2] / s;
}

export function divv3scalar_ (a, s) {
	return [a[0] / s, a[1] / s, a[2] / s];
}

export function dotv2_ (a, b) {
	return a[0] * b[0] + a[1] * b[1];
}

export function crossv3 (r, a, b) {
	var ax = a[0], ay = a[1], az = a[2];
	var bx = b[0], by = b[1], bz = b[2];

	r[0] = ay * bz - az * by
	r[1] = az * bx - ax * bz;
	r[2] = ax * by - ay * bx;
}

export function crossv3_ (a, b) {
	var ax = a[0], ay = a[1], az = a[2];
	var bx = b[0], by = b[1], bz = b[2];

	return [ay * bz - az * by,
		az * bx - ax * bz,
		ax * by - ay * bx];
}

export function lengthv2_ (a) {
	return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
}

export function lengthv2sq_ (a) {
	return a[0] * a[0] + a[1] * a[1];
}

export function normalizev2 (r, a) {
	mulv2scalar(r, a, 1.0 / lengthv2_(a));
}

export function normalizev2_ (a) {
	return mulv2scalar_(a, 1.0 / lengthv2_(a));
}

export function lengthv3_ (a) {
	return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
}

export function lengthv3sq_ (a) {
	return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
}

export function normalizev3 (r, a) {
	mulv3scalar(r, a, 1.0 / lengthv3_(a));
}

export function normalizev3_ (a) {
	return mulv3scalar_(a, 1.0 / lengthv3_(a));
}

export function copyv2 (r, a) {
	r[0] = a[0];
	r[1] = a[1];
}

export function copyv3 (r, a) {
	r[0] = a[0];
	r[1] = a[1];
	r[2] = a[2];
}

export function copyq (r, a) {
	r[0] = a[0];
	r[1] = a[1];
	r[2] = a[2];
	r[3] = a[3];
}

export function setv2 (r, x, y) {
	r[0] = x;
	r[1] = y;
}

export function setv3 (r, x, y, z) {
	r[0] = x;
	r[1] = y;
	r[2] = z;
}

export function lerp_ (a, b, i) {
	return a + (b - a) * i;
}

export function lerpv2 (r, a, b, i) {
	r[0] = a[0] + (b[0] - a[0]) * i;
	r[1] = a[1] + (b[1] - a[1]) * i;
}

export function lerpv2_ (a, b, i) {
	return [a[0] + (b[0] - a[0]) * i,
		a[1] + (b[1] - a[1]) * i];
}

export function lerpv3 (r, a, b, i) {
	r[0] = a[0] + (b[0] - a[0]) * i;
	r[1] = a[1] + (b[1] - a[1]) * i;
	r[2] = a[2] + (b[2] - a[2]) * i;
}

export function lerpv3_ (a, b, i) {
	return [a[0] + (b[0] - a[0]) * i,
		a[1] + (b[1] - a[1]) * i,
		a[2] + (b[2] - a[2]) * i];
}

export function slerpq(r, x, y, a) {
	var cosTheta = dotq_(x, y);
	
	var z = [];
	
	if (cosTheta < 0) {
		negq(z, y);
		cosTheta = -cosTheta;
	}
	else {
		copyq(z, y);
	}
	
	if ((1.0 - cosTheta) < Number.EPSILON) {
		r[0] = lerp_(x[0], y[0], a);
		r[1] = lerp_(x[1], y[1], a);
		r[2] = lerp_(x[2], y[2], a);
		r[3] = lerp_(x[3], y[3], a);
	}
	else {
		var angle = acos_(cosTheta);
		
		mulqscalar(r, addq_(mulqscalar_(x, sin_((1.0 - a) * angle)), mulqscalar_(z, sin_(a * angle))),
			1.0 / sin_(angle));
	}
}

export function slerpq_(x, y, a) {
	var r = [];
	slerpq(r, x, y, a);
	return r;
}

//trigonometry

export function acos_(a) {
	return Math.acos(a);
}

export function sin_(a) {
	return Math.sin(a);
}

export function cos_(a) {
	return Math.cos(a);
}

export function negv2 (r, a) {
	setv2(r, -a[0], -a[1]);
}

export function negv2_ (a) {
	return [-a[0], -a[1]];
}

export function negv3 (r, a) {
	setv3(r, -a[0], -a[1], -a[2]);
}

export function negv3_ (a) {
	return [-a[0], -a[1], -a[2]];
}

export function negq (r, a) {
	r[0] = -a[0];
	r[1] = -a[1];
	r[2] = -a[2];
	r[3] = -a[3];
}

export function negq_(a) {
	return [-a[0], -a[1], -a[2], -a[3]];
}

export function deg2rad_ (degrees) {
	return degrees / 180.0 * Math.PI;
}

export function rad2deg_ (radians) {
	return radians / Math.PI * 180.0;
}

export function sign_(value) {
	return value < 0 ? -1 : 1;
}

export function quat2axes (x, y, z, q) {
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

export function axes2quat (q, x, y, z) {
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

export function axisangle2quat (q, x, a) {
	var ha =  deg2rad_(a) * 0.5, s = Math.sin(ha);
	q[0] = x[0] * s;
	q[1] = x[1] * s;
	q[2] = x[2] * s;
	q[3] = Math.cos(ha);
}

export function axisangle2quat_ (x, a) {
	var ha =  deg2rad_(a) * 0.5, s = Math.sin(ha);
	return [x[0] * s, x[1] * s, x[2] * s,  cos_(ha)];
}

export function applyv3quat (r, v, q) {
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

export function mulq (r, a, b) {
	var qax = a[0], qay = a[1], qaz = a[2], qaw = a[3];
	var qbx = b[0], qby = b[1], qbz = b[2], qbw = b[3];

	r[0] = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
	r[1] = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
	r[2] = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
	r[3] = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
}

export function mulqscalar (r, a, s) {
	r[0] = a[0] * s;
	r[1] = a[1] * s;
	r[2] = a[2] * s;
	r[3] = a[3] * s;
}

export function mulqscalar_ (a, s) {
	return [a[0] * s, a[1] * s, a[2] * s, a[3] * s];
}

export function transform (r, pos, degree, scale, v) {
	var rad =  deg2rad_(degree);
	var cos = Math.cos(rad) * scale;
	var sin = Math.sin(rad) * scale;
	r[0] = pos[0] + cos * v[0] - sin * v[1];
	r[1] = pos[1] + sin * v[0] + cos * v[1];
}

export function invtransform (r, pos, degree, scale, v) {
	var rad =  deg2rad_(degree);
	var cos = Math.cos(rad) / scale;
	var sin = Math.sin(rad) / scale;

	r[0] = cos * v[0] + sin * v[1] - pos[0] * cos - pos[1] * sin;
	r[1] = cos * v[1] - sin * v[0] + pos[0] * sin - pos[1] * cos;
}