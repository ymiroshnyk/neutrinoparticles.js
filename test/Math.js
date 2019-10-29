'use strict';

import * as Neutrino from '../dist/neutrinoparticles.umd.js';
import * as assert from 'assert';

const math = Neutrino.math;

describe('Math', function () {

    it('equalv3()', function () {

        function makeTest(a, b, result = true) {
            assert.equal(math.equalv3_(a, b), result)  
        }

        makeTest([0, 0, 0], [0, 0, 0])

        for (let index = 0; index < 3; index++) {
            let a = [0, 0, 0]
            let b = [0, 0, 0]
            b[index] = 1
            makeTest(a, b, false)
        }

        for (let index = 0; index < 3; index++) {
            let a = [0, 0, 0]
            let b = [0, 0, 0]
            a[index] = 1
            makeTest(a, b, false)
        }

    })


    it('equalv3eps_()', function () {

        function makeTest(a, b, eps, result = true) {
            assert.equal(math.equalv3eps_(a, b, eps), result)  
        }

        makeTest([0, 0, 0], [0, 1, 0], 1)

        for (let epsChanges = -1; epsChanges < 1; epsChanges++) {
            for (let index = 0; index < 3; index++) {
                let a = [0, 0, 0]
                let b = [0, 0, 0]
                let eps = 3
                a[index] = eps + epsChanges
                makeTest(a, b, eps, true)
            }
    
            for (let index = 0; index < 3; index++) {
                let a = [0, 0, 0]
                let b = [0, 0, 0]
                let eps = 3
                b[index] = eps + epsChanges
                makeTest(a, b, eps, true)
            }
        }

        for (let index = 0; index < 3; index++) {
            let a = [0, 0, 0]
            let b = [0, 0, 0]
            let eps = 3
            a[index] = eps + 1
            makeTest(a, b, eps, false)
        }

        for (let index = 0; index < 3; index++) {
            let a = [0, 0, 0]
            let b = [0, 0, 0]
            let eps = 3
            b[index] = eps + 1
            makeTest(a, b, eps, false)
        }

    })


    it('equalq_()', function () {

        function makeTest(a, b, result = true) {
            assert.equal(math.equalq_(a, b), result)  
        }
        makeTest([1, 2, 3, 4], [1, 2, 3, 4])

        for (let index = 0; index < 4; index++) {
            let a = [0, 0, 0, 0]
            let b = [0, 0, 0, 0]
            b[index] = 1
            makeTest(a, b, false)
        }

        for (let index = 0; index < 4; index++) {
            let a = [0, 0, 0, 0]
            let b = [0, 0, 0, 0]
            a[index] = 1
            makeTest(a, b, false)
        }

    })    


    it('equalqeps_()', function () {

        function makeTest(a, b, eps, result = true) {
            assert.equal(math.equalqeps_(a, b, eps), result)  
        }

        for (let epsChanges = -1; epsChanges < 1; epsChanges++) {
            for (let index = 0; index < 3; index++) {
                let a = [0, 0, 0, 0]
                let b = [0, 0, 0, 0]
                let eps = 3
                a[index] = eps + epsChanges
                makeTest(a, b, eps, true)
            }
    
            for (let index = 0; index < 3; index++) {
                let a = [0, 0, 0, 0]
                let b = [0, 0, 0, 0]
                let eps = 3
                b[index] = eps + epsChanges
                makeTest(a, b, eps, true)
            }
        }

        for (let index = 0; index < 3; index++) {
            let a = [0, 0, 0, 0]
            let b = [0, 0, 0, 0]
            let eps = 3
            a[index] = eps + 1
            makeTest(a, b, eps, false)
        }

        for (let index = 0; index < 3; index++) {
            let a = [0, 0, 0, 0]
            let b = [0, 0, 0, 0]
            let eps = 3
            b[index] = eps + 1
            makeTest(a, b, eps, false)
        }

    })


    it("addv2_()", function () {    

        function makeTest(a, b, result) {
            assert.deepEqual(math.addv2_(a, b), result)     
        }

        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                makeTest([a, b], [1, 2], [a + 1, b + 2])
                makeTest([1, 2], [a, b], [a + 1, b + 2])
            }
        }
    })


    it("addv2()", function () {        
        
        function makeTest(a, b, result) {
            it("add([" + a + "], [" + b + "]) = [" + result + "]", function () {
                let r = []
                math.addv2(r, a, b)
                assert.deepEqual(r, result)
            })      
        }

        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                makeTest([a, b], [1, 2], [a + 1, b + 2])
                makeTest([1, 2], [a, b], [a + 1, b + 2])
            }
        }

    })


    it('addv2scalar()', function () {

        function makeTest(a, s, result) {
            let r = []
            math.addv2scalar(r, a, s)
            assert.deepEqual(r, result)    
        }

        for (let s = -1; s < 2; s++) {
            makeTest([1, 2], s, [1 + s, 2 + s])
        }

    })


    it('addv2scalar_()', function () {

        function makeTest(a, s, result) {
            assert.deepEqual(math.addv2scalar_(a, s), result)
        }

        for (let s = -1; s < 2; s++) {
            makeTest([1, 2], s, [1 + s, 2 + s])
        }

    })


    it("addv3()", function () {        
        
        function makeTest(a, b, result) {
            let r = []
            math.addv3(r, a, b)
            assert.deepEqual(r, result)   
        }

        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                for (let c = -1; c < 2; c++) {
                    makeTest([a, b, c], [1, 2, 3], [a + 1, b + 2, c + 3])
                }
            }
        }

    })


    it("addv3_()", function () {        
        
        function makeTest(a, b, result) {
            assert.deepEqual(math.addv3_(a, b), result)
        }

        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                for (let c = -1; c < 2; c++) {
                    makeTest([a, b, c], [1, 2, 3], [a + 1, b + 2, c + 3])
                }
            }
        }

    })


    it('addv3scalar()', function () {

        function makeTest(a, s, result) {
            let r = []
            math.addv3scalar(r, a, s)
            assert.deepEqual(r, result) 
        }

        for (let s = -1; s < 2; s++) {
            makeTest([1, 2, 3], s, [1 + s, 2 + s, 3 + s])
        }

    })



    it('addv3scalar_()', function () {

        function makeTest(a, s, result) {
            assert.deepEqual(math.addv3scalar_(a, s), result)
        }

        for (let s = -1; s < 2; s++) {
            makeTest([1, 2, 3], s, [1 + s, 2 + s, 3 + s])
        }

    })
    


    it("addq()", function () {        
        
        function makeTest(a, b, result) {
            let r = []
            math.addq(r, a, b)
            assert.deepEqual(r, result)   
        }

        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                for (let c = -1; c < 2; c++) {
                    for (let d = -1; d < 2; d++) {
                        makeTest([a, b, c, d], [1, 2, 3, 4], [a + 1, b + 2, c + 3, d + 4])
                    }
                }
            }
        }

    })


    it("addq_()", function () {        
        
        function makeTest(a, b, result) {
            assert.deepEqual(math.addq_(a, b), result) 
        }

        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                for (let c = -1; c < 2; c++) {
                    for (let d = -1; d < 2; d++) {
                        makeTest([a, b, c, d], [1, 2, 3, 4], [a + 1, b + 2, c + 3, d + 4])
                    }
                }
            }
        }
        
    })


    it("subv2()", function () {        
        
        function makeTest(a, b, result) {
            let r = []
            math.subv2(r, a, b)
            assert.deepEqual(r, result)
        }

        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                makeTest([a, b], [1, 2], [a - 1, b - 2])
                makeTest([1, 2], [a, b], [1 - a, 2 - b])
            }
        }

    })  


    it("subv2_()", function () {        
        
        function makeTest(a, b, result) {
            assert.deepEqual(math.subv2_(a, b), result)
        }

        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                makeTest([a, b], [1, 2], [a - 1, b - 2])
                makeTest([1, 2], [a, b], [1 - a, 2 - b])
            }
        }

    })    
    

    it('subv2scalar()', function () {

        function makeTest(a, s, result) {
            let r = []
            math.subv2scalar(r, a, s)
            assert.deepEqual(r, result)
        }

        for (let s = -1; s < 2; s++) {
            makeTest([1, 2], s, [1 - s, 2 - s])
        }

    })


    it('subv2scalar_()', function () {

        function makeTest(a, s, result) {            
            assert.deepEqual(math.subv2scalar_(a, s), result)
        }

        for (let s = -1; s < 2; s++) {
            makeTest([1, 2], s, [1 - s, 2 - s])
        }

    })


    it('subscalarv2_()', function () {

        function makeTest(s, a, result) {            
            assert.deepEqual(math.subscalarv2_(s, a), result)
        }

        for (let s = -1; s < 2; s++) {
            makeTest(s, [1, 2], [s - 1, s - 2])
        }

    })


    it('subscalarv2()', function () {

        function makeTest(s, a, result) {
            let r = []
            math.subscalarv2(r, s, a)
            assert.deepEqual(r, result)      
        }

        for (let s = -1; s < 2; s++) {
            makeTest(s, [1, 2], [s - 1, s - 2])
        }

    })


    it("subv3()", function () {        
        
        function makeTest(a, b, result) {
            let r = []
            math.subv3(r, a, b)
            assert.deepEqual(r, result)  
        }

        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                for (let c = -1; c < 2; c++) {
                    makeTest([a, b, c], [1, 2, 3], [a - 1, b - 2, c - 3])
                    makeTest([1, 2, 3], [a, b, c], [1 - a, 2 - b, 3 - c])
                }
            }
        }

    }) 


    it("subv3_()", function () {        
        
        function makeTest(a, b, result) {
            assert.deepEqual(math.subv3_(a, b), result)
        }

        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                for (let c = -1; c < 2; c++) {
                    makeTest([a, b, c], [1, 2, 3], [a - 1, b - 2, c - 3])
                    makeTest([1, 2, 3], [a, b, c], [1 - a, 2 - b, 3 - c])
                }
            }
        }

    }) 


    it('subv3scalar()', function () {

        function makeTest(a, s, result) {
            let r = []
            math.subv3scalar(r, a, s)
            assert.deepEqual(r, result)
        }

        for (let s = -1; s < 2; s++) {
            makeTest([1, 2, 3], s, [1 - s, 2 - s, 3 - s])
        }

    })


    it('subv3scalar_()', function () {

        function makeTest(a, s, result) {          
            assert.deepEqual(math.subv3scalar_(a, s), result)
        }

        for (let s = -1; s < 2; s++) {
            makeTest([1, 2, 3], s, [1 - s, 2 - s, 3 - s])
        }

    })


    it('subscalarv3_()', function () {

        function makeTest(s, a, result) {         
            assert.deepEqual(math.subscalarv3_(s, a), result)
        }

        for (let s = -1; s < 2; s++) {
            makeTest(s, [1, 2, 3], [s - 1, s - 2, s - 3])
        }

    })


    it('subscalarv3()', function () {

        function makeTest(s, a, result) {
            let r = []
            math.subscalarv3(r, s, a)
            assert.deepEqual(r, result)      
        }

        for (let s = -1; s < 2; s++) {
            makeTest(s, [1, 2, 3], [s - 1, s - 2, s - 3])
        }

    })


    it("mulv2_()", function () {    

        function makeTest(a, b, result) {
            assert.deepEqual(math.mulv2_(a, b), result)    
        }

        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                makeTest([a, b], [11, 33], [a * 11, b * 33])
                makeTest([11, 33], [a, b], [a * 11, b * 33])
            }
        }
    })


    it("mulv2()", function () {        
        
        function makeTest(a, b, result) {
            let r = []
            math.mulv2(r, a, b)
            assert.deepEqual(r, result)    
        }

        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                makeTest([a, b], [11, 33], [a * 11, b * 33])
                makeTest([11, 33], [a, b], [a * 11, b * 33])
            }
        }

    })


    it('mulv2scalar()', function () {

        function makeTest(a, s, result) {
            let r = []
            math.mulv2scalar(r, a, s)
            assert.deepEqual(r, result) 
        }

        for (let s = -1; s < 2; s++) {
            makeTest([1, 2], s, [1 * s, 2 * s])
        }

    })


    it('mulv2scalar_()', function () {

        function makeTest(a, s, result) {          
            assert.deepEqual(math.mulv2scalar_(a, s), result)  
        }

        for (let s = -1; s < 2; s++) {
            makeTest([1, 2], s, [1 * s, 2 * s])
        }

    })


    it("mulv3()", function () {        
        
        function makeTest(a, b, result) {
            let r = []
            math.mulv3(r, a, b)
            assert.deepEqual(r, result)
        }

        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                for (let c = -1; c < 2; c++) {
                    makeTest([a, b, c], [11, 22, 33], [a * 11, b * 22, c * 33])
                }
            }
        }

    })


    it("mulv3_()", function () {        
        
        function makeTest(a, b, result) {
            assert.deepEqual(math.mulv3_(a, b), result)
        }

        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                for (let c = -1; c < 2; c++) {
                    makeTest([a, b, c], [11, 22, 33], [a * 11, b * 22, c * 33])
                }
            }
        }

    })


    it('mulv3scalar()', function () {

        function makeTest(a, s, result) {
            let r = []
            math.mulv3scalar(r, a, s)
            assert.deepEqual(r, result)
        }

        for (let s = -1; s < 2; s++) {
            makeTest([1, 2, 3], s, [1 * s, 2 * s, 3 * s])
        }

    })


    it('mulv3scalar_()', function () {

        function makeTest(a, s, result) {             
            assert.deepEqual(math.mulv3scalar_(a, s), result)
        }

        for (let s = -1; s < 2; s++) {
            makeTest([1, 2, 3], s, [1 * s, 2 * s, 3 * s])
        }

    })


    it("divv2_()", function () {    

        function makeTest(a, b, result) {
            assert.deepEqual(math.divv2_(a, b), result)
        }

        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                makeTest([a, b], [11, 44], [a / 11, b / 44])
                makeTest([11, 44], [a, b], [11 / a, 44 / b])
            }
        }
    })


    it("divv2()", function () {        
        
        function makeTest(a, b, result) {
                let r = []
                math.divv2(r, a, b)
                assert.deepEqual(r, result) 
        }

        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                makeTest([a, b], [11, 44], [a / 11, b / 44])
                makeTest([11, 44], [a, b], [11 / a, 44 / b])
            }
        }

    })


    it('divv2scalar()', function () {

        function makeTest(a, s, result) {
            let r = []
            math.divv2scalar(r, a, s)
            assert.deepEqual(r, result)
        }

        for (let s = -1; s < 2; s++) {
            makeTest([1, 2], s, [1 / s, 2 / s])
        }

    })


    it('divv2scalar_()', function () {

        function makeTest(a, s, result) {           
            assert.deepEqual(math.divv2scalar_(a, s), result)
        }

        for (let s = -1; s < 2; s++) {
            makeTest([1, 2], s, [1 / s, 2 / s])
        }

    })


    it("divv3()", function () {        
        
        function makeTest(a, b, result) {
            let r = []
            math.divv3(r, a, b)
            assert.deepEqual(r, result)   
        }

        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                for (let c = -1; c < 2; c++) {
                    makeTest([a, b, c], [11, 22, 33], [a / 11, b / 22, c / 33])
                }
            }
        }

    })


    it("divv3_()", function () {        
        
        function makeTest(a, b, result) {
            assert.deepEqual(math.divv3_(a, b), result)  
        }

        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                for (let c = -1; c < 2; c++) {
                    makeTest([a, b, c], [11, 22, 33], [a / 11, b / 22, c / 33])
                }
            }
        }

    })


    it('divv3scalar()', function () {

        function makeTest(a, s, result) {
            let r = []
            math.divv3scalar(r, a, s)
            assert.deepEqual(r, result)
        }

        for (let s = -1; s < 2; s++) {
            makeTest([1, 2, 3], s, [1 / s, 2 / s, 3 / s])
        }

    })


    it('divv3scalar_()', function () {

        function makeTest(a, s, result) {              
            assert.deepEqual(math.divv3scalar_(a, s), result)
        }

        for (let s = -1; s < 2; s++) {
            makeTest([1, 2, 3], s, [1 / s, 2 / s, 3 / s])
        }

    })


    it("dotv2_()", function () {        
        
        function makeTest(a, b, result) {
            assert.deepEqual(math.dotv2_(a, b), result)
        }

        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                makeTest([a, b], [11, 33], a * 11 + b * 33)
            }
        }

    })


    it("dotv3_()", function () {        
        
        function makeTest(a, b, result) {
            assert.deepEqual(math.dotv3_(a, b), result)
        }

        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                for (let c = -1; c < 2; c++) {
                    makeTest([a, b, c], [11, 33, 55], a * 11 + b * 33 + c * 55)
                }
            }
        }

    })


    it("dotvq_()", function () {        
        
        function makeTest(a, b, result) {
            assert.deepEqual(math.dotq_(a, b), result)
        }

        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                for (let c = -1; c < 2; c++) {
                    for (let d = -1; d < 2; d++) {
                        makeTest([a, b, c, d], [11, 33, 55, 77], a * 11 + b * 33 + c * 55 + d * 77)
                    }
                }
            }
        }

    })


    it("crossv3()", function () {
        
        function makeTest(a, b, result) {
            let r = []
            math.crossv3(r, a, b)
            assert.deepEqual(r, result)
        }
        
        for (let ax = -1; ax < 2; ax++) {
            for (let ay = -1; ay < 2; ay++) {
                for (let az = -1; az < 2; az++) {
                    makeTest([ax, ay, az],
                                [11, 33, 55], 
                                [ay * 55 - az * 33,
                                az * 11 - ax * 55,
                                ax * 33 - ay * 11])
                }
            }
        }

    })


    it("crossv3_()", function () {
        
        function makeTest(a, b, result) {
            assert.deepEqual(math.crossv3_(a, b), result)
        }
        
        for (let ax = -1; ax < 2; ax++) {
            for (let ay = -1; ay < 2; ay++) {
                for (let az = -1; az < 2; az++) {
                    makeTest([ax, ay, az],
                                [11, 33, 55], 
                                [ay * 55 - az * 33,
                                az * 11 - ax * 55,
                                ax * 33 - ay * 11])
                }
            }
        }

    })


    it("lengthv2_()", function () {

        function makeTest(a) {
            let result = Math.sqrt(a[0] * a[0] + a[1] * a[1])
            assert.deepEqual(math.lengthv2_(a), result)  
        }

        makeTest([0, 0])
        makeTest([11, 22])
        makeTest([-33, -22])

    })


    it("lengthv2sq_()", function () {

        function makeTest(a) {
            let result = a[0] * a[0] + a[1] * a[1]
            assert.deepEqual(math.lengthv2sq_(a), result)   
        }

        makeTest([0, 0])
        makeTest([11, 22])
        makeTest([-33, -22])

    })


    it("lengthv3_()", function () {

        function makeTest(a) {
            let result = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2])
            assert.deepEqual(math.lengthv3_(a), result) 
        }

        makeTest([0, 0, 0])
        makeTest([11, 22, 33])
        makeTest([-33, -22, -11])

    })


    it("lengthv3sq_()", function () {

        function makeTest(a) {
            let result = a[0] * a[0] + a[1] * a[1] + a[2] * a[2]
            assert.deepEqual(math.lengthv3sq_(a), result)  
        }

        makeTest([0, 0, 0])
        makeTest([11, 22, 33])
        makeTest([-33, -22, -11])

    })
    

    it("normalizev2()", function () {

        function makeTest(a) {
            let result = math.mulv2scalar_(a, 1.0 / math.lengthv2_(a))
            let r = []
            math.normalizev2(r, a)
            assert.deepEqual(r, result) 
        }

        makeTest([0, 1])
        makeTest([11, 22])
        makeTest([-33, -22])

    })


    it("normalizev2_()", function () {
        function makeTest(a) {
            let result = math.mulv2scalar_(a, 1.0 / math.lengthv2_(a))
            assert.deepEqual(math.normalizev2_(a), result)
        }

        makeTest([0, 1])
        makeTest([11, 22])
        makeTest([-33, -22])
    })


    it("normalizev3()", function () {

        function makeTest(a) {
            let result = []
            math.mulv3scalar(result, a, 1.0 / math.lengthv3_(a))
            let r = []
            math.normalizev3(r, a)
            assert.deepEqual(r, result)
        }

        makeTest([0, 1, 0])
        makeTest([11, 22, 33])
        makeTest([-33, -22, -11])

    })


    it("normalizev3_()", function () {

        function makeTest(a) {
            let result = math.mulv3scalar_(a, 1.0 / math.lengthv3_(a))
            assert.deepEqual(math.normalizev3_(a), result)  
        }

        makeTest([0, 1, 0])
        makeTest([11, 22, 33])
        makeTest([-33, -22, -11])

    })


    it("copyv2()", function () {

        function makeTest(a) {
            let result = a
            let r = []
            math.copyv2(r, a)
            assert.notEqual(r, result)
            assert.deepEqual(r, result)   
        }

        makeTest([1, 2])

    })


    it("copyv3()", function () {

        function makeTest(a) {
            let result = a
            let r = []
            math.copyv3(r, a)
            assert.notEqual(r, result)
            assert.deepEqual(r, result)  
        }

        makeTest([1, 2, 1])
        
    })


    it("copyq()", function () {

        function makeTest(a) {
            let result = a
            let r = []
            math.copyq(r, a)
            assert.notEqual(r, result)
            assert.deepEqual(r, result)  
        }

        makeTest([1, 2, 3, 4])
        
    })


    it("setv2()", function () {

        function makeTest(r, x, y) {
            math.setv2(r, x, y)
            assert.deepEqual(r, [x, y])    
        }

        makeTest([1, 2], 3, 4)
        
    })


    it("setv3()", function () {

        function makeTest(r, x, y, z) {
            math.setv3(r, x, y, z)
            assert.deepEqual(r, [x, y, z])
        }

        makeTest([1, 2, 3], 3, 4, 5)
        
    })


    it("lerp_()", function () {

        function makeTest(a, b, i, result) {
            assert.deepEqual(math.lerp_(a, b, i), result)
        }

        makeTest(0, 1, 2, 2)
        makeTest(1, 0, 2, -1)
        makeTest(1, 2, 0, 1)

    })


    it("lerpv2()", function () {

        function makeTest(a, b, i, result) {
            let r = []
            math.lerpv2(r, a, b, i)
            assert.deepEqual(r, result)
        }

        makeTest([0, 0], [1, 1], 2, [2, 2])
        makeTest([0, 10], [1, 20], 2, [2, 30])
        makeTest([10, 0], [20, 1], 2, [30, 2])

    })


    it("lerpv2_()", function () {

        function makeTest(a, b, i, result) {
            assert.deepEqual(math.lerpv2_(a, b, i), result)
        }

        makeTest([0, 0], [1, 1], 2, [2, 2])
        makeTest([0, 10], [1, 20], 2, [2, 30])
        makeTest([10, 0], [20, 1], 2, [30, 2])

    })


    it("lerpv3()", function () {

        function makeTest(a, b, i) {
            let result = formula(a, b, i)
            let r = []
            math.lerpv3(r, a, b, i)
            assert.deepEqual(r, result)
        }

        function formula (a, b, i) {
            return [a[0] + (b[0] - a[0]) * i,
                a[1] + (b[1] - a[1]) * i,
                a[2] + (b[2] - a[2]) * i];
        }

        makeTest([0, 0, 0], [1, 1, 1], 2, [2, 2, 2])

        for (let index = -1; index < 2; index++) {
            makeTest([1 * index, 2, 3], [4, 5, 6], 7)
            makeTest([1, 2 * index, 3], [4, 5, 6], 7)
            makeTest([1, 2, 3 * index], [4, 5, 6], 7)

        }
    })


    it("lerpv3_()", function () {

        function makeTest(a, b, i) {
            let result = formula(a, b, i)
            assert.deepEqual(math.lerpv3_(a, b, i), result)
        }

        function formula (a, b, i) {
            return [a[0] + (b[0] - a[0]) * i,
                a[1] + (b[1] - a[1]) * i,
                a[2] + (b[2] - a[2]) * i];
        }

        makeTest([0, 0, 0], [1, 1, 1], 2, [2, 2, 2])

        for (let index = -1; index < 2; index++) {
            makeTest([1 * index, 2, 3], [4, 5, 6], 7)
            makeTest([1, 2 * index, 3], [4, 5, 6], 7)
            makeTest([1, 2, 3 * index], [4, 5, 6], 7)

        }
    })

    it("slerpq", function () {

        let eps = 0.0000001

        function makeTest(x, y, a, result) {
            let testresult = true
            let q = []
            math.slerpq(q, x, y, a)
            for (let i = 0; i < 4; i++) {
                assert.equal(Math.abs(q[i] - result[i]) > eps, false, q + " not equal " + result + " with epsilon " + eps)
            }
        }

        makeTest(math.axisangle2quat_([1, 1, 1], 0), math.axisangle2quat_([1, 1, 1], 90), 0.5, math.axisangle2quat_([1, 1, 1], 45))
    
    })


    it("slerpq_", function () {

        let eps = 0.0000001

        function makeTest(x, y, a, result) {
            let testresult = true
            let q = math.slerpq_(x, y, a)
            for (let i = 0; i < 4; i++) {
                assert.equal(Math.abs(q[i] - result[i]) > eps, false, q + " not equal " + result + " with epsilon " + eps)
            }
        }

        makeTest(math.axisangle2quat_([1, 1, 1], 0), math.axisangle2quat_([1, 1, 1], 90), 0.5, math.axisangle2quat_([1, 1, 1], 45))

    })


    it('acos_()', function () {

        function makeTest(a, result) {
            assert.deepEqual(math.acos_(a), result)      
        }

        for (let a = -1; a < 2; a++) {
            makeTest(a, Math.acos(a))
        }

    })


    it('sin_()', function () {

        function makeTest(a, result) {
            assert.deepEqual(math.sin_(a), result)       
        }

        for (let a = -1; a < 2; a++) {
            makeTest(a, Math.sin(a))
        }

    })


    it('cos_()', function () {

        function makeTest(a, result) {
            assert.deepEqual(math.cos_(a), result)        
        }

        for (let a = -1; a < 2; a++) {
            makeTest(a, Math.cos(a))
        }

    })


    it('negv2()', function () {

        function makeTest(a, result) {
            let r = [0, 0]
            math.negv2(r, a)
            assert.deepEqual(r, result)        
        }

        for (let a = -1; a < 2; a++) {
            makeTest([a, -1], [-a, 1])
            makeTest([a, 0], [-a, 0])
            makeTest([a, 1], [-a, -1])
        }

    })


    it('negv2_()', function () {

        function makeTest(a, result) {
            assert.deepEqual(math.negv2_(a), result)        
        }

        for (let a = -1; a < 2; a++) {
            makeTest([a, -1], [-a, 1])
            makeTest([a, 0], [-a, 0])
            makeTest([a, 1], [-a, -1])
        }

    })


    it('negv3()', function () {

        function makeTest(a, result) {
            let r = [0, 0, 0]
            math.negv3(r, a)
            assert.deepEqual(r, result)        
        }

        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                makeTest([a, b, -1], [-a, -b, 1])
                makeTest([a, b, 0], [-a, -b, 0])
                makeTest([a, b, 1], [-a, -b, -1])
            }
        }

    })


    it('negv3_()', function () {

        function makeTest(a, result) {
            assert.deepEqual(math.negv3_(a), result)        
        }

        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                makeTest([a, b, -1], [-a, -b, 1])
                makeTest([a, b, 0], [-a, -b, 0])
                makeTest([a, b, 1], [-a, -b, -1])
            }
        }

    })


    it('negq()', function () {

        function makeTest(a, result) {
            let r = [0, 0, 0, 0]
            math.negq(r, a)
            assert.deepEqual(r, result)
        }

        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                for (let c = -1; c < 2; c++) {
                    makeTest([a, b, c, -1], [-a, -b, -c, 1])
                    makeTest([a, b, c, 0], [-a, -b, -c, 0])
                    makeTest([a, b, c, 1], [-a, -b, -c, -1]) 
                }
            }
        }

    })


    it('negq_()', function () {

        function makeTest(a, result) {
            assert.deepEqual(math.negq_(a), result)        
        }

        for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
                for (let c = -1; c < 2; c++) {
                    makeTest([a, b, c, -1], [-a, -b, -c, 1])
                    makeTest([a, b, c, 0], [-a, -b, -c, 0])
                    makeTest([a, b, c, 1], [-a, -b, -c, -1]) 
                }
            }
        }

    })


    it('deg2rad_()', function () {

        function makeTest(degrees, result) {
            assert.deepEqual(math.deg2rad_(degrees), result)        
        }
        
        function formula(degrees) {
            return degrees / 180.0 * Math.PI
        }

        makeTest(1, formula(1))
        makeTest(100, formula(100))
        makeTest(360, formula(360))

    })


    it('rad2deg_()', function () {

        function makeTest(degrees, result) {
            assert.deepEqual(math.rad2deg_(degrees), result)        
        }
        
        function formula(radians) {
            return radians / Math.PI * 180.0
        }

        makeTest(1, formula(1))
        makeTest(100, formula(100))
        makeTest(360, formula(360))

    })


    it('sign_()', function () {

        function makeTest(value, result) {
            assert.deepEqual(math.sign_(value), result)        
        }
        

        makeTest(123, 1)
        makeTest(0, 1)
        makeTest(-123, -1)

    })


    it('quat2axes()', function () {

        function makeTest(quat, resultx, resulty, resultz) {
            let x = [], y = [], z = []
            math.quat2axes(x, y, z, quat)
            let eps = 1e-15
            for (let i = 0; i < 1; i++) {
                assert.deepEqual(Math.abs(x[i] - resultx[i]) > eps, false, x + " !=" + resultx)
            }
            for (let i = 0; i < 1; i++) {
                assert.deepEqual(Math.abs(y[i] - resulty[i]) > eps, false, y + " != " + resulty)
            }
            for (let i = 0; i < 1; i++) {
                assert.deepEqual(Math.abs(z[i] - resultz[i]) > eps, false, z + " != " + resultz)
            }
        }

        function makeTestWithAxes2Quat(resultx, resulty, resultz) {
            let eps = 1e-15
            let x = [], y = [], z = []

            let quat = []
            math.axes2quat(quat, resultx, resulty, resultz) 
            math.quat2axes(x, y, z, quat)
            
            for (let i = 0; i < 1; i++) {
                assert.deepEqual(Math.abs(x[i] - resultx[i]) > eps, false, x + " != " + resultx)
            }
            for (let i = 0; i < 1; i++) {
                assert.deepEqual(Math.abs(y[i] - resulty[i]) > eps, false, y + " != " + resulty)
            }
            for (let i = 0; i < 1; i++) {
                assert.deepEqual(Math.abs(z[i] - resultz[i]) > eps, false, z + " != " + resultz)
            }
        }

        makeTest([0, 0, 0, 1], [1, 0, 0], [0, 1, 0], [0, 0, 1])
              
        makeTestWithAxes2Quat([1, 0, 0], [0, 1, 0], [0, 0, 1])
        makeTestWithAxes2Quat([0, 0, 1], [0, 1, 0], [-1, 0, 0])
        
        makeTestWithAxes2Quat( 
            [math.cos_(math.deg2rad_(45)), 0, math.sin_(math.deg2rad_(45))],
            [0, 1, 0],
            [-math.sin_(math.deg2rad_(45)), 0, math.cos_(math.deg2rad_(45))]
        )

    })


    it('axes2quat()', function () {

        function makeTest(x, y, z, result) {
            let q = []
            math.axes2quat(q, x, y, z)
            assert.deepEqual(q, result)
        }

        function makeTestWithQuat2Axes(q) {
            let new_q = []
            let x = [], y = [], z = []
            math.quat2axes(x, y, z, q)
            math.axes2quat(new_q, x, y, z)
            assert.deepEqual(q, new_q)
        }

        makeTest([1, 0, 0], [0, 1, 0], [0, 0, 1], [0, 0, 0, 1])
        makeTest([0, 0, 1], [0, 1, 0], [-1, 0, 0], [0, -Math.sin(math.deg2rad_(90 / 2)), 0, Math.cos(math.deg2rad_(90 / 2))])
    
        makeTestWithQuat2Axes([0, -Math.sin(math.deg2rad_(47 / 2)), 0, Math.cos(math.deg2rad_(47 / 2))])
    })


    it('axisangle2quat()', function () {

        function makeTest(x, a, result) {
            let q = []
            math.axisangle2quat(q, x, a)
            assert.deepEqual(q, result)
        }

        makeTest([123, 456, 789], 0, [0, 0, 0, 1])
        makeTest([1, 1, 1], 90, [Math.sin(math.deg2rad_(45)), Math.sin(math.deg2rad_(45)), Math.sin(math.deg2rad_(45)), Math.cos(math.deg2rad_(45))])
        makeTest([10, 20, 30], 90, [10 * Math.sin(math.deg2rad_(45)), 20 * Math.sin(math.deg2rad_(45)), 30 * Math.sin(math.deg2rad_(45)), Math.cos(math.deg2rad_(45))])
    
    })


    it('axisangle2quat_()', function () {

        function makeTest(x, a, result) {
            assert.deepEqual(math.axisangle2quat_(x, a), result)
        }

        
        makeTest([123, 456, 789], 0, [0, 0, 0, 1])
        makeTest([1, 1, 1], 90, [Math.sin(math.deg2rad_(45)), Math.sin(math.deg2rad_(45)), Math.sin(math.deg2rad_(45)), Math.cos(math.deg2rad_(45))])
        makeTest([10, 20, 30], 90, [10 * Math.sin(math.deg2rad_(45)), 20 * Math.sin(math.deg2rad_(45)), 30 * Math.sin(math.deg2rad_(45)), Math.cos(math.deg2rad_(45))])

    })


    it('applyv3quat()', function () {

        function makeTest(vector, quaternion, result) {

            let eps = 1e-10
            let r = []
            math.applyv3quat(r, vector, quaternion)
            for (let i = 0; i < 3; i++) {
                assert.equal(Math.abs(r[i] - result) > eps, false, r + " != " + result)
            }
        }

        makeTest([1, 1, 1], [0, 0, 0, 1], [1, 1, 1])
        let q = []
        math.axes2quat(q, [0, 0, 1], [0, 1, 0], [-1, 0, 0])
        makeTest([1, 2, 3], q , [-3, 2, 1])

    })


    it('mulq()', function () {

        function makeTest(a, b, result) {
            let r = []
            math.mulq(r, a, b)
            assert.deepEqual(r, result)    
        }

        makeTest([0, 0, 0, 1], [1, 1, 1, 0], [1, 1, 1, 0])
        let q1 = []
        math.axes2quat(q1, [-1, 0, 0], [0, 1, 0], [0, 0, -1])
        let q2 = []
        math.axes2quat(q2, [0, 0, 1], [0, 1, 0], [-1, 0, 0])
        makeTest(q1, q2, [0, Math.sin(math.deg2rad_(135)), 0,  -Math.cos(math.deg2rad_(135))])

    })

    
    it('mulqscalar()', function () {

        function makeTest(a, s, result) {
            let r = []
            math.mulqscalar(r, a, s)
            assert.deepEqual(r, result)
        }

        makeTest([0, 0, 0, 0], 100, [0, 0, 0, 0])
        makeTest([1, 2, 3, 4], 0, [0, 0, 0, 0])
        makeTest([1, 2, 3, 4], 1, [1, 2, 3, 4])
        makeTest([-1, -2, -3, -4], 2, [-2, -4, -6, -8])

    })


    it('mulqscalar_()', function () {

        function makeTest(a, s, result) {           
            assert.deepEqual(math.mulqscalar_(a, s), result)
        }

        makeTest([0, 0, 0, 0], 100, [0, 0, 0, 0])
        makeTest([1, 2, 3, 4], 0, [0, 0, 0, 0])
        makeTest([1, 2, 3, 4], 1, [1, 2, 3, 4])
        makeTest([-1, -2, -3, -4], 2, [-2, -4, -6, -8])

    })


    it('transform()', function () {

        function makeTest(pos, degree, scale, v, result) {
            let eps = 1e-10

            let r = []
            math.transform(r, pos, degree, scale, v)     
            for (let i = 0; i < 2; i++) {
                assert.equal(Math.abs(r[i] - result[i]) > eps, false, r + " != " + result)
            }    
        }

        makeTest([2, 3], 0, 1, [4, 5], [6, 8])
        makeTest([0, 0], 45, 1, [2, 2], [0, Math.sqrt(8)])
        makeTest([0, 0], 0, 2, [2,2], [4, 4])
        makeTest([2, 3], 90, 3, [4, 7], [-19, 15])

    })


    it('invtransform()', function () {

        function makeTest(pos, degree, scale, v, result) {  
            let eps = 1e-10

            let r = []
            math.invtransform(r, pos, degree, scale, v)
            for (let i = 0; i < 2; i++) {
                assert.equal(Math.abs(r[i] - result[i]) > eps, false, r + " != " + result)
            }    
        }

        makeTest([2, 3], 0, 1, [6, 8], [4, 5])
        makeTest([0, 0], 45, 1, [0, Math.sqrt(2)], [1, 1])
        makeTest([0, 0], 0, 2, [4, 4], [2, 2])
        makeTest([2, 3], 90, 3, [4, 7], [4/3, -4/6])

    })

})