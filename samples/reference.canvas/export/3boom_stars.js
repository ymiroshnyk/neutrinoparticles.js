// 6fc9dab4-f11f-49ef-ab0f-a25d810ee262

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
	this.textures = ['stars4x4.png'];
	this.materials = [0];
	this.renderStyles = [{materialIndex:0,textureIndices:[0]}];
	this.Xe = 8420;

	function Emitter_child2() {

		var _4, _8 = [], _9, _11 = [], _13, _15, _17=[], _17iv=[], _17fs=[], _17vs=[], _17rw=[], _17rwn=[], _17rwl, _17p=[], _17df, _18, _20=[], _20i=[], _19;
		this.pe = [{xe:1,Rc:2,Sc:2,renderStyleIndex:0}];
		this.name = "child2";

		this.ud = function(Bd) {
			Bd._ = [0,0,0];
			Bd._1 = 0;
			Bd._2 = [0,0,0];
			Bd.dd();
			Bd.jd = 20;
			Bd.Vc = 0;
		}

		this.Mb = function(vd) {
			vd.zb = 0.3;
			vd.Gb = 1;
			vd.Jb = 5;
			vd.Ib = 1;
		}

		this.Pb = function(Qb, Bd, vd) {
			vd.zb = 0.3;
		}

		this.fd = function(Bd, Xb) {
			Xb.Mc=[];
			Xb._3 = 0.0;
			_4 = 1 + Math.random() * (2 - 1);
			Xb._5 = _4;
			Xb._6 = Bd._1;
			Xb._7 = [];
			ctx.T(Xb._7, Bd._2);
			ctx.db(_8, 100);
			_9 = ctx.d(_8, Bd._);
			Xb._10 = [];
			ctx.T(Xb._10, _9);
			ctx.db(_11, 1);
			Xb._12 = [];
			ctx.T(Xb._12, _11);
			_13 = -360 + Math.random() * (360 - -360);
			Xb._14 = _13;
			_15 = 0 + Math.random() * (360 - 0);
			Xb._16 = _15;
			ctx.T(Xb.Ab, Xb._7);
		}

		this.gd = function(Bd, Xb) {
			Xb.Mc=[];
			Xb._3 = 0.0;
			_4 = 1 + Math.random() * (2 - 1);
			Xb._5 = _4;
			Xb._6 = Bd._1;
			Xb._7 = [];
			ctx.T(Xb._7, Bd._2);
			ctx.db(_8, 100);
			_9 = ctx.d(_8, Bd._);
			Xb._10 = [];
			ctx.T(Xb._10, _9);
			ctx.db(_11, 1);
			Xb._12 = [];
			ctx.T(Xb._12, _11);
			_13 = -360 + Math.random() * (360 - -360);
			Xb._14 = _13;
			_15 = 0 + Math.random() * (360 - 0);
			Xb._16 = _15;
			ctx.T(Xb.Ab, Xb._7);
		}

		this.qc = function(Qb, Bd, Xb) {
			Xb._3 += Qb;
			ctx.T(_17fs, [0,200,0]);
			ctx.T(_17iv, Xb._10);
			ctx.T(_17vs, [0,0,0]);
			ctx.g(_17rw, _17vs, _17iv);
			_17rwl = ctx.P(_17rw);
			if (_17rwl > 0.0001) {
				_17rwl = Math.sqrt(_17rwl);
				ctx.w(_17rwn, _17rw, _17rwl);
				_17df = 0.01 * 0.5 * _17rwl;
				if (_17df * Qb < 1) {
					ctx.u(_17rwn, _17rwn, _17rwl * _17df);
					ctx.c(_17fs, _17fs, _17rwn);
				} else {
					ctx.c(_17iv, _17iv, _17rw);
				}
			}
			ctx.u(_17fs, _17fs, Qb);
			ctx.c(_17fs, _17fs, _17iv);
			ctx.u(_17p, _17fs, Qb);
			ctx.c(_17p, _17p, Xb._7);
			ctx.T(Xb._7, _17p);
			ctx.T(Xb._10, _17fs);
			_18 = Xb._16 + Qb * Xb._14;
			Xb._16 = _18;
			ctx.T(Xb.Ab, Xb._7);
			ctx.Q(_20i, Xb._12);
			ctx.qb(_20, _20i, Xb._16);
			ctx.S(Xb.Pd,[0.5,0.5]);
			ctx.U(Xb.Mc, _20);
			ctx.V(Xb.Nd,10,10);
			ctx.T(Xb.gf,[1,1,1]);
			Xb.Od = 1;
			Xb.Qc = Xb._6;
		}

		this.Cc = function(Bd, Xb, Wc) {
			_19 = Xb._5;
			return Xb._3 > _19;
		}


	}

	function Emitter_child() {

		var _4, _8 = [], _9, _11 = [], _13, _15, _17=[], _17iv=[], _17fs=[], _17vs=[], _17rw=[], _17rwn=[], _17rwl, _17p=[], _17df, _18, _20=[], _20i=[], _19;
		this.pe = [{xe:1,Rc:2,Sc:2,renderStyleIndex:0}];
		this.name = "child";

		this.ud = function(Bd) {
			Bd._ = [0,0,0];
			Bd._1 = 0;
			Bd._2 = [0,0,0];
			Bd.dd();
			Bd.uc(new Emitter_child2(), { xc: 1, sd: true });
			Bd.jd = 20;
			Bd.Vc = 0;
		}

		this.Mb = function(vd) {
			vd.zb = 0.3;
			vd.Gb = 1;
			vd.Jb = 5;
			vd.Ib = 1;
		}

		this.Pb = function(Qb, Bd, vd) {
			vd.zb = 0.3;
		}

		this.fd = function(Bd, Xb) {
			Xb.Mc=[];
			Xb._3 = 0.0;
			_4 = 1 + Math.random() * (2 - 1);
			Xb._5 = _4;
			Xb._6 = Bd._1;
			Xb._7 = [];
			ctx.T(Xb._7, Bd._2);
			ctx.db(_8, 150);
			_9 = ctx.d(_8, Bd._);
			Xb._10 = [];
			ctx.T(Xb._10, _9);
			ctx.db(_11, 1);
			Xb._12 = [];
			ctx.T(Xb._12, _11);
			_13 = -360 + Math.random() * (360 - -360);
			Xb._14 = _13;
			_15 = 0 + Math.random() * (360 - 0);
			Xb._16 = _15;
			ctx.T(Xb.Ab, Xb._7);
			Xb.pc(0)._ = Xb._10;
			Xb.pc(0)._1 = Xb._6;
			Xb.pc(0)._2 = Xb._7;
		}

		this.gd = function(Bd, Xb) {
			Xb.Mc=[];
			Xb._3 = 0.0;
			_4 = 1 + Math.random() * (2 - 1);
			Xb._5 = _4;
			Xb._6 = Bd._1;
			Xb._7 = [];
			ctx.T(Xb._7, Bd._2);
			ctx.db(_8, 150);
			_9 = ctx.d(_8, Bd._);
			Xb._10 = [];
			ctx.T(Xb._10, _9);
			ctx.db(_11, 1);
			Xb._12 = [];
			ctx.T(Xb._12, _11);
			_13 = -360 + Math.random() * (360 - -360);
			Xb._14 = _13;
			_15 = 0 + Math.random() * (360 - 0);
			Xb._16 = _15;
			ctx.T(Xb.Ab, Xb._7);
			Xb.pc(0)._ = Xb._10;
			Xb.pc(0)._1 = Xb._6;
			Xb.pc(0)._2 = Xb._7;
		}

		this.qc = function(Qb, Bd, Xb) {
			Xb._3 += Qb;
			ctx.T(_17fs, [0,200,0]);
			ctx.T(_17iv, Xb._10);
			ctx.T(_17vs, [0,0,0]);
			ctx.g(_17rw, _17vs, _17iv);
			_17rwl = ctx.P(_17rw);
			if (_17rwl > 0.0001) {
				_17rwl = Math.sqrt(_17rwl);
				ctx.w(_17rwn, _17rw, _17rwl);
				_17df = 0.01 * 1 * _17rwl;
				if (_17df * Qb < 1) {
					ctx.u(_17rwn, _17rwn, _17rwl * _17df);
					ctx.c(_17fs, _17fs, _17rwn);
				} else {
					ctx.c(_17iv, _17iv, _17rw);
				}
			}
			ctx.u(_17fs, _17fs, Qb);
			ctx.c(_17fs, _17fs, _17iv);
			ctx.u(_17p, _17fs, Qb);
			ctx.c(_17p, _17p, Xb._7);
			ctx.T(Xb._7, _17p);
			ctx.T(Xb._10, _17fs);
			_18 = Xb._16 + Qb * Xb._14;
			Xb._16 = _18;
			ctx.T(Xb.Ab, Xb._7);
			Xb.pc(0)._ = Xb._10;
			Xb.pc(0)._1 = Xb._6;
			Xb.pc(0)._2 = Xb._7;
			ctx.Q(_20i, Xb._12);
			ctx.qb(_20, _20i, Xb._16);
			ctx.S(Xb.Pd,[0.5,0.5]);
			ctx.U(Xb.Mc, _20);
			ctx.V(Xb.Nd,20,20);
			ctx.T(Xb.gf,[1,1,1]);
			Xb.Od = 1;
			Xb.Qc = Xb._6;
		}

		this.Cc = function(Bd, Xb, Wc) {
			_19 = Xb._5;
			return Xb._3 > _19;
		}


	}

	function Emitter_parent() {

		var _3, _5, _8 = [], _9, _11 = [], _13, _15, _17=[], _17iv=[], _17fs=[], _17vs=[], _17rw=[], _17rwn=[], _17rwl, _17p=[], _17df, _18, _20=[], _20i=[], _19;
		this.pe = [{xe:1,Rc:2,Sc:2,renderStyleIndex:0}];
		this.name = "parent";

		this.ud = function(Bd) {
			Bd._ = [0,0,0];
			Bd._1 = [400,100,0];
			Bd.dd();
			Bd.uc(new Emitter_child(), { xc: 1, sd: true });
			Bd.jd = 20;
			Bd.Vc = 0;
		}

		this.Mb = function(vd) {
			vd.zb = 0.3;
			vd.Gb = 1;
			vd.Jb = 10;
		}

		this.Pb = function(Qb, Bd, vd) {
			vd.zb = 0.3;
		}

		this.fd = function(Bd, Xb) {
			Xb.Mc=[];
			Xb._2 = 0.0;
			_3 = 1 + Math.random() * (2 - 1);
			Xb._4 = _3;
			_5 = 0 + Math.random() * (4 - 0);
			Xb._6 = _5;
			Xb._7 = [];
			ctx.T(Xb._7, Bd._1);
			ctx.db(_8, 400);
			_9 = ctx.d(_8, Bd._);
			Xb._10 = [];
			ctx.T(Xb._10, _9);
			ctx.db(_11, 1);
			Xb._12 = [];
			ctx.T(Xb._12, _11);
			_13 = -360 + Math.random() * (360 - -360);
			Xb._14 = _13;
			_15 = 0 + Math.random() * (360 - 0);
			Xb._16 = _15;
			ctx.T(Xb.Ab, Xb._7);
			Xb.pc(0)._ = Xb._10;
			Xb.pc(0)._1 = Xb._6;
			Xb.pc(0)._2 = Xb._7;
		}

		this.gd = function(Bd, Xb) {
			Xb.Mc=[];
			Xb._2 = 0.0;
			_3 = 1 + Math.random() * (2 - 1);
			Xb._4 = _3;
			_5 = 0 + Math.random() * (4 - 0);
			Xb._6 = _5;
			Xb._7 = [];
			ctx.T(Xb._7, Bd._1);
			ctx.db(_8, 400);
			_9 = ctx.d(_8, Bd._);
			Xb._10 = [];
			ctx.T(Xb._10, _9);
			ctx.db(_11, 1);
			Xb._12 = [];
			ctx.T(Xb._12, _11);
			_13 = -360 + Math.random() * (360 - -360);
			Xb._14 = _13;
			_15 = 0 + Math.random() * (360 - 0);
			Xb._16 = _15;
			ctx.T(Xb.Ab, Xb._7);
			Xb.pc(0)._ = Xb._10;
			Xb.pc(0)._1 = Xb._6;
			Xb.pc(0)._2 = Xb._7;
		}

		this.qc = function(Qb, Bd, Xb) {
			Xb._2 += Qb;
			ctx.T(_17fs, [0,200,0]);
			ctx.T(_17iv, Xb._10);
			ctx.T(_17vs, [0,0,0]);
			ctx.g(_17rw, _17vs, _17iv);
			_17rwl = ctx.P(_17rw);
			if (_17rwl > 0.0001) {
				_17rwl = Math.sqrt(_17rwl);
				ctx.w(_17rwn, _17rw, _17rwl);
				_17df = 0.01 * 1.5 * _17rwl;
				if (_17df * Qb < 1) {
					ctx.u(_17rwn, _17rwn, _17rwl * _17df);
					ctx.c(_17fs, _17fs, _17rwn);
				} else {
					ctx.c(_17iv, _17iv, _17rw);
				}
			}
			ctx.u(_17fs, _17fs, Qb);
			ctx.c(_17fs, _17fs, _17iv);
			ctx.u(_17p, _17fs, Qb);
			ctx.c(_17p, _17p, Xb._7);
			ctx.T(Xb._7, _17p);
			ctx.T(Xb._10, _17fs);
			_18 = Xb._16 + Qb * Xb._14;
			Xb._16 = _18;
			ctx.T(Xb.Ab, Xb._7);
			Xb.pc(0)._ = Xb._10;
			Xb.pc(0)._1 = Xb._6;
			Xb.pc(0)._2 = Xb._7;
			ctx.Q(_20i, Xb._12);
			ctx.qb(_20, _20i, Xb._16);
			ctx.S(Xb.Pd,[0.5,0.5]);
			ctx.U(Xb.Mc, _20);
			ctx.V(Xb.Nd,30,30);
			ctx.T(Xb.gf,[1,1,1]);
			Xb.Od = 1;
			Xb.Qc = Xb._6;
		}

		this.Cc = function(Bd, Xb, Wc) {
			_19 = Xb._4;
			return Xb._2 > _19;
		}


	}

	this.qd = function(Ld) {
		Ld.Dd = 0.0333333;
		Ld.Ud = 0;
		Ld.pd(new Emitter_parent());
	}
}
