#!/bin/bash

# sleep 2  # for testing
raspistill -cs 0 -o tmp0.jpg
raspistill -cs 1 -o tmp1.jpg
echo "refresh"
