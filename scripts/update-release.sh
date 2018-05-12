#!/bin/bash -xe

> ./src/common/release.js

echo "export const RELEASE_VERSION = '$(git describe --always)';" >> ./src/common/release.js
echo "export const RELEASE_DATE = '$(git show -s --format=%aI)';" >> ./src/common/release.js

# echo "console.ignoredYellowBox = ['Warning:'];" >> ./src/common/release.js
