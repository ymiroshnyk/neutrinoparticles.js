class PIXINeutrinoEffect extends PIXI.Container
{
    constructor(neutrinoCtx)
    {
        super();

        this.neutrinoCtx = neutrinoCtx;
    }

    _render(renderer)
    {
        renderer.batch.setObjectRenderer(this.neutrinoCtx.neutrinoRenderer);
        this.neutrinoCtx.neutrinoRenderer.render(this);
    }
}
