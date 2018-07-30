#!/usr/bin/env bash
set -xeo pipefail

> ./src/common/release.js

VALUE=$(node -e 'console.log(require("./package.json").version)')
echo "export const RELEASE_VERSION = '${VALUE}';" >> ./src/common/release.js

VALUE=$(git describe --always)
echo "export const RELEASE_CODENAME = '${VALUE}';" >> ./src/common/release.js

VALUE=$(git show -s --format=%aI)
echo "export const RELEASE_DATE = '${VALUE}';" >> ./src/common/release.js

echo "console.ignoredYellowBox = ['Warning:'];" >> ./index.js
