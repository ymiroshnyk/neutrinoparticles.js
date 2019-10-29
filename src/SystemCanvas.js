var SystemCanvas2D = function () {
		this._init = function (model, position, rotation) {
			SystemCanvas2D.prototype._init.call(this, model, position, rotation, ConstructCanvas2D);

			this.materials = [];
			this./**/model.materials.forEach(function (value) {
				this.materials.push(['source-over', 'lighter', 'multiply'][value]);
			}, this);

			this./**/textureDescs = [];
		}
	}

	SystemCanvas2D.prototype = new System();

	SystemCanvas2D.prototype./**/draw = function (/**/context, /**/camera) {
		for (var i = 0; i < this.activeEmitters.length; ++i) {
			this.activeEmitters[i].draw(/**/context, /**/camera);
		}
	}