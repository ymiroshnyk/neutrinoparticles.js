#!/bin/bash
FRAMEWORK=${BASH_ARGV[0]}
(./run-params.sh $FRAMEWORK params-root)
(./run-params.sh $FRAMEWORK params-atlas)
(./run-params.sh $FRAMEWORK params-simple)

