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
	
	this.randv2 = function (r, radius) {
		this.randv2gen(r, radius, function () { return Math.random(); });
	}

	this.randv2gen = function (r, radius, gen) {
		var angle = gen() * Math.PI * 2.0;
		r[0] = radius * ctx.cos_(angle);
		r[1] = radius * ctx.sin_(angle);
	}

	this.randv3 = function (r, radius) {
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
