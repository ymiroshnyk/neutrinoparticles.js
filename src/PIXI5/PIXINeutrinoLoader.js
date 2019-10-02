class PIXINeutrinoLoader
{
    static use(resource, next)
    {
        if (resource.extension === 'js' 
            && resource.metadata
            && resource.metadata.neutrino
            && resource.data)
        {
            resource.effectModel = new PIXINeutrinoEffectModel(resource.metadata.neutrino, this, resource);
        }

        next();
    }
}