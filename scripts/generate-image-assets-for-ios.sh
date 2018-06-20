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

## generate assets

APP_NAME=$(find $PWD/ios -name '*.xcodeproj' -exec basename {} .xcodeproj \;)

TARGET_DIR="${PWD}/ios/${APP_NAME}/Images.xcassets/${output}.imageset"

mkdir -p $TARGET_DIR

cat > "${TARGET_DIR}/Contents.json" <<EOL
{
  "images": [
    {
      "idiom": "universal",
      "filename": "$output.png",
      "scale": "1x"
    },
    {
      "idiom": "universal",
      "filename": "$output@2x.png",
      "scale": "2x"
    },
    {
      "idiom": "universal",
      "filename": "$output@3x.png",
      "scale": "3x"
    }
  ],
  "info": {
    "version": 1,
    "author": "xcode"
  }
}
EOL

# if [ "$FORMAT" != 'SVG' ]; then

#   function generate_image () {
#     inkscape -z -e "${TARGET_DIR}/${filename}.png" -w "$(echo $width*$scale | bc)" -h "$(echo $height*$scale | bc)" "$input"
#   }

# else

  function generate_image () {
    mogrify -write "${TARGET_DIR}/${filename}.png" -format png -background none -density "$(echo $DENSITY*$scale*$height/$HEIGHT | bc)" -resize "$(echo $width*$scale | bc)x$(echo $height*$scale | bc)" "$input"
  }

# fi

scale=1 filename="${output}" generate_image

scale=2 filename="${output}@2x" generate_image

scale=3 filename="${output}@3x" generate_image
