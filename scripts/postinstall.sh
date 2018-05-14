#!/bin/bash -xe

# keep only used fonts from native-base
find ./node_modules/native-base/Fonts/*.ttf  \
  -not -name 'Ionicons.ttf' \
  -not -name 'Roboto*.ttf' \
  -exec rm {} \;
