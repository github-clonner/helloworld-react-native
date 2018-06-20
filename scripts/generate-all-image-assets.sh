#!/usr/bin/env bash
set -xeo pipefail

./scripts/generate-icon-assets-for-android.sh assets/icon.svg
./scripts/generate-icon-assets-for-ios.sh assets/icon.svg

./scripts/generate-image-assets.sh assets/logo.svg 140x

# generate images assets for all icons (`ic_*.svg`)
for icon in $(find assets/ -name 'ic_*.svg'); do
  ./scripts/generate-image-assets.sh $icon 24
done
