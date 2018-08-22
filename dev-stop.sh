#!/usr/bin/env bash
set -xeo pipefail

cp package.json package.template.json
cat <<EOS > package.json
{
  "name": "emiketic-starter-react-native",
  "version": "0.1.0",
  "private": true
}
EOS

cp yarn.lock yarn.template.lock
rm yarn.lock
