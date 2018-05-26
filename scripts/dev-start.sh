#!/usr/bin/env bash
set -xeo pipefail

cp package.json.template package.json
cp yarn.lock.template yarn.lock
yarn install
