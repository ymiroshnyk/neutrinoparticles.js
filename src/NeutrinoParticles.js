"use strict"

function NeutrinoParticles() {
	var ctx = this;

	this.offCanvas = document.createElement('canvas');
	this.offCanvas.width = 0;
	this.offCanvas.height = 0;
	this.offContext = this.offCanvas.getContext('2d');

	this.adjustOffCanvasSize = function(minWidth, minHeight) {
		if (this.offCanvas.width < minWidth || this.offCanvas.height < minHeight) {
			this.offCanvas.width = minWidth;
			this.offCanvas.height = minHeight;
			this.offContext = this.offCanvas.getContext('2d');
		}
	}
	
	this.effects = [];
	
	this.loadEffect = function(effectFilePath, onSuccessFunc, onFailFunc) {

		if (this.effects[effectFilePath] != undefined) {
						
			var effectModel = this.effects[effectFilePath];
			
			if (effectModel instanceof Array) {
				effectModel[effectModel.length] = [onSuccessFunc, onFailFunc];
				return;
			}
			
			onSuccessFunc(effectModel);
			return;
		}
		
		this.effects[effectFilePath] = [[onSuccessFunc, onFailFunc]];
		
		var request = new XMLHttpRequest();
		request.open("GET", effectFilePath, true);
		request.responseType = "text";
		request.ctx = this;
		request.onreadystatechange = function () {
			if (request.readyState == 4) {
				var callbacks = this.ctx.effects[effectFilePath];
				
				if ((request.status >= 200 && request.status < 300) || request.status == 304) {
					
					var evalText = "(function(ctx) {\n" + 
						request.responseText + 
						"\nreturn new NeutrinoEffect(ctx);\n})(this.ctx);";
					var effectModel = eval(evalText);
					this.ctx.effects[effectFilePath] = effectModel;
					
					callbacks.forEach(function(callback) {
						callback[0](effectModel);
					});
															
				} else {
					callbacks.forEach(function(callback) {
						callback[1]();
					});
				}
			}
		}
		
		request.send();
	}
	
	this.removeEffect = function(effectFilePath) {
		delete this.effects[effectFilePath];
	}
}

