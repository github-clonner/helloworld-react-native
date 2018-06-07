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


# if [ "$FORMAT" != 'SVG' ]; then

# inkscape -z -e $PWD/android/app/src/main/res/mipmap-mdpi/$output.png -w "$(echo $width*1 | bc)" -h "$(echo $height*1 | bc)" "$input"

# inkscape -z -e $PWD/android/app/src/main/res/mipmap-hdpi/$output.png -w "$(echo $width*1.5 | bc)" -h "$(echo $height*1.5 | bc)" "$input"

# inkscape -z -e $PWD/android/app/src/main/res/mipmap-xhdpi/$output.png -w "$(echo $width*2 | bc)" -h "$(echo $height*2| bc)" "$input"

# inkscape -z -e $PWD/android/app/src/main/res/mipmap-xxhdpi/$output.png -w "$(echo $width*3 | bc)" -h "$(echo $height*3 | bc)" "$input"

# inkscape -z -e $PWD/android/app/src/main/res/mipmap-xxxhdpi/$output.png -w "$(echo $width*4 | bc)" -h "$(echo $height*4 | bc)" "$input"

# else

mogrify -write $PWD/android/app/src/main/res/mipmap-mdpi/$output.png -format png -background none -density "$(echo $DENSITY*1 | bc)" -resize "$(echo $width*1 | bc)x$(echo $height*1 | bc)" "$input"

mogrify -write $PWD/android/app/src/main/res/mipmap-hdpi/$output.png -format png -background none -density "$(echo $DENSITY*1.5 | bc)" -resize "$(echo $width*1.5 | bc)x$(echo $height*1.5 | bc)" "$input"

mogrify -write $PWD/android/app/src/main/res/mipmap-xhdpi/$output.png -format png -background none -density "$(echo $DENSITY*2 | bc)" -resize "$(echo $width*2 | bc)x$(echo $height*2| bc)" "$input"

mogrify -write $PWD/android/app/src/main/res/mipmap-xxhdpi/$output.png -format png -background none -density "$(echo $DENSITY*3 | bc)" -resize "$(echo $width*3 | bc)x$(echo $height*3 | bc)" "$input"

mogrify -write $PWD/android/app/src/main/res/mipmap-xxxhdpi/$output.png -format png -background none -density "$(echo $DENSITY*4 | bc)" -resize "$(echo $width*4 | bc)x$(echo $height*4 | bc)" "$input"

# fi
