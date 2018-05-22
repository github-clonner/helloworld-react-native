#!/usr/bin/env bash -xeo pipefail

cp package.json package.json.template
cp yarn.lock yarn.lock.template

cat <<EOS > package.json
{
  "name": "alvb-starter-react-native",
  "version": "0.1.0",
  "private": true
}
EOS

rm yarn.lock
