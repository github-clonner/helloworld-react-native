#!/usr/bin/env bash
set -xeo pipefail

source $(dirname $0)/config.sh

$(dirname $0)/update-release.sh

cd ./ios

if [ -f ./Podfile ]; then
  pod install
fi

if [ -d $APP_NAME.xcworkspace ]; then
  xcodebuild build -workspace $APP_NAME.xcworkspace -scheme $APP_NAME -configuration Release -sdk iphoneos -derivedDataPath ./build | xcpretty
else
  xcodebuild build -project $APP_NAME.xcodeproj -scheme $APP_NAME -configuration Release -sdk iphoneos -derivedDataPath ./build | xcpretty
fi

cd ..

(cd ./ios/build/Build/Products/Release-iphoneos && zip -FSr $PROJECT_DIR/build/app-release.zip $APP_NAME.app)

echo -e '\n ==> ./build/app-release.zip'
