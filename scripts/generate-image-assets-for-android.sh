#!/usr/bin/env bash
set -xeo pipefail

if [ $# -lt 1 ]; then
	echo "usage: $0 <input> [<size@1x>] [<output>]"
fi

if [ ! -f $1 ] ; then
	echo "file doesn't exist"
	exit 1
fi

## include common processing

source $(dirname $0)/generate-image-assets.include.sh

## generate assets

TARGET_DIR="${PWD}/android/app/src/main/res/mipmap"

# if [ "$FORMAT" != 'SVG' ]; then

#   function generate_image () {
#     inkscape -z -e "${TARGET_DIR}-${resolution}/${output}.png" -w "$(echo $width*$scale | bc)" -h "$(echo $height*$scale | bc)" "$input"
#   }

# else

  function generate_image () {
    mogrify -write "${TARGET_DIR}-${resolution}/${output}.png" -format png -background none -density "$(echo $DENSITY*$scale*$height/$HEIGHT | bc)" -resize "$(echo $width*$scale | bc)x$(echo $height*$scale | bc)" "$input"
  }

# fi

scale=1 resolution=mdpi generate_image

scale=1.5 resolution=hdpi generate_image

scale=2 resolution=xhdpi generate_image

scale=3 resolution=xxhdpi generate_image

scale=4 resolution=xxxhdpi generate_image

