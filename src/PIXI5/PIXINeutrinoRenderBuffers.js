class PIXINeutrinoRenderBuffers {
	constructor() {
		this.positions = null;
		this.colors = null;
		this.texCoords = null;
		this.maxNumVertices = 0;
		this.numVertices = 0;
		this.indices = null;
		this.globalIndices = null;

		this.renderCalls = [];
		this.maxNumRenderCalls = 0;
		this.numRenderCalls = 0;

		this._renderCallStartVertexIndex = 0;
	}

	initialize(maxNumVertices, texChannels, indices, maxNumRenderCalls) {

		// We store only XY components of position.
		this.positions = new Float32Array(new ArrayBuffer(4 * maxNumVertices * 2));
		this.colors = new Uint8Array(new ArrayBuffer(4 * maxNumVertices));
		// We store only first texture channel and only UV of it.
		this.texCoords = new Float32Array(new ArrayBuffer(4 * maxNumVertices * 2));
		this.maxNumVertices = maxNumVertices;

		this.globalIndices = new Uint16Array(new ArrayBuffer(2 * indices.length));
		this.globalIndices.set(indices, 0);
		this.indices = new Uint16Array(new ArrayBuffer(2 * indices.length));

		this.maxNumRenderCalls = maxNumRenderCalls;
	}

	pushVertex(vertex) {
		let startIndex2 = this.numVertices * 2;

		// Copy only XY components of the position
		{
			this.positions[startIndex2] = vertex.position[0];
			this.positions[startIndex2 + 1] = vertex.position[1];
		}

		this.colors.set(vertex.color, this.numVertices * 4);

		if (vertex.texCoords.length > 0)
		{
			// Copy only first channel of texture coordinates.
			// Texture coordinates from Neutrino must be at least 2-dimensional.
			this.texCoords[startIndex2] = vertex.texCoords[0][0];
			this.texCoords[startIndex2 + 1] = 1.0 - vertex.texCoords[0][1];
		}
		else
		{
			this.texCoords[startIndex2] = 0.0;
			this.texCoords[startIndex2 + 1] = 0.0;
		}

		++this.numVertices;
	}

	pushRenderCall(rc) {
		if (this.numRenderCalls >= this.renderCalls.length)
			this.renderCalls.push(Object.assign({}, rc));
		else
			Object.assign(this.renderCalls[this.numRenderCalls], rc);

		const thisRenderCall = this.renderCalls[this.numRenderCalls];

		thisRenderCall.startVertexIndex = this._renderCallStartVertexIndex;
		thisRenderCall.numVertices = this.numVertices - this._renderCallStartVertexIndex;

		const endIndex = thisRenderCall.startIndex + thisRenderCall.numIndices;
		for (let i = thisRenderCall.startIndex; i < endIndex; ++i)
		{
			this.indices[i] = this.globalIndices[i] - this._renderCallStartVertexIndex;
		}

		this._renderCallStartVertexIndex = this.numVertices;
		++this.numRenderCalls;
	}

	cleanup() {
		this.numVertices = 0;
		this.numRenderCalls = 0;
		this._renderCallStartVertexIndex = 0;
	}
}
