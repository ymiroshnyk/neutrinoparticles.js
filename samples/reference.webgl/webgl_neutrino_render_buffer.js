class WebGLNeutrinoRenderBuffers {

	constructor(wglNeutrinoContext) {
		this.ctx = wglNeutrinoContext;
		this.gl = wglNeutrinoContext.gl;

		this.positions = null;
		this.colors = null;
		this.texCoords = [];
		this.maxNumVertices = 0;
		this.numVertices = 0;
		this.indices = null;

		this.renderCalls = [];
		this.maxNumRenderCalls = 0;
		this.numRenderCalls = 0;
	}

	initialize(maxNumVertices, texChannels, indices, maxNumRenderCalls) {
		var gl = this.gl;

		this.positions = new Float32Array(new ArrayBuffer(4 * maxNumVertices * 3));
		this.colors = new Uint8Array(new ArrayBuffer(4 * maxNumVertices));
		this.texCoords = [];
		for (var texChannel = 0; texChannel < texChannels.length; ++texChannel) {
			this.texCoords[texChannel] = new Float32Array(new ArrayBuffer(4 * maxNumVertices * texChannels[texChannel]));
			this.texCoords[texChannel].numComponents = texChannels[texChannel];
		}
		this.maxNumVertices = maxNumVertices;

		this.indices = new Uint16Array(new ArrayBuffer(2 * indices.length));
		this.indices.set(indices, 0);

		this.maxNumRenderCalls = maxNumRenderCalls;

		this.positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, this.positions, gl.DYNAMIC_DRAW);

		this.colorBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.DYNAMIC_DRAW);

		this.texBuffers = [];
		for (var texIndex = 0; texIndex < this.texCoords.length; ++texIndex) {
			var buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			gl.bufferData(gl.ARRAY_BUFFER, this.texCoords[texIndex], gl.DYNAMIC_DRAW);
			this.texBuffers.push(buffer);
		}

		this.indicesBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
	}

	pushVertex(vertex) {
		this.positions.set(vertex.position, this.numVertices * 3);
		this.colors.set(vertex.color, this.numVertices * 4);

		for (var texIndex = 0; texIndex < vertex.texCoords.length; ++texIndex) {
			this.texCoords[texIndex].set(vertex.texCoords[texIndex],
				this.numVertices * this.texCoords[texIndex].numComponents);
		}

		++this.numVertices;
	}

	pushRenderCall(rc) {

		if (this.numRenderCalls >= this.renderCalls.length)
			this.renderCalls.push(Object.assign({}, rc));
		else
			Object.assign(this.renderCalls[this.numRenderCalls], rc);

		++this.numRenderCalls;
	}

	cleanup() {
		this.numVertices = 0;
		this.numRenderCalls = 0;
	}

	updateGlBuffers() {
		var gl = this.gl;

		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
		gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.positions, 0, this.numVertices * 3);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
		gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.colors, 0, this.numVertices * 4);

		this.texBuffers.forEach(function (buffer, index) {
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.texCoords[index], 0, this.numVertices *
				this.texCoords[index].numComponents);
		}, this);
	}

	bind() {
		var materials = this.ctx.materials;

		{
			gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

			gl.enableVertexAttribArray(materials.positionAttribLocation());
			gl.vertexAttribPointer(materials.positionAttribLocation(), 3, gl.FLOAT, false, 0, 0);
		}

		{
			gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);

			gl.enableVertexAttribArray(materials.colorAttribLocation());
			gl.vertexAttribPointer(materials.colorAttribLocation(), 4, gl.UNSIGNED_BYTE, true, 0, 0);
		}

		this.texBuffers.forEach(function (buffer, index) {

			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

			gl.enableVertexAttribArray(materials.texAttribLocation(index));
			gl.vertexAttribPointer(materials.texAttribLocation(index),
				this.texCoords[index].numComponents, gl.FLOAT, false, 0, 0);

		}, this);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
	}

	shutdown() {
		var gl = this.gl;

		gl.deleteBuffer(this.positionBuffer);
		gl.deleteBuffer(this.colorBuffer);
		
		this.texBuffers.forEach(function (buffer) {
			gl.deleteBuffer(buffer);
		}, this);
	}
}