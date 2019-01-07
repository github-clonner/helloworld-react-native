#!/usr/bin/env bash
set -xeo pipefail

cp package.json package.template.json
cat <<EOS > package.json
{
  "private": true,
  "name": "emiketic-starter-react-native",
  "version": "0.1.0"
}
EOS

cp yarn.lock yarn.template.lock
rm yarn.lock
