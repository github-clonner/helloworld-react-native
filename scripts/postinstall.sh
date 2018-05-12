#!/bin/bash -xe

# only keep used fonts from native-base
find ./node_modules/native-base/Fonts/*.ttf  \
  -not -name 'Ionicons.ttf' \
  -not -name 'Roboto*.ttf' \
  -exec rm {} \;
