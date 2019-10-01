class PIXINeutrinoPlugin extends PIXI.AbstractBatchRenderer
{
    constructor(renderer)
    {
        super(renderer);

        this.shaderGenerator = new PIXI.BatchShaderGenerator(
            PIXI.BatchPluginFactory.defaultVertexSrc, 
            PIXI.BatchPluginFactory.defaultFragmentTemplate);

        this.geometryClass = PIXI.BatchGeometry;
        this.vertexSize = 6;
    }

    packInterleavedGeometry(element, attributeBuffer, indexBuffer, aIndex, iIndex)
    {
        const {
            uint32View,
            float32View,
        } = attributeBuffer;

        const packedVertices = aIndex / this.vertexSize;
        const uvs = element.uvs;
        const indicies = element.indices;
        const vertexData = element.vertexData;
        const textureId = element._texture.baseTexture._id;
        const colors = element.colors;

        //const alpha = Math.min(element.worldAlpha, 1.0);
        /*const argb = (alpha < 1.0
          && element._texture.baseTexture.premultiplyAlpha)
            ? premultiplyTint(element._tintRGB, alpha)
            : element._tintRGB + (alpha * 255 << 24);
            */

        let lastSrcColor = 0xFFFFFFFF;
        let lastResultColor = 0xFFFFFFFF;

        let prepareColor = element._texture.baseTexture.premultiplyAlpha ?
            function(srcColor) // In case of premultiplied texture
            {
                if (srcColor == lastSrcColor)
                    return lastResultColor;

                lastSrcColor = srcColor;

                const shiftedAlpha = (srcColor & 0xFF000000);

                if (shiftedAlpha == 0xFF000000)
                {
                    lastResultColor = srcColor;
                }
                else if (shiftedAlpha == 0)
                {
                    lastResultColor = 0;
                }
                else
                {
                    const alpha = (shiftedAlpha >>> 24) / 255.0;
                    lastResultColor = PIXI.utils.premultiplyTint(srcColor & 0xFFFFFF, alpha);
                }

                return lastResultColor;
            } :
            function(srcColor) // In case of non-premultiplied texture
            { 
                return srcColor; 
            }

        // lets not worry about tint! for now..
        for (let i = 0; i < vertexData.length; i += 2)
        {
            float32View[aIndex++] = vertexData[i];
            float32View[aIndex++] = vertexData[i + 1];
            float32View[aIndex++] = uvs[i];
            float32View[aIndex++] = uvs[i + 1];
            uint32View[aIndex++] = prepareColor(colors[i >>> 1]);
            float32View[aIndex++] = textureId;
        }

        for (let i = 0; i < indicies.length; i++)
        {
            indexBuffer[iIndex++] = packedVertices + indicies[i];
        }
    }
}
