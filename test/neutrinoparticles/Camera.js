'use strict'

import * as Camera from '../../src/neutrinoparticles/Camera'
import * as math  from '../../src/neutrinoparticles/Math'
import * as assert from 'assert'


describe('Camera', function () {
    

    it('Camera2D creation', function () {
   
        let camera = new Camera.Camera2D()
   
    })

    it('Camera2D transform()', function () {
        
        let camera = new Camera.Camera2D()
        assert.equal(camera.transform(), true)
   
    })

    it('Camera3D creation', function() {
        
        let camera = new Camera.Camera3D([200, 100], 90)
        assert.equal(camera.z + camera.screenPos[0] < 1e-8, true)
        assert.equal(camera.screenPos[0], 100)
        assert.equal(camera.screenPos[1], 50)
        assert.equal(camera.z + 100 < 1e-8, true)
        
        let camera2 = new Camera.Camera3D([1000, 200], 120)
        assert.equal(camera2.z - 500 / Math.tan(math.deg2rad_(120)) < 1e-8, true)
        assert.equal(camera.screenPos[0], 100)
        assert.equal(camera.screenPos[1], 50)

    })

    describe('Camera3D transform()', function () {

        let camera, position, size
        it ('Object must be in frame of camera', function () {

            camera = new Camera.Camera3D([200, 100], 90)
            assert.equal(camera.transform([1, 2, 3], [10, 10]), true, "Object must be in frame of camera" +
                                                                  + " with position " + position)
        
        })
        
        it('Object must be behind the camera', function () {
          
            camera = new Camera.Camera3D([200, 200], 90)
            assert.equal(camera.transform([100, 0, -101], [10, 20]), false, "Object must be behind " +
                                                                + " the camera with position" + position)

        })
        

        it ('Position and size of object with Z = 0 should not changing', function () {
            
            camera = new Camera.Camera3D([200, 200], 120)
            position = [10, 0, 0]
            size = [10, 10]
            camera.transform(position, size)
            assert.deepEqual(position, [10, 0, 0])

        })
        
        it('Transform with custum values', function () {

            camera = new Camera.Camera3D([200, 200], 120)
            position = [-10, 0, 10]
            camera.transform(position, size)
            assert.deepEqual(position, [6.239751426038822, 14.763410387308014, 10])
            assert.deepEqual(size, [8.523658961269199, 8.523658961269199])

            camera = new Camera.Camera3D([200, 300], 135)
            size = [20, 50]
            position = [10, 10, -12]
            camera.transform(position, size)
            assert.deepEqual(position, [-26.708029068708996, -47.1013785513251, -12])
            assert.deepEqual(size, [28.157339793046443, 70.3933494826161])

        })
        
    })

})
