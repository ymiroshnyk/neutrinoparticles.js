#!/bin/bash
FRAMEWORK=${BASH_ARGV[1]}
PARAMS=$(cat ${BASH_ARGV[0]})
cd ..
npm run test-$FRAMEWORK $PARAMS webgl=0
npm run test-$FRAMEWORK $PARAMS webgl=1

