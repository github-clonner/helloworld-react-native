#!/usr/bin/env bash
set -xeo pipefail

./scripts/generate-image-assets-for-android.sh assets/logo.svg 48 ic_launcher
./scripts/generate-image-assets-for-ios.sh assets/logo.svg 48 AppIcon

./scripts/generate-image-assets.sh assets/logo.svg 140x

# generate images assets for all icons (`ic_*.svg`)
for icon in $(find assets/ -name 'ic_*.svg'); do
  ./scripts/generate-image-assets.sh $icon 24
done
