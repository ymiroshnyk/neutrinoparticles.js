function NeutrinoParticlesWGL(gl) {
    var neutrinowgl = this;

    this.gl = gl;

    var vertexShaderSource = "\
        attribute vec3 aVertexPosition; \
        attribute vec4 aColor; \
        attribute vec2 aTextureCoord; \
        \
        uniform mat4 uMVMatrix; \
        uniform mat4 uPMatrix; \
        \
        varying vec4 vColor; \
        varying vec2 vTextureCoord; \
        \
        void main(void) { \
            gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0); \
            vColor = aColor; \
            vTextureCoord = aTextureCoord; \
        }";

    var fragmentShaderSource = "\
        precision mediump float; \
        \
        varying vec4 vColor; \
        varying vec2 vTextureCoord; \
        \
        uniform sampler2D uSampler; \
        \
        void main(void) { \
            gl_FragColor = vColor * texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t)); \
        }";

    var fragmentShaderMultiplySource = "\
        precision mediump float; \
        \
        varying vec4 vColor; \
        varying vec2 vTextureCoord; \
        \
        uniform sampler2D uSampler; \
        \
        void main(void)\
        {\
            vec4 texel = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\
	        vec3 rgb = vColor.rgb * texel.rgb;\
	        float alpha = vColor.a * texel.a;\
	        gl_FragColor = vec4(mix(vec3(1, 1, 1), rgb, alpha), 1);\
        }";

    var makeShaderProgram = function (vertexShaderSource, fragmentShaderSource) {
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexShaderSource);
        gl.compileShader(vertexShader);

        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(vertexShader));
            return null;
        }

        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragmentShaderSource);
        gl.compileShader(fragmentShader);

        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(fragmentShader));
            return null;
        }

        var shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        gl.useProgram(shaderProgram);

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        shaderProgram.colorAttribute = gl.getAttribLocation(shaderProgram, "aColor");
        gl.enableVertexAttribArray(shaderProgram.colorAttribute);

        shaderProgram.textureCoordAttribute = [gl.getAttribLocation(shaderProgram, "aTextureCoord")];
        gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute[0]);

        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
        shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");

        return shaderProgram;
    }

    this.shaderProgram = makeShaderProgram(vertexShaderSource, fragmentShaderSource);
    this.shaderProgramMultiply = makeShaderProgram(vertexShaderSource, fragmentShaderMultiplySource);

    this.setMatrixUniforms = function(shaderProgram, pMatrix, mvMatrix) {
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    }

    this.Renderer = function(effect) {
        this.neutrinowgl = neutrinowgl;
        this.effect = effect;

        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(effect.geometryBuffers.positions), gl.DYNAMIC_DRAW);

        this.colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Uint32Array(effect.geometryBuffers.colors), gl.DYNAMIC_DRAW);

        this.texBuffers = [];
        for (var texIndex = 0; texIndex < effect.geometryBuffers.texCoords.length; ++texIndex) {
            var buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(effect.geometryBuffers.texCoords[texIndex]), gl.DYNAMIC_DRAW);
            this.texBuffers.push(buffer);
        }

        this.indicesBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(effect.geometryBuffers.indices), gl.STATIC_DRAW);

        this.textures = [];

        this.createTexturesFromImages = function (images) {
            for (var imageIndex = 0; imageIndex < images.length; ++imageIndex) {
                var texture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[imageIndex]);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                this.textures.push(texture);
            }

            gl.bindTexture(gl.TEXTURE_2D, null);
        }

        this.update = function (dt, position) {
            this.effect.update(dt, position);
        }

        this.prepareGeometry = function (cameraRight, cameraUp, cameraDir) {
            this.effect.fillGeometryBuffers(cameraRight, cameraUp, cameraDir);
        }

        this.render = function (pMatrix, mvMatrix) {
            gl.enable(gl.BLEND);
            gl.disable(gl.DEPTH_TEST);

            // shader programs have the same attributes configuration, so we can set them once and then just change programs
            {
                {
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

                    gl.bufferSubData(gl.ARRAY_BUFFER, 0,
                        new Float32Array(this.effect.geometryBuffers.positions, 0, this.effect.geometryBuffers.numVertices * 3));

                    gl.vertexAttribPointer(neutrinowgl.shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
                }

                {
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);

                    gl.bufferSubData(gl.ARRAY_BUFFER, 0,
                        new Uint32Array(this.effect.geometryBuffers.colors, 0, this.effect.geometryBuffers.numVertices));

                    gl.vertexAttribPointer(neutrinowgl.shaderProgram.colorAttribute, 4, gl.UNSIGNED_BYTE, true, 0, 0);
                }

                this.texBuffers.forEach(function (buffer, index) {

                    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

                    gl.bufferSubData(gl.ARRAY_BUFFER, 0,
                        new Float32Array(this.effect.geometryBuffers.texCoords[index], 0, this.effect.geometryBuffers.numVertices *
                        this.effect.geometryBuffers.texCoords[index].numComponents));

                    gl.vertexAttribPointer(neutrinowgl.shaderProgram.textureCoordAttribute[index],
                        this.effect.geometryBuffers.texCoords[index].numComponents, gl.FLOAT, false, 0, 0);

                }, this);
            }

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);

            // caching current program
			var currentShaderProgram = null;
            var setShaderProgram = function (shaderProgram) {
                if (shaderProgram != currentShaderProgram) {
                    gl.useProgram(shaderProgram);
                    neutrinowgl.setMatrixUniforms(shaderProgram, pMatrix, mvMatrix);
                    gl.uniform1i(shaderProgram.samplerUniform, 0);

                    currentShaderProgram = shaderProgram;
                }
            }

            this.effect.geometryBuffers.renderCalls.forEach(function (renderCall) {
                var texIndex = this.effect.model.renderStyles[renderCall.renderStyleIndex].textureIndices[0];

                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, this.textures[texIndex]);

                var materialIndex = this.effect.model.renderStyles[renderCall.renderStyleIndex].materialIndex;
                switch (this.effect.model.materials[materialIndex]) {
                    case 1:
                        setShaderProgram(neutrinowgl.shaderProgram);
                        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
                        break;

                    case 2:
                        setShaderProgram(neutrinowgl.shaderProgramMultiply);
                        gl.blendFunc(gl.ZERO, gl.SRC_COLOR);
                        break;

                    default:
                        setShaderProgram(neutrinowgl.shaderProgram);
                        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                        break;
                }

                gl.drawElements(gl.TRIANGLES, renderCall.numIndices, gl.UNSIGNED_SHORT, renderCall.startIndex * 2);
            }, this);
        }
    };
}

