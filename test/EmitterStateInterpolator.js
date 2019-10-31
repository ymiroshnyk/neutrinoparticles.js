'use strict';

import * as Neutrino from '../dist/neutrinoparticles.umd'
import assert from 'assert';
import * as utils from './TestUtils'

const math = Neutrino.math;

describe('EmitterStateInterpolator', function()
{
    beforeEach(function() {
    });

    afterEach(function() {
    })

    describe('constructor()', function()
    {
        it('should not crash', function() {
            const interp = new Neutrino.EmitterStateInterpolator();           
        });
    });

    describe('begin()', function() {
        it('should work correctly for equal states', function() {
            const from = {
                position: [1, 2, 3],
                rotation: [4, 5, 6, 7],
                velocity: [8, 9, 10],
                time: 11
            };

            const to = {
                position: [1, 2, 3],
                rotation: [4, 5, 6, 7],
                velocity: [8, 9, 10],
                time: 11
            };

            const current = {
                position: [0, 0, 0],
                rotation: [0, 0, 0, 0],
                velocity: [0, 0, 0],
                time: 0
            }
            
            const interp = new Neutrino.EmitterStateInterpolator();
            interp.begin(from, to, current);
            assert(interp._position === false);
            assert(interp._rotation === false);
            assert(interp._velocity === false);
            assert(interp.positionChanging == interp._position);
            assert(interp._time === false);
            assert(math.equalv3_(to.position, current.position));
            assert(math.equalq_(to.rotation, current.rotation));
            assert(math.equalv3_(to.velocity, current.velocity));
            assert(to.time == current.time);
        });

        it('should work correctly for NOT equal states', function() {
            const from = {
                position: [1, 2, 3],
                rotation: [4, 5, 6, 7],
                velocity: [8, 9, 10],
                time: 11
            };

            const to = {
                position: [1, 2, 0],
                rotation: [4, 5, 6, 0],
                velocity: [8, 9, 0],
                time: 12
            };

            const current = {
                position: [0, 0, 0],
                rotation: [0, 0, 0, 0],
                velocity: [0, 0, 0],
                time: 0
            }
            
            const interp = new Neutrino.EmitterStateInterpolator();
            interp.begin(from, to, current);
            assert(interp._position === true);
            assert(interp._rotation === true);
            assert(interp._velocity === true);
            assert(interp._time === true);
            assert(interp.positionChanging == interp._position);
            assert(!math.equalv3_(to.position, current.position));
            assert(!math.equalq_(to.rotation, current.rotation));
            assert(!math.equalv3_(to.velocity, current.velocity));
            assert(to.time != current.time);
        });
    });

    describe('end()', function() {
        it('should setup current state correctly', function() {
            const from = {
                position: [1, 2, 3],
                rotation: [4, 5, 6, 7],
                velocity: [8, 9, 10],
                time: 11
            };

            const to = {
                position: [1, 2, 0],
                rotation: [4, 5, 6, 0],
                velocity: [8, 9, 0],
                time: 12
            };

            const current = {
                position: [0, 0, 0],
                rotation: [0, 0, 0, 0],
                velocity: [0, 0, 0],
                time: 0
            }
            
            const interp = new Neutrino.EmitterStateInterpolator();
            interp.begin(from, to, current);
            interp.end();

            assert(math.equalv3_(to.position, current.position));
            assert(math.equalq_(to.rotation, current.rotation));
            assert(math.equalv3_(to.velocity, current.velocity));
            assert(to.time == current.time);
        })
    });

    describe('set()', function() {
        it('should interpolate correctly', function() {
            const from = {
                position: [1, 2, 3],
                rotation: [4, 5, 6, 7],
                velocity: [8, 9, 10],
                time: 11
            };

            const to = {
                position: [3, 4, 5],
                rotation: [6, 7, 8, 9],
                velocity: [10, 11, 12],
                time: 13
            };

            const current = {
                position: [0, 0, 0],
                rotation: [0, 0, 0, 0],
                velocity: [0, 0, 0],
                time: 0
            }

            const interp = new Neutrino.EmitterStateInterpolator();
            interp.begin(from, to, current);
            
            interp.set(0.5);

            const eps = 0.0001;

            assert(math.equalv3eps_(current.position, [2, 3, 4], eps));
            assert(math.equalqeps_(current.rotation, [5, 6, 7, 8], eps));
            assert(math.equalv3eps_(current.velocity, [9, 10, 11], eps));
            assert(Math.abs(current.time - 12) < eps);

            interp.set(0);
            assert(math.equalv3eps_(current.position, from.position, eps));
            assert(math.equalqeps_(current.rotation, from.rotation, eps));
            assert(math.equalv3eps_(current.velocity, from.velocity, eps));
            assert(Math.abs(current.time - from.time) < eps);

            interp.set(1);
            assert(math.equalv3eps_(current.position, to.position, eps));
            assert(math.equalqeps_(current.rotation, to.rotation, eps));
            assert(math.equalv3eps_(current.velocity, to.velocity, eps));
            assert(Math.abs(current.time - to.time) < eps);
        })
    })

    describe('get state*()', function() {
        it ('should return corrent object', function() {
            const from = {
                position: [1, 2, 3],
                rotation: [4, 5, 6, 7],
                velocity: [8, 9, 10],
                time: 11
            };

            const to = {
                position: [3, 4, 5],
                rotation: [6, 7, 8, 9],
                velocity: [10, 11, 12],
                time: 13
            };

            const current = {
                position: [0, 0, 0],
                rotation: [0, 0, 0, 0],
                velocity: [0, 0, 0],
                time: 0
            }

            const interp = new Neutrino.EmitterStateInterpolator();
            interp.begin(from, to, current);
            assert(interp.state == current);
            assert(interp.stateFrom == from);
            assert(interp.stateTo == to);
        })
    })
});