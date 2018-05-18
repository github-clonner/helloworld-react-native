#!/bin/bash -xe

cp package.json.template package.json
cp yarn.lock.template yarn.lock
yarn install
