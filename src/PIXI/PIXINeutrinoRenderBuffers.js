class PIXINeutrinoRenderBuffers {
	constructor(context, geometryBuffers) {
		this.ctx = context;
		this.gl = this.ctx.renderer.gl;

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

        // set null vao to prevent overriding of it's buffers to next ones
		this.ctx.renderer.bindVao(null);

		this.positionBuffer = PIXI.glCore.GLBuffer.createVertexBuffer(gl,
			 this.positions, gl.DYNAMIC_DRAW);

		this.colorBuffer = PIXI.glCore.GLBuffer.createVertexBuffer(gl,
			this.colors, gl.DYNAMIC_DRAW);

		this.texBuffers = [];
		for (var texIndex = 0; texIndex < this.texCoords.length; ++texIndex) {
			var buffer = PIXI.glCore.GLBuffer.createVertexBuffer(gl,
				this.texCoords[texIndex], gl.DYNAMIC_DRAW);
			this.texBuffers.push(buffer);
		}

		this.indicesBuffer = PIXI.glCore.GLBuffer.createIndexBuffer(gl,
			this.indices, gl.STATIC_DRAW);

		var materials = this.ctx.materials;

		this.vao = this.ctx.renderer.createVao().addIndex(this.indicesBuffer).
			addAttribute(this.positionBuffer, materials.positionAttrib(), gl.FLOAT, false, 0, 0).
			addAttribute(this.colorBuffer, materials.colorAttrib(), gl.UNSIGNED_BYTE, true, 0, 0);

			for (var texIndex = 0; texIndex < this.texCoords.length; ++texIndex) {
				this.vao.addAttribute(this.texBuffers[texIndex], materials.texAttrib(texIndex),
					gl.FLOAT, false, 0, 0);
			}
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

		if (this.numVertices > 0)
		{
			this.positionBuffer.upload(this.positions.buffer, 0);
			this.colorBuffer.upload(this.colors.buffer, 0);

			this.texBuffers.forEach(function (buffer, index) {
				buffer.upload(this.texCoords[index].buffer, 0);
			}, this);
		}
	}

	bind() {
		this.ctx.renderer.bindVao(this.vao);
	}

	draw(size, start) {
		var gl = this.gl;
		
		this.vao.draw(gl.TRIANGLES, size, start);
	}

	shutdown() {
		this.positionBuffer.destroy();
		this.colorBuffer.destroy();

		this.texBuffers.forEach(function (buffer) {
			buffer.destroy();
		}, this);
	}
}
