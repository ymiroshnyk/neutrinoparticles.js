#!/bin/bash
FRAMEWORK=${BASH_ARGV[1]}
PARAMS=$(cat ${BASH_ARGV[0]})
cd ..
npm run test-$FRAMEWORK $PARAMS webgl=0 reference_pass=1
npm run test-$FRAMEWORK $PARAMS webgl=1 reference_pass=1
