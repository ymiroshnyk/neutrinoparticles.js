this.randArea = function(r, x, y, size, gen) {
	var dispx = x + gen() * size[0];
	var dispy = y + gen() * size[1];
	ctx.setv2(r, dispx, dispy);
}