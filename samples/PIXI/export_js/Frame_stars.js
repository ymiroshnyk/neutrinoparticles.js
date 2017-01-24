// 8b3a6c4a-d406-4131-93d0-2e9c4df4a7ad

function NeutrinoEffect(ctx) {

	var Db = this;

	var ne = function (Ld, Bd) {
		this.Ld = Ld;
		this.Bd = Bd;

		if (this.Bd.we.pe.length > 0) {
			this.we = this.Bd.we.pe[0];

			this.Lc = [ne.prototype.Ec,
				ne.prototype.Fc][this.we.xe];
		}
		else
			this.we = null;
	}

	ne.prototype = {
		Ec: function (fe, Ab, Xb) {
			var Gc = ctx.ib(Xb.Md);
			var Hc = Math.cos(Gc);
			var Ic = Math.sin(Gc);
			var ye = ctx.Ae(Xb.Nd[0]);
			var ze = ctx.Ae(Xb.Nd[1]);
			fe./**/transform(ye * Hc, ye * Ic, ze * -Ic, ze * Hc, Ab[0], Ab[1]);
		},

		Fc: function (fe, Ab, Xb) {
			var q = Xb.Mc;
			var z2 = 2.0 * q[2] * q[2];
			var xy = 2.0 * q[0] * q[1];
			var wz = 2.0 * q[3] * q[2];
			var ye = ctx.Ae(Xb.Nd[0]);
			var ze = ctx.Ae(Xb.Nd[1]);
			fe./**/transform(
				ye * (1.0 - 2.0 * q[1] * q[1] - z2),
				ye * (xy + wz),
				ze * (wz - xy),
				ze * (2.0 * q[0] * q[0] + z2 - 1.0),
				Ab[0], Ab[1]);
		},

		Pc: function (fe, Xb, ge) {
			Xb.vc(fe, -1, ge);

			if (this.we) {

				if (this.Be != null && !Xb.oc) {

					if (Xb.Od > 0.001) {
						var De = Math.floor(Xb.Qc % this.we.Rc);
						var Ee = Math.floor(Xb.Qc / this.we.Rc);

						var Ab = Xb.Ab.slice();
						var Nd = Xb.Nd.slice();
						if (!ge || ge./**/transform(Ab, Nd)) {

							var df = Math.abs(Nd[0]);
							var ef = Math.abs(Nd[1]);

							if (df > 0.001 && ef > 0.001) {						
								fe.save();
								this.Lc(fe, Ab, Xb);
								
								fe.translate(-df * Xb.Pd[0], -ef * (1 - Xb.Pd[1]));
								fe.globalAlpha = Xb.Od;

								if (Xb.gf[0] < 0.999 || Xb.gf[1] < 0.999 || Xb.gf[2] < 0.999) {

									var Ye = df < this.Tc ? df : this.Tc;
									var Ze = ef < this.Uc ? ef : this.Uc;

									ctx.af(Ye, Ze);

									ctx.bf.globalCompositeOperation = "copy";
									ctx.bf.drawImage(this.Be.image,
										this.Be.x + this.Tc * De, this.Be.y + this.Uc * Ee,
										this.Tc, this.Uc,
										0, 0, Ye, Ze);

									ctx.bf.globalCompositeOperation = "multiply";
									ctx.bf.fillStyle = ctx.ff(Xb.gf);
									ctx.bf.fillRect(0, 0, Ye, Ze);

									ctx.bf.globalCompositeOperation = "destination-atop";
									ctx.bf.drawImage(this.Be.image,
										this.Be.x + this.Tc * De, this.Be.y + this.Uc * Ee,
										this.Tc, this.Uc,
										0, 0, Ye, Ze);

									fe.drawImage(ctx.cf, 0, 0, Ye, Ze, 0, 0, df, ef);
								}
								else {
									fe.drawImage(this.Be.image,
										this.Be.x + this.Tc * De, this.Be.y + this.Uc * Ee,
										this.Tc, this.Uc, 0, 0, df, ef);
								}

								fe.restore();
							}
						}
					}
				}
			}

			Xb.vc(fe, 1, ge);
		},

		Hd: function (fe, ge) {
			fe.save();

			if (this.we) {
				fe.globalCompositeOperation = this.Ld.materials[this.Ld./**/model.renderStyles[this.we.renderStyleIndex].materialIndex];
				this.Be = this.Ld.textureDescs[this.Ld./**/model.renderStyles[this.we.renderStyleIndex].textureIndices[0]];
			}
			else {
				this.Be = null;
			}

			if (this.Be) {
				this.Tc = this.Be.width / this.we.Rc;
				this.Uc = this.Be.height / this.we.Sc;
			}

			function kd(a, b) {
				if (a.Ab[2] < b.Ab[2])
					return 1;
				if (a.Ab[2] > b.Ab[2])
					return -1;
				return 0;
			}

			switch (this.Bd.Vc) {
				case 0:
					for (var Wb = 0; Wb < this.Bd.tc.length; ++Wb) {
						this.Pc(fe, this.Bd.tc[Wb], ge);
					}
					break;
				case 1:
					for (var Wb = this.Bd.tc.length; Wb-- > 0;) {
						this.Pc(fe, this.Bd.tc[Wb], ge);
					}
					break;
				case 2:
					this.Bd.tc.sort(kd);

					for (var Wb = 0; Wb < this.Bd.tc.length; ++Wb) {
						this.Pc(fe, this.Bd.tc[Wb], ge);
					}
					break;
			}

			fe.restore();
		}
	}

	var oe = function (Ld, Bd) {

		this.Ld = Ld;
		this.Bd = Bd;

		if (this.Bd.we.pe.length > 0)
			this.we = this.Bd.we.pe[0];
		else
			this.we = null;
	}

	oe.prototype = {
		qe: function (Xb, se, re, te) {
			Xb.Ce(-1, se, re, te);

			if (this.we) {

				if (!Xb.oc) {

					var Fe = [], Ge = [];

					if (this.we.xe == 0) {
						var a = ctx.ib(Xb.Md);
						var s = Math.sin(a);
						var c = Math.cos(a);

						Fe[0] = se[0] * c + re[0] * s;
						Fe[1] = se[1] * c + re[1] * s;
						Fe[2] = se[2] * c + re[2] * s;

						Ge[0] = -se[0] * s + re[0] * c;
						Ge[1] = -se[1] * s + re[1] * c;
						Ge[2] = -se[2] * s + re[2] * c;
					}
					else {
						var q = Xb.Mc;
						var z2 = 2.0 * q[2] * q[2];
						var xy = 2.0 * q[0] * q[1];
						var wz = 2.0 * q[3] * q[2];

						Fe[0] = 1.0 - 2.0 * q[1] * q[1] - z2;
						Fe[1] = xy + wz;
						Fe[2] = 2.0 * q[0] * q[2] - 2.0 * q[3] * q[1];

						Ge[0] = xy - wz;
						Ge[1] = 1.0 - 2.0 * q[0] * q[0] - z2;
						Ge[2] = 2.0 * q[1] * q[2] + 2.0 * q[3] * q[0];
					}

					var He = [], Ie = [], Je = [], Ke = [];
					ctx.u(He, Fe, -Xb.Nd[0] * Xb.Pd[0]);
					ctx.u(Ie, Fe, Xb.Nd[0] * (1.0 - Xb.Pd[0]));
					ctx.u(Je, Ge, -Xb.Nd[1] * Xb.Pd[1]);
					ctx.u(Ke, Ge, Xb.Nd[1] * (1.0 - Xb.Pd[1]));

					var v0 = [], v1 = [], v2 = [], v3 = [];
					ctx.c(v0, He, Je);
					ctx.c(v0, v0, Xb.Ab);
					ctx.c(v1, He, Ke);
					ctx.c(v1, v1, Xb.Ab);
					ctx.c(v2, Ie, Ke);
					ctx.c(v2, v2, Xb.Ab);
					ctx.c(v3, Ie, Je);
					ctx.c(v3, v3, Xb.Ab);

					{
						var Me = new Float32Array(this.Ld.geometryBuffers./**/positions);
						var Le = this.Ld.geometryBuffers.numVertices * 3;

						Me.set(v0, Le);
						Me.set(v1, Le + 3);
						Me.set(v2, Le + 6);
						Me.set(v3, Le + 9);
					}

					{
						var Ne = new Uint8Array(this.Ld.geometryBuffers./**/colors);
						var Le = this.Ld.geometryBuffers.numVertices * 4;

						var rgb = ctx.v(Xb.gf, 255);
						var rgba = [rgb[0], rgb[1], rgb[2], Xb.Od * 255];

						Ne.set(rgba, Le);
						Ne.set(rgba, Le + 4);
						Ne.set(rgba, Le + 8);
						Ne.set(rgba, Le + 12);
					}

					{
						var Oe = new Float32Array(this.Ld.geometryBuffers./**/texCoords[0]);
						var Le = this.Ld.geometryBuffers.numVertices * 2;

						var De = Math.floor(Xb.Qc % this.we.Rc);
						var Ee = Math.floor(Xb.Qc / this.we.Rc);

						var Pe, Qe, Re, Se;

						var We = this.Ld.texturesRemap[this.Ld./**/model.renderStyles[this.we.renderStyleIndex].textureIndices[0]];
						if (We) {
							var Ue = We.width / this.we.Rc;
							var Ve = We.height / this.we.Sc;

							var Pe = We.x + De * Ue;
							var Qe = Pe + Ue;
							var Re = (We.y + We.height - Ee * Ve);
							var Se = Re - Ve;
						} else {
							var Ue = 1.0 / this.we.Rc;
							var Ve = 1.0 / this.we.Sc;

							var Pe = De * Ue;
							var Qe = Pe + Ue;
							var Re = (1.0 - Ee * Ve);
							var Se = Re - Ve;
						}

						Oe.set([Pe, Se], Le);
						Oe.set([Pe, Re], Le + 2);
						Oe.set([Qe, Re], Le + 4);
						Oe.set([Qe, Se], Le + 6);
					}

					var Te = this.Ld.geometryBuffers./**/renderCalls;
					if (!Te.length) {
						Te.push(new ctx.RenderCall(0, 6, this.we.renderStyleIndex));
					} else {
						var lastCall = Te[Te.length - 1];

						if (lastCall.renderStyleIndex == this.we.renderStyleIndex) {
							lastCall.numIndices += 6;
						} else {
							Te.push(new ctx.RenderCall(this.Ld.geometryBuffers.numIndices,
								6, this.we.renderStyleIndex));
						}
					}

					this.Ld.geometryBuffers.numVertices += 4;
					this.Ld.geometryBuffers.numIndices += 6;
				}
			}

			Xb.Ce(1, se, re, te);
		},

		ue: function (se, re, te) {
			switch (this.Bd.Vc) {
				case 0:
					for (var Wb = 0; Wb < this.Bd.tc.length; ++Wb) {
						this.qe(this.Bd.tc[Wb], se, re, te);
					}
					break;

				case 1:
					for (var Wb = this.Bd.tc.length; Wb-- > 0;) {
						this.qe(this.Bd.tc[Wb], se, re, te);
					}
					break;

				case 2:
					this.Bd.tc.forEach(function (Xb) {
						Xb.depth = ctx.H(te, Xb.Ab);
					});

					this.Bd.tc.sort(function (a, b) {
						if (a.depth < b.depth)
							return 1;
						if (a.depth > b.depth)
							return -1;
						return 0;
					});

					this.Bd.tc.forEach(function (Xb) {
						this.qe(Xb, se, re, te);
					}, this);
					break;
			}
		}
	}

	var ld = function (Ld, we, ve) {
		var Vb = this;
		this.Ld = Ld;
		this.we = we;

		// Eb

		function Eb() {
			this.Fb = 0;
			this.Gb = 1;
			this.Hb = null;
			this.Ib = null;
			this.Kb = 0;
			this.Lb = 1;

			Vb.we.Mb(this); // IMPL

			this.Nb = function () {
				this.Ob = this.Gb;
			}

			this.Nb();
		}

		Eb.prototype = {
			Jd: function () {
				this.Nb();
			},

			Id: function (Qb, Ab) {
				Vb.we.Pb(Qb, Vb, this); // IMPL

				var Rb = Vb.Rb;
				var systemTime = Ld.Rb;
				var Sb = Qb;
				var ic = 0;

				if (this.zb > 0.000001) {

					var Tb = this.Ob + Qb * this.zb;

					while (Tb > 1.0) {
						var Ub = this.zb < 0.001 ? 0.0 : (1.0 - this.Ob) / this.zb;
						Sb -= Ub;
						Rb += Ub;
						systemTime += Ub;

						if (this.Hb != null && Rb > this.Hb) {
							Vb.stop();
							break;
						}

						Vb.Rb = Rb;
						Ld.Rb = systemTime;
						ctx.ab(Vb.Ab, Ab, Vb.Bb, Sb / Qb);

						// for the future when Jb would be external
						this.Lb = this.Jb;

						for (var Wb = 0; Wb < this.Jb; ++Wb) {
							if (Vb.sc.length == 0)
								break;

							if (this.Jb == 1)
								this.Kb = 0;
							else
								this.Kb = Wb / (this.Jb - 1);

							var Xb = Vb.sc.pop();
							Vb.tc.unshift(Xb);

							if (Wb == 0)
								Xb.Yb();
							else
								Xb.Zb();

							Xb.Id(Sb);
							++ic;
						}

						this.Ob = 0.0;
						Tb -= 1.0;

						if (this.Ib != null && ++this.Fb >= this.Ib) {
							Vb.stop();
							break;
						}
					}

					this.Ob = Tb;
				}
				Rb += Sb;
				Vb.Rb = Rb;
				ctx.T(Vb.Ab, Ab);

				return ic;
			}
		}

		// ac

		function ac() {
			this.Gb = 1;
			this.Kb = 0;
			this.Lb = 1;

			Vb.we.Mb(this); // IMPL

			this.Nb = function () {
				this.bc = this.Gb;
			}

			this.Nb();
		}

		ac.prototype = {
			Jd: function () {
				this.Nb();
			},

			Id: function (Qb, Ab) {
				Vb.we.Pb(Qb, Vb, this); // IMPL

				var cc = Vb.Rb;
				var dc = cc + Qb;
				var systemTimeBeforeFrame = Ld.Rb;
				var systemTimeAfterFrame = systemTimeBeforeFrame + Qb;
				var ec = ctx.O(ctx.h(Ab, Vb.Bb));
				var ic = 0;

				if (ec > 0.000001) {
					var fc = ec / this.rd;
					var Tb = this.bc + fc;

					var hc = fc < 0.001 ?
						1.0 - this.bc : (1.0 - this.bc) / fc;

					var jc = [];

					while (Tb > 1.0) {
						var kc = cc + hc * Qb;

						ctx.ab(jc, Vb.Bb, Ab, hc);

						Vb.Rb = kc;
						ctx.T(Vb.Ab, jc);
						Ld.Rb = ctx.X(systemTimeBeforeFrame, systemTimeAfterFrame, hc);

						// for the future when Jb would be external
						this.Lb = this.Jb;

						for (var Wb = 0; Wb < this.Jb; ++Wb) {
							if (Vb.sc.length == 0)
								break;

							if (this.Jb == 1)
								this.Kb = 0;
							else
								this.Kb = Wb / (this.Jb - 1);

							var Xb = Vb.sc.pop();
							Vb.tc.unshift(Xb);

							if (Wb == 0)
								Xb.Yb();
							else
								Xb.Zb();

							Xb.Id(Qb * (1.0 - hc));
							++ic;
						}

						hc += 1.0 / fc;
						Tb -= 1.0;
					}

					this.bc = Tb;
				}

				Vb.Rb = dc;
				ctx.T(Vb.Ab, Ab);

				return ic;
			}
		}

		// mc

		function mc() {
			this.Ab = [];
			this.Pd = [];
			this.Nd = [];
			this.gf = [];
			this.Kc = [];
		}

		mc.prototype = {
			nc: function () {
				this.oc = false;

				for (var i = 0; i < this.Kc.length; ++i) {
					var pc = this.Kc[i];
					pc.Bd.Jd(this.Ab);

					if (pc.Ad.sd)
						pc.Bd.stop();
				}
			},

			Yb: function () {
				Vb.we.fd(Vb, this); // IMPL
				this.nc();
			},

			Zb: function () {
				Vb.we.gd(Vb, this); // IMPL
				this.nc();
			},

			Id: function (Qb) {
				Vb.we.qc(Qb, Vb, this); // IMPL

				this.rc(Qb);
			},

			pc: function (je) {
				return this.Kc[je].Bd;
			},

			rc: function (Qb) {
				for (var i = 0; i < this.Kc.length; i++) {
					this.Kc[i].Bd.Id(Qb, this.Ab);
				}
			},

			uc: function (md, nd) {
				this.Kc.push({
					Bd: new ld(Ld, md, ve),
					Ad: nd
				});
			},

			vc: function (fe, xc, ge) {
				for (var i = 0; i < this.Kc.length; ++i) {
					var pc = this.Kc[i];

					if (xc == pc.Ad.xc)
						pc.Bd.Hd(fe, ge);
				}
			},

			Ce: function (xc, se, re, te) {
				for (var i = 0; i < this.Kc.length; ++i) {
					var pc = this.Kc[i];

					if (xc == pc.Ad.xc)
						pc.Bd.ue(se, re, te);
				}
			},

			wc: function (fe) {
				this.oc = true;
				for (var i = 0; i < this.Kc.length; ++i) {
					var pc = this.Kc[i];

					if (pc.Ad.sd)
						pc.Bd.start();
					else
						pc.Bd.stop();
				}
			},

			yc: function (Gd) {
				for (var i = 0; i < this.Kc.length; ++i) {
					this.Kc[i].Bd.Ed(Gd);
				}
			}
		}

		// zc

		function zc() {
		}

		zc.prototype.Ac = function (Xb) {
			return Vb.we.Cc(Vb, Xb, this); // IMPL
		}

		// ld Ad

		this.Ab = [];
		this.Bb = [];
		this.tc = [];
		this.sc = [];
		this.Wc = new zc();
		this.construct = new ve(this.Ld, this);
		this.Yc = [];
		this.Zc = true;
		this.ad = [];
		this.bd = 0;
		this.cd = 0;

		this.dd = function () {
			this.vd = new Eb();
		}

		this.ed = function () {
			this.vd = new ac();
		}

		this.we.ud(this); // IMPL

		for (var Wb = 0; Wb < this.jd; ++Wb) {
			var Xb = new mc();

			for (var id = 0; id < this.Yc.length; ++id) {
				var hd = this.Yc[id];
				Xb.uc(hd.Db, hd.Ad);
			}

			this.sc.push(Xb);
		}

		this.Nb = function (Ab) {
			ctx.T(this.Ab, Ab);
			ctx.T(this.Bb, this.Ab);
			this.Rb = 0.0;
			this.wd = 0.0;
			this.Zc = true;
		}
	}



	ld.prototype.Jd = function (Ab) {
		this.Nb(Ab);

		this.sc.push.apply(this.sc, this.tc);
		this.tc.length = 0;

		this.vd.Jd();
	}

	ld.prototype.Id = function (Qb, Ab) {
		ctx.T(this.Bb, this.Ab);
		this.wd = this.Rb;

		var shift = [];
		ctx.g(shift, Ab, this.Bb);
		ctx.T(this.ad, shift);
		ctx.w(this.ad, this.ad, Qb);

		this.cd = this.bd;
		this.bd = ctx.O(shift);

		var ic;

		if (this.Zc) {
			ic = this.vd.Id(Qb, Ab);
		}
		else {
			ctx.T(this.Ab, Ab);
			ic = 0;
			this.Rb += Qb;
		}

		for (var Wb = ic; Wb < this.tc.length;) {
			var Xb = this.tc[Wb];

			if (!Xb.oc) {
				Xb.Id(Qb);

				if (this.Wc.Ac(this.tc[Wb])) {
					Xb.wc();

					if (this.xd(Wb))
						continue;
				}
			}
			else {
				Xb.rc(Qb);

				if (this.xd(Wb))
					continue;
			}

			++Wb;
		}
	};

	ld.prototype.xd = function (je) {
		var Xb = this.tc[je];

		var ready = true;

		for (var id = 0; id < Xb.Kc.length; ++id) {
			var Bd = Xb.Kc[id].Bd;

			if (Bd.isActive() || Bd.tc.length > 0) {
				ready = false;
				break;
			}
		}

		if (ready) {
			this.sc.push(this.tc[je]);
			this.tc.splice(je, 1);
			return true;
		}

		return false;
	}

	ld.prototype.Hd = function (fe, ge) {
		this.construct.Hd(fe, ge);
	}

	ld.prototype.ue = function (se, re, te) {
		this.construct.ue(se, re, te);
	}

	ld.prototype.Td = function (Ab) {
		ctx.T(this.Bb, Ab);
		ctx.T(this.wd, this.Rb);
		ctx.T(this.Ab, Ab);
	}

	ld.prototype.uc = function (md, nd) {
		this.Yc.push({ Db: md, Ad: nd });
	}

	ld.prototype.start = function () {
		this.Zc = true;
	}

	ld.prototype.stop = function () {
		this.Zc = false;
	}

	ld.prototype.isActive = function () {
		return this.Zc;
	}

	var ke = function () {
		var Cb = this;

		this._init = function (we, Ab, ve) {
			this./**/model = we;

			this.Ab = [];

			// ke Ad

			this.od = [];

			this.pd = function (md) {
				var Bd = new ld(this, md, ve);
				Bd.Nb(this.Ab);
				this["_".concat(md.name)] = Bd;
				this.od.push(Bd);
			}

			this.Nb = function (Ab) {
				this.Cd = 0.0;
				this.Rb = 0.0;
				ctx.T(this.Ab, Ab);
			}

			this.Nb(Ab);
			this./**/model.qd(this); // IMPL
			this./**/update(this.Ud, Ab);
		}
	}

	ke.prototype./**/restart = function (/**/position) {

		this.Nb(/**/position);

		for (var i = 0; i < this.od.length; ++i) {
			this.od[i].Jd(/**/position);
		}

		this./**/update(this.Ud, /**/position);
	}

	ke.prototype./**/update = function (/**/dt, /**/position) {
		var updatedTime = 0.0;
		var hc = [];

		while ((/**/dt - updatedTime) + this.Cd > this.Dd) {
			var cc = this.Rb;

			ctx.ab(hc, this.Ab, /**/position, updatedTime / /**/dt);

			for (var i = 0; i < this.od.length; ++i) {
				this.od[i].Id(this.Dd, hc);

				this.Rb = cc;
			}

			updatedTime += this.Dd - this.Cd;
			this.Cd = 0.0;
			this.Rb = cc + this.Dd;
		}

		ctx.T(this.Ab, /**/position);
		this.Cd += /**/dt - updatedTime;
	}

	ke.prototype./**/resetPosition = function (/**/position) {
		ctx.T(this.Ab, /**/position);
		for (var i = 0; i < this.od.length; ++i) {
			this.od[i].Td(/**/position);
		}
	}

	ke.prototype./**/setPropertyInAllEmitters = function (/**/name, /**/value) {
		var propName = "_".concat(/**/name);

		if (/**/value instanceof Array) {
			if (/**/value.length == 2) {
				for (var i = 0; i < this.od.length; ++i) {
					ctx.S(this.od[i][propName], /**/value);
				}
			}
			else {
				for (var i = 0; i < this.od.length; ++i) {
					ctx.T(this.od[i][propName], /**/value);
				}
			}
		}
		else {
			for (var i = 0; i < this.od.length; ++i) {
				this.od[i][propName] = /**/value;
			}
		}
	}


	var le = function () {
		this._init = function (we, Ab) {
			le.prototype._init.call(this, we, Ab, oe);

			this.geometryBuffers = new ctx.GeometryBuffers(this./**/model.Xe * 4, [2], this./**/model.Xe * 6);
			this.texturesRemap = [];

			var indices = new Uint16Array(this.geometryBuffers.indices);

			for (var Wb = 0; Wb < this./**/model.Xe; ++Wb) {
				var verDisp = Wb * 4;
				var partIndices = [verDisp + 0, verDisp + 3, verDisp + 1, verDisp + 1, verDisp + 3, verDisp + 2];
				indices.set(partIndices, Wb * 6);
			}
		}
	}

	le.prototype = new ke();

	le.prototype./**/fillGeometryBuffers = function (/**/cameraRight, /**/cameraUp, /**/cameraDir) {
		this.geometryBuffers.numVertices = 0;
		this.geometryBuffers.numIndices = 0;
		this.geometryBuffers./**/renderCalls = [];

		this.od.forEach(function (Bd) {
			Bd.ue(/**/cameraRight, /**/cameraUp, /**/cameraDir);
		}, this);
	}

	var me = function () {
		this._init = function (we, Ab) {
			me.prototype._init.call(this, we, Ab, ne);

			this.materials = [];
			this./**/model.materials.forEach(function (value) {
				this.materials.push(['source-over', 'lighter', 'multiply'][value]);
			}, this);

			this./**/textureDescs = [];
		}
	}

	me.prototype = new ke();

	me.prototype./**/draw = function (/**/context, /**/camera) {
		for (var i = 0; i < this.od.length; ++i) {
			this.od[i].Hd(/**/context, /**/camera);
		}
	}

	this.createWGLInstance = function (/**/position) {
		var Ld = new le();
		Ld._init(this, /**/position);
		return Ld;
	}

	this.createCanvas2DInstance = function (/**/position) {
		var Ld = new me();
		Ld._init(this, /**/position);
		return Ld;
	}
	this.textures = ['stars4x1_gold.png','glow_point_04_gold.png'];
	this.materials = [1];
	this.renderStyles = [{materialIndex:0,textureIndices:[0]},{materialIndex:0,textureIndices:[1]}];
	this.Xe = 20200;

	function Emitter_Stars() {

		var _1, _3 = [], _5 = [], _6, _8, _10, _12=[], _12iv=[], _12fs=[], _12vs=[], _12rw=[], _12rwn=[], _12rwl, _12p=[], _12df, _13, _14, _15, _15i0, _15s0 = [], _16;
		this.pe = [{xe:0,Rc:4,Sc:1,renderStyleIndex:0}];
		this.name = "Stars";

		this.ud = function(Bd) {
			Bd.ed();
			Bd._15 = [
				[
					[0,1,1],
					[1,0.526147,0.526147],
					[0.526147,0.8,0.8],
					[0.8,0,0]
				]
			];
			Bd.jd = 100;
			Bd.Vc = 0;
		}

		this.Mb = function(vd) {
			vd.rd = 3;
			vd.Gb = 1;
			vd.Jb = 1;
		}

		this.Pb = function(Qb, Bd, vd) {
			vd.rd = 3;
		}

		this.fd = function(Bd, Xb) {
			Xb._ = 0.0;
			_1 = 0 + Math.random() * (1 - 0);
			Xb._2 = _1;
			ctx.db(_3, 10);
			Xb._4 = [];
			ctx.c(Xb._4, Bd.Ab, _3);
			ctx.db(_5, 150);
			_6 = ctx.d(Bd.ad, _5);
			Xb._7 = [];
			ctx.T(Xb._7, _6);
			_8 = 0 + Math.random() * (4 - 0);
			Xb._9 = _8;
			_10 = 10 + Math.random() * (40 - 10);
			Xb._11 = _10;
			ctx.T(Xb.Ab, Xb._4);
		}

		this.gd = function(Bd, Xb) {
			Xb._ = 0.0;
			_1 = 0 + Math.random() * (1 - 0);
			Xb._2 = _1;
			ctx.db(_3, 10);
			Xb._4 = [];
			ctx.c(Xb._4, Bd.Ab, _3);
			ctx.db(_5, 150);
			_6 = ctx.d(Bd.ad, _5);
			Xb._7 = [];
			ctx.T(Xb._7, _6);
			_8 = 0 + Math.random() * (4 - 0);
			Xb._9 = _8;
			_10 = 10 + Math.random() * (40 - 10);
			Xb._11 = _10;
			ctx.T(Xb.Ab, Xb._4);
		}

		this.qc = function(Qb, Bd, Xb) {
			Xb._ += Qb;
			ctx.T(_12fs, [0,0,0]);
			ctx.T(_12iv, Xb._7);
			ctx.T(_12vs, [0,0,0]);
			ctx.g(_12rw, _12vs, _12iv);
			_12rwl = ctx.P(_12rw);
			if (_12rwl > 0.0001) {
				_12rwl = Math.sqrt(_12rwl);
				ctx.w(_12rwn, _12rw, _12rwl);
				_12df = 0.01 * 5 * _12rwl;
				if (_12df * Qb < 1) {
					ctx.u(_12rwn, _12rwn, _12rwl * _12df);
					ctx.c(_12fs, _12fs, _12rwn);
				} else {
					ctx.c(_12iv, _12iv, _12rw);
				}
			}
			ctx.u(_12fs, _12fs, Qb);
			ctx.c(_12fs, _12fs, _12iv);
			ctx.u(_12p, _12fs, Qb);
			ctx.c(_12p, _12p, Xb._4);
			ctx.T(Xb._4, _12p);
			ctx.T(Xb._7, _12fs);
			ctx.T(Xb.Ab, Xb._4);
			_13 = Xb._2;
			_14 = (Xb._ / _13);
			_15i0=(_14<0?0:(_14>1?1:_14));
			_15i0<0.6?_15i0<0.1?ctx.V(_15s0,0,(_15i0-0)*10):ctx.V(_15s0,1,(_15i0-0.1)*2):_15i0<0.8?ctx.V(_15s0,2,(_15i0-0.6)*5):ctx.V(_15s0,3,(_15i0-0.8)*5);
			_15 = Db.nb(Bd._15[0][_15s0[0]],_15s0[1]);
			_16 = (Xb._11 * _15);
			ctx.S(Xb.Pd,[0.5,0.5]);
			Xb.Md = 0;
			ctx.V(Xb.Nd,_16,_16);
			ctx.T(Xb.gf,[1,1,1]);
			Xb.Od = 1;
			Xb.Qc = Xb._9;
		}

		this.Cc = function(Bd, Xb, Wc) {
			_13 = Xb._2;
			return Xb._ > _13;
		}


	}

	function Emitter_Glow() {

		var _1, _3 = [], _5 = [], _6, _8, _10, _12=[], _12iv=[], _12fs=[], _12vs=[], _12rw=[], _12rwn=[], _12rwl, _12p=[], _12df, _13, _14, _15, _15i0, _15s0 = [], _16;
		this.pe = [{xe:0,Rc:1,Sc:1,renderStyleIndex:1}];
		this.name = "Glow";

		this.ud = function(Bd) {
			Bd.ed();
			Bd._15 = [
				[
					[0,1,1],
					[1,0,0]
				]
			];
			Bd.jd = 100;
			Bd.Vc = 0;
		}

		this.Mb = function(vd) {
			vd.rd = 10;
			vd.Gb = 1;
			vd.Jb = 1;
		}

		this.Pb = function(Qb, Bd, vd) {
			vd.rd = 10;
		}

		this.fd = function(Bd, Xb) {
			Xb._ = 0.0;
			_1 = 0.3 + Math.random() * (0.6 - 0.3);
			Xb._2 = _1;
			ctx.db(_3, 5);
			Xb._4 = [];
			ctx.c(Xb._4, Bd.Ab, _3);
			ctx.db(_5, 100);
			_6 = ctx.d(Bd.ad, _5);
			Xb._7 = [];
			ctx.T(Xb._7, _6);
			_8 = 0 + Math.random() * (4 - 0);
			Xb._9 = _8;
			_10 = 40 + Math.random() * (50 - 40);
			Xb._11 = _10;
			ctx.T(Xb.Ab, Xb._4);
		}

		this.gd = function(Bd, Xb) {
			Xb._ = 0.0;
			_1 = 0.3 + Math.random() * (0.6 - 0.3);
			Xb._2 = _1;
			ctx.db(_3, 5);
			Xb._4 = [];
			ctx.c(Xb._4, Bd.Ab, _3);
			ctx.db(_5, 100);
			_6 = ctx.d(Bd.ad, _5);
			Xb._7 = [];
			ctx.T(Xb._7, _6);
			_8 = 0 + Math.random() * (4 - 0);
			Xb._9 = _8;
			_10 = 40 + Math.random() * (50 - 40);
			Xb._11 = _10;
			ctx.T(Xb.Ab, Xb._4);
		}

		this.qc = function(Qb, Bd, Xb) {
			Xb._ += Qb;
			ctx.T(_12fs, [0,0,0]);
			ctx.T(_12iv, Xb._7);
			ctx.T(_12vs, [0,0,0]);
			ctx.g(_12rw, _12vs, _12iv);
			_12rwl = ctx.P(_12rw);
			if (_12rwl > 0.0001) {
				_12rwl = Math.sqrt(_12rwl);
				ctx.w(_12rwn, _12rw, _12rwl);
				_12df = 0.01 * 5 * _12rwl;
				if (_12df * Qb < 1) {
					ctx.u(_12rwn, _12rwn, _12rwl * _12df);
					ctx.c(_12fs, _12fs, _12rwn);
				} else {
					ctx.c(_12iv, _12iv, _12rw);
				}
			}
			ctx.u(_12fs, _12fs, Qb);
			ctx.c(_12fs, _12fs, _12iv);
			ctx.u(_12p, _12fs, Qb);
			ctx.c(_12p, _12p, Xb._4);
			ctx.T(Xb._4, _12p);
			ctx.T(Xb._7, _12fs);
			ctx.T(Xb.Ab, Xb._4);
			_13 = Xb._2;
			_14 = (Xb._ / _13);
			_15i0=(_14<0?0:(_14>1?1:_14));
			_15i0<0.1?ctx.V(_15s0,0,(_15i0-0)*10):ctx.V(_15s0,1,(_15i0-0.1)*1.11111);
			_15 = Db.nb(Bd._15[0][_15s0[0]],_15s0[1]);
			_16 = (_15 * 0.4);
			ctx.S(Xb.Pd,[0.5,0.5]);
			Xb.Md = 0;
			ctx.V(Xb.Nd,Xb._11,Xb._11);
			ctx.T(Xb.gf,[1,1,1]);
			Xb.Od = _16;
			Xb.Qc = 0;
		}

		this.Cc = function(Bd, Xb, Wc) {
			_13 = Xb._2;
			return Xb._ > _13;
		}


	}

	function Emitter_Parent() {

		var _1, _2, _3 = [], _3i, _3s = [], _4 = [];
		this.pe = [];
		this.name = "Parent";

		this.ud = function(Bd) {
			Bd.dd();
			Bd._3 = [
				[[198,166],[192.722,166.479],[187.484,167.28],[182.299,168.378],[177.182,169.757],[172.146,171.406],[167.205,173.321],[162.376,175.505],[157.682,177.965],[153.153,180.717],[148.832,183.784],[144.779,187.197],[141.089,190.997],[137.902,195.227],[135.439,199.912],[134,205],[134,205]],
				[[134,205],[135,416],[135,416]],
				[[135,416],[136.079,420.32],[137.993,424.345],[140.477,428.05],[143.354,431.459],[146.517,434.605],[149.897,437.518],[153.45,440.219],[157.145,442.72],[160.963,445.029],[164.892,447.145],[168.923,449.059],[173.051,450.752],[177.275,452.19],[181.594,453.311],[186,454],[186,454]],
				[[186,454],[667,450],[667,450]],
				[[667,450],[670.932,449.267],[674.669,447.836],[678.143,445.848],[681.336,443.433],[684.257,440.693],[686.923,437.705],[689.354,434.522],[691.564,431.181],[693.564,427.711],[695.36,424.13],[696.953,420.455],[698.334,416.696],[699.491,412.861],[700.395,408.959],[701,405],[701,405]],
				[[701,405],[699,201],[699,201]],
				[[699,201],[697.74,195.393],[695.636,190.045],[692.769,185.064],[689.23,180.535],[685.124,176.511],[680.56,173.016],[675.637,170.045],[670.446,167.572],[665.057,165.563],[659.53,163.975],[653.907,162.766],[648.221,161.899],[642.497,161.336],[636.752,161.046],[631,161],[631,161]]
			];
			Bd.uc(new Emitter_Stars(), { xc: 1, sd: false });
			Bd.uc(new Emitter_Glow(), { xc: 1, sd: false });
			Bd.jd = 100;
			Bd.Vc = 0;
		}

		this.Mb = function(vd) {
			vd.zb = 1;
			vd.Gb = 1;
			vd.Jb = 1;
		}

		this.Pb = function(Qb, Bd, vd) {
			vd.zb = 1;
		}

		this.fd = function(Bd, Xb) {
			Xb._ = 0.0;
			_1 = 2.1;
			_2 = (Xb._ / _1);
			_3i = Db.kb(_2);
			_3i<0.705294?_3i<0.244354?_3i<0.0668505?ctx.V(_3s,0,(_3i-0)*224.381):ctx.V(_3s,1,(_3i-0.0668505)*5.63368):_3i<0.300643?ctx.V(_3s,2,(_3i-0.244354)*266.485):ctx.V(_3s,3,(_3i-0.300643)*2.47126):_3i<0.927445?_3i<0.755824?ctx.V(_3s,4,(_3i-0.705294)*296.857):ctx.V(_3s,5,(_3i-0.755824)*5.82678):ctx.V(_3s,6,(_3i-0.927445)*206.74);
			Db.lb(_3, Bd._3[_3s[0]], _3s[1]);
			ctx.W(_4, _3[0], _3[1], 0);
			ctx.T(Xb.Ab, _4);
		}

		this.gd = function(Bd, Xb) {
			Xb._ = 0.0;
			_1 = 2.1;
			_2 = (Xb._ / _1);
			_3i = Db.kb(_2);
			_3i<0.705294?_3i<0.244354?_3i<0.0668505?ctx.V(_3s,0,(_3i-0)*224.381):ctx.V(_3s,1,(_3i-0.0668505)*5.63368):_3i<0.300643?ctx.V(_3s,2,(_3i-0.244354)*266.485):ctx.V(_3s,3,(_3i-0.300643)*2.47126):_3i<0.927445?_3i<0.755824?ctx.V(_3s,4,(_3i-0.705294)*296.857):ctx.V(_3s,5,(_3i-0.755824)*5.82678):ctx.V(_3s,6,(_3i-0.927445)*206.74);
			Db.lb(_3, Bd._3[_3s[0]], _3s[1]);
			ctx.W(_4, _3[0], _3[1], 0);
			ctx.T(Xb.Ab, _4);
		}

		this.qc = function(Qb, Bd, Xb) {
			Xb._ += Qb;
			_1 = 2.1;
			_2 = (Xb._ / _1);
			_3i = Db.kb(_2);
			_3i<0.705294?_3i<0.244354?_3i<0.0668505?ctx.V(_3s,0,(_3i-0)*224.381):ctx.V(_3s,1,(_3i-0.0668505)*5.63368):_3i<0.300643?ctx.V(_3s,2,(_3i-0.244354)*266.485):ctx.V(_3s,3,(_3i-0.300643)*2.47126):_3i<0.927445?_3i<0.755824?ctx.V(_3s,4,(_3i-0.705294)*296.857):ctx.V(_3s,5,(_3i-0.755824)*5.82678):ctx.V(_3s,6,(_3i-0.927445)*206.74);
			Db.lb(_3, Bd._3[_3s[0]], _3s[1]);
			ctx.W(_4, _3[0], _3[1], 0);
			ctx.T(Xb.Ab, _4);
		}

		this.Cc = function(Bd, Xb, Wc) {
			_1 = 2.1;
			return Xb._ > _1;
		}


	}

	this.qd = function(Ld) {
		Ld.Dd = 0.0333333;
		Ld.Ud = 2;
		Ld.pd(new Emitter_Stars());
		Ld.pd(new Emitter_Glow());
		Ld.pd(new Emitter_Parent());
	}
			this.kb = function (v) { 				return (v < 0) ? 0 : ((v > 1) ? 1 : v); 			}

			this.lb = function (r, path, je) { 				var indexInt = Math.floor(je); 				var lerp = je - indexInt; 				ctx.Y(r, path[indexInt], path[indexInt + 1], lerp); 			}

			this.nb = function(funcValues, je) { 				var indexInt = Math.floor(je); 				var nextInt = indexInt + 1; 				return ctx.X(funcValues[indexInt], funcValues[nextInt], je - indexInt); 			}

}
