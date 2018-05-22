#!/usr/bin/env bash -xeo pipefail

source $(dirname $0)/config.sh

$(dirname $0)/update-release.sh

cd ./android

sed -i 's/bundleInDebug: false/bundleInDebug: true/g' ./app/build.gradle

./gradlew assembleDebug

cd ..

cp ./android/app/build/outputs/apk/app-debug.apk ./build/app-debug.apk

echo -e '\n ==> ./build/app-debug.apk'
