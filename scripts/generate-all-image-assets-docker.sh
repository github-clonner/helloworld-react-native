#!/usr/bin/env bash

docker pull emiketic/docker-image-processing

docker run --rm -v $PWD:$PWD -u $(id -u):$(id -g) emiketic/docker-image-processing bash -c  "cd $PWD ; ./scripts/generate-all-image-assets.sh"
