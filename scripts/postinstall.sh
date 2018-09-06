#!/bin/bash -x

# keep only used fonts from native-base

cp ./node_modules/native-base/Fonts/Ionicons.ttf ./assets/fonts/
cp ./node_modules/native-base/Fonts/Roboto.ttf ./assets/fonts/
cp ./node_modules/native-base/Fonts/Roboto_medium.ttf ./assets/fonts/

rm -fr ./node_modules/native-base/Fonts/*.ttf || true

# fix Babel issue

rm ./node_modules/emiketic-starter-lib/.babelrc || true
