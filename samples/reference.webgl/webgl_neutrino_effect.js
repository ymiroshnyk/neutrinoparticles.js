class WebGLNeutrinoEffect {
	constructor(model, position) {
		this.ctx = model.ctx;
		this.model = model;
		this.gl = model.gl;
		this.position = position.slice();

		var gl = this.gl;

		this.effect = this.model.effectModel.createWGLInstance(position);
		this.effect.texturesRemap = this.model.texturesRemap;
		this.renderBuffers = new WebGLNeutrinoRenderBuffers(this.ctx, this.effect.geometryBuffers);
	}

	update(dt) {
		this.effect.update(dt, this.position);
	}

	render(cameraRight, cameraUp, cameraDir, pMatrix, mvMatrix) {
		var materials = this.ctx.materials;
		var effectModel = this.model.effectModel;

		this.effect.fillGeometryBuffers(cameraRight, cameraUp, cameraDir);
		
		this.renderBuffers.setup(this.effect.geometryBuffers);

		materials.setup(pMatrix, mvMatrix);

		this.effect.geometryBuffers.renderCalls.forEach(function (renderCall) {
			var texIndex = effectModel.renderStyles[renderCall.renderStyleIndex].textureIndices[0];

			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, this.model.textures[texIndex]);

			var materialIndex = effectModel.renderStyles[renderCall.renderStyleIndex].materialIndex;
			switch (effectModel.materials[materialIndex]) {
				default: materials.switchToNormal(); break;
				case 1: materials.switchToAdd(); break;
				case 2: materials.switchToMultiply(); break;
			}

			gl.drawElements(gl.TRIANGLES, renderCall.numIndices, gl.UNSIGNED_SHORT, renderCall.startIndex * 2);
		}, this);
	}

	resetPosition(position) {
		this.position = position.slice();
		this.effect.resetPosition(this.position);
	}

	setPropertyInAllEmitters(name, value) {
		this.effect.setPropertyInAllEmitters(name, value);
	}
}