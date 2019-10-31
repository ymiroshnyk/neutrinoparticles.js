'use strict';

import assert from 'assert'
import { math } from '../dist/neutrinoparticles.umd.js'

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

export function checkFakeArguments(fake, argsArray, pred) {

    if (!pred)
        pred = function(a, b) { assert.equal(a, b); }

    for (let i = 0; i < argsArray.length; ++i) {
        if (argsArray[i] instanceof Array) {
            argsArray[i].forEach((value, argIndex) => {
                pred(fake.getCall(i).args[argIndex], value);
            });            
        } else {
            pred(fake.getCall(i).args[0], argsArray[i]);
        }
    }
}