#!/usr/bin/env bash
set -xeo pipefail

source $(dirname $0)/config.sh

$(dirname $0)/update-release.sh

cd ./android

export FORCE_BUNDLING=true

./gradlew assembleDebug

cd ..

cp ./android/app/build/outputs/apk/app-debug.apk ./build/app-debug.apk

echo -e '\n ==> ./build/app-debug.apk'
