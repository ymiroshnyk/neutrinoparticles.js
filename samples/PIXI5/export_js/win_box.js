// 96a82310-f433-45e9-8b38-254ba2448465

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
									if (df >= 1 && ef >= 1) {
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
				this.Fb = 0;
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

					while (Tb >= 1.0) {
						var Ub = this.zb < 0.001 ? 0.0 : (1.0 - this.Ob) / this.zb;
						Sb -= Ub;
						Rb += Ub;
						systemTime += Ub;

						if (this.Hb != null && Rb > this.Hb) {
							Vb.disactivate();
							break;
						}

						Vb.Rb = Rb;
						Ld.Rb = systemTime;

						if (Ab && Qb > 0)
							ctx.ab(Vb.Ab, Ab, Vb.Bb, Sb / Qb);

						if (Mc && Qb > 0)
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
							Vb.disactivate();
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
						pc.Bd.disactivate();
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
						pc.Bd.activate();
					else
						pc.Bd.disactivate();
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
		this.ad = [];

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
			this.paused_ = false;
			this.generatorsPaused_ = false;
			ctx.W(this.ad, 0, 0, 0);
		}
	}

	ld.prototype.Jd = function (Ab, Mc) {
		this.Nb(Ab, Mc);

		this.sc.push.apply(this.sc, this.tc);
		this.tc.length = 0;

		this.vd.Jd();
	}

	ld.prototype.Id = function (Qb, Ab, Mc) {

		if (this.paused_)
		{
			this.Td(Ab, Mc);
			return;
		}

		this.wd = this.Rb;

		if (Ab) {
			ctx.T(this.Bb, this.Ab);
			if (Qb > 0.0001) {
				var shift = [];
				ctx.g(shift, Ab, this.Bb);
				ctx.T(this.ad, shift);
				ctx.w(this.ad, this.ad, Qb);
			}
			else {
				ctx.W(this.ad, 0, 0, 0);
			}
		}
		else {
			ctx.W(this.ad, 0, 0, 0);
		}

		if (Mc)
		{
			ctx.U(this.prevRotation, this.Mc);
		}

		var ic;

		if (this.Zc && !this.generatorsPaused_) {
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

			if (Bd.activated() || Bd.tc.length > 0) {
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

	ld.prototype./**/pause = function () {
		this.paused_ = true;
	}

	ld.prototype./**/unpause = function () {
		this.paused_ = false;
	}

	ld.prototype./**/paused = function () {
		return this.paused_;
	}

	ld.prototype./**/pauseGenerators = function () {
		this.generatorsPaused_ = true;
	}

	ld.prototype./**/unpauseGenerators = function () {
		this.generatorsPaused_ = false;
	}

	ld.prototype./**/generatorsPaused = function () {
		return this.generatorsPaused_;
	}

	ld.prototype.activate = function () {
		this.Zc = true;
	}

	ld.prototype.disactivate = function () {
		this.Zc = false;
	}

	ld.prototype.activated = function () {
		return this.Zc;
	}

	ld.prototype./**/getNumParticles = function () {
		return this.tc.length;
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
			this.zeroUpdate();
			this./**/update(this.Ud, Ab, Mc);
		}
	}

	ke.prototype./**/restart = function (/**/position, /**/rotation) {

		this.Nb(/**/position ? /**/position : this.Ab, /**/rotation ? /**/rotation : this.Mc);

		for (var i = 0; i < this.od.length; ++i) {
			this.od[i].Jd(this.Ab, this.Mc);
		}

		this.zeroUpdate();

		this./**/update(this.Ud, this.Ab, this.Mc);
	}

	ke.prototype.zeroUpdate = function () {
		for (var i = 0; i < this.od.length; ++i) {
			this.od[i].Id(0, this.Ab, this.Mc);
		}
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

		while ((/**/dt - updatedTime) + this.Cd >= this.Dd) {
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

		if (/**/position)
			ctx.T(this.Ab, /**/position);

		if (/**/rotation)
			ctx.U(this.Mc, /**/rotation);

		for (var i = 0; i < this.od.length; ++i) {
			this.od[i].Td(this.Ab, this.Mc);
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

	ke.prototype./**/pauseAllEmitters = function() {
		for (var i = 0; i < this.od.length; ++i) {
			this.od[i]./**/pause();
		}
	}

	ke.prototype./**/unpauseAllEmitters = function () {
		for (var i = 0; i < this.od.length; ++i) {
			this.od[i]./**/unpause();
		}
	}

	ke.prototype./**/areAllEmittersPaused = function () {
		for (var i = 0; i < this.od.length; ++i) {
			if (!this.od[i].paused())
				return false;
		}
		return true;
	}

	ke.prototype./**/pauseGeneratorsInAllEmitters = function () {
		for (var i = 0; i < this.od.length; ++i) {
			this.od[i]./**/pauseGenerators();
		}
	}

	ke.prototype./**/unpauseGeneratorsInAllEmitters = function () {
		for (var i = 0; i < this.od.length; ++i) {
			this.od[i]./**/unpauseGenerators();
		}
	}

	ke.prototype./**/areGeneratorsInAllEmittersPaused = function () {
		for (var i = 0; i < this.od.length; ++i) {
			if (!this.od[i].generatorsPaused())
				return false;
		}
		return true;
	}

	ke.prototype./**/getNumParticles = function() {
		var numParticles = 0;

		for (var i = 0; i < this.od.length; ++i) {
			numParticles += this.od[i].getNumParticles();
		}

		return numParticles;
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
	this.textures = ['animation/win_particle_02.png'];
	this.materials = [1];
	this.renderStyles = [{materialIndex:0,textureIndices:[0]}];
	this.Xe = 1800;

	function Emitter_Stars() {

		var _1 = [], _3 = [], _6, _8, _10=[], _10fs=[], _10vs=[], _10rw=[], _10rwn=[], _10rwl, _10v=[], _10p=[], _10dtl, _10dtp, _10df, _10fsd=[], _11, _12, _12i0, _12s0 = [], _13;
		this.pe = [{xe:0,Rc:1,Sc:1,renderStyleIndex:0}];
		this.name = "Stars";

		this.ud = function(Bd) {
			Bd.ed();
			Bd._12 = [
				[
					[0,1,1],
					[1,0.3,0.3],
					[0.3,0.7,0.7],
					[0.7,0,0]
				]
			];
			Bd.jd = 60;
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
			ctx.randv3gen(_1, 5, Bd.Ld.rand);
			Xb._2 = [];
			ctx.rb(Xb._2, _1, Bd.Mc);
			ctx.c(Xb._2, Bd.Ab, Xb._2);
			ctx.randv3gen(_3, 50, Bd.Ld.rand);
			Xb._4 = [];
			ctx.rb(Xb._4, _3, Bd.Mc);
			ctx.c(Xb._4, Bd.ad, Xb._4);
			Xb._5 = 0;
			_6 = 0.3 + Bd.Ld.rand() * (0.8 - 0.3);
			Xb._7 = _6;
			_8 = 20 + Bd.Ld.rand() * (40 - 20);
			Xb._9 = _8;
			ctx.T(Xb.Ab, Xb._2);
		}

		this.gd = function(Bd, Xb) {
			Xb._ = 0.0;
			ctx.randv3gen(_1, 5, Bd.Ld.rand);
			Xb._2 = [];
			ctx.rb(Xb._2, _1, Bd.Mc);
			ctx.c(Xb._2, Bd.Ab, Xb._2);
			ctx.randv3gen(_3, 50, Bd.Ld.rand);
			Xb._4 = [];
			ctx.rb(Xb._4, _3, Bd.Mc);
			ctx.c(Xb._4, Bd.ad, Xb._4);
			Xb._5 = 0;
			_6 = 0.3 + Bd.Ld.rand() * (0.8 - 0.3);
			Xb._7 = _6;
			_8 = 20 + Bd.Ld.rand() * (40 - 20);
			Xb._9 = _8;
			ctx.T(Xb.Ab, Xb._2);
		}

		this.qc = function(Qb, Bd, Xb) {
			Xb._ += Qb;
			ctx.T(_10fs, [0,0,0]);
			ctx.T(_10vs, [0,0,0]);
			_10dtl = Qb;
			ctx.T(_10v, Xb._4);
			ctx.T(_10p, Xb._2);
			while (_10dtl > 0.0001) {
				_10dtp = _10dtl;
				ctx.T(_10fsd, _10fs);
				ctx.g(_10rw, _10vs, _10v);
				_10rwl = ctx.P(_10rw);
				if (_10rwl > 0.0001) {
					_10rwl = Math.sqrt(_10rwl);
					ctx.w(_10rwn, _10rw, _10rwl);
					_10df = 0.01 * 10 * _10rwl;
					if (_10df * _10dtp > 0.2)
						_10dtp = 0.2 / _10df;
					ctx.c(_10fsd, _10fsd, ctx.v(_10rwn, _10rwl * _10df));
				}
				ctx.c(_10v, _10v, ctx.v(_10fsd, _10dtp));
				ctx.c(_10p, _10p, ctx.v(_10v, _10dtp));
				_10dtl -= _10dtp;
			}
			ctx.T(Xb._2, _10p);
			ctx.T(Xb._4, _10v);
			ctx.T(Xb.Ab, Xb._2);
			_11 = (Xb._ / Xb._7);
			_12i0=(_11<0?0:(_11>1?1:_11));
			_12i0<0.5?_12i0<0.264286?ctx.V(_12s0,0,(_12i0-0)*3.78378):ctx.V(_12s0,1,(_12i0-0.264286)*4.24242):_12i0<0.7?ctx.V(_12s0,2,(_12i0-0.5)*5):ctx.V(_12s0,3,(_12i0-0.7)*3.33333);
			_12 = Db.nb(Bd._12[0][_12s0[0]],_12s0[1]);
			_13 = (Xb._9 * _12);
			ctx.S(Xb.Pd,[0.5,0.5]);
			Xb.Md = Xb._5;
			ctx.V(Xb.Nd,_13,_13);
			ctx.T(Xb.gf,[1,1,1]);
			Xb.Od = 1;
			Xb.Qc = 0;
		}

		this.Cc = function(Bd, Xb, Wc) {
			return Xb._ > Xb._7;
		}


	}

	function Emitter_Glow() {

		var _1 = [], _3 = [], _6, _8, _10=[], _10fs=[], _10vs=[], _10rw=[], _10rwn=[], _10rwl, _10v=[], _10p=[], _10dtl, _10dtp, _10df, _10fsd=[], _11, _12, _12i0, _12s0 = [], _13, _14, _14i0, _14s0 = [];
		this.pe = [{xe:0,Rc:1,Sc:1,renderStyleIndex:0}];
		this.name = "Glow";

		this.ud = function(Bd) {
			Bd.ed();
			Bd._12 = [
				[
					[0,0.979724,0.979724],
					[0.979724,0,0]
				]
			];
			Bd._14 = [
				[
					[0.5,0.500271,0.498553,0.495101,0.490121,0.483784,0.476235,0.467597,0.45798,0.447481,0.43619,0.424192,0.411572,0.398416,0.384822,0.370909,0.370909]
				]
			];
			Bd.jd = 60;
			Bd.Vc = 0;
		}

		this.Mb = function(vd) {
			vd.rd = 30;
			vd.Gb = 1;
			vd.Jb = 1;
		}

		this.Pb = function(Qb, Bd, vd) {
			vd.rd = 30;
		}

		this.fd = function(Bd, Xb) {
			Xb._ = 0.0;
			ctx.W(_1, 0, 0, 0);
			Xb._2 = [];
			ctx.rb(Xb._2, _1, Bd.Mc);
			ctx.c(Xb._2, Bd.Ab, Xb._2);
			ctx.randv3gen(_3, 100, Bd.Ld.rand);
			Xb._4 = [];
			ctx.rb(Xb._4, _3, Bd.Mc);
			ctx.c(Xb._4, Bd.ad, Xb._4);
			Xb._5 = 0;
			_6 = 0 + Bd.Ld.rand() * (0.3 - 0);
			Xb._7 = _6;
			_8 = 70 + Bd.Ld.rand() * (90 - 70);
			Xb._9 = _8;
			ctx.T(Xb.Ab, Xb._2);
		}

		this.gd = function(Bd, Xb) {
			Xb._ = 0.0;
			ctx.W(_1, 0, 0, 0);
			Xb._2 = [];
			ctx.rb(Xb._2, _1, Bd.Mc);
			ctx.c(Xb._2, Bd.Ab, Xb._2);
			ctx.randv3gen(_3, 100, Bd.Ld.rand);
			Xb._4 = [];
			ctx.rb(Xb._4, _3, Bd.Mc);
			ctx.c(Xb._4, Bd.ad, Xb._4);
			Xb._5 = 0;
			_6 = 0 + Bd.Ld.rand() * (0.3 - 0);
			Xb._7 = _6;
			_8 = 70 + Bd.Ld.rand() * (90 - 70);
			Xb._9 = _8;
			ctx.T(Xb.Ab, Xb._2);
		}

		this.qc = function(Qb, Bd, Xb) {
			Xb._ += Qb;
			ctx.T(_10fs, [0,0,0]);
			ctx.T(_10vs, [0,0,0]);
			_10dtl = Qb;
			ctx.T(_10v, Xb._4);
			ctx.T(_10p, Xb._2);
			while (_10dtl > 0.0001) {
				_10dtp = _10dtl;
				ctx.T(_10fsd, _10fs);
				ctx.g(_10rw, _10vs, _10v);
				_10rwl = ctx.P(_10rw);
				if (_10rwl > 0.0001) {
					_10rwl = Math.sqrt(_10rwl);
					ctx.w(_10rwn, _10rw, _10rwl);
					_10df = 0.01 * 10 * _10rwl;
					if (_10df * _10dtp > 0.2)
						_10dtp = 0.2 / _10df;
					ctx.c(_10fsd, _10fsd, ctx.v(_10rwn, _10rwl * _10df));
				}
				ctx.c(_10v, _10v, ctx.v(_10fsd, _10dtp));
				ctx.c(_10p, _10p, ctx.v(_10v, _10dtp));
				_10dtl -= _10dtp;
			}
			ctx.T(Xb._2, _10p);
			ctx.T(Xb._4, _10v);
			ctx.T(Xb.Ab, Xb._2);
			_11 = (Xb._ / Xb._7);
			_12i0=(_11<0?0:(_11>1?1:_11));
			_12i0<0.1?ctx.V(_12s0,0,(_12i0-0)*10):ctx.V(_12s0,1,(_12i0-0.1)*1.11111);
			_12 = Db.nb(Bd._12[0][_12s0[0]],_12s0[1]);
			_13 = (Xb._9 * _12);
			_14i0=(_11<0?0:(_11>1?1:_11));
			ctx.V(_14s0,0,(_14i0-0)*15);
			_14 = Db.nb(Bd._14[0][_14s0[0]],_14s0[1]);
			ctx.S(Xb.Pd,[0.5,0.5]);
			Xb.Md = Xb._5;
			ctx.V(Xb.Nd,_13,_13);
			ctx.T(Xb.gf,[1,1,1]);
			Xb.Od = _14;
			Xb.Qc = 0;
		}

		this.Cc = function(Bd, Xb, Wc) {
			return Xb._ > Xb._7;
		}


	}

	function Emitter_Parent() {

		var _1 = [], _5, _6, _7, _7i0, _7s0 = [], _8 = [[], []], _8i, _8s = [], _9 = [], _10op0=[], _11;
		this.pe = [];
		this.name = "Parent";

		this.ud = function(Bd) {
			Bd.dd();
			Bd._7 = [
				[
					[0,1,1]
				]
			];
			Bd._8 = [
				[[[199.237,35.001],[0.00361345,0.999993]],[[199.269,43.759],[0.0210389,0.999779]],[[199.453,52.519],[0.0215086,0.999769]],[[199.642,61.2777],[0.0199234,0.999802]],[[199.816,70.0375],[0.0173908,0.999849]],[[199.969,78.7971],[0.0141977,0.999899]],[[200.093,87.5575],[0.0104095,0.999946]],[[200.184,96.3185],[0.00598253,0.999982]],[[200.237,105.079],[0.000832494,1]],[[200.244,113.841],[-0.00521442,0.999986]],[[200.198,122.602],[-0.0124039,0.999923]],[[200.09,131.362],[-0.0211151,0.999777]],[[199.905,140.122],[-0.031964,0.999489]],[[199.625,148.879],[-0.0459817,0.998942]],[[199.222,157.63],[-0.0650995,0.997879]],[[198.651,166.372],[-0.0650995,0.997879]],[[198.651,166.372],[-0.0650995,0.997879]]],
				[[[198.651,166.372],[-0.0649397,0.997889]],[[198.486,168.921],[-0.0411821,0.999152]],[[198.38,171.472],[-0.0194093,0.999812]],[[198.331,174.025],[-0.00135639,0.999999]],[[198.327,176.578],[0.0103567,0.999946]],[[198.354,179.131],[0.0115501,0.999933]],[[198.383,181.685],[-0.0046077,0.999989]],[[198.372,184.238],[-0.0491459,0.998792]],[[198.246,186.788],[-0.138833,0.990316]],[[197.892,189.316],[-0.289571,0.957157]],[[197.154,191.756],[-0.487475,0.873137]],[[195.912,193.98],[-0.67024,0.742144]],[[194.203,195.872],[-0.792455,0.60993]],[[192.182,197.428],[-0.86235,0.506313]],[[189.981,198.72],[-0.901841,0.432068]],[[187.678,199.823],[-0.901841,0.432068]],[[187.678,199.823],[-0.901841,0.432068]]],
				[[[187.678,199.823],[-1,-0.000246347]],[[15.9801,199.781],[-1,-0.000246347]],[[15.9801,199.781],[-1,-0.000246347]]],
				[[[15.9801,199.781],[-0.955062,-0.296407]],[[13.2407,198.931],[-0.882406,-0.470489]],[[10.711,197.582],[-0.760409,-0.649445]],[[8.52998,195.719],[-0.629525,-0.77698]],[[6.72331,193.489],[-0.509904,-0.860231]],[[5.25918,191.019],[-0.408331,-0.912834]],[[4.08661,188.398],[-0.324285,-0.945959]],[[3.15512,185.681],[-0.254942,-0.966956]],[[2.42273,182.903],[-0.197328,-0.980337]],[[1.85584,180.087],[-0.148933,-0.988847]],[[1.42802,177.246],[-0.107795,-0.994173]],[[1.11833,174.39],[-0.072418,-0.997374]],[[0.91023,171.524],[-0.0416708,-0.999131]],[[0.790508,168.653],[-0.0146943,-0.999892]],[[0.748299,165.781],[0.00919037,-0.999958]],[[0.774709,162.908],[0.00919037,-0.999958]],[[0.774709,162.908],[0.00919037,-0.999958]]],
				[[[0.774709,162.908],[0.00678081,-0.999977]],[[0.836934,153.731],[-0.00891692,-0.99996]],[[0.755105,144.555],[-0.0138411,-0.999904]],[[0.628081,135.378],[-0.0161012,-0.99987]],[[0.480308,126.202],[-0.0174087,-0.999849]],[[0.32054,117.026],[-0.0182667,-0.999833]],[[0.152923,107.851],[-0.018876,-0.999822]],[[-0.0203149,98.675],[-0.0193329,-0.999813]],[[-0.197746,89.499],[-0.019689,-0.999806]],[[-0.378427,80.3241],[-0.0199751,-0.9998]],[[-0.561747,71.1485],[-0.0202102,-0.999796]],[[-0.747211,61.9736],[-0.0204072,-0.999792]],[[-0.93449,52.7984],[-0.0205749,-0.999788]],[[-1.12332,43.6228],[-0.0207195,-0.999785]],[[-1.31347,34.4472],[-0.0208455,-0.999783]],[[-1.50481,25.2705],[-0.0208455,-0.999783]],[[-1.50481,25.2705],[-0.0208455,-0.999783]]],
				[[[-1.50481,25.2705],[0.00398705,-0.999992]],[[-1.49443,22.667],[0.0590747,-0.998254]],[[-1.34067,20.0687],[0.123274,-0.992373]],[[-1.01977,17.4855],[0.198158,-0.98017]],[[-0.503988,14.9342],[0.284998,-0.958528]],[[0.237683,12.4398],[0.384073,-0.923303]],[[1.23702,10.0374],[0.493492,-0.869751]],[[2.52087,7.77468],[0.607927,-0.793993]],[[4.1022,5.70935],[0.718519,-0.695508]],[[5.97107,3.90034],[0.815256,-0.5791]],[[8.0916,2.39406],[0.891027,-0.45395]],[[10.4095,1.21318],[0.944066,-0.329756]],[[12.8656,0.355252],[0.977011,-0.213187]],[[15.4079,-0.199466],[0.994254,-0.107047]],[[17.9953,-0.478049],[0.999876,-0.0157239]],[[20.5977,-0.518973],[0.999876,-0.0157239]],[[20.5977,-0.518973],[0.999876,-0.0157239]]],
				[[[20.5977,-0.518973],[0.999969,0.00783428]],[[31.6751,-0.432187],[0.999985,0.00556791]],[[42.7541,-0.370499],[0.99999,0.00441312]],[[53.8335,-0.321604],[0.999993,0.00363576]],[[64.9125,-0.281323],[0.999995,0.00303413]],[[75.9911,-0.247709],[0.999997,0.0025239]],[[87.0701,-0.219747],[0.999998,0.0020599]],[[98.1492,-0.196925],[0.999999,0.00161239]],[[109.228,-0.179061],[0.999999,0.00115672]],[[120.307,-0.166246],[1,0.000666993]],[[131.386,-0.158856],[1,0.000108998]],[[142.465,-0.157649],[1,-0.000572329]],[[153.544,-0.163989],[0.999999,-0.00148453]],[[164.624,-0.180438],[0.999996,-0.00289466]],[[175.702,-0.212507],[0.999983,-0.00584275]],[[186.78,-0.277234],[0.999983,-0.00584275]],[[186.78,-0.277234],[0.999983,-0.00584275]]],
				[[[186.78,-0.277234],[0.998019,0.0629074]],[[189.6,-0.0994982],[0.945981,0.324222]],[[192.263,0.813014],[0.763186,0.646179]],[[194.41,2.63114],[0.539566,0.841943]],[[195.933,5.00763],[0.377245,0.926113]],[[196.999,7.62563],[0.271163,0.962533]],[[197.766,10.3479],[0.199373,0.979924]],[[198.33,13.1195],[0.148107,0.988971]],[[198.749,15.9174],[0.109732,0.993961]],[[199.059,18.7289],[0.0799032,0.996803]],[[199.286,21.5489],[0.0559963,0.998431]],[[199.444,24.3735],[0.0363717,0.999338]],[[199.547,27.2009],[0.0199597,0.999801]],[[199.603,30.0289],[0.0059977,0.999982]],[[199.62,32.8579],[-0.00605587,0.999982]],[[199.603,35.6874],[-0.00605587,0.999982]],[[199.603,35.6874],[-0.00605587,0.999982]]]
			];
			Bd.uc(new Emitter_Stars(), { xc: 1, sd: false });
			Bd.uc(new Emitter_Glow(), { xc: 1, sd: false });
			Bd.jd = 15;
			Bd.Vc = 0;
		}

		this.Mb = function(vd) {
			vd.zb = 4;
			vd.Gb = 1;
			vd.Jb = 1;
		}

		this.Pb = function(Qb, Bd, vd) {
			vd.zb = 4;
		}

		this.fd = function(Bd, Xb) {
			Xb._ = 0.0;
			ctx.W(_1, 0, 0, 0);
			Xb._2 = [];
			ctx.rb(Xb._2, _1, Bd.Mc);
			ctx.c(Xb._2, Bd.Ab, Xb._2);
			Xb._3 = 0;
			Xb._4 = [];
			ctx.U(Xb._4, Bd.Mc);
			_5 = 2.1;
			_6 = (Xb._ / _5);
			_7i0=(_6<0?0:(_6>1?1:_6));
			ctx.V(_7s0,0,(_7i0-0)*1);
			_7 = Db.nb(Bd._7[0][_7s0[0]],_7s0[1]);
			_8i = Db.kb(_7);
			_8i<0.499481?_8i<0.220462?_8i<0.170728?ctx.V(_8s,0,(_8i-0)*87.8591):ctx.V(_8s,1,(_8i-0.170728)*301.605):_8i<0.443523?ctx.V(_8s,2,(_8i-0.220462)*4.48307):ctx.V(_8s,3,(_8i-0.443523)*268.059):_8i<0.729029?_8i<0.678321?ctx.V(_8s,4,(_8i-0.499481)*83.8738):ctx.V(_8s,5,(_8i-0.678321)*295.812):_8i<0.944927?ctx.V(_8s,6,(_8i-0.729029)*69.4774):ctx.V(_8s,7,(_8i-0.944927)*272.364);
			Db.mb(_8, Bd._8[_8s[0]], _8s[1]);
			ctx.W(_9, _8[0][0], _8[0][1], 0);
			ctx.rb(_10op0, _9, Xb._4);
			ctx.c(_10op0, _10op0, [0,0,0]);
			_11 = ctx.d(Xb._2, _10op0);
			ctx.T(Xb.Ab, _11);
		}

		this.gd = function(Bd, Xb) {
			Xb._ = 0.0;
			ctx.W(_1, 0, 0, 0);
			Xb._2 = [];
			ctx.rb(Xb._2, _1, Bd.Mc);
			ctx.c(Xb._2, Bd.Ab, Xb._2);
			Xb._3 = 0;
			Xb._4 = [];
			ctx.U(Xb._4, Bd.Mc);
			_5 = 2.1;
			_6 = (Xb._ / _5);
			_7i0=(_6<0?0:(_6>1?1:_6));
			ctx.V(_7s0,0,(_7i0-0)*1);
			_7 = Db.nb(Bd._7[0][_7s0[0]],_7s0[1]);
			_8i = Db.kb(_7);
			_8i<0.499481?_8i<0.220462?_8i<0.170728?ctx.V(_8s,0,(_8i-0)*87.8591):ctx.V(_8s,1,(_8i-0.170728)*301.605):_8i<0.443523?ctx.V(_8s,2,(_8i-0.220462)*4.48307):ctx.V(_8s,3,(_8i-0.443523)*268.059):_8i<0.729029?_8i<0.678321?ctx.V(_8s,4,(_8i-0.499481)*83.8738):ctx.V(_8s,5,(_8i-0.678321)*295.812):_8i<0.944927?ctx.V(_8s,6,(_8i-0.729029)*69.4774):ctx.V(_8s,7,(_8i-0.944927)*272.364);
			Db.mb(_8, Bd._8[_8s[0]], _8s[1]);
			ctx.W(_9, _8[0][0], _8[0][1], 0);
			ctx.rb(_10op0, _9, Xb._4);
			ctx.c(_10op0, _10op0, [0,0,0]);
			_11 = ctx.d(Xb._2, _10op0);
			ctx.T(Xb.Ab, _11);
		}

		this.qc = function(Qb, Bd, Xb) {
			Xb._ += Qb;
			_5 = 2.1;
			_6 = (Xb._ / _5);
			_7i0=(_6<0?0:(_6>1?1:_6));
			ctx.V(_7s0,0,(_7i0-0)*1);
			_7 = Db.nb(Bd._7[0][_7s0[0]],_7s0[1]);
			_8i = Db.kb(_7);
			_8i<0.499481?_8i<0.220462?_8i<0.170728?ctx.V(_8s,0,(_8i-0)*87.8591):ctx.V(_8s,1,(_8i-0.170728)*301.605):_8i<0.443523?ctx.V(_8s,2,(_8i-0.220462)*4.48307):ctx.V(_8s,3,(_8i-0.443523)*268.059):_8i<0.729029?_8i<0.678321?ctx.V(_8s,4,(_8i-0.499481)*83.8738):ctx.V(_8s,5,(_8i-0.678321)*295.812):_8i<0.944927?ctx.V(_8s,6,(_8i-0.729029)*69.4774):ctx.V(_8s,7,(_8i-0.944927)*272.364);
			Db.mb(_8, Bd._8[_8s[0]], _8s[1]);
			ctx.W(_9, _8[0][0], _8[0][1], 0);
			ctx.rb(_10op0, _9, Xb._4);
			ctx.c(_10op0, _10op0, [0,0,0]);
			_11 = ctx.d(Xb._2, _10op0);
			ctx.T(Xb.Ab, _11);
		}

		this.Cc = function(Bd, Xb, Wc) {
			_5 = 2.1;
			return Xb._ > _5;
		}


	}

	this.qd = function(Ld) {
		Ld.Dd = 0.0333333;
		Ld.Ud = 2;
		Ld.rand = function() { return Math.random(); };
		Ld.pd(new Emitter_Parent());
	}
		this.kb = function (v) { 			return (v < 0) ? 0 : ((v > 1) ? 1 : v); 		}

		this.mb = function(r, path, je) { 			var indexInt = Math.floor(je); 			var lerp = je - indexInt; 			ctx.Y(r[0], path[indexInt][0], path[indexInt + 1][0], lerp); 			ctx.Y(r[1], path[indexInt][1], path[indexInt + 1][1], lerp); 		}

		this.nb = function(funcValues, je) { 			var indexInt = Math.floor(je); 			var nextInt = indexInt + 1; 			return ctx.X(funcValues[indexInt], funcValues[nextInt], je - indexInt); 		}

}