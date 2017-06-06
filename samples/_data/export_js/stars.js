// 3cf30122-7679-4de4-b8b0-99be89410d13

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

		this.vertex = [
			{ /**/position: [0.0, 0.0, 0.0], /**/color: [0, 0, 0, 0], /**/texCoords: [[0.0, 0.0]] },
			{ /**/position: [0.0, 0.0, 0.0], /**/color: [0, 0, 0, 0], /**/texCoords: [[0.0, 0.0]] },
			{ /**/position: [0.0, 0.0, 0.0], /**/color: [0, 0, 0, 0], /**/texCoords: [[0.0, 0.0]] },
			{ /**/position: [0.0, 0.0, 0.0], /**/color: [0, 0, 0, 0], /**/texCoords: [[0.0, 0.0]] }];
	}

	oe.prototype = {
		qe: function (Xb, se, re, te, renderBuffer) {
			Xb.Ce(-1, se, re, te, renderBuffer);

			if (this.we) {

				if (!Xb.oc) {

					var v0 = this.vertex[0];
					var v1 = this.vertex[1];
					var v2 = this.vertex[2];
					var v3 = this.vertex[3];

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

					ctx.c(v0./**/position, He, Je);
					ctx.c(v0./**/position, v0./**/position, Xb.Ab);
					ctx.c(v1./**/position, He, Ke);
					ctx.c(v1./**/position, v1./**/position, Xb.Ab);
					ctx.c(v2./**/position, Ie, Ke);
					ctx.c(v2./**/position, v2./**/position, Xb.Ab);
					ctx.c(v3./**/position, Ie, Je);
					ctx.c(v3./**/position, v3./**/position, Xb.Ab);

					{
						var rgb = ctx.v(Xb.gf, 255);
						v0./**/color = v1./**/color = v2./**/color = v3./**/color = [rgb[0], rgb[1], rgb[2], Xb.Od * 255];
					}

					{
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

						v0./**/texCoords[0] = [Pe, Se];
						v1./**/texCoords[0] = [Pe, Re];
						v2./**/texCoords[0] = [Qe, Re];
						v3./**/texCoords[0] = [Qe, Se];
					}

					renderBuffer.pushVertex(v0);
					renderBuffer.pushVertex(v1);
					renderBuffer.pushVertex(v2);
					renderBuffer.pushVertex(v3);

					if (!renderBuffer.__lastRenderCall) {
						renderBuffer.__lastRenderCall = new ctx.RenderCall(0, 6, this.we.renderStyleIndex);
					} else {
						var lastRenderCall = renderBuffer.__lastRenderCall;

						if (lastRenderCall.renderStyleIndex == this.we.renderStyleIndex) {
							lastRenderCall.numIndices += 6;
						} else {
							renderBuffer.pushRenderCall(lastRenderCall);
							renderBuffer.__lastRenderCall = new ctx.RenderCall(
								lastRenderCall.startIndex + lastRenderCall.numIndices,
								6, this.we.renderStyleIndex);
						}
					}
				}
			}

			Xb.Ce(1, se, re, te, renderBuffer);
		},

		ue: function (se, re, te, renderBuffer) {
			switch (this.Bd.Vc) {
				case 0:
					for (var Wb = 0; Wb < this.Bd.tc.length; ++Wb) {
						this.qe(this.Bd.tc[Wb], se, re, te, renderBuffer);
					}
					break;

				case 1:
					for (var Wb = this.Bd.tc.length; Wb-- > 0;) {
						this.qe(this.Bd.tc[Wb], se, re, te, renderBuffer);
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
						this.qe(Xb, se, re, te, renderBuffer);
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

			Id: function (Qb, Ab, Mc) {
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

						if (Ab)
							ctx.ab(Vb.Ab, Ab, Vb.Bb, Sb / Qb);

						if (Mc)
							ctx.slerpq(Vb.Mc, Mc, Vb.prevRotation, Sb / Qb);

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

				if (Ab)
					ctx.T(Vb.Ab, Ab);

				if (Mc)
					ctx.T(Vb.Mc, Mc);

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

			Id: function (Qb, Ab, Mc) {
				Vb.we.Pb(Qb, Vb, this); // IMPL

				var cc = Vb.Rb;
				var dc = cc + Qb;
				var systemTimeBeforeFrame = Ld.Rb;
				var systemTimeAfterFrame = systemTimeBeforeFrame + Qb;
				var ec = Ab ? ctx.O(ctx.h(Ab, Vb.Bb)) : 0;
				var ic = 0;

				if (ec > 0.000001) {
					var fc = ec / this.rd;
					var Tb = this.bc + fc;

					var hc = fc < 0.001 ?
						1.0 - this.bc : (1.0 - this.bc) / fc;

					var jc = [];

					while (Tb > 1.0) {
						var kc = cc + hc * Qb;

						if (Ab)
							ctx.ab(jc, Vb.Bb, Ab, hc);

						if (Mc)
							ctx.slerpq(currentEmitterRot, Vb.prevRotation, Mc, hc);

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

				if (Ab)
					ctx.T(Vb.Ab, Ab);

				if (Mc)
					ctx.U(Vb.Mc, Mc);

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
					pc.Bd.Jd(this.Ab, null);

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
					this.Kc[i].Bd.Id(Qb, this.Ab, null);
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

			Ce: function (xc, se, re, te, renderBuffer) {
				for (var i = 0; i < this.Kc.length; ++i) {
					var pc = this.Kc[i];

					if (xc == pc.Ad.xc)
						pc.Bd.ue(se, re, te, renderBuffer);
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
		this.Mc = [];
		this.prevRotation = [];
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

		this.Nb = function (Ab, Mc) {

			ctx.T(this.Ab, Ab ? Ab : [0, 0, 0]);
			ctx.T(this.Bb, this.Ab);
			ctx.U(this.Mc, Mc ? Mc : [0, 0, 0, 1]);
			ctx.U(this.prevRotation, this.Mc);

			this.Rb = 0.0;
			this.wd = 0.0;
			this.Zc = true;
		}
	}



	ld.prototype.Jd = function (Ab, Mc) {
		this.Nb(Ab, Mc);

		this.sc.push.apply(this.sc, this.tc);
		this.tc.length = 0;

		this.vd.Jd();
	}

	ld.prototype.Id = function (Qb, Ab, Mc) {
		this.wd = this.Rb;

		if (Ab) {
			ctx.T(this.Bb, this.Ab);
			var shift = [];
			ctx.g(shift, Ab, this.Bb);
			ctx.T(this.ad, shift);
			ctx.w(this.ad, this.ad, Qb);

			this.cd = this.bd;
			this.bd = ctx.O(shift);
		}
		else {
			ctx.W(this.ad, 0, 0, 0);
		}

		if (Mc)
		{
			ctx.T(this.prevRotation, this.Mc);
		}

		var ic;

		if (this.Zc) {
			ic = this.vd.Id(Qb, Ab, Mc);
		}
		else {
			if (Ab)
				ctx.T(this.Ab, Ab);

			if (Mc)
				ctx.U(this.Mc, Mc);

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

	ld.prototype.ue = function (se, re, te, renderBuffer) {
		this.construct.ue(se, re, te, renderBuffer);
	}

	ld.prototype.Td = function (Ab, Mc) {
		this.wd = this.Rb;

		if (Ab) {
			ctx.T(this.Bb, this.Ab);
			ctx.T(this.Ab, Ab);
		}

		if (Mc) {
			ctx.U(this.prevRotation, this.Mc);
			ctx.U(this.Mc, Mc);
		}
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

		this._init = function (we, Ab, Mc, ve) {
			this./**/model = we;

			this.Ab = [];
			this.Mc = [];

			// ke Ad

			this.od = [];

			this.pd = function (md) {
				var Bd = new ld(this, md, ve);
				Bd.Nb(this.Ab, this.Mc);
				this["_".concat(md.name)] = Bd;
				this.od.push(Bd);
			}

			this.Nb = function (Ab, Mc) {
				this.Cd = 0.0;
				this.Rb = 0.0;
				ctx.T(this.Ab, Ab ? Ab : [0, 0, 0]);
				ctx.U(this.Mc, Mc ? Mc : [0, 0, 0, 1]);
			}

			this.Nb(Ab, Mc);
			this./**/model.qd(this); // IMPL
			this./**/update(this.Ud, Ab, Mc);
		}
	}

	ke.prototype./**/restart = function (/**/position, /**/rotation) {

		this.Nb(/**/position, /**/rotation);

		for (var i = 0; i < this.od.length; ++i) {
			this.od[i].Jd(/**/position, /**/rotation);
		}

		this./**/update(this.Ud, /**/position, /**/rotation);
	}

	ke.prototype./**/update = function (/**/dt, /**/position, /**/rotation) {
		var updatedTime = 0.0;
		var hc = [];
		ctx.T(hc, this.Ab);
		var frameRotation = [];
		ctx.U(frameRotation, this.Mc);

		if (/**/position && ctx.equalv3_(/**/position, this.Ab))
			/**/position = null;

		if (/**/rotation && ctx.equalq_(/**/rotation, this.Mc))
			/**/rotation = null;

		while ((/**/dt - updatedTime) + this.Cd > this.Dd) {
			var cc = this.Rb;

			if (/**/position)
				ctx.ab(hc, this.Ab, /**/position, updatedTime / /**/dt);

			if (/**/rotation)
				ctx.slerpq(frameRotation, this.Mc, /**/rotation, updatedTime / /**/dt);

			for (var i = 0; i < this.od.length; ++i) {
				this.od[i].Id(this.Dd, hc, frameRotation);

				this.Rb = cc;
			}

			updatedTime += this.Dd - this.Cd;
			this.Cd = 0.0;
			this.Rb = cc + this.Dd;
		}

		if (/**/position)
			ctx.T(this.Ab, /**/position);

		if (/**/rotation)
			ctx.U(this.Mc, /**/rotation);

		this.Cd += /**/dt - updatedTime;
	}

	ke.prototype./**/resetPosition = function (/**/position, /**/rotation) {

		if (Ab)
			ctx.T(this.Ab, /**/position);

		if (Mc)
			ctx.U(this.Mc, /**/rotation);

		for (var i = 0; i < this.od.length; ++i) {
			this.od[i].Td(/**/position, /**/rotation);
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
		this._init = function (we, Ab, Mc, renderBuffer) {
			le.prototype._init.call(this, we, Ab, Mc, oe);

			this.texturesRemap = [];

			var indices = [];

			{
				var verDisp;
				for (var Wb = 0; Wb < this./**/model.Xe; ++Wb) {
					verDisp = Wb * 4;
					indices.push(verDisp + 0, verDisp + 3, verDisp + 1, verDisp + 1, verDisp + 3, verDisp + 2);
				}
			}

			this.renderBuffer = renderBuffer;
			this.renderBuffer.initialize(this./**/model.Xe * 4, [2], indices, this./**/model.Xe);
			this.renderBuffer.__numIndices = 0;
		}
	}

	le.prototype = new ke();

	le.prototype./**/fillGeometryBuffers = function (/**/cameraRight, /**/cameraUp, /**/cameraDir) {
		this.renderBuffer.cleanup();
		this.renderBuffer.__lastRenderCall = null;

		this.od.forEach(function (Bd) {
			Bd.ue(/**/cameraRight, /**/cameraUp, /**/cameraDir, this.renderBuffer);
		}, this);

		if (this.renderBuffer.__lastRenderCall)
			this.renderBuffer.pushRenderCall(this.renderBuffer.__lastRenderCall);
	}

	var me = function () {
		this._init = function (we, Ab, Mc) {
			me.prototype._init.call(this, we, Ab, Mc, ne);

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

	this.createWGLInstance = function (/**/position, /**/rotation, /**/renderBuffer) {
		var Ld = new le();
		Ld._init(this, /**/position, /**/rotation, /**/renderBuffer);
		return Ld;
	}

	this.createCanvas2DInstance = function (/**/position, /**/rotation) {
		var Ld = new me();
		Ld._init(this, /**/position, /**/rotation);
		return Ld;
	}
	this.textures = ['stars4x4.png','star_glow_white.png'];
	this.materials = [0];
	this.renderStyles = [{materialIndex:0,textureIndices:[0]},{materialIndex:0,textureIndices:[1]}];
	this.Xe = 200;

	function Emitter_Stars_from_grid() {

		var _1, _2 = [], _2i, _2s = [], _3 = [], _5 = [], _7, _9, _11, _13=[], _14, _16, _15;
		this.pe = [{xe:0,Rc:2,Sc:2,renderStyleIndex:0}];
		this.name = "Stars_from_grid";

		this.ud = function(Bd) {
			Bd.dd();
			Bd._2 = [
				[[-200,200],[-199,-200],[-199,-200]]
			];
			Bd.jd = 100;
			Bd.Vc = 0;
		}

		this.Mb = function(vd) {
			vd.zb = 5;
			vd.Gb = 1;
			vd.Jb = 1;
		}

		this.Pb = function(Qb, Bd, vd) {
			vd.zb = 5;
		}

		this.fd = function(Bd, Xb) {
			Xb._ = 0.0;
			_1 = 0 + Math.random() * (1 - 0);
			_2i = Db.kb(_1);
			ctx.V(_2s,0,(_2i-0)*1);
			Db.lb(_2, Bd._2[_2s[0]], _2s[1]);
			ctx.W(_3, _2[0], _2[1], 0);
			Xb._4 = [];
			ctx.rb(Xb._4, _3, Bd.Mc);
			ctx.c(Xb._4, Bd.Ab, Xb._4);
			ctx.db(_5, 10);
			Xb._6 = [];
			ctx.rb(Xb._6, _5, Bd.Mc);
			ctx.c(Xb._6, Bd.ad, Xb._6);
			_7 = 0 + Math.random() * (360 - 0);
			Xb._8 = _7;
			_9 = 0 + Math.random() * (4 - 0);
			Xb._10 = _9;
			_11 = -60 + Math.random() * (60 - -60);
			Xb._12 = _11;
			ctx.T(Xb.Ab, Xb._4);
		}

		this.gd = function(Bd, Xb) {
			Xb._ = 0.0;
			_1 = 0 + Math.random() * (1 - 0);
			_2i = Db.kb(_1);
			ctx.V(_2s,0,(_2i-0)*1);
			Db.lb(_2, Bd._2[_2s[0]], _2s[1]);
			ctx.W(_3, _2[0], _2[1], 0);
			Xb._4 = [];
			ctx.rb(Xb._4, _3, Bd.Mc);
			ctx.c(Xb._4, Bd.Ab, Xb._4);
			ctx.db(_5, 10);
			Xb._6 = [];
			ctx.rb(Xb._6, _5, Bd.Mc);
			ctx.c(Xb._6, Bd.ad, Xb._6);
			_7 = 0 + Math.random() * (360 - 0);
			Xb._8 = _7;
			_9 = 0 + Math.random() * (4 - 0);
			Xb._10 = _9;
			_11 = -60 + Math.random() * (60 - -60);
			Xb._12 = _11;
			ctx.T(Xb.Ab, Xb._4);
		}

		this.qc = function(Qb, Bd, Xb) {
			Xb._ += Qb;
			ctx.T(_13, Xb._6);
			ctx.u(_13, _13, Qb);
			ctx.c(_13, _13, Xb._4);
			ctx.T(Xb._4, _13);
			_14 = Xb._8 + Qb * Xb._12;
			Xb._8 = _14;
			ctx.T(Xb.Ab, Xb._4);
			_16 = 30;
			ctx.S(Xb.Pd,[0.5,0.5]);
			Xb.Md = Xb._8;
			ctx.V(Xb.Nd,_16,_16);
			ctx.T(Xb.gf,[1,1,1]);
			Xb.Od = 1;
			Xb.Qc = Xb._10;
		}

		this.Cc = function(Bd, Xb, Wc) {
			_15 = 2;
			return Xb._ > _15;
		}


	}

	function Emitter_Simple_star() {

		var _1, _2 = [], _2i, _2s = [], _3 = [], _5 = [], _7, _9, _10 = [], _10i0, _10s0 = [], _10i1, _10s1 = [], _10i2, _10s2 = [], _12, _14=[], _15, _17, _16;
		this.pe = [{xe:0,Rc:1,Sc:1,renderStyleIndex:1}];
		this.name = "Simple_star";

		this.ud = function(Bd) {
			Bd.dd();
			Bd._2 = [
				[[199,-198],[202,199],[202,199]]
			];
			Bd._10 = [
				[
					[1,1,1]
				],
				[
					[0,1,1]
				],
				[
					[0,0,0]
				]
			];
			Bd.jd = 100;
			Bd.Vc = 0;
		}

		this.Mb = function(vd) {
			vd.zb = 5;
			vd.Gb = 1;
			vd.Jb = 1;
		}

		this.Pb = function(Qb, Bd, vd) {
			vd.zb = 5;
		}

		this.fd = function(Bd, Xb) {
			Xb._ = 0.0;
			_1 = 0 + Math.random() * (1 - 0);
			_2i = Db.kb(_1);
			ctx.V(_2s,0,(_2i-0)*1);
			Db.lb(_2, Bd._2[_2s[0]], _2s[1]);
			ctx.W(_3, _2[0], _2[1], 0);
			Xb._4 = [];
			ctx.rb(Xb._4, _3, Bd.Mc);
			ctx.c(Xb._4, Bd.Ab, Xb._4);
			ctx.db(_5, 10);
			Xb._6 = [];
			ctx.rb(Xb._6, _5, Bd.Mc);
			ctx.c(Xb._6, Bd.ad, Xb._6);
			_7 = 0 + Math.random() * (360 - 0);
			Xb._8 = _7;
			_9 = 0 + Math.random() * (1 - 0);
			_10i0=(_9<0?0:(_9>1?1:_9));
			ctx.V(_10s0,0,(_10i0-0)*1);
			_10i1=(_9<0?0:(_9>1?1:_9));
			ctx.V(_10s1,0,(_10i1-0)*1);
			_10i2=(_9<0?0:(_9>1?1:_9));
			ctx.V(_10s2,0,(_10i2-0)*1);
			ctx.W(_10, Db.nb(Bd._10[0][_10s0[0]],_10s0[1]),Db.nb(Bd._10[1][_10s1[0]],_10s1[1]),Db.nb(Bd._10[2][_10s2[0]],_10s2[1]));
			Xb._11 = [];
			ctx.T(Xb._11, _10);
			_12 = -60 + Math.random() * (60 - -60);
			Xb._13 = _12;
			ctx.T(Xb.Ab, Xb._4);
		}

		this.gd = function(Bd, Xb) {
			Xb._ = 0.0;
			_1 = 0 + Math.random() * (1 - 0);
			_2i = Db.kb(_1);
			ctx.V(_2s,0,(_2i-0)*1);
			Db.lb(_2, Bd._2[_2s[0]], _2s[1]);
			ctx.W(_3, _2[0], _2[1], 0);
			Xb._4 = [];
			ctx.rb(Xb._4, _3, Bd.Mc);
			ctx.c(Xb._4, Bd.Ab, Xb._4);
			ctx.db(_5, 10);
			Xb._6 = [];
			ctx.rb(Xb._6, _5, Bd.Mc);
			ctx.c(Xb._6, Bd.ad, Xb._6);
			_7 = 0 + Math.random() * (360 - 0);
			Xb._8 = _7;
			_9 = 0 + Math.random() * (1 - 0);
			_10i0=(_9<0?0:(_9>1?1:_9));
			ctx.V(_10s0,0,(_10i0-0)*1);
			_10i1=(_9<0?0:(_9>1?1:_9));
			ctx.V(_10s1,0,(_10i1-0)*1);
			_10i2=(_9<0?0:(_9>1?1:_9));
			ctx.V(_10s2,0,(_10i2-0)*1);
			ctx.W(_10, Db.nb(Bd._10[0][_10s0[0]],_10s0[1]),Db.nb(Bd._10[1][_10s1[0]],_10s1[1]),Db.nb(Bd._10[2][_10s2[0]],_10s2[1]));
			Xb._11 = [];
			ctx.T(Xb._11, _10);
			_12 = -60 + Math.random() * (60 - -60);
			Xb._13 = _12;
			ctx.T(Xb.Ab, Xb._4);
		}

		this.qc = function(Qb, Bd, Xb) {
			Xb._ += Qb;
			ctx.T(_14, Xb._6);
			ctx.u(_14, _14, Qb);
			ctx.c(_14, _14, Xb._4);
			ctx.T(Xb._4, _14);
			_15 = Xb._8 + Qb * Xb._13;
			Xb._8 = _15;
			ctx.T(Xb.Ab, Xb._4);
			_17 = 30;
			ctx.S(Xb.Pd,[0.5,0.5]);
			Xb.Md = Xb._8;
			ctx.V(Xb.Nd,_17,_17);
			ctx.T(Xb.gf,Xb._11);
			Xb.Od = 1;
			Xb.Qc = 0;
		}

		this.Cc = function(Bd, Xb, Wc) {
			_16 = 2;
			return Xb._ > _16;
		}


	}

	this.qd = function(Ld) {
		Ld.Dd = 0.0333333;
		Ld.Ud = 0;
		Ld.pd(new Emitter_Stars_from_grid());
		Ld.pd(new Emitter_Simple_star());
	}
			this.kb = function (v) { 				return (v < 0) ? 0 : ((v > 1) ? 1 : v); 			}

			this.lb = function (r, path, je) { 				var indexInt = Math.floor(je); 				var lerp = je - indexInt; 				ctx.Y(r, path[indexInt], path[indexInt + 1], lerp); 			}

			this.nb = function(funcValues, je) { 				var indexInt = Math.floor(je); 				var nextInt = indexInt + 1; 				return ctx.X(funcValues[indexInt], funcValues[nextInt], je - indexInt); 			}

}
