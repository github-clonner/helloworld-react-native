#!/usr/bin/env bash
set -xeo pipefail

source $(dirname $0)/config.sh

if [[ $# -lt 1 ]] ; then
	echo "usage: $0 <input> [<size@1x>] [<output>]"
fi

if [ ! -f $1 ] ; then
	echo "file doesn't exist"
	exit 1
fi

input=$PWD/$1

size=$2

output=${3:-$1}
output=$(basename $output .png)
output=$(basename $output .svg)

# FORMAT=$(identify -format '%m' "$input")
FORMAT=SVG
[ ${input: -4} == ".png" ] && FORMAT=PNG
WIDTH=$(identify -format '%w' "$input")
HEIGHT=$(identify -format '%h' "$input")
DENSITY=$(identify -format '%[resolution.x]' "$input")

width=$WIDTH
height=$HEIGHT

if [ -n "$size" ] ; then

	width=${size/x*/}
	height=${size/*x/}

	if [ -z "$width" ] && [ -z "$height" ] ; then
		width=$WIDTH
		height=$HEIGHT
	elif [ -z "$width" ] ; then
		width=$(echo $WIDTH*$height/$HEIGHT | bc)
	elif [ -n "$width" ] ; then
		height=$(echo $HEIGHT*$width/$WIDTH | bc)
	fi

else

	width=$WIDTH
	height=$HEIGHT

	# when input is not SVG, assume input is 4x
	if [[ "$FORMAT" != SVG ]] ; then
		width=$(echo $width/4 | bc)
		height=$(echo $height/4 | bc)
	fi

fi

echo "$FORMAT ${WIDTH}x${HEIGHT}@${DENSITY} => ${width}x${height}"

if [[ "$FORMAT" == SVG ]] ; then

inkscape -z -e $PWD/android/app/src/main/res/mipmap-mdpi/$output.png -w "$(echo $width*1 | bc)" -h "$(echo $height*1 | bc)" "$input"

inkscape -z -e $PWD/android/app/src/main/res/mipmap-hdpi/$output.png -w "$(echo $width*1.5 | bc)" -h "$(echo $height*1.5 | bc)" "$input"

inkscape -z -e $PWD/android/app/src/main/res/mipmap-xhdpi/$output.png -w "$(echo $width*2 | bc)" -h "$(echo $height*2| bc)" "$input"

inkscape -z -e $PWD/android/app/src/main/res/mipmap-xxhdpi/$output.png -w "$(echo $width*3 | bc)" -h "$(echo $height*3 | bc)" "$input"

inkscape -z -e $PWD/android/app/src/main/res/mipmap-xxxhdpi/$output.png -w "$(echo $width*4 | bc)" -h "$(echo $height*4 | bc)" "$input"

else

mogrify -write $PWD/android/app/src/main/res/mipmap-mdpi/$output.png -format png -background none -density "$(echo $DENSITY*1 | bc)" -resize "$(echo $width*1 | bc)x$(echo $height*1 | bc)" "$input"

mogrify -write $PWD/android/app/src/main/res/mipmap-hdpi/$output.png -format png -background none -density "$(echo $DENSITY*1.5 | bc)" -resize "$(echo $width*1.5 | bc)x$(echo $height*1.5 | bc)" "$input"

mogrify -write $PWD/android/app/src/main/res/mipmap-xhdpi/$output.png -format png -background none -density "$(echo $DENSITY*2 | bc)" -resize "$(echo $width*2 | bc)x$(echo $height*2| bc)" "$input"

mogrify -write $PWD/android/app/src/main/res/mipmap-xxhdpi/$output.png -format png -background none -density "$(echo $DENSITY*3 | bc)" -resize "$(echo $width*3 | bc)x$(echo $height*3 | bc)" "$input"

mogrify -write $PWD/android/app/src/main/res/mipmap-xxxhdpi/$output.png -format png -background none -density "$(echo $DENSITY*4 | bc)" -resize "$(echo $width*4 | bc)x$(echo $height*4 | bc)" "$input"

fi
