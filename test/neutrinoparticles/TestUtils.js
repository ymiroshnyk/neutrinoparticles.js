'use strict';

import * as assert from 'assert'
import * as math from '../../src/neutrinoparticles/Math'

export function checkPosRotEps(object, position, rotation, eps) {
    assert.equal(math.equalv3eps_(object.position, position, eps), true);
    assert.equal(math.equalqeps_(object.rotation, rotation, eps), true);
}

export function checkPosRot(object, position, rotation) {
    this.checkPosRotEps(object, position, rotation, 0);
}

export function checkFloatEps(a, b, eps) {
    assert.equal(Math.abs(a - b) <= eps, true);
}