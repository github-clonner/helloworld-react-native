#!/usr/bin/env bash -xeo pipefail

cp package.json.template package.json
cp yarn.lock.template yarn.lock
yarn install
