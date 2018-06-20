#!/usr/bin/env bash
set -xeo pipefail

if [ $# -lt 1 ] ; then
	echo "usage: $0 <input> [<size@1x>] [<output>]"
  exit
fi

if [ ! -f $1 ] ; then
	echo "file doesn't exist"
	exit 1
fi

## include common processing

source $(dirname $0)/generate-image-assets.include.sh

width=48
height=48

## generate assets

APP_NAME=$(find $PWD/ios -name '*.xcodeproj' -exec basename {} .xcodeproj \;)

TARGET_DIR="${PWD}/ios/${APP_NAME}/Images.xcassets/AppIcon.appiconset"

mkdir -p $TARGET_DIR

# if [ "$FORMAT" != 'SVG' ]; then

#   function generate_image () {
#     inkscape -z -e "${TARGET_DIR}/${filename}.png" -w "$(echo $width*$scale | bc)" -h "$(echo $height*$scale | bc)" "$input"
#   }

# else

  function generate_image () {
    mogrify -write "${TARGET_DIR}/${filename}.png" -format png -background none -density "$(echo $DENSITY*$scale*$height/$HEIGHT | bc)" -resize "$(echo $width*$scale | bc)x$(echo $height*$scale | bc)" "$input"
  }

# fi

width=20 height=20 scale=2 filename="iphone-${width}x${height}@${scale}x" generate_image

width=20 height=20 scale=3 filename="iphone-${width}x${height}@${scale}x" generate_image

width=29 height=29 scale=2 filename="iphone-${width}x${height}@${scale}x" generate_image

width=29 height=29 scale=3 filename="iphone-${width}x${height}@${scale}x" generate_image

width=40 height=40 scale=2 filename="iphone-${width}x${height}@${scale}x" generate_image

width=40 height=40 scale=3 filename="iphone-${width}x${height}@${scale}x" generate_image

width=60 height=60 scale=2 filename="iphone-${width}x${height}@${scale}x" generate_image

width=60 height=60 scale=3 filename="iphone-${width}x${height}@${scale}x" generate_image

width=1024 height=1024 scale=1 filename="ios-marketing-${width}x${height}@${scale}x" generate_image
