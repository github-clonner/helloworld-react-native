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

mkdir -p "$PWD/ios/$APP_NAME/Images.xcassets/$output.appiconset"

cat > "$PWD/ios/$APP_NAME/Images.xcassets/$output.appiconset/Contents.json" <<EOL
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

# inkscape -z -e "$PWD/ios/$APP_NAME/Images.xcassets/$output.appiconset/$output.png" -w  "$(echo $width*1 | bc)" -h "$(echo $height*1 | bc)" "$input"

# inkscape -z -e "$PWD/ios/$APP_NAME/Images.xcassets/$output.appiconset/$output@2x.png" -w "$(echo $width*2 | bc)" -h "$(echo $height*2 | bc)" "$input"

# inkscape -z -e "$PWD/ios/$APP_NAME/Images.xcassets/$output.appiconset/$output@3x.png" -w "$(echo $width*3 | bc)" -h "$(echo $height*3 | bc)" "$input"

# else

mogrify -write "$PWD/ios/$APP_NAME/Images.xcassets/$output.appiconset/$output.png" -format png -background none -density "$(echo $DENSITY*1 | bc)" -resize "$(echo $width*1 | bc)x$(echo $height*1 | bc)" "$input"

mogrify -write "$PWD/ios/$APP_NAME/Images.xcassets/$output.appiconset/$output@2x.png" -format png -background none -density "$(echo $DENSITY*2 | bc)" -resize "$(echo $width*2 | bc)x$(echo $height*2 | bc)" "$input"

mogrify -write "$PWD/ios/$APP_NAME/Images.xcassets/$output.appiconset/$output@3x.png" -format png -background none -density "$(echo $DENSITY*3 | bc)" -resize "$(echo $width*3 | bc)x$(echo $height*3 | bc)" "$input"

# fi
