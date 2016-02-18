// 497fc1e5-7dd9-4270-8a36-2e22e3844142

function NeutrinoPart_3boom_stars(ctx) {

	var Db = this;
	
    var ne = function (Ld, Bd) {
        this.Ld = Ld;
        this.Bd = Bd;

        if (this.Bd.ve.pe.length > 0) {
            this.ve = this.Bd.ve.pe[0];

            this.Lc = [ne.prototype.Ec,
                ne.prototype.Fc][this.ve.we];
        }
        else
            this.ve = null;
    }

    ne.prototype = {
        Ec: function (fe, Ab, Jc) {
            var Gc = ctx.ib(Jc.Md);
            var Hc = Math.cos(Gc);
            var Ic = Math.sin(Gc);
            var xe = ctx.ze(Jc.Nd[0]);
            var ye = ctx.ze(Jc.Nd[1]);
            fe./**/transform(xe * Hc, xe * Ic, ye * -Ic, ye * Hc, Ab[0], Ab[1]);
        },

        Fc: function (fe, Ab, Jc) {
            var q = Jc.Mc;
            var z2 = 2.0 * q[2] * q[2];
            var xy = 2.0 * q[0] * q[1];
            var wz = 2.0 * q[3] * q[2];
            var xe = ctx.ze(Jc.Nd[0]);
            var ye = ctx.ze(Jc.Nd[1]);
            fe./**/transform(
                xe * (1.0 - 2.0 * q[1] * q[1] - z2),
                xe * (xy + wz),
                ye * (wz - xy),
                ye * (2.0 * q[0] * q[0] + z2 - 1.0),
                Ab[0], Ab[1]);
        },

        Pc: function (fe, Xb, ge) {
            Xb.vc(fe, -1, ge);

            if (this.ve) {

                if (this.Ae != null && !Xb.oc) {
                    var Jc = {};
                    this.Bd.ve.Kd(this.Bd, Xb, this, Jc); //IMPL

                    if (Jc.Od > 0.001) {
                        var Ce = Math.floor(Jc.Qc % this.ve.Rc);
                        var De = Math.floor(Jc.Qc / this.ve.Rc);

                        var Ab = Xb.Ab.slice();
                        if (!ge || ge./**/transform(Ab, Jc.Nd)) {

                            fe.save();
                            this.Lc(fe, Ab, Jc);

                            var sizeX = Math.abs(Jc.Nd[0]);
                            var sizeY = Math.abs(Jc.Nd[1]);

                            fe.translate(-sizeX * Jc.Pd[0], -sizeY * (1 - Jc.Pd[1]));
                            fe.globalAlpha = Jc.Od;

                            fe.drawImage(this.Ae.image,
                                this.Ae.x + this.Tc * Ce,
                                this.Ae.y + this.Uc * De,
                                this.Tc, this.Uc, 0, 0, sizeX, sizeY);

                            fe.restore();
                        }
                    }
                }
            }

            Xb.vc(fe, 1, ge);
        },

        Hd: function (fe, ge) {
            fe.save();

            if (this.ve) {
                fe.globalCompositeOperation = this.Ld.materials[this.Ld./**/model.renderStyles[this.ve.renderStyleIndex].materialIndex];
                this.Ae = this.Ld.textureDescs[this.Ld./**/model.renderStyles[this.ve.renderStyleIndex].textureIndices[0]];
            }
            else {
                this.Ae = null;
            }

            if (this.Ae) {
                this.Tc = this.Ae.width / this.ve.Rc;
                this.Uc = this.Ae.height / this.ve.Sc;
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

        if (this.Bd.ve.pe.length > 0)
            this.ve = this.Bd.ve.pe[0];
        else
            this.ve = null;
    }
    
    oe.prototype = {
        qe: function (Xb, cameraRight, cameraUp, cameraDir) {
            Xb.Be(-1, cameraRight, cameraUp, cameraDir);

            if (this.ve) {

                if (!Xb.oc) {

                    var Jc = {};
                    this.Bd.ve.Kd(this.Bd, Xb, this, Jc); //IMPL

                    var Ce = Math.floor(Jc.Qc % this.ve.Rc);
                    var De = Math.floor(Jc.Qc / this.ve.Rc);

                    var Ee = [], Fe = [];

                    if (this.ve.we == 0) {
                        var a = ctx.ib(Jc.Md);
                        var s = Math.sin(a);
                        var c = Math.cos(a);

                        Ee[0] = re[0] * c + se[0] * s;
                        Ee[1] = re[1] * c + se[1] * s;
                        Ee[2] = re[2] * c + se[2] * s;

                        Fe[0] = -re[0] * s + se[0] * c;
                        Fe[1] = -re[1] * s + se[1] * c;
                        Fe[2] = -re[2] * s + se[2] * c;
                    }
                    else {
                        var q = Jc.Mc;
                        var z2 = 2.0 * q[2] * q[2];
                        var xy = 2.0 * q[0] * q[1];
                        var wz = 2.0 * q[3] * q[2];

                        Ee[0] = 1.0 - 2.0 * q[1] * q[1] - z2;
                        Ee[1] = xy + wz;
                        Ee[2] = 2.0 * q[0] * q[2] - 2.0 * q[3] * q[1];

                        Fe[0] = xy - wz;
                        Fe[1] = 1.0 - 2.0 * q[0] * q[0] - z2;
                        Fe[2] = 2.0 * q[1] * q[2] + 2.0 * q[3] * q[0];
                    }

                    var Ge = [], He = [], Ie = [], Je = [];
                    ctx.u(Ge, Ee, -Jc.Nd[0] * Jc.Pd[0]);
                    ctx.u(He, Ee, Jc.Nd[0] * (1.0 - Jc.Pd[0]));
                    ctx.u(Ie, Fe, -Jc.Nd[1] * Jc.Pd[1]);
                    ctx.u(Je, Fe, Jc.Nd[1] * (1.0 - Jc.Pd[1]));

                    var v0 = [], v1 = [], v2 = [], v3 = [];
                    ctx.c(v0, Ge, Ie);
                    ctx.c(v0, v0, Xb.Ab);
                    ctx.c(v1, Ge, Je);
                    ctx.c(v1, v1, Xb.Ab);
                    ctx.c(v2, He, Je);
                    ctx.c(v2, v2, Xb.Ab);
                    ctx.c(v3, He, Ie);
                    ctx.c(v3, v3, Xb.Ab);

                    {
                        var Le = new Float32Array(this.Ld.geometryBuffers./**/positions);
                        var Ke = this.Ld.geometryBuffers.numVertices * 3;

                        Le.set(v0, Ke);
                        Le.set(v1, Ke + 3);
                        Le.set(v2, Ke + 6);
                        Le.set(v3, Ke + 9);
                    }

                    {
                        var Me = new Uint8Array(this.Ld.geometryBuffers./**/colors);
                        var Ke = this.Ld.geometryBuffers.numVertices * 4;

                        var rgb = ctx.v(Jc.color, 255);
                        var rgba = [rgb[0], rgb[1], rgb[2], Jc.Od * 255];

                        Me.set(rgba, Ke);
                        Me.set(rgba, Ke + 4);
                        Me.set(rgba, Ke + 8);
                        Me.set(rgba, Ke + 12);
                    }

                    {
                        var Ne = new Float32Array(this.Ld.geometryBuffers./**/texCoords[0]);
                        var Ke = this.Ld.geometryBuffers.numVertices * 2;

                        var Ce = Math.floor(Jc.Qc % this.ve.Rc);
                        var De = Math.floor(Jc.Qc / this.ve.Rc);

                        var Oe, Pe, Qe, Re;

                        var Ve = this.Ld.texturesRemap[this.Ld./**/model.renderStyles[this.ve.renderStyleIndex].textureIndices[0]];
                        if (Ve) {
                            var Te = Ve.width / this.ve.Rc;
                            var Ue = Ve.height / this.ve.Sc;

                            var Oe = Ve.x + Ce * Te;
                            var Pe = Oe + Te;
                            var Qe = (Ve.y + Ve.height - De * Ue);
                            var Re = Qe - Ue;
                        } else {
                            var Te = 1.0 / this.ve.Rc;
                            var Ue = 1.0 / this.ve.Sc;

                            var Oe = Ce * Te;
                            var Pe = Oe + Te;
                            var Qe = (1.0 - De * Ue);
                            var Re = Qe - Ue;
                        }

                        Ne.set([Oe, Re], Ke);
                        Ne.set([Oe, Qe], Ke + 2);
                        Ne.set([Pe, Qe], Ke + 4);
                        Ne.set([Pe, Re], Ke + 6);
                    }

                    var Se = this.Ld.geometryBuffers./**/renderCalls;
                    if (!Se.length) {
                        Se.push(new ctx.RenderCall(0, 6, this.ve.renderStyleIndex));
                    } else {
                        var lastCall = Se[Se.length - 1];

                        if (lastCall.renderStyleIndex == this.ve.renderStyleIndex) {
                            lastCall.numIndices += 6;
                        } else {
                            Se.push(new ctx.RenderCall(this.Ld.geometryBuffers.numIndices,
                                6, this.ve.renderStyleIndex));
                        }
                    }

                    this.Ld.geometryBuffers.numVertices += 4;
                    this.Ld.geometryBuffers.numIndices += 6;
                }
            }

            Xb.Be(1, cameraRight, cameraUp, cameraDir);
        },

	    te: function (cameraRight, cameraUp, cameraDir) {
	        switch (this.Bd.Vc) {
	            case 0:
	                for (var Wb = 0; Wb < this.Bd.tc.length; ++Wb) {
	                    this.qe(this.Bd.tc[Wb], cameraRight, cameraUp, cameraDir);
	                }
	                break;

	            case 1:
	                for (var Wb = this.Bd.tc.length; Wb-- > 0;) {
	                    this.qe(this.Bd.tc[Wb], cameraRight, cameraUp, cameraDir);
	                }
	                break;

	            case 2:
					this.Bd.tc.forEach(function(Xb) {
						Xb.depth = ctx.H(cameraDir, Xb.Ab);
					});
					
	                this.Bd.tc.sort(function (a, b) {
	                    if (a.depth < b.depth)
	                        return 1;
	                    if (a.depth > b.depth)
	                        return -1;
	                    return 0;
	                });

	                this.Bd.tc.forEach(function(Xb) {
	                    this.qe(Xb, cameraRight, cameraUp, cameraDir);
	                }, this);
	                break;
	        }
	    }
    }

    var ld = function (Ld, ve, ue) {
        var Vb = this;
        this.Ld = Ld;
        this.ve = ve;

        // Eb

        function Eb() {
            this.Fb = 0;
            this.Gb = 1;
            this.Hb = null;
            this.Ib = null;
            this.Kb = 0;
            this.Lb = 1;

            Vb.ve.Mb(this); // IMPL

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
                Vb.ve.Pb(Qb, Vb, this); // IMPL

                var ic = 0;
                var Rb = Vb.Rb;
                var Sb = Qb;
                var Tb = this.Ob + Qb * this.zb;

                while (Tb > 1.0) {
                    var Ub = this.zb < 0.001 ? 0.0 : (1.0 - this.Ob) / this.zb;
                    Sb -= Ub;
                    Rb += Ub;

                    if (this.Hb != null && Rb > this.Hb) {
                        Vb.stop();
                        break;
                    }

                    Vb.Rb = Rb;
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

            Vb.ve.Mb(this); // IMPL

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
                Vb.ve.Pb(Qb, Vb, this); // IMPL

                var cc = Vb.Rb;
                var dc = cc + Qb;
                var ec = ctx.O(ctx.h(Ab, Vb.Bb));
                var fc = ec / this.rd;
                var Tb = this.bc + fc;

                var hc = fc < 0.001 ?
                    1.0 - this.bc : (1.0 - this.bc) / fc;

                var ic = 0;

                var jc = [];

                while (Tb > 1.0) {
                    var kc = cc + hc * Qb;

                    ctx.ab(jc, Vb.Bb, Ab, hc);

                    Vb.Rb = kc;
                    ctx.T(Vb.Ab, jc);

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
                Vb.Rb = dc;
                ctx.T(Vb.Ab, Ab);

                return ic;
            }
        }

        // mc

        function mc() {
            this.Ab = [];
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
                Vb.ve.fd(Vb, this); // IMPL
                this.nc();
            },

            Zb: function () {
                Vb.ve.gd(Vb, this); // IMPL
                this.nc();
            },

            Id: function (Qb) {
                Vb.ve.qc(Qb, Vb, this); // IMPL

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
                    Bd: new ld(Ld, md, ue),
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

            Be: function (xc, cameraRight, cameraUp, cameraDir) {
                for (var i = 0; i < this.Kc.length; ++i) {
                    var pc = this.Kc[i];

                    if (xc == pc.Ad.xc)
                        pc.Bd.te(cameraRight, cameraUp, cameraDir);
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
            return Vb.ve.Cc(Vb, Xb, this); // IMPL
        }

        // ld Ad

        this.Ab = [];
        this.Bb = [];
        this.tc = [];
        this.sc = [];
        this.Wc = new zc();
        this.construct = new ue(this.Ld, this);
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

        this.ve.ud(this); // IMPL

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

    ld.prototype.te = function (cameraRight, cameraUp, cameraDir) {
        this.construct.te(cameraRight, cameraUp, cameraDir);
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

	var ke = function() {
		var Cb = this;
		
		this._init = function(ve, Ab, ue) {
		    this./**/model = ve;

		    this.Ab = [];
		    ctx.T(this.Ab, Ab);
		
		    // ke Ad
		
		    this.od = [];
		
		    this.pd = function(md) {
		        var Bd = new ld(this, md, ue);
		        Bd.Nb(this.Ab);
		        this.od.push(Bd);
		    }
		
		    this./**/model.qd(this); // IMPL
		
		    this.Nb = function(Ab) {
		        this.Cd = 0.0;
		    }
		
		    this.Nb(Ab);
		    this./**/update(this.Ud, Ab);
		}
	}
     
	ke.prototype./**/restart = function(/**/position) {
		
		this.Nb(/**/position);
		
		for (var i = 0; i < this.od.length; ++i) {
			this.od[i].Jd(/**/position);
		}
	}

	ke.prototype./**/update = function (/**/dt, /**/position) {
		var updatedTime = 0.0;
		var hc = [];

		while ((/**/dt - updatedTime) + this.Cd > this.Dd)
		{
			ctx.ab(hc, this.Ab, /**/position, updatedTime / /**/dt);
			
			for (var i = 0; i < this.od.length; ++i) {
				this.od[i].Id(this.Dd, hc);
			}
			
			updatedTime += this.Dd - this.Cd;
			this.Cd = 0.0;
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

	var le = function () {
	    this._init = function(ve, Ab) {
	        le.prototype._init.call(this, ve, Ab, oe);

	        this.geometryBuffers = new ctx.GeometryBuffers(this./**/model.We * 4, [2], this./**/model.We * 6);
	        this.texturesRemap = [];

	        var indices = new Uint16Array(this.geometryBuffers.indices);

	        for (var Wb = 0; Wb < this./**/model.We; ++Wb) {
	            var verDisp = Wb * 4;
	            var partIndices = [verDisp + 0, verDisp + 3, verDisp + 1, verDisp + 1, verDisp + 3, verDisp + 2];
	            indices.set(partIndices, Wb * 6);
	        }
	    }
	}

	le.prototype = new ke();

	le.prototype./**/fillGeometryBuffers = function (cameraRight, cameraUp, cameraDir) {
	    this.geometryBuffers.numVertices = 0;
	    this.geometryBuffers.numIndices = 0;
	    this.geometryBuffers./**/renderCalls = [];

	    this.od.forEach(function(Bd) {
	        Bd.te(cameraRight, cameraUp, cameraDir);
	    }, this);
	}

	var me = function () {
	    this._init = function (ve, Ab) {
	        me.prototype._init.call(this, ve, Ab, ne);

	        this.materials = [];
	        this./**/model.materials.forEach(function(value) {
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

	this.createWGLInstance = function(/**/position) {
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
	this.We = 8420;

	function Emitter_child2() {

		var _4, _8 = [], _9, _11 = [], _13, _15, _17=[], _17iv=[], _17fs=[], _17vs=[], _17rw=[], _17rwn=[], _17rwl, _17p=[], _17df, _18, _19, _20=[], _20i=[];
		this.pe = [{we:1,Rc:2,Sc:2,renderStyleIndex:0}];

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
		}

		this.Cc = function(Bd, Xb, Wc) {
			_19 = Xb._5;
			return Xb._3 > _19;
		}

		this.Kd = function(Bd, Xb, Xc, Jc) {
			ctx.Q(_20i, Xb._12);
			ctx.qb(_20, _20i, Xb._16);
			Jc.Pd = [0.5,0.5];
			Jc.Mc = _20;
			Jc.Nd = [10,10];
			Jc.color = [1,1,1];
			Jc.Od = 1;
			Jc.Qc = Xb._6;
		}


	}

	function Emitter_child() {

		var _4, _8 = [], _9, _11 = [], _13, _15, _17=[], _17iv=[], _17fs=[], _17vs=[], _17rw=[], _17rwn=[], _17rwl, _17p=[], _17df, _18, _19, _20=[], _20i=[];
		this.pe = [{we:1,Rc:2,Sc:2,renderStyleIndex:0}];

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
		}

		this.Cc = function(Bd, Xb, Wc) {
			_19 = Xb._5;
			return Xb._3 > _19;
		}

		this.Kd = function(Bd, Xb, Xc, Jc) {
			ctx.Q(_20i, Xb._12);
			ctx.qb(_20, _20i, Xb._16);
			Jc.Pd = [0.5,0.5];
			Jc.Mc = _20;
			Jc.Nd = [20,20];
			Jc.color = [1,1,1];
			Jc.Od = 1;
			Jc.Qc = Xb._6;
		}


	}

	function Emitter_parent() {

		var _3, _5, _8 = [], _9, _11 = [], _13, _15, _17=[], _17iv=[], _17fs=[], _17vs=[], _17rw=[], _17rwn=[], _17rwl, _17p=[], _17df, _18, _19, _20=[], _20i=[];
		this.pe = [{we:1,Rc:2,Sc:2,renderStyleIndex:0}];

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
		}

		this.Cc = function(Bd, Xb, Wc) {
			_19 = Xb._4;
			return Xb._2 > _19;
		}

		this.Kd = function(Bd, Xb, Xc, Jc) {
			ctx.Q(_20i, Xb._12);
			ctx.qb(_20, _20i, Xb._16);
			Jc.Pd = [0.5,0.5];
			Jc.Mc = _20;
			Jc.Nd = [30,30];
			Jc.color = [1,1,1];
			Jc.Od = 1;
			Jc.Qc = Xb._6;
		}


	}

	this.qd = function(Ld) {
		Ld.Dd = 0.0333333;
		Ld.Ud = 0;
		Ld.pd(new Emitter_parent());
	}
}
