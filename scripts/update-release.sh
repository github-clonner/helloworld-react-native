#!/usr/bin/env bash
set -xeo pipefail

> ./src/common/release.js

VALUE=$(node -e 'console.log(require("./package.json").version)')
echo "export const RELEASE_VERSION = '${VALUE}';" >> ./src/common/release.js

echo "console.ignoredYellowBox = ['Warning:'];" >> ./src/common/release.js
