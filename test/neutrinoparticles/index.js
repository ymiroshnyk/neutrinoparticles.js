'use strict';

import * as math from '../../src/neutrinoparticles/Math';
import * as assert from 'assert';

beforeEach(function(){
    this.checkPosRotEps = function(effect, position, rotation, eps) {
        assert.equal(math.equalv3eps_(effect.position, position, eps), true);
        assert.equal(math.equalqeps_(effect.rotation, rotation, eps), true);
    }

    this.checkPosRot = function(effect, position, rotation) {
        this.checkPosRotEps(effect, position, rotation, 0);
    }

    this.checkFloatEps = function(a, b, eps) {
        assert.equal(Math.abs(a - b) <= eps, true);
    }
});

require('./FrameInterpolator');
require('./Generator');
require('./GeneratorPeriodic');
require('./GeneratorDist');
require('./Emitter');
require('./Effect');