class PIXINeutrino
{
    static registerPlugins()
    {
        PIXI.Application.registerPlugin(PIXINeutrinoApplicationPlugin)
        PIXI.Renderer.registerPlugin('neutrino', PIXINeutrinoRendererPlugin);
        PIXI.Loader.registerPlugin(PIXINeutrinoLoaderPlugin);
    }
}
