#!/bin/bash
FRAMEWORK=${BASH_ARGV[0]}
(./run-params-ref.sh $FRAMEWORK params-root)
(./run-params-ref.sh $FRAMEWORK params-atlas)
(./run-params-ref.sh $FRAMEWORK params-simple)

