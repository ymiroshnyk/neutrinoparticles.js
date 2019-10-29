'use strict';

class Particle {
    constructor() {
        this.position = [];
        this.origin = [];
        this.size = [];
        this.color = [];
        this.attachedEmitters = [];
        this.waitingForDelete = false;
    }

    baseInit() {
        this.waitingForDelete = false;

        for (var i = 0; i < this.attachedEmitters.length; ++i) {
            var attachedEmitter = this.attachedEmitters[i];
            attachedEmitter.emitter.restart(this.position, null);

            if (attachedEmitter.props.onTerminate)
                attachedEmitter.emitter.disactivate();
        }
    }

    init() {
        thisEmitter.model.initParticleProps(thisEmitter, this); // IMPL
        this.baseInit();
    }

    initBurst() {
        thisEmitter.model.initBurstParticleProps(thisEmitter, this); // IMPL
        this.baseInit();
    }

    update(dt) {
        thisEmitter.model.updateParticle(dt, thisEmitter, this); // IMPL

        this.updateAttachedEmitters(dt);
    }

    attachedEmitter(index) {
        return this.attachedEmitters[index].emitter;
    }

    updateAttachedEmitters(dt) {
        for (var i = 0; i < this.attachedEmitters.length; i++) {
            this.attachedEmitters[i].emitter.update(dt, this.position, null);
        }
    }

    attachEmitter(emitterImpl, emitterProps) {
        this.attachedEmitters.push({
            emitter: new Emitter(system, emitterImpl, Construct),
            props: emitterProps
        });
    }

    drawAttachedEmitters(context, drawOrder, camera) {
        for (var i = 0; i < this.attachedEmitters.length; ++i) {
            var attachedEmitter = this.attachedEmitters[i];

            if (drawOrder == attachedEmitter.props.drawOrder)
                attachedEmitter.emitter.draw(context, camera);
        }
    }

    fillAttachedEmittersGeometry(drawOrder, cameraRight, cameraUp, cameraDir, renderBuffer) {
        for (var i = 0; i < this.attachedEmitters.length; ++i) {
            var attachedEmitter = this.attachedEmitters[i];

            if (drawOrder == attachedEmitter.props.drawOrder)
                attachedEmitter.emitter.fillGeometryBuffers(cameraRight, cameraUp, cameraDir, renderBuffer);
        }
    }

    onTerminated(context) {
        this.waitingForDelete = true;
        for (var i = 0; i < this.attachedEmitters.length; ++i) {
            var attachedEmitter = this.attachedEmitters[i];

            if (attachedEmitter.props.onTerminate)
                attachedEmitter.emitter.activate();
            else
                attachedEmitter.emitter.disactivate();
        }
    }

    setAttachedEmittersImages(imageDescs) {
        for (var i = 0; i < this.attachedEmitters.length; ++i) {
            this.attachedEmitters[i].emitter.setImages(imageDescs);
        }
    }
}
