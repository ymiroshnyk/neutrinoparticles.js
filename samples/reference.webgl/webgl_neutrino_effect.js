class WebGLNeutrinoEffect {
	constructor(model, position, rotationAngle) {
		this.ctx = model.ctx;
		this.model = model;
		this.gl = model.gl;
		this.position = position.slice();
		this.rotationAngle = rotationAngle;

		var gl = this.gl;

		this.renderBuffers = new WebGLNeutrinoRenderBuffers(this.ctx);

		this.effect = this.model.effectModel.createWGLInstance(position,
			this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.rotationAngle),
			this.renderBuffers);
		this.effect.texturesRemap = this.model.texturesRemap;
		
	}

	update(dt) {
		this.effect.update(dt, this.position,
			this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.rotationAngle));
	}

	render(cameraRight, cameraUp, cameraDir, pMatrix, mvMatrix) {
		var materials = this.ctx.materials;
		var effectModel = this.model.effectModel;

		this.effect.fillGeometryBuffers(cameraRight, cameraUp, cameraDir);
		this.renderBuffers.updateGlBuffers();
		this.renderBuffers.bind();

		materials.setup(pMatrix, mvMatrix);

		for (var renderCallIdx = 0; renderCallIdx < this.renderBuffers.numRenderCalls; ++renderCallIdx) {
			var renderCall = this.renderBuffers.renderCalls[renderCallIdx];
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
		}
	}

	resetPosition(position, rotationAngle) {
		if (position)
			this.position = position.slice();

		if (rotationAngle)
			this.rotationAngle = rotationAngle;

		this.effect.resetPosition(position, rotationAngle ? 
			this.ctx.neutrino.axisangle2quat_([0, 0, 1], rotationAngle) : null);
	}

	setPropertyInAllEmitters(name, value) {
		this.effect.setPropertyInAllEmitters(name, value);
	}
}