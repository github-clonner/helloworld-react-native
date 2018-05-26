#!/usr/bin/env bash
set -xeo pipefail

> ./src/common/release.js

echo "export const RELEASE_VERSION = '$(git describe --always)';" >> ./src/common/release.js
echo "export const RELEASE_DATE = '$(git show -s --format=%aI)';" >> ./src/common/release.js

# echo "console.ignoredYellowBox = ['Warning:'];" >> ./index.js
