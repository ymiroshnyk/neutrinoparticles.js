class PIXINeutrinoApplicationPlugin
{
    static init(options)
    {
        this.neutrino = new PIXINeutrinoContext(this, options.neutrino || {});
    }

    static destroy()
    {
        this.neutrino = null;
    }
}