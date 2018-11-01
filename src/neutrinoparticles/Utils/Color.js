function colorCompToHex_(c) {
		return c < 16 ? "0" + c.toString(16) : c.toString(16);
	}

	this.colorToHex_ = function(rgb) {
		return "#" 
			+ colorCompToHex_(Math.floor(rgb[0] * 255)) 
			+ colorCompToHex_(Math.floor(rgb[1] * 255)) 
			+ colorCompToHex_(Math.floor(rgb[2] * 255));
	}