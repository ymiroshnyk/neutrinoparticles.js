class PIXINeutrinoLoader
{
    static use(resource, next)
    {
        if (resource.extension === 'js' 
            && resource.metadata
            && resource.metadata.neutrino)
        {
            resource.effectModel = new PIXINeutrinoEffectModel(resource.metadata.neutrino, this, resource);
        }

        next();
    }
}