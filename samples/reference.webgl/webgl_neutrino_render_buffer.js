class WebGLNeutrinoRenderBuffers {

	constructor(wglNeutrinoContext, geometryBuffers) {
		this.ctx = wglNeutrinoContext;
		this.gl = wglNeutrinoContext.gl;

		var gl = this.gl;

		this.positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometryBuffers.positions), gl.DYNAMIC_DRAW);

		this.colorBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Uint32Array(geometryBuffers.colors), gl.DYNAMIC_DRAW);

		this.texBuffers = [];
		for (var texIndex = 0; texIndex < geometryBuffers.texCoords.length; ++texIndex) {
			var buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometryBuffers.texCoords[texIndex]), gl.DYNAMIC_DRAW);
			this.texBuffers.push(buffer);
		}

		this.indicesBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(geometryBuffers.indices), gl.STATIC_DRAW);
	}

	shutdown() {

	}

	setup(geometryBuffers) {
		var materials = this.ctx.materials;

		{
			gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

			gl.bufferSubData(gl.ARRAY_BUFFER, 0,
				new Float32Array(geometryBuffers.positions, 0, geometryBuffers.numVertices * 3));

			gl.enableVertexAttribArray(materials.positionAttribLocation());
			gl.vertexAttribPointer(materials.positionAttribLocation(), 3, gl.FLOAT, false, 0, 0);
		}

		{
			gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);

			gl.bufferSubData(gl.ARRAY_BUFFER, 0,
				new Uint32Array(geometryBuffers.colors, 0, geometryBuffers.numVertices));

			gl.enableVertexAttribArray(materials.colorAttribLocation());
			gl.vertexAttribPointer(materials.colorAttribLocation(), 4, gl.UNSIGNED_BYTE, true, 0, 0);
		}

		this.texBuffers.forEach(function (buffer, index) {

			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

			gl.bufferSubData(gl.ARRAY_BUFFER, 0,
				new Float32Array(geometryBuffers.texCoords[index], 0, geometryBuffers.numVertices *
				geometryBuffers.texCoords[index].numComponents));

			gl.enableVertexAttribArray(materials.texAttribLocation(index));
			gl.vertexAttribPointer(materials.texAttribLocation(index),
				geometryBuffers.texCoords[index].numComponents, gl.FLOAT, false, 0, 0);

		}, this);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
	}
}